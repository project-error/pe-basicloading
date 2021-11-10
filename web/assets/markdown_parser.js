import { ENABLE_GFM_MARKDOWN, LOADSCREEN_TIPS } from "../config.js";
import { cleanUrl } from "./utils.js";

window.__openUrl = (url) => window.invokeNative ? window.invokeNative('openUrl', url) : window.open(url)

const renderer = {
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    // let out = `<a href="${escape(href)}"`;
    let out = `<a`
    if (title) {
      out += ` title="${title}"`;
    }
    // NUI Specific
    out += ` onclick="window.__openUrl('${href}')"`
    out += `>${text}</a>`;
    return out;
  }
}

marked.use({ renderer })

marked.setOptions({
  gfm: ENABLE_GFM_MARKDOWN
})

export const parsedMdTips = LOADSCREEN_TIPS.map(({title, content}) => {
  const rendered = window.marked.parse(content)
  return {title, content: rendered}
})
