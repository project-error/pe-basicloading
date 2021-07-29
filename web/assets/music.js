import { MUSIC_ENABLED } from "../config.js";

let playing = false

export const startMusic = () => {
  const music = document.getElementById("loadscreen-music");
  if ( MUSIC_ENABLED ) {
    playing = true
    music.volume = 0.1;
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
}

export const stopMusic = () => {
  const music = document.getElementById("loadscreen-music");
  if ( playing ) {
    music.pause()
  }
}