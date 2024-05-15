/**
 * get Site Icon from window
 * @param {*} window
 * @returns
 */
export function getSiteIcon(windowObject: typeof window) {
  const { document } = windowObject;

  const web_icons = document.querySelectorAll('head > link[rel~="icon"]');
  const web_touch_icons = document.querySelectorAll(
    'head > link[rel~="apple-touch-icon"]'
  );
  const touch_list = [];
  const icon_list = [];
  // @ts-ignore
  for (const icon of web_touch_icons) {
    if (icon) {
      touch_list.push({
        size: icon.sizes?.value || "0",
        href: icon.href,
      });
    }
  }
  const touch_max = touch_list.length > 0 ? getMaxSizeIcon(touch_list) : null;
  // @ts-ignore
  for (const icon of web_icons) {
    if (icon) {
      icon_list.push({
        size: icon.sizes?.value || "0",
        href: icon.href,
      });
    }
  }

  const icon_max = icon_list.length > 0 ? getMaxSizeIcon(icon_list) : null;
  if (touch_max || icon_max) {
    const list = [];
    if (icon_max) {
      list.push(icon_max);
    }
    if (touch_max) {
      list.push(touch_max);
    }
    const biggerIcon = getMaxSizeIcon(list);
    return biggerIcon.href;
  }
  return "";
}

function getIconSize(sizes: string) {
  let size = 0;
  let sizeTemp;
  if (sizes.indexOf("x") !== -1) {
    sizeTemp = sizes.split("x")[0];
    if (isNumber(sizeTemp)) {
      size = +sizeTemp;
    }
  } else {
    if (isNumber(sizes)) {
      size = +sizes;
    }
  }
  return size;
}

type ICONItemProps ={
  size:string,
  href:string
}
function getMaxSizeIcon(list: ICONItemProps[]):ICONItemProps {
  let maxItem = list[list.length - 1];
  let maxSize = getIconSize(maxItem.size);
  for (let index = 0; index < list.length; index++) {
    const iconItem = list[index];
    if (iconItem.size) {
      const size = getIconSize(iconItem.size);
      if(isGt(size,maxSize)){
        maxItem = iconItem;
        maxSize = size;
      }
    }
  }
  return maxItem;
}

function isGt(x: number|string,y:number|string):boolean {
  return +x > +y;
}
function isNumber(num: number|string):boolean {
  return num === +num;
}