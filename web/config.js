/*
* This is where you want to add your tips. They **MUST** be in this structure. You can
* have as many or little as you want. In each tooltip object, the `content` value also supports markdown
*
* A list of the markdown supported can be found on the docs
*/
export const LOADSCREEN_TIPS = [
  {
    title: "Bold Tip",
    content: "**This is just a bold tip. WOW its all bold!**"
  },
  {
    title: "Italics Tip",
    content: "*Wew, now its all in italics*"
  },
  {
    title: "Bold Italics",
    content: "***Lets now combine the best of both worlds! Lets use bold italics***"
  },
  {
    title: "Nice Tip 4",
    content: "Find our discord here"
  },
  {
    title: 'Markdown Render',
    content: '**This is bold**. But this is not.  [This is a link!](https://github.com/project-error/pe-basicloadscreen/#)'
  }
];

// How long a tip is on screen before we automatically
// go to the next one (ms)
export const TIP_CHANGE_INTERVAL = 10000

// How long we stay on a background until we
// go to the next one (ms)
export const BACKGROUND_CHANGE_INTERVAL = 5000

// An array of image files that are available in the `bg` folder
export const BACKGROUND_IMAGES = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg"
]

// Whether we should enable the cursor for the loadscreen
export const ENABLE_CURSOR = true

// Enable github flavored markdown
export const ENABLE_GFM_MARKDOWN = false