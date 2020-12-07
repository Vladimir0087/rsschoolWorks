function changeColorMenuBtn(selectorItems, posActive) {
    const colorBtn = document.querySelectorAll(selectorItems);
    colorBtn.forEach((btn) => {
        btn.classList.remove('active-color');
    });
    colorBtn[posActive].classList.add('active-color');
}

export default changeColorMenuBtn;
