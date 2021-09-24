import {
  MUSIC_ENABLED,
  MUSIC_FILE_NAME,
  MUSIC_START_VOLUME,
  SERVER_LOGO_POSITION,
  ENABLE_SERVER_LOGO
} from "../config.js";

const music = document.getElementById("loadscreen-music");
const musicControls = document.getElementById("audio-controls")
const validLocations = ['top-left', "top-right", 'bottom-right']

// Make sure we don't overlap with the logo option
const determineMusicLocation = () => {
  if (!ENABLE_SERVER_LOGO) {
    musicControls.classList.add('top-left')
  } else {

    for (const location of validLocations) {
      if (SERVER_LOGO_POSITION === location) continue;
      musicControls.classList.add(location)
      break;
    }
  }
}

// Will toggle location logic and opacity
const showMusicControls = () => {
  determineMusicLocation()
  musicControls.style.opacity = '100';
}

// Basic function for starting music
export const startMusic = () => {
  if (!MUSIC_ENABLED) return;

  showMusicControls();

  // Setup music volume
  music.src = `music/${MUSIC_FILE_NAME}`;
  music.volume = MUSIC_START_VOLUME;

  document.addEventListener('keypress', (event) => {
    switch (event.key) {
      case 'p':
        if (music.paused) music.play();
        else music.pause();
        break;
      case 'w': {
        const wantedNewVol = music.volume + 0.05
        if (wantedNewVol > 1) return;
        music.volume = wantedNewVol;
        break;
      }
      case 's': {
        const wantedNewVol = music.volume - 0.05;
        if (wantedNewVol < 0) return;
        music.volume = wantedNewVol
        break;
      }
    }
  });
}

export const stopMusic = () => {
  if (!music.paused) music.pause()
  musicControls.opacity = '0'
}