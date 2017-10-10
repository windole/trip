export const classListSupport = classListSupport || (function () {
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    const support = dom.classList;
    document.body.removeChild(dom);
    if (support != null) {
        return true;
    }
    return false;
})();

export const datasetSupport = datasetSupport || (function () {
    const dom = document.createElement('div');
    dom.setAttribute('data-test', 'test');
    document.body.appendChild(dom);
    const result = typeof dom.dataset.test === 'string';
    document.body.removeChild(dom);
    return result;
})();
