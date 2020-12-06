function navigationBlock(elementToActive, classToShow) {
    elementToActive.classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');
    document.querySelector(classToShow).classList.toggle('show');
};

export default navigationBlock;