function createElement(element, className, parent) {
    const el = document.createElement(element);
    el.classList.add(className);
    parent.append(el);
    return el;
};

export default createElement;