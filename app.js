// app.js — add audio playback behavior for songs
// Songs may include an audio property (local path or external URL). If absent we open a YouTube search.

const appData = {
  members: [
    { name: 'RM', role: 'Leader · Rapper', bio: 'The voice of BTS, known for sharp lyricism and powerful storytelling.', photo: 'images (1).jpg' },
    { name: 'Jin', role: 'Vocalist', bio: 'Warm, expressive, and iconic for his classic vocals and bright stage presence.', photo: 'images (2).jpg' },
    { name: 'Suga', role: 'Rapper · Producer', bio: 'A layered producer with a distinct sound and deeply personal lyrical style.', photo: 'images (3).jpg' },
    { name: 'J-Hope', role: 'Rapper · Dancer', bio: 'The spark that brings energy, movement, and unstoppable positivity to every stage.', photo: 'images (4).jpg' },
    { name: 'Jimin', role: 'Vocalist · Dancer', bio: 'Known for elegance, emotion, and choreography that instantly commands attention.', photo: 'images (5).jpg' },
    { name: 'V', role: 'Vocalist', bio: 'A voice with depth and a visual presence that feels timeless and unforgettable.', photo: 'images (6).jpg' },
    { name: 'Jungkook', role: 'Main Vocalist', bio: 'The all-rounder who blends power, charm, and versatility in every performance.', photo: 'images (7).jpg' }
  ],
  songs: [
    { title: 'Dynamite', album: 'Single', year: 2020, audio: 'assets/dynamite.mp3' },
    { title: 'Butter', album: 'Single', year: 2021, audio: 'assets/butter.mp3' },
    { title: 'Spring Day', album: 'You Never Walk Alone', year: 2017 },
    { title: 'Permission to Dance', album: 'Single', year: 2021 },
    { title: 'DNA', album: 'Love Yourself: Her', year: 2017 },
    { title: 'Black Swan', album: 'Map of the Soul: 7', year: 2020 }
  ],
  albums: [
    { title: 'Map of the Soul: 7', year: 2020, cover: 'images (8).jpg', blurb: 'A reflective, emotional chapter that explores identity and self-discovery.' },
    { title: 'Be', year: 2020, cover: 'images (9).jpg', blurb: 'A sincere collection centered on comfort, healing, and connection.' },
    { title: 'Love Yourself: Tear', year: 2018, cover: 'images (10).jpg', blurb: 'A cinematic album filled with emotional risk and powerful musical range.' }
  ],
  gallery: [
    { title: 'Fan Memory', description: 'A favorite BTS moment from the fandom archive.', photo: 'images (11).jpg' },
    { title: 'Concert Glow', description: 'The energy of live BTS performances.', photo: 'images (12).jpg' },
    { title: 'Army Love', description: 'A reminder of the connection between BTS and fans.', photo: 'images (13).jpg' }
  ]
};

// small helper
function $(sel){return document.querySelector(sel)}

const svgPlaceholder = encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>\n  <rect width='100%' height='100%' fill='%2311161a' />\n  <text x='50%' y='50%' fill='%23b2bece' font-size='36' font-family='Inter, Arial, sans-serif' dominant-baseline='middle' text-anchor='middle'>Image unavailable</text>\n</svg>`);

const renderMembers = () => {
  const membersList = $('#members-list');
  membersList.innerHTML = appData.members.map(member=>`
    <article class="member-card">
      <img src="${member.photo}" alt="${member.name}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${svgPlaceholder}';" />
      <div class="member-card-body"><h3>${member.name}</h3><div class="member-role">${member.role}</div><p>${member.bio}</p></div>
    </article>
  `).join('');
};

const renderSongs = () => {
  const songsList = $('#songs-list');
  songsList.innerHTML = appData.songs.map((song, i)=>`
    <div class="song-item" data-index="${i}" tabindex="0">
      <div>
        <strong>${song.title}</strong><br /><span>${song.album}</span>
      </div>
      <div class="song-action">
        <button class="play-btn" data-index="${i}">${song.audio? 'Play':'Listen'}</button>
        <span class="song-year">${song.year||''}</span>
      </div>
    </div>
  `).join('');

  // attach handlers
  document.querySelectorAll('.song-item').forEach(item=>{
    item.addEventListener('click', ()=>{
      const idx = Number(item.dataset.index);
      playSongByIndex(idx);
    });
    item.addEventListener('keydown',(e)=>{ if(e.key==='Enter') item.click(); });
  });
  document.querySelectorAll('.play-btn').forEach(btn=>btn.addEventListener('click', (e)=>{ e.stopPropagation(); const i=Number(btn.dataset.index); playSongByIndex(i); }));
};

const renderAlbums = () => {
  const albums = $('#albums-list');
  albums.innerHTML = appData.albums.map(album=>`
    <article class="album-card">
      <img src="${album.cover}" alt="${album.title}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${svgPlaceholder}';" />
      <div class="album-card-body"><h3>${album.title}</h3><div class="album-meta">${album.year}</div><p>${album.blurb}</p></div>
    </article>
  `).join('');
};

const renderGallery = () => {
  const gallery = $('#gallery-grid');
  gallery.innerHTML = appData.gallery.map(item=>`
    <article class="member-card gallery-card">
      <img src="${item.photo}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${svgPlaceholder}';" />
      <div class="member-card-body"><h3>${item.title}</h3><p>${item.description}</p></div>
    </article>
  `).join('');
};

// Audio player logic
const audio = $('#audio-player');
const nowPlaying = $('#now-playing');

function playSongByIndex(i){
  const song = appData.songs[i];
  if(!song) return;
  if(song.audio){
    // load and play
    if(audio.src.endsWith(song.audio) || audio.src.includes(encodeURI(song.audio))){
      // toggle play/pause
      if(audio.paused) audio.play(); else audio.pause();
    } else {
      audio.src = song.audio;
      audio.play().catch(err=>{
        console.warn('Play failed',err);
        alert('Unable to play the selected track (browser restrictions or missing file).');
      });
    }
    $('#player').setAttribute('aria-hidden','false');
    nowPlaying.textContent = `Playing: ${song.title}`;
  } else {
    // fallback: open YouTube search for the song
    const q = encodeURIComponent(song.title + ' BTS official audio');
    window.open(`https://www.youtube.com/results?search_query=${q}`,'_blank');
  }
}

