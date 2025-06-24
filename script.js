const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const likeBtn = document.getElementById('like');
const shuffleBtn = document.getElementById('shuffle');

let isShuffling = false;

likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('liked');
  likeBtn.textContent = likeBtn.classList.contains('liked') ? '❤️' : '🤍';
});

shuffleBtn.addEventListener('click', () => {
  isShuffling = !isShuffling;
  shuffleBtn.classList.toggle('active');
});

// Playlist
const songs = [
  {
    title: "Sunny",
    artist: "KODOMOi",
    file: "kodomoi-sunny.mp3"
  },
  {
    title: "Sapphire",
    artist: "Ed Sheeran",
    file: "Sapphire - (Raag.Fm).mp3"
  },
  {
    title: "Runaway",
    artist: "AURORA",
    file: "Aurora_-_Runaway_CeeNaija.com_.mp3"
  }
];

let currentSong = 0;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `Music/${song.file}`;
}

loadSong(currentSong);

let isPlaying = false;
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();

  // Animate play button
  playBtn.classList.add("animate");
  setTimeout(() => playBtn.classList.remove("animate"), 300);
});

nextBtn.addEventListener("click", () => {
  if (isShuffling) {
  let next;
  do {
    next = Math.floor(Math.random() * songs.length);
  } while (next === currentSong);
  currentSong = next;
} else {
  currentSong = (currentSong + 1) % songs.length;
}

  loadSong(currentSong);
  playSong();

  // Animate next button
  nextBtn.classList.add("animate");
  setTimeout(() => nextBtn.classList.remove("animate"), 300);
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();

  // Animate prev button
  prevBtn.classList.add("animate");
  setTimeout(() => prevBtn.classList.remove("animate"), 300);
});

// Volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Time + progress update
audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  const duration = audio.duration;

  progress.value = (current / duration) * 100;

  function formatTime(t) {
    const min = Math.floor(t / 60) || 0;
    const sec = Math.floor(t % 60) || 0;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  }

  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = isNaN(duration) ? "0:00" : formatTime(duration);
});

// Seek control
progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});
