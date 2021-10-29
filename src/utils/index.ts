/**
 * get Site Icon from window
 * @param {*} window
 * @returns
 */
export function getSiteIcon (window: Window) {
  const document = window.document
  // Use the site's favicon if it exists
  const shortcutIcon: HTMLLinkElement = document.querySelector('head > link[rel="shortcut icon"]')
  if (shortcutIcon) {
    return shortcutIcon.href
  }
  // Search through available icons in no particular order
  const icon = Array.prototype.slice.call(document.querySelectorAll('head > link[rel="icon"]')).find((icon:HTMLLinkElement) => Boolean(icon.href))
  if (icon) {
    return icon.href
  }

  return null
}