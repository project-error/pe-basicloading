<p align="center">
  <a href="https://projecterror.dev/" rel="noopener" target="_blank"><img width="150" src="https://i.tasoagc.dev/c1pD" alt="Material-UI logo"></a></p>
</p>
<h1 align="center">Project Error Basic Loading</h1>

<div align="center">
A very basic, yet still robust and extendable, loading screen.
</div>

<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/project-error/pe-basicloading/master/LICENSE)
![Discord](https://img.shields.io/discord/791854454760013827?label=Our%20Discord)
</div>

<div align="center">

   You can find a short preview video [here](https://i.imgur.com/aivxpfx.gifv) 
</div>

## Features
* Customizable tip section that can be switched through 
* Markdown support for tip section content. Also allows for navigation using the **Left** and **Right** arrow keys
* Customizable animated backgrounds that smoothly transition
* CSS/JS cursor implementation, allowing for its use while loading
* Special markdown link parsing allowing for users to click on markdown links that will open in the user's default browser

## Quick Start
1. Download the latest release from [here](https://github.com/project-error/pe-basicloading/releases/)
2. Unzip and drag the `pe-basicloading` folder into your `resources` directory
3. Add `ensure pe-basicloading` to your `server.cfg`

*Note: This resource uses the `MANUAL_SHUTDOWN` feature. You can learn more about that [here](https://docs.fivem.net/natives/?_0x1722C938)*

## Config Options

The config can be found in `web/config.js`. This holds a plethora of configuration options.

| Option | Description | Example
| --- | --- | --- |
| LOADSCREEN_TIPS | An array of `TipObjects` for displaying in the loading screen | [Here](https://github.com/project-error/pe-basicloading/blob/db5837df618a9d9fd6a4cd2a218bb91e81a359b7/web/config.js#L7)|
| TIP_CHANGE_INTERVAL  | The interval (ms) at which Tips change automatically | `TIP_CHANGE_INTERVAL = 12000` |
| BACKGROUND_CHANGE_INTERVAL | The interval (ms) at which backgrounds automatically switch | `BACKGROUND_CHANGE_INTERVAL = 15000` |
| BACKGROUND_IMAGES | An array of file names for images present in the `web/backgrounds` folder. | `BACKGROUND_IMAGES = ["1.jpg","2.jpg"]`
| ENABLE_GFM_MARKDOWN | Whether to enable the `Github Flavored Markdown` spec for the parser | `ENABLE_GFM_MARKDOWN = true`
| ENABLE_SERVER_LOGO | Whether to enable the server logo | `ENABLE_SERVER_LOGO = true`
| SERVER_LOGO_POSITION | Where to place logo if enabled | `SERVER_LOGO_POSITION = 'top-left'`
| SERVER_LOGO_FILE_NAME | The name of your logo file within "logo/" directory | `SERVER_LOGO_FILE_NAME = 'logo.png'`
| MUSIC_ENABLED | Enable loading music | `MUSIC_ENABLED = true `
| MUSIC_START_VOLUME | The volume for loading music (0 - 1.0) | `MUSIC_START_VOLUME = 0.5`
| MUSIC_FILE_NAME | The name of the music file to play in the "music/" folder | `MUSIC_FILE_NAME = 'music.mp3'`

## Customize

### Adding Backgrounds

Adding or replacing images is very simple.

1. First ensure that the image is in the `web/backgrounds` folder.
2. Then open the `web/config.js` file and add the exact filename for your image
   to the `BACKGROUND_IMAGES` array.

📁 **web/config.js**
```js
// An array of image files that are available in the `bg` folder
export const BACKGROUND_IMAGES = [
  "1.jpg", 
  "2.jpg", 
  "3.jpg", 
  "4.jpg", 
  "5.jpg", 
  "6.jpg", 
  "7.jpg", 
  "8.jpg",
  "YourNewImage.jpg"
]
```

### Adding Tips
This loadscreen employs dynamic tooltips as one of its main features. These are
defined in the `web/config.js` file under the `LOADSCREEN_TIPS` array.

The data structure of tooltips are fairly simple, they are defined with a `title`
and a `content` property. Here's a simple example.

```
{
    title: 'My Tooltip Title',
    content: 'This is the markdown compatible content that will be shown on screen'
}
```

**Markdown Compatible Content**

An important thing to note with **Tips** is that the content property is **markdown compatible**.
Meaning you can employ the same syntax that you might be comfortable with while for example using Discord.

**Structure in Config**
```
{
    title: 'Markdown Render',
    content: '**This is bold**. But this is not. [This is a link!](https://github.com/project-error/pe-basicloading/#)'
}
```
**Rendered Output**
![img](https://i.tasoagc.dev/SB6A)

The markdown parser utilized is fully compliant with the original `Markdown.pl` spec and around 60% compliant
with `CommonMarkdown` spec. `Github Flavored Markdown` can also be enabled in the `config.js`.

## Script Integration

This loading screen can be implemented directly into scripts easily. As a standalone script, it will wait 
for the `spawnPlayer` event to be triggered by spawnmanager before shutting down. If you wish to control its
behavior directly, use the following convars and exports

**Convars**

`pe-basicloading:disableAutoShutdown`
* Description: Controls whether script should auto shutdown loading on `playerSpawned` event
* Usage: `set pe-basicloading:disableAutoShutdown 1`

**Exports**

`shutdown`
* Description: Will shutdown the loading frame and cleanup.
* Usage: `exports["pe-basicloading"]:shutdown()`

## License
[Licensed under MIT](https://opensource.org/licenses/MIT)
