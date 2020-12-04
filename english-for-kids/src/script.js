import cards from './modules/cards.js';
import shuffle from './modules/shuffle.js';


const main = document.querySelector('main');
let sound = true;
let playModeOn = false;
let startGuessing = false;

function navigationBlock(elementToActive, classToShow) {
    elementToActive.classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');
    document.querySelector(classToShow).classList.toggle('show');
}

function getLocalData(data) {
    if (localStorage.getItem(data) !== null) {
        return JSON.parse(localStorage.getItem(data));
    } else {
        return [];
    };
};

let train = getLocalData('train');
let trueAnswers = getLocalData('trueAnswers');
let falseAnswers = getLocalData('falseAnswers');

const burger = document.querySelector('#menu__toggle');
burger.onclick = (e) => {
    navigationBlock(burger, '.popup')
}
document.querySelector('.popup').onclick = (e) => {
    if (document.querySelector('.popup').classList.contains('show')) {
        navigationBlock(burger, '.popup')
    }
}

function createElement(element, className, parent) {
    const el = document.createElement(element);
    el.classList.add(className);
    parent.append(el);
    return el;
}

function changeColorMenuBtn(selectorItems, posActive) {
    const colorBtn = document.querySelectorAll(selectorItems);
    colorBtn.forEach((btn) => {
        btn.classList.remove('active-color');
    });
    colorBtn[posActive].classList.add('active-color');
}

function renderMainPage() {
    changeColorMenuBtn('.menu__item', 0);

    if (document.querySelector('.wrapper-card-container-main')) {
        document.querySelector('.wrapper-card-container-main').remove();
    }
    let cardWrapper = createElement('div', 'wrapper-card-container-main', main);
    cardWrapper.classList.add('marginTopMain');
    let i = 0;
    cards[0].forEach((el) => {
        let cardContainer = createElement('div', 'card-container-main', cardWrapper);
        let card = createElement('div', 'card-main', cardContainer);
        let cardImage = createElement('div', 'card-main-image', card);
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
    }
}

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
            }
        };

        i++;
    });

    let playGame = document.querySelector('.switch-input');
    playGame.onclick = (e) => {
        playModeOn = !playModeOn;
        sound = !sound;
        playMode();
    }

    if (playModeOn) {
        playMode()
    };

    function playMode() {

        let curIndex = index;
        if (startGuessing) {
            startGuessing = false;
            renderPages(curIndex);
            return;
        }

        ratingString.innerHTML = '';
        ratingString.classList.toggle('unvisible');
        let pageCards = [];
        let guessCardNumber = 0;
        let correctAnswers = 0;
        let wrongAnswers = 0;
        if (document.querySelector('.inactive')) {
            document.querySelectorAll('.inactive').forEach((el) => {
                el.classList.remove('inactive');
            })
        }

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
                }

                let cardsGuessing = document.querySelectorAll('.card-container-main');
                cardsGuessing.forEach((el) => {

                    el.onclick = (e) => {

                        if (startGuessing) {
                            if (e.target.style.backgroundImage === `url("${pageCards[guessCardNumber].image}")`) {
                                let audio = new Audio('assets/audio/correct.mp3');
                                audio.play();
                                e.target.closest('.card-container-main').classList.add('inactive');
                                createElement('div', 'star-succes', ratingString);
                                correctAnswers++;
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
                                // let falseWord = e.target.closest('.card-container-main').firstChild.children[1].innerHTML;
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
    // const Navigation = document.querySelectorAll('.menu__item');
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
    
    // console.log(trueAnswers)
    // console.log(falseAnswers)


}



