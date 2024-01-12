/**
 * get Site Icon from window
 * @param {*} window
 * @returns
 */
export function getSiteIcon(windowObject) {
    var _a, _b;
    var document = windowObject.document;
    var web_icons = document.querySelectorAll('head > link[rel~="icon"]');
    var web_touch_icons = document.querySelectorAll('head > link[rel~="apple-touch-icon"]');
    var touch_list = [];
    var icon_list = [];
    // @ts-ignore
    for (var _i = 0, web_touch_icons_1 = web_touch_icons; _i < web_touch_icons_1.length; _i++) {
        var icon = web_touch_icons_1[_i];
        if (icon) {
            touch_list.push({
                size: ((_a = icon.sizes) === null || _a === void 0 ? void 0 : _a.value) || "0",
                href: icon.href,
            });
        }
    }
    var touch_max = touch_list.length > 0 ? getMaxSizeIcon(touch_list) : null;
    // @ts-ignore
    for (var _c = 0, web_icons_1 = web_icons; _c < web_icons_1.length; _c++) {
        var icon = web_icons_1[_c];
        if (icon) {
            icon_list.push({
                size: ((_b = icon.sizes) === null || _b === void 0 ? void 0 : _b.value) || "0",
                href: icon.href,
            });
        }
    }
    var icon_max = icon_list.length > 0 ? getMaxSizeIcon(icon_list) : null;
    if (touch_max || icon_max) {
        var list = [];
        if (icon_max) {
            list.push(icon_max);
        }
        if (touch_max) {
            list.push(touch_max);
        }
        var biggerIcon = getMaxSizeIcon(list);
        return biggerIcon.href;
    }
    return null;
}
function getIconSize(sizes) {
    var size = 0;
    var sizeTemp;
    if (sizes.indexOf("x") !== -1) {
        sizeTemp = sizes.split("x")[0];
        if (isNumber(sizeTemp)) {
            size = +sizeTemp;
        }
    }
    else {
        if (isNumber(sizes)) {
            size = +sizes;
        }
    }
    return size;
}
function getMaxSizeIcon(list) {
    var maxItem = list[list.length - 1];
    var maxSize = getIconSize(maxItem.size);
    for (var index = 0; index < list.length; index++) {
        var iconItem = list[index];
        if (iconItem.size) {
            var size = getIconSize(iconItem.size);
            if (isGt(size, maxSize)) {
                maxItem = iconItem;
                maxSize = size;
            }
        }
    }
    return maxItem;
}
function isGt(x, y) {
    return +x > +y;
}
function isNumber(num) {
    return num === +num;
}
