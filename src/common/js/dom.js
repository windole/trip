import {classListSupport, datasetSupport} from '../js/compatible';
export function addClass(dom, className) {
    if (classListSupport) {
        // add方法会自动检测是否已经存在这个className
        dom.classList.add(className);
        return;
    }
    // 添加类名
    if (!hasClass(dom, className)) {
        dom.className += (' ' + className);
    }
    // 已经有了 什么都不错
    return;
};

export function hasClass(dom, className) {
    if (classListSupport) {
        return dom.classList.contains(className);
    }
    const reg = new RegExp('(^|\\s)' + className + '\\s|$');
    return reg.test(dom.ClassName);
};

export function dataAttribute(dom, key, value) {
    if (datasetSupport) {
        if (value) {
            dom.dataset[key] = value;
            return;
        } else {
            return dom.dataset[key];
        }
    } else {
        key = 'data-' + key;
        if (value) {
            dom.setAttribute(key, value);
            return;
        } else {
            return dom.getAttribute(key);
        }
    }
};

const vendor = (() => {
    let style = document.createElement('div').style;
    const transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransfrom',
        ms: 'msTransform',
        standard: 'transform'
    };
    const keys = Object.keys(transformNames);
    for (let i = 0, len = keys.length; i < len; i++) {
        const key = transformNames[keys[i]];
        if (typeof style[key] === 'string') {
            return keys[i];
        }
    }
    return false;
})();

export function prefixStyle(style) {
    if (vendor === false) {
        return false;
    }
    if (vendor === 'standard') {
        return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
