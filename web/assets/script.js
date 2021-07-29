import {
  TIP_CHANGE_INTERVAL,
  BACKGROUND_CHANGE_INTERVAL,
  BACKGROUND_IMAGES,
  ENABLE_CURSOR,
  SERVER_LOGO_POSITION,
  ENABLE_SERVER_LOGO,
  MUSIC_ENABLED, SERVER_LOGO_FILE_NAME
} from '../config.js'

import { parsedMdTips } from "./markdown_parser.js";
import {startMusic, stopMusic} from "./music.js";

/**
 * @typedef {Object} TooltipObject
 * @property {string} title - The title of the tooltip
 * @property {string} content - The HTML contents
 **/

const headerEl = $('#tip-header')
const contentEl = $('#tip-content')
const hintHelpTxtEl = $('#hint-help-text')
const containerEL = $('#page-wrapper')
const bgImgEl = $('#bgImg')
const spinnerEl = $('#spinner')
const logoEl = $('#server-logo')


// We store the current tipInterval if any here
let tipInterval = null

// We store the current tipIndex here
let currentTipIndex

/**
 * Set the current tooltip
 * @param tooltipObj {TooltipObject} - The tooltip object
 * @param index {number} - The array index for this particular tooltip object
 **/
const setCurrentTip = ({title, content}, index) => {
  headerEl.fadeOut("fast", () => {
    headerEl.html(title)
    headerEl.fadeIn("fast")
  })
  contentEl.fadeOut("fast", () => {
    contentEl.html(content)
    contentEl.fadeIn("fast")
  })
  hintHelpTxtEl.text(`Browse Tips ${index + 1}/${parsedMdTips.length}`)
  currentTipIndex = index

  if (tipInterval) {
    clearInterval(tipInterval)
  }

  tipInterval = setInterval(() => showNextTip(), TIP_CHANGE_INTERVAL)
}

/**
 * Handle the left arrow "prev" tooltip
 **/
const showPrevTip = () => {
  const prevTipIdx = currentTipIndex - 1
  const finalTipIdx = parsedMdTips.length - 1

  clearInterval(tipInterval)

  if (prevTipIdx < 0) {
    const tipObj = parsedMdTips[finalTipIdx]
    setCurrentTip(tipObj, finalTipIdx)
  } else {
    const tipObj = parsedMdTips[prevTipIdx]
    setCurrentTip(tipObj, prevTipIdx)
  }
}

/**
 * Handle the right arrow "next" tooltip
 **/
const showNextTip = () => {
  const nextTipIdx = currentTipIndex + 1

  if (nextTipIdx > parsedMdTips.length - 1) {
    const tipObj = parsedMdTips[0]
    setCurrentTip(tipObj, 0)
  } else {
    const tipObj = parsedMdTips[nextTipIdx]
    setCurrentTip(tipObj, nextTipIdx)
  }
}

/**
 * Find random tooltip and set it as current
 **/
const setRandomTip = () => {
  const randomTipIndex = Math.floor(Math.random() * parsedMdTips.length)
  const randomTipObj = parsedMdTips[randomTipIndex]
  setCurrentTip(randomTipObj, randomTipIndex)
}

/**
 * Shutdowns and cleanups loading frame
 **/
const cleanupLoadingScreen = () => {
  containerEL.fadeOut('slow')
  if (MUSIC_ENABLED) stopMusic();
}

let currentBgIdx = 0

/**
 * Start the interval for background changes
 **/
const startBackgroundInterval = () => {
  setInterval(() => {

    const nextImgIdx = currentBgIdx + 1
    const imgIdx = (nextImgIdx > BACKGROUND_IMAGES.length - 1) ? 0 : nextImgIdx

    const bgFileName = BACKGROUND_IMAGES[imgIdx]

    bgImgEl.css("background-image", `url(backgrounds/${bgFileName})`)

    currentBgIdx = imgIdx
  }, BACKGROUND_CHANGE_INTERVAL)
}

/*
  Set Initial element class for server logo placement
*/
const setupServerLogo = () => {
  if (!ENABLE_SERVER_LOGO) return;
  const logoLocation = `./logo/${SERVER_LOGO_FILE_NAME}`
  logoEl.css('background', `url(${logoLocation})`)
  logoEl.css('background-size', 'contain')
  logoEl.css('visibility', 'visible')
  logoEl.addClass(SERVER_LOGO_POSITION)
}

/* Listeners */

window.addEventListener('DOMContentLoaded', () => {
  startBackgroundInterval()
  setRandomTip()
  setupServerLogo()
  spinnerEl.fadeIn()
  startMusic()
})

window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') {
    showPrevTip()
  } else if (e.code === 'ArrowRight') {
    showNextTip()
  }
})

window.addEventListener('message', (e) => {
  // This is the shutdown message that is sent by client script
  if (e.data.fullyLoaded) {
    cleanupLoadingScreen()
  }
})

// Setup left and right click handlers
const leftArrow = document.getElementById('tip-left-arrow')
const rightArrow = document.getElementById('tip-right-arrow')

leftArrow.addEventListener('click', showPrevTip)
rightArrow.addEventListener('click', showNextTip)

if (ENABLE_CURSOR) {
  const cursor = document.getElementById('cursor')

  cursor.style.visibility = 'visible'

  window.addEventListener("mousemove", e => {
    // These offsets are related to the size of the SVG
    // for now this is fine
    const x = e.pageX - cursor.offsetWidth + 20
    const y = e.pageY - 2

    cursor.style.left = `${x}px`
    cursor.style.top = `${y}px`
  })

}