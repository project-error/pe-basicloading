import { MUSIC_ENABLED } from "../config.js";

let playing = false

export const startMusic = () => {
  const music = document.getElementById("loadscreen-music");
  if ( MUSIC_ENABLED ) {
    playing = true
    music.volume = 0.1;
    document.addEventListener('keypress', (event) => {
      if(event.key == "p") {
        if(music.paused) {
          music.play();
        }else{
          music.pause();
        }
      }else if(event.key == "s") {
        music.volume = music.volume-0.05;
      }else if(event.key == "w") {
        music.volume = music.volume+0.05;
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