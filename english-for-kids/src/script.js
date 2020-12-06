import cards from './modules/cards.js';
import shuffle from './modules/shuffle.js';
import navigationBlock from './modules/navigation.js';
import getLocalData from './modules/getLocalData.js';
import createElement from './modules/createElement.js';
import changeColorMenuBtn from './modules/changeColorMenuBtn.js';

const main = document.querySelector('main');
let sound = true;
let playModeOn = false;
let startGuessing = false;

let train = getLocalData('train');
let trueAnswers = getLocalData('trueAnswers');
let falseAnswers = getLocalData('falseAnswers');

const burger = document.querySelector('#menu__toggle');
burger.onclick = (e) => {
    navigationBlock(burger, '.popup')
};
document.querySelector('.popup').onclick = (e) => {
    if (document.querySelector('.popup').classList.contains('show')) {
        navigationBlock(burger, '.popup')
    }
};

function renderMainPage() {
    changeColorMenuBtn('.menu__item', 0);

    if (document.querySelector('.wrapper-card-container-main')) {
        document.querySelector('.wrapper-card-container-main').remove();
    }
    let cardWrapper = createElement('div', 'wrapper-card-container-main', main);
    let titlePageMain = createElement('div', 'titlePage', cardWrapper);
    titlePageMain.classList.add('marginTitleMain');
    titlePageMain.innerHTML = "Main Page";
    let i = 0;
    cards[0].forEach((el) => {
        let cardContainer = createElement('div', 'card-container-main', cardWrapper);
        let card = createElement('div', 'card-mainPage', cardContainer);

        let cardImage = createElement('div', 'card-main-img', card);
        let cardName = createElement('div', 'card-main-name', card);
        cardImage.style.backgroundImage = `url('assets/img/${cards[0][i]}.jpg')`;
        cardName.innerHTML = cards[0][i];
        i++;
    });

    clickMainPage();

    let playGame = document.querySelector('.switch-input');
    playGame.onclick = (e) => {
        sound = !sound;
        playModeOn = !playModeOn;
        document.querySelectorAll('.card-mainPage').forEach((el) => {
            el.classList.toggle('playModeMainCards');
        });
    };

    if (playModeOn) {
        document.querySelectorAll('.card-mainPage').forEach((el) => {
            el.classList.toggle('playModeMainCards');
        });
    };
};

renderMainPage();

function clickMainPage() {
    const Pages = document.querySelectorAll('.card-container-main');
    Pages.forEach((elem) => {
        elem.onclick = (e) => {
            let numberIndex = Array.from(Pages).findIndex(item => item === e.target.closest('.card-container-main')) + 1;
            renderPages(numberIndex);
        };
    });
}

