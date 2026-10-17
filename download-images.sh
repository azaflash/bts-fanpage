#!/usr/bin/env bash
set -euo pipefail

# Download official BTS portraits from Wikimedia Commons into assets/
# Run this script from the repository root. Requires curl or wget.

mkdir -p assets

download() {
  url="$1"
  out="$2"
  if command -v curl >/dev/null 2>&1; then
    echo "Downloading $out from $url"
    curl -L --fail -o "$out" "$url"
  elif command -v wget >/dev/null 2>&1; then
    echo "Downloading $out from $url"
    wget -O "$out" "$url"
  else
    echo "Error: curl or wget required to download images."
    exit 2
  fi
}

# Portraits (Wikimedia Commons)
download "https://upload.wikimedia.org/wikipedia/commons/2/20/RM_at_the_United_Nations_2021_%28cropped%29.png" assets/rm.png
download "https://upload.wikimedia.org/wikipedia/commons/2/2c/Jin_at_the_United_Nations_2021_%28cropped%29.png" assets/jin.png
download "https://upload.wikimedia.org/wikipedia/commons/a/a2/SUGA_at_the_United_Nations_2021_%28cropped%29.png" assets/suga.png
download "https://upload.wikimedia.org/wikipedia/commons/0/0f/J-Hope_at_the_United_Nations_2021_%28cropped%29.png" assets/jhope.png
download "https://upload.wikimedia.org/wikipedia/commons/5/5d/Jimin_at_the_United_Nations_2021_%28cropped%29.png" assets/jimin.png
download "https://upload.wikimedia.org/wikipedia/commons/0/0e/V_at_the_United_Nations_2021_%28cropped%29.png" assets/v.png
download "https://upload.wikimedia.org/wikipedia/commons/9/95/Jungkook_at_the_United_Nations_2021_%28cropped%29.png" assets/jungkook.png

# Placeholder album covers (you can replace these with official covers)
download "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80" assets/map7.jpg || true
download "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" assets/be.jpg || true
download "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80" assets/tear.jpg || true

cat <<'INSTR'

Done. Images saved to assets/.

To add them to the repository (commit & push), run:

  git add assets/
  git commit -m "Add BTS portrait images"
  git push

Then open the site locally (python -m http.server 3000) or push to GitHub Pages.

INSTR