// Pause handling: update UI when audio pauses/ends
audio.addEventListener('pause', ()=>{ nowPlaying.textContent = 'Paused'; });
audio.addEventListener('ended', ()=>{ nowPlaying.textContent = 'Finished'; });

const renderLocalChat = () => {
  const chatArea = $('#chat-area');
  const storageKey = 'bts-fanpage-local-chat';
  const messages = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
  chatArea.innerHTML = `
    <div class="chat-box">
      <div class="chat-messages">
        ${ messages.length ? messages.map(msg=>`<div class="chat-message"><strong>${escapeHtml(msg.name)}</strong><small>${new Date(msg.time).toLocaleTimeString()}</small><div>${escapeHtml(msg.text)}</div></div>`).join('') : '<div class="chat-message"><strong>Notice</strong><div>No messages yet — be the first ARMY to post.</div></div>' }
      </div>
      <form class="chat-form" id="chat-form">
        <input type="text" id="chat-name" placeholder="Your name" maxlength="20" required />
        <input type="text" id="chat-text" placeholder="Share your BTS thoughts" maxlength="180" required />
        <button type="submit">Send</button>
      </form>
    </div>
  `;
  const form = document.getElementById('chat-form');
  form.addEventListener('submit',(e)=>{ e.preventDefault(); const name = $('#chat-name').value.trim(); const text = $('#chat-text').value.trim(); if(!name||!text) return; const next=[...messages,{name,text,time:Date.now()}]; sessionStorage.setItem(storageKey,JSON.stringify(next)); renderLocalChat(); });
};

const renderFirebaseNotice = ()=>{ const chatArea=$('#chat-area'); chatArea.innerHTML=`<div class="helper-card"><strong>Firebase chat setup</strong><div>This demo includes a Firebase scaffold for future integration. Add your Firebase config to the project and enable Firestore or Realtime Database.</div><div><code>chat/chat-firebase/firebase-chat.js</code></div></div>` };
const renderIssuesNotice = ()=>{ const chatArea=$('#chat-area'); chatArea.innerHTML=`<div class="helper-card"><strong>GitHub Issues chat</strong><div>Create a GitHub issue for the fan discussion thread and let fans comment there. This keeps the community discussion open without a custom backend.</div><div><code>chat/chat-github-issues.md</code></div></div>` };

function escapeHtml(v){return v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;')}

const initChat = ()=>{ const buttons=document.querySelectorAll('.mode-btn'); buttons.forEach(b=>b.addEventListener('click',()=>{ buttons.forEach(x=>x.classList.remove('active')); b.classList.add('active'); const mode=b.dataset.mode; if(mode==='local') renderLocalChat(); if(mode==='firebase') renderFirebaseNotice(); if(mode==='issues') renderIssuesNotice(); })); renderLocalChat(); };

const init = ()=>{ renderMembers(); renderSongs(); renderAlbums(); renderGallery(); initChat(); };
init();
