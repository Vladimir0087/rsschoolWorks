function createDiv(className, parent) {
    const el = document.createElement('div');
    el.classList.add(className);
    parent.prepend(el);
    return el;
}
export default createDiv;