function renderPages(index) {
    changeColorMenuBtn('.menu__item', index);

    if (document.querySelector('.wrapper-card-container-main')) {
        document.querySelector('.wrapper-card-container-main').remove();
    }
    let cardWrapper = createElement('div', 'wrapper-card-container-main', main);
    let titlePage = createElement('div', 'titlePage', cardWrapper);
    titlePage.innerHTML = cards[0][index - 1];
    let ratingString = createElement('div', 'rating', cardWrapper);
    ratingString.classList.add('unvisible');


    let i = 0;
    cards[index].forEach((el) => {
        let cardContainer = createElement('div', 'card-container-main', cardWrapper);
        let card = createElement('div', 'card-main', cardContainer);
        let cardback = createElement('div', 'card-main-back', cardContainer);
        let cardImage = createElement('div', 'card-main-image', card);
        let cardImageback = createElement('div', 'card-main-image', cardback);
        let cardName = createElement('div', 'card-main-name', card);
        let cardNameback = createElement('div', 'card-main-name', cardback);
        cardImage.style.backgroundImage = `url('${cards[index][i].image}')`;
        cardName.innerHTML = cards[index][i].word;
        cardImageback.style.backgroundImage = `url('${cards[index][i].image}')`;
        cardNameback.innerHTML = cards[index][i].translation;

        const audio = new Audio(cards[index][i].audioSrc);
        const rotate = createElement('div', 'card-rotate', card);

        cardContainer.onclick = (e) => {
            if (sound) {
                audio.play();
            };
        };

        card.onclick = (e) => {
            if (!playModeOn) {
                let word = e.target.closest('.card-container-main').children[1].children[1].innerHTML;
                train.push(word);
                localStorage.setItem('train', JSON.stringify(train));
            }
        }

        rotate.onclick = (e) => {
            audio.play();
            sound = !sound;
            card.classList.add('translate');
            cardback.classList.add('translateback');

            cardContainer.onmouseleave = (e) => {
                if (card.classList.contains('translate')) {
                    card.classList.remove('translate');
                    cardback.classList.remove('translateback');
                    if (!sound) {
                        sound = !sound;
                    }
                };
            };
        };
        i++;
    });

    let playGame = document.querySelector('.switch-input');
    playGame.onclick = (e) => {
        playModeOn = !playModeOn;
        sound = !sound;
        playMode();
    };

    if (playModeOn) {
        playMode()
    };

    function playMode() {

        let curIndex = index;
        if (startGuessing) {
            startGuessing = false;
            renderPages(curIndex);
            return;
        };

        ratingString.innerHTML = '';
        ratingString.classList.toggle('unvisible');
        let pageCards = [];
        let guessCardNumber = 0;
        let wrongAnswers = 0;
        if (document.querySelector('.inactive')) {
            document.querySelectorAll('.inactive').forEach((el) => {
                el.classList.remove('inactive');
            });
        };

        if (!document.querySelector('.btns')) {
            let btns = createElement('div', 'btns', cardWrapper);
            let btnStart = createElement('button', 'btnStart', btns);
            btnStart.innerHTML = "START GAME";

            cards[index].forEach((el) => {
                pageCards.push(el)
            });
            pageCards = shuffle(pageCards);

            btnStart.onclick = (e) => {

                startGuessing = true;
                const audio = new Audio(pageCards[guessCardNumber].audioSrc);
                audio.play();
                if (!btnStart.classList.contains('repeatBtn')) {
                    btnStart.classList.add('repeatBtn');
                    btnStart.innerHTML = `<span class="material-icons">loop</span>`;
                    document.querySelector('.material-icons').style.fontSize = '38px';
                };

                let cardsGuessing = document.querySelectorAll('.card-container-main');
                cardsGuessing.forEach((el) => {

                    el.onclick = (e) => {

                        if (startGuessing) {
                            if (e.target.style.backgroundImage === `url("${pageCards[guessCardNumber].image}")`) {
                                let audio = new Audio('assets/audio/correct.mp3');
                                audio.play();
                                e.target.closest('.card-container-main').classList.add('inactive');
                                createElement('div', 'star-succes', ratingString);
                                let trueWord = e.target.closest('.card-container-main').children[1].children[1].innerHTML;
                                trueAnswers.push(trueWord);
                                localStorage.setItem('trueAnswers', JSON.stringify(trueAnswers));

                                if (guessCardNumber === 7) {
                                    if (wrongAnswers === 0) {
                                        audio = new Audio('assets/audio/success.mp3');
                                        audio.play();
                                        document.querySelector('.wrapper-card-container-main').remove();
                                        let containerLooser = createElement('div', 'containerfinall', main)
                                        createElement('div', 'winner', containerLooser);
                                    } else {
                                        audio = new Audio('assets/audio/failure.mp3');
                                        audio.play();
                                        document.querySelector('.wrapper-card-container-main').remove();
                                        let containerLooser = createElement('div', 'containerfinall', main)
                                        createElement('div', 'looser', containerLooser);
                                        let wrongScore = createElement('div', 'wrongScore', containerLooser);
                                        wrongScore.innerHTML = `${wrongAnswers} wrong answers`;
                                    }
                                    setTimeout(() => {
                                        document.querySelector('.containerfinall').remove();

                                        renderMainPage();
                                    }, 2000);
                                }

                                if (guessCardNumber < 7) {
                                    guessCardNumber++;
                                    setTimeout(() => {
                                        audio = new Audio(pageCards[guessCardNumber].audioSrc);
                                        audio.play();
                                    }, 1000);

                                }

                            } else {
                                const audio = new Audio('assets/audio/error.mp3');
                                audio.play();
                                createElement('div', 'star-error', ratingString);
                                wrongAnswers++;
                                let falseWord = pageCards[guessCardNumber].translation;
                                falseAnswers.push(falseWord);
                                localStorage.setItem('falseAnswers', JSON.stringify(falseAnswers));
                            }

                        };
                    }
                });
            };

        } else {
            document.querySelector('.btns').remove();
        };

        document.querySelectorAll('.card-main-name').forEach((el) => {
            el.classList.toggle('hide');
        });
        document.querySelectorAll('.card-rotate').forEach((el) => {
            el.classList.toggle('hide');
        });
        document.querySelectorAll('.card-main-image').forEach((el) => {
            el.classList.toggle('playCardImage');
        });
    };
};

const Navigation = document.querySelectorAll('.menu__item');
function renderMenu(block) {
    block.forEach((el) => {
        el.onclick = (e) => {
            e.preventDefault();
            if (document.querySelector('.popup').classList.contains('show')) {
                navigationBlock(burger, '.popup');
            };

            if (e.target.innerHTML === 'Main page') {
                renderMainPage();
                return;
            } else if (e.target.innerHTML === 'Statistics') {
                renderStatistics();
            } else {
                let numberIndex = cards[0].findIndex(item => item === e.target.innerHTML) + 1;
                renderPages(numberIndex);
            };
        };
    });
};
renderMenu(Navigation);

