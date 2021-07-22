import { MUSIC_ENABLED, MUSIC_FILE_NAME, MUSIC_VOLUME } from "../config.js";

let currentSound;

const relativePath = new URL('./music', window.location).toString()

const musicPath = `${relativePath}/${MUSIC_FILE_NAME}`

export const startMusic = () => {
  const howlInst = new Howl({
    src: musicPath,
    preload: true,
    autoplay: true,
    html5: true,
    loop: true,
    volume: MUSIC_VOLUME,
  })
  currentSound = howlInst
  howlInst.fade(0.0, MUSIC_VOLUME, 1000)
}

export const stopMusic = () => {
  // sanity
  if (!currentSound) throw new Error('Howl instance did not exist')

  currentSound.fade(MUSIC_VOLUME, 0.0, 1000)
  currentSound.unload()
}