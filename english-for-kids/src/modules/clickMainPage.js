function clickMainPage(func) {
    const Pages = document.querySelectorAll('.card-container-main');
    Pages.forEach((elem) => {
        const element = elem;
        element.onclick = (e) => {
            const numberIndex = Array.from(Pages).findIndex((item) => item === e.target.closest('.card-container-main')) + 1;
            func(numberIndex);
        };
    });
}

export default clickMainPage;
