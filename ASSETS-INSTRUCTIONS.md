## Adding local images

To embed the official portraits into the site, run the included script `download-images.sh` from the repository root. It will download Wikimedia Commons portraits into `assets/` and placeholder album covers.

After running the script commit and push the `assets/` folder:

  chmod +x download-images.sh
  ./download-images.sh
  git add assets/
  git commit -m "Add BTS portrait images"
  git push

Once pushed, the site will use local image files and portraits should reliably appear everywhere (GitHub Pages and local servers).
