/**
 * get Site Icon from window
 * @param {*} window
 * @returns
 */
let fallbackMessageCounter = 0;

function leftPadHex(value: string, length: number): string {
  const padding = "0000000000000000";
  return (padding + value).slice(-length);
}

function formatUuidFromBytes(bytes: Uint8Array): string {
  const hex: string[] = [];
  for (let index = 0; index < bytes.length; index++) {
    hex.push(leftPadHex(bytes[index].toString(16), 2));
  }

  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

export function createMessageId(): string {
  const cryptoObject = typeof window !== "undefined" ? window.crypto : undefined;

  if (cryptoObject?.randomUUID) return cryptoObject.randomUUID();

  if (cryptoObject?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoObject.getRandomValues(bytes);

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    return formatUuidFromBytes(bytes);
  }

  fallbackMessageCounter = (fallbackMessageCounter + 1) % 0x100000000;
  const timestamp = Date.now();
  const randomSeed = Math.floor(Math.random() * 0xffffffff);
  const bytes = new Uint8Array(16);

  for (let index = 0; index < bytes.length; index++) {
    const timestampByte = Math.floor(timestamp / Math.pow(0x100, index % 6)) % 0x100;
    const counterByte = Math.floor(fallbackMessageCounter / Math.pow(0x100, index % 4)) % 0x100;
    const randomByte = Math.floor(randomSeed / Math.pow(0x100, (index + 1) % 4)) % 0x100;
    const mixedByte = timestampByte ^ counterByte ^ randomByte ^ Math.floor(Math.random() * 0x100);

    bytes[index] = mixedByte;
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return formatUuidFromBytes(bytes);
}

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
  const normalized = typeof num === "number" ? String(num) : num.trim();
  return normalized !== "" && !isNaN(Number(normalized));
}