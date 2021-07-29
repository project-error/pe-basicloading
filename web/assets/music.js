import { MUSIC_ENABLED } from "../config.js";

let playing = false

export const startMusic = () => {
  const music = document.getElementById("loadscreen-music");
  if ( MUSIC_ENABLED ) {
    playing = true
    music.volume = 0.1;
    document.addEventListener('keypress', (event) => {
      switch (event.code) {
        case 'p':
          if (music.paused) music.play();
          else music.pause();
          break;
        case 'w':
          music.volume += 0.05;
          break;
        case 's':
          music.volume -= 0.05;
          break;
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