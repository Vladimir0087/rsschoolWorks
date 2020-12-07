import navigationBlock from './navigation';
import cards from './cards';

function renderMenu(block, rendMainPage, rendStatistics, rendPages, burg) {
    block.forEach((el) => {
        const element = el;
        element.onclick = (e) => {
            e.preventDefault();
            if (document.querySelector('.popup').classList.contains('show')) {
                navigationBlock(burg, '.popup');
            }

            if (e.target.innerHTML === 'Main page') {
                rendMainPage();
                return;
            } if (e.target.innerHTML === 'Statistics') {
                rendStatistics();
            } else {
                const numberIndex = cards[0].findIndex((item) => item === e.target.innerHTML) + 1;
                rendPages(numberIndex);
            }
        };
    });
}

export default renderMenu;
