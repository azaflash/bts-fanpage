const appData = {
  members: [
    {
      name: 'RM',
      role: 'Leader · Rapper',
      bio: 'The voice of BTS, known for sharp lyricism and powerful storytelling.',
      photo: 'images (1).jpg'
    },
    {
      name: 'Jin',
      role: 'Vocalist',
      bio: 'Warm, expressive, and iconic for his classic vocals and bright stage presence.',
      photo: 'images (2).jpg'
    },
    {
      name: 'Suga',
      role: 'Rapper · Producer',
      bio: 'A layered producer with a distinct sound and deeply personal lyrical style.',
      photo: 'images (3).jpg'
    },
    {
      name: 'J-Hope',
      role: 'Rapper · Dancer',
      bio: 'The spark that brings energy, movement, and unstoppable positivity to every stage.',
      photo: 'images (4).jpg'
    },
    {
      name: 'Jimin',
      role: 'Vocalist · Dancer',
      bio: 'Known for elegance, emotion, and choreography that instantly commands attention.',
      photo: 'images (5).jpg'
    },
    {
      name: 'V',
      role: 'Vocalist',
      bio: 'A voice with depth and a visual presence that feels timeless and unforgettable.',
      photo: 'images (6).jpg'
    },
    {
      name: 'Jungkook',
      role: 'Main Vocalist',
      bio: 'The all-rounder who blends power, charm, and versatility in every performance.',
      photo: 'images (7).jpg'
    }
  ],
  songs: [
    { title: 'Dynamite', album: 'Single', year: 2020 },
    { title: 'Butter', album: 'Single', year: 2021 },
    { title: 'Spring Day', album: 'You Never Walk Alone', year: 2017 },
    { title: 'Permission to Dance', album: 'Single', year: 2021 },
    { title: 'DNA', album: 'Love Yourself: Her', year: 2017 },
    { title: 'Black Swan', album: 'Map of the Soul: 7', year: 2020 }
  ],
  albums: [
    {
      title: 'Map of the Soul: 7',
      year: 2020,
      cover: 'images (8).jpg',
      blurb: 'A reflective, emotional chapter that explores identity and self-discovery.'
    },
    {
      title: 'Be',
      year: 2020,
      cover: 'images (9).jpg',
      blurb: 'A sincere collection centered on comfort, healing, and connection.'
    },
    {
      title: 'Love Yourself: Tear',
      year: 2018,
      cover: 'images (10).jpg',
      blurb: 'A cinematic album filled with emotional risk and powerful musical range.'
    }
  ]
};

const svgPlaceholder = encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
  <rect width='100%' height='100%' fill='%2311161a' />
  <text x='50%' y='50%' fill='%23b2bece' font-size='36' font-family='Inter, Arial, sans-serif' dominant-baseline='middle' text-anchor='middle'>Image unavailable</text>
</svg>`);

const renderMembers = () => {
  const membersList = document.getElementById('members-list');

  membersList.innerHTML = appData.members
    .map(
      (member) => `
        <article class="member-card">
          <img src="${member.photo}" alt="${member.name}" loading="eager" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${svgPlaceholder}';console.warn('Image failed to load for: ${member.name}');" />
          <div class="member-card-body">
            <h3>${member.name}</h3>
            <div class="member-role">${member.role}</div>
            <p>${member.bio}</p>
          </div>
        </article>
      `
    )
    .join('');
};

const renderSongs = () => {
  const songsList = document.getElementById('songs-list');

  songsList.innerHTML = appData.songs
    .map(
      (song) => `
        <div class="song-item">
          <div>
            <strong>${song.title}</strong><br />
            <span>${song.album}</span>
          </div>
          <span>${song.year}</span>
        </div>
      `
    )
    .join('');
};

const renderAlbums = () => {
  const albums = document.getElementById('albums-list');

  albums.innerHTML = appData.albums
    .map(
      (album) => `
        <article class="album-card">
          <img src="${album.cover}" alt="${album.title}" loading="eager" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${svgPlaceholder}';console.warn('Album cover failed to load: ${album.title}');" />
          <div class="album-card-body">
            <h3>${album.title}</h3>
            <div class="album-meta">${album.year}</div>
            <p>${album.blurb}</p>
          </div>
        </article>
      `
    )
    .join('');
};

const renderLocalChat = () => {
  const chatArea = document.getElementById('chat-area');
  const storageKey = 'bts-fanpage-local-chat';

  const messages = JSON.parse(sessionStorage.getItem(storageKey) || '[]');

  chatArea.innerHTML = `
    <div class="chat-box">
      <div class="chat-messages">
        ${
          messages.length
            ? messages
                .map(
                  (msg) => `
                    <div class="chat-message">
                      <strong>${escapeHtml(msg.name)}</strong>
                      <small>${new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                      <div>${escapeHtml(msg.text)}</div>
                    </div>
                  `
                )
                .join('')
            : '<div class="chat-message"><strong>Notice</strong><div>No messages yet — be the first ARMY to post.</div></div>'
        }
      </div>
      <form class="chat-form" id="chat-form">
        <input type="text" id="chat-name" placeholder="Your name" maxlength="20" required />
        <input type="text" id="chat-text" placeholder="Share your BTS thoughts" maxlength="180" required />
        <button type="submit">Send</button>
      </form>
    </div>
  `;

  const form = document.getElementById('chat-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('chat-name').value.trim();
    const text = document.getElementById('chat-text').value.trim();

    if (!name || !text) return;

    const nextMessages = [...messages, { name, text, time: Date.now() }];
    sessionStorage.setItem(storageKey, JSON.stringify(nextMessages));
    renderLocalChat();
  });
};

const renderFirebaseNotice = () => {
  const chatArea = document.getElementById('chat-area');
  chatArea.innerHTML = `
    <div class="helper-card">
      <strong>Firebase chat setup</strong>
      <div>
        This demo includes a Firebase scaffold for future integration. Add your Firebase config to the project and enable Firestore or Realtime Database.
      </div>
      <div><code>chat/chat-firebase/firebase-chat.js</code></div>
    </div>
  `;
};

const renderIssuesNotice = () => {
  const chatArea = document.getElementById('chat-area');
  chatArea.innerHTML = `
    <div class="helper-card">
      <strong>GitHub Issues chat</strong>
      <div>
        Create a GitHub issue for the fan discussion thread and let fans comment there. This keeps the community discussion open without a custom backend.
      </div>
      <div><code>chat/chat-github-issues.md</code></div>
    </div>
  `;
};

const escapeHtml = (value) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const initChat = () => {
  const buttons = document.querySelectorAll('.mode-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const mode = button.dataset.mode;
      if (mode === 'local') renderLocalChat();
      if (mode === 'firebase') renderFirebaseNotice();
      if (mode === 'issues') renderIssuesNotice();
    });
  });

  renderLocalChat();
};

const init = () => {
  renderMembers();
  renderSongs();
  renderAlbums();
  initChat();
};

init();