function renderStatistics() {
    changeColorMenuBtn('.menu__item', 9);

    if (document.querySelector('.wrapper-card-container-main')) {
        document.querySelector('.wrapper-card-container-main').remove();
    };

    let statWrapper = createElement('div', 'wrapper-card-container-main', main);
    let titleStat = createElement('div', 'titlePage', statWrapper);
    titleStat.innerHTML = "Statistics";
    let btnsContainer = createElement('div', 'btnsContainer', statWrapper);
    let btmReset = createElement('button', 'btnsReset', btnsContainer);
    let btnrepeatDiff = createElement('button', 'btnsRepeatDiff', btnsContainer);
    btmReset.innerHTML = 'Reset';
    btnrepeatDiff.innerHTML = 'Repeat difficult words';
    let statTable = createElement('table', 'stat-table', statWrapper);
    let tableHead = createElement('thead', 'table-head', statTable);
    let tableHeadRow = createElement('tr', 'table-head-tr', tableHead);
    let tableBody = createElement('tbody', 'table-body', statTable);

    const titleNames = ['Category', 'Word', 'Translation', 'True', 'False', '% of true', 'Train']

    titleNames.forEach((el) => {
        let th = createElement('th', 'table-head-th', tableHeadRow);
        th.innerHTML = `${el}<span class='arrows'>\u2BC6</span>`;
    });

    for (let i = 0; i < 8; i++) {

        for (let j = 0; j < 8; j++) {
            let tr = createElement('tr', 'table-body-tr', tableBody);

            for (let k = 0; k < 7; k++) {
                let td = createElement('td', 'table-body-td', tr);
            };

            statTable.rows[j + 1 + 8 * i].cells[0].innerHTML = cards[0][i];
            statTable.rows[j + 1 + 8 * i].cells[1].innerHTML = cards[i + 1][j].word;
            statTable.rows[j + 1 + 8 * i].cells[2].innerHTML = cards[i + 1][j].translation;
            statTable.rows[j + 1 + 8 * i].cells[3].innerHTML = 0;
            statTable.rows[j + 1 + 8 * i].cells[4].innerHTML = 0;
            statTable.rows[j + 1 + 8 * i].cells[5].innerHTML = 0;
            statTable.rows[j + 1 + 8 * i].cells[6].innerHTML = 0;
        };
    };

    for (let i = 0; i < 8; i++) {
        statTable.rows[i + 1].style.background = "#e7b5b5";
        statTable.rows[i + 9].style.background = "#b4be56";
        statTable.rows[i + 17].style.background = "#3ae09b";
        statTable.rows[i + 25].style.background = "#ae74fa";
        statTable.rows[i + 33].style.background = "#e043ee";
        statTable.rows[i + 41].style.background = "#ee43a1";
        statTable.rows[i + 49].style.background = "#ebee43";
        statTable.rows[i + 57].style.background = "#43eee5";
    }

    let statTranslation = [];
    document.querySelectorAll('.table-body-tr').forEach((el) => {
        statTranslation.push(el.children[2].innerHTML);
    });

    if (train.length) {
        train.forEach((el) => {
            let ind = statTranslation.findIndex((elem) => elem === el);
            statTable.rows[ind + 1].cells[6].innerHTML = +statTable.rows[ind + 1].cells[6].innerHTML + 1;
        });
    };

    if (trueAnswers.length) {
        trueAnswers.forEach((el) => {
            let ind = statTranslation.findIndex((elem) => elem === el);
            statTable.rows[ind + 1].cells[3].innerHTML = +statTable.rows[ind + 1].cells[3].innerHTML + 1;
        });
    };

    if (falseAnswers.length) {
        falseAnswers.forEach((el) => {
            let ind = statTranslation.findIndex((elem) => elem === el);
            statTable.rows[ind + 1].cells[4].innerHTML = +statTable.rows[ind + 1].cells[4].innerHTML + 1;
        });
    };

    document.querySelectorAll('.table-body-tr').forEach((el) => {
        el.children[5].innerHTML = +(((+el.children[3].innerHTML / (+el.children[3].innerHTML + (+el.children[4].innerHTML))) * 100)).toFixed(1) || 0;
    });

    document.querySelectorAll('.arrows').forEach((el) => {
        let tableBody = document.querySelector('.table-body');
        let tableTrs = document.querySelectorAll('.table-body-tr');

        el.onclick = (e) => {
            let ind = Array.from(document.querySelectorAll('th')).findIndex(item => item === e.target.closest('th'));

            let sorted = [...tableTrs].sort((a, b) => {
                if (el.innerHTML === '\u2BC5') {
                    if (+ind > 2) {
                        return b.children[ind].innerHTML - a.children[ind].innerHTML;
                    }
                    if (a.children[ind].innerHTML <= b.children[ind].innerHTML) {
                        return 1;
                    } else {
                        return -1;
                    };
                } else {
                    if (+ind > 2) {
                        return a.children[ind].innerHTML - b.children[ind].innerHTML;
                    }
                    if (a.children[ind].innerHTML >= b.children[ind].innerHTML) {
                        return 1;
                    } else {
                        return -1;
                    };
                };
            });

            tableBody.innerHTML = '';
            sorted.forEach((el) => {
                tableBody.append(el);
            });

            if (el.innerHTML === '\u2BC6') {
                el.innerHTML = '\u2BC5';
            } else {
                el.innerHTML = '\u2BC6';
            };
        };
    });

    btmReset.onclick = (e) => {
        localStorage.clear();
        train.length = 0;
        trueAnswers.length = 0;
        falseAnswers.length = 0;
        renderStatistics();
    };
}



