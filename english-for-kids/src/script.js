import cards from './modules/cards';
import shuffle from './modules/shuffle';
import navigationBlock from './modules/navigation';
import getLocalData from './modules/getLocalData';
import createElement from './modules/createElement';
import changeColorMenuBtn from './modules/changeColorMenuBtn';
import clickMainPage from './modules/clickMainPage';
import renderMenu from './modules/renderMenu';
import './styles.css';

const main = document.querySelector('main');
let sound = true;
let playModeOn = false;
let startGuessing = false;

const train = getLocalData('train');
const trueAnswers = getLocalData('trueAnswers');
const falseAnswers = getLocalData('falseAnswers');

const burger = document.querySelector('#menu__toggle');
burger.onclick = () => {
    navigationBlock(burger, '.popup');
};
document.querySelector('.popup').onclick = () => {
    if (document.querySelector('.popup').classList.contains('show')) {
        navigationBlock(burger, '.popup');
    }
};

function renderMainPage() {
    changeColorMenuBtn('.menu__item', 0);

    if (document.querySelector('.wrapper-card-container-main')) {
        document.querySelector('.wrapper-card-container-main').remove();
    }
    const cardWrapper = createElement('div', 'wrapper-card-container-main', main);
    const titlePageMain = createElement('div', 'titlePage', cardWrapper);
    titlePageMain.classList.add('marginTitleMain');
    titlePageMain.innerHTML = 'Main Page';
    let i = 0;
    cards[0].forEach(() => {
        const cardContainer = createElement('div', 'card-container-main', cardWrapper);
        const card = createElement('div', 'card-mainPage', cardContainer);

        const cardImage = createElement('div', 'card-main-img', card);
        const cardName = createElement('div', 'card-main-name', card);
        cardImage.style.backgroundImage = `url('assets/img/${cards[0][i]}.jpg')`;
        cardName.innerHTML = cards[0][i];
        i++;
    });

    // eslint-disable-next-line no-use-before-define
    clickMainPage(renderPages);

    const playGame = document.querySelector('.switch-input');
    playGame.onclick = () => {
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
    }
}

renderMainPage();

function renderPages(index) {
    changeColorMenuBtn('.menu__item', index);

    if (document.querySelector('.wrapper-card-container-main')) {
        document.querySelector('.wrapper-card-container-main').remove();
    }
    const cardWrapper = createElement('div', 'wrapper-card-container-main', main);
    const titlePage = createElement('div', 'titlePage', cardWrapper);
    titlePage.innerHTML = cards[0][index - 1];
    const ratingString = createElement('div', 'rating', cardWrapper);
    ratingString.classList.add('unvisible');

    let i = 0;
    cards[index].forEach(() => {
        const cardContainer = createElement('div', 'card-container-main', cardWrapper);
        const card = createElement('div', 'card-main', cardContainer);
        const cardback = createElement('div', 'card-main-back', cardContainer);
        const cardImage = createElement('div', 'card-main-image', card);
        const cardImageback = createElement('div', 'card-main-image', cardback);
        const cardName = createElement('div', 'card-main-name', card);
        const cardNameback = createElement('div', 'card-main-name', cardback);
        cardImage.style.backgroundImage = `url('${cards[index][i].image}')`;
        cardName.innerHTML = cards[index][i].word;
        cardImageback.style.backgroundImage = `url('${cards[index][i].image}')`;
        cardNameback.innerHTML = cards[index][i].translation;

        const audio = new Audio(cards[index][i].audioSrc);
        const rotate = createElement('div', 'card-rotate', card);

        cardContainer.onclick = () => {
            if (sound) {
                audio.play();
            }
        };

        card.onclick = (e) => {
            if (!playModeOn) {
                const word = e.target.closest('.card-container-main').children[1].children[1].innerHTML;
                train.push(word);
                localStorage.setItem('train', JSON.stringify(train));
            }
        };

        rotate.onclick = () => {
            audio.play();
            sound = !sound;
            card.classList.add('translate');
            cardback.classList.add('translateback');

            cardContainer.onmouseleave = () => {
                if (card.classList.contains('translate')) {
                    card.classList.remove('translate');
                    cardback.classList.remove('translateback');
                    if (!sound) {
                        sound = !sound;
                    }
                }
            };
        };
        i++;
    });

    function playMode() {
        const curIndex = index;
        if (startGuessing) {
            startGuessing = false;
            renderPages(curIndex);
            return;
        }

        ratingString.innerHTML = '';
        ratingString.classList.toggle('unvisible');
        let pageCards = [];
        let guessCardNumber = 0;
        let wrongAnswers = 0;
        if (document.querySelector('.inactive')) {
            document.querySelectorAll('.inactive').forEach((el) => {
                el.classList.remove('inactive');
            });
        }

        if (!document.querySelector('.btns')) {
            const btns = createElement('div', 'btns', cardWrapper);
            const btnStart = createElement('button', 'btnStart', btns);
            btnStart.innerHTML = 'START GAME';

            cards[index].forEach((el) => {
                pageCards.push(el);
            });
            pageCards = shuffle(pageCards);

            btnStart.onclick = () => {
                startGuessing = true;
                let audio = new Audio(pageCards[guessCardNumber].audioSrc);
                audio.play();
                if (!btnStart.classList.contains('repeatBtn')) {
                    btnStart.classList.add('repeatBtn');
                    btnStart.innerHTML = '<span class="material-icons">loop</span>';
                    document.querySelector('.material-icons').style.fontSize = '38px';
                }

                const cardsGuessing = document.querySelectorAll('.card-container-main');
                cardsGuessing.forEach((el) => {
                    const element = el;
                    element.onclick = (e) => {
                        if (startGuessing) {
                            if (e.target.style.backgroundImage === `url("${pageCards[guessCardNumber].image}")`) {
                                audio = new Audio('assets/audio/correct.mp3');
                                audio.play();
                                e.target.closest('.card-container-main').classList.add('inactive');
                                createElement('div', 'star-succes', ratingString);
                                const trueWord = e.target.closest('.card-container-main').children[1].children[1].innerHTML;
                                trueAnswers.push(trueWord);
                                localStorage.setItem('trueAnswers', JSON.stringify(trueAnswers));

                                if (guessCardNumber === 7) {
                                    if (wrongAnswers === 0) {
                                        audio = new Audio('assets/audio/success.mp3');
                                        audio.play();
                                        document.querySelector('.wrapper-card-container-main').remove();
                                        const containerLooser = createElement('div', 'containerfinall', main);
                                        createElement('div', 'winner', containerLooser);
                                    } else {
                                        audio = new Audio('assets/audio/failure.mp3');
                                        audio.play();
                                        document.querySelector('.wrapper-card-container-main').remove();
                                        const containerLooser = createElement('div', 'containerfinall', main);
                                        createElement('div', 'looser', containerLooser);
                                        const wrongScore = createElement('div', 'wrongScore', containerLooser);
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
                                audio = new Audio('assets/audio/error.mp3');
                                audio.play();
                                createElement('div', 'star-error', ratingString);
                                wrongAnswers++;
                                const falseWord = pageCards[guessCardNumber].translation;
                                falseAnswers.push(falseWord);
                                localStorage.setItem('falseAnswers', JSON.stringify(falseAnswers));
                            }
                        }
                    };
                });
            };
        } else {
            document.querySelector('.btns').remove();
        }

        document.querySelectorAll('.card-main-name').forEach((el) => {
            el.classList.toggle('hide');
        });
        document.querySelectorAll('.card-rotate').forEach((el) => {
            el.classList.toggle('hide');
        });
        document.querySelectorAll('.card-main-image').forEach((el) => {
            el.classList.toggle('playCardImage');
        });
    }

    const playGame = document.querySelector('.switch-input');
    playGame.onclick = () => {
        playModeOn = !playModeOn;
        sound = !sound;
        playMode();
    };

    if (playModeOn) {
        playMode();
    }
}

function renderStatistics() {
    changeColorMenuBtn('.menu__item', 9);

    if (document.querySelector('.wrapper-card-container-main')) {
        document.querySelector('.wrapper-card-container-main').remove();
    }

    const statWrapper = createElement('div', 'wrapper-card-container-main', main);
    const titleStat = createElement('div', 'titlePage', statWrapper);
    titleStat.innerHTML = 'Statistics';
    const btnsContainer = createElement('div', 'btnsContainer', statWrapper);
    const btmReset = createElement('button', 'btnsReset', btnsContainer);
    const btnrepeatDiff = createElement('button', 'btnsRepeatDiff', btnsContainer);
    btmReset.innerHTML = 'Reset';
    btnrepeatDiff.innerHTML = 'Repeat difficult words';
    const statTable = createElement('table', 'stat-table', statWrapper);
    const tableHead = createElement('thead', 'table-head', statTable);
    const tableHeadRow = createElement('tr', 'table-head-tr', tableHead);
    let tableBody = createElement('tbody', 'table-body', statTable);

    const titleNames = ['Category', 'Word', 'Translation', 'True', 'False', '% of true', 'Train'];

    titleNames.forEach((el) => {
        const th = createElement('th', 'table-head-th', tableHeadRow);
        th.innerHTML = `${el}<span class='arrows'>\u2BC6</span>`;
    });

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const tr = createElement('tr', 'table-body-tr', tableBody);

            for (let k = 0; k < 7; k++) {
                createElement('td', 'table-body-td', tr);
            }

            statTable.rows[j + 1 + 8 * i].cells[0].innerHTML = cards[0][i];
            statTable.rows[j + 1 + 8 * i].cells[1].innerHTML = cards[i + 1][j].word;
            statTable.rows[j + 1 + 8 * i].cells[2].innerHTML = cards[i + 1][j].translation;
            statTable.rows[j + 1 + 8 * i].cells[3].innerHTML = 0;
            statTable.rows[j + 1 + 8 * i].cells[4].innerHTML = 0;
            statTable.rows[j + 1 + 8 * i].cells[5].innerHTML = 0;
            statTable.rows[j + 1 + 8 * i].cells[6].innerHTML = 0;
        }
    }

    for (let i = 0; i < 8; i++) {
        statTable.rows[i + 1].style.background = '#e7b5b5';
        statTable.rows[i + 9].style.background = '#b4be56';
        statTable.rows[i + 17].style.background = '#3ae09b';
        statTable.rows[i + 25].style.background = '#ae74fa';
        statTable.rows[i + 33].style.background = '#e043ee';
        statTable.rows[i + 41].style.background = '#ee43a1';
        statTable.rows[i + 49].style.background = '#ebee43';
        statTable.rows[i + 57].style.background = '#43eee5';
    }

    const statTranslation = [];
    document.querySelectorAll('.table-body-tr').forEach((el) => {
        statTranslation.push(el.children[2].innerHTML);
    });

    if (train.length) {
        train.forEach((el) => {
            const ind = statTranslation.findIndex((elem) => elem === el);
            statTable.rows[ind + 1].cells[6].innerHTML = +statTable.rows[ind
            + 1].cells[6].innerHTML + 1;
        });
    }

    if (trueAnswers.length) {
        trueAnswers.forEach((el) => {
            const ind = statTranslation.findIndex((elem) => elem === el);
            statTable.rows[ind + 1].cells[3].innerHTML = +statTable.rows[ind
            + 1].cells[3].innerHTML + 1;
        });
    }

    if (falseAnswers.length) {
        falseAnswers.forEach((el) => {
            const ind = statTranslation.findIndex((elem) => elem === el);
            statTable.rows[ind + 1].cells[4].innerHTML = +statTable.rows[ind
            + 1].cells[4].innerHTML + 1;
        });
    }

    document.querySelectorAll('.table-body-tr').forEach((el) => {
        const element = el;
        element.children[5].innerHTML = +(((+el.children[3].innerHTML
        / (+el.children[3].innerHTML + (+el.children[4].innerHTML))) * 100)).toFixed(1) || 0;
    });

    document.querySelectorAll('.arrows').forEach((el) => {
        tableBody = document.querySelector('.table-body');
        const tableTrs = document.querySelectorAll('.table-body-tr');
        const element = el;
        element.onclick = (e) => {
            const ind = Array.from(document.querySelectorAll('th')).findIndex((item) => item === e.target.closest('th'));

            const sorted = [...tableTrs].sort((a, b) => {
                if (el.innerHTML === '\u2BC5') {
                    if (+ind > 2) {
                        return b.children[ind].innerHTML - a.children[ind].innerHTML;
                    }
                    if (a.children[ind].innerHTML <= b.children[ind].innerHTML) {
                        return 1;
                    }
                        return -1;
                }
                    if (+ind > 2) {
                        return a.children[ind].innerHTML - b.children[ind].innerHTML;
                    }
                    if (a.children[ind].innerHTML >= b.children[ind].innerHTML) {
                        return 1;
                    }
                        return -1;
            });

            tableBody.innerHTML = '';
            sorted.forEach((elem) => {
                tableBody.append(elem);
            });

            if (el.innerHTML === '\u2BC6') {
                element.innerHTML = '\u2BC5';
            } else {
                element.innerHTML = '\u2BC6';
            }
        };
    });

    btmReset.onclick = () => {
        localStorage.clear();
        train.length = 0;
        trueAnswers.length = 0;
        falseAnswers.length = 0;
        renderStatistics();
    };

    btnrepeatDiff.onclick = () => {
        const arrTrs = [];
        const arrTrsCorrect = [];
        document.querySelectorAll('.table-body-tr').forEach((el) => {
            if (el.children[4].innerHTML / (+el.children[3].innerHTML
            + (+el.children[4].innerHTML)) > 0) {
                arrTrs.push(el);
            }
        });

        arrTrs.sort((a, b) => ((b.children[4].innerHTML / (+b.children[3].innerHTML
        + (+b.children[4].innerHTML)) - a.children[4].innerHTML
        / (+a.children[3].innerHTML + (+a.children[4].innerHTML)))));

        arrTrs.forEach((el) => {
            if (arrTrsCorrect.length >= 8) return;
            arrTrsCorrect.push(el);
        });

        function findObject(data) {
            let cardsObject;
            for (let i = 1; i <= 8; i++) {
                cardsObject = cards[i].find((item) => item.translation === data);
                if (cardsObject !== undefined) break;
            }
            return cardsObject;
        }

        if (document.querySelector('.wrapper-card-container-main')) {
            document.querySelector('.wrapper-card-container-main').remove();
        }

        const cardWrapper = createElement('div', 'wrapper-card-container-main', main);
        const titlePage = createElement('div', 'titlePage', cardWrapper);
        titlePage.innerHTML = 'Repeat difficult words';

        if (arrTrsCorrect.length === 0) {
            const nothingToRepeat = createElement('div', 'nothingToRepeat', cardWrapper);
            nothingToRepeat.innerHTML = 'There are no difficult <br> words to repeat';
            return;
        }

        const ratingString = createElement('div', 'rating', cardWrapper);
        ratingString.classList.add('unvisible');

        let i = 0;
        arrTrsCorrect.forEach(() => {
            const cardContainer = createElement('div', 'card-container-main', cardWrapper);
            const card = createElement('div', 'card-main', cardContainer);
            const cardback = createElement('div', 'card-main-back', cardContainer);
            const cardImage = createElement('div', 'card-main-image', card);
            const cardImageback = createElement('div', 'card-main-image', cardback);
            const cardName = createElement('div', 'card-main-name', card);
            const cardNameback = createElement('div', 'card-main-name', cardback);
            const arrCorrectObj = findObject(arrTrsCorrect[i].children[2].innerHTML);
            cardImage.style.backgroundImage = `url('${arrCorrectObj.image}')`;
            cardName.innerHTML = arrTrsCorrect[i].children[1].innerHTML;
            cardImageback.style.backgroundImage = `url('${arrCorrectObj.image}')`;
            cardNameback.innerHTML = arrTrsCorrect[i].children[2].innerHTML;

            const audio = new Audio(arrCorrectObj.audioSrc);
            const rotate = createElement('div', 'card-rotate', card);

            cardContainer.onclick = () => {
                if (sound) {
                    audio.play();
                }
            };

            card.onclick = (e) => {
                if (!playModeOn) {
                    const word = e.target.closest('.card-container-main').children[1].children[1].innerHTML;
                    train.push(word);
                    localStorage.setItem('train', JSON.stringify(train));
                }
            };

            rotate.onclick = () => {
                audio.play();
                sound = !sound;
                card.classList.add('translate');
                cardback.classList.add('translateback');

                cardContainer.onmouseleave = () => {
                    if (card.classList.contains('translate')) {
                        card.classList.remove('translate');
                        cardback.classList.remove('translateback');
                        if (!sound) {
                            sound = !sound;
                        }
                    }
                };
            };
            i++;
        });

        function playMode() {
            ratingString.innerHTML = '';
            ratingString.classList.toggle('unvisible');
            let pageCards = [];
            let guessCardNumber = 0;
            let wrongAnswers = 0;
            if (document.querySelector('.inactive')) {
                document.querySelectorAll('.inactive').forEach((el) => {
                    el.classList.remove('inactive');
                });
            }

            if (!document.querySelector('.btns')) {
                const btns = createElement('div', 'btns', cardWrapper);
                const btnStart = createElement('button', 'btnStart', btns);
                btnStart.innerHTML = 'START GAME';

                arrTrsCorrect.forEach((el) => {
                    pageCards.push(el);
                });
                pageCards = shuffle(pageCards);

                btnStart.onclick = () => {
                    startGuessing = true;
                    let audio = new Audio(findObject(pageCards[guessCardNumber]
                    .children[2].innerHTML).audioSrc);
                    audio.play();
                    if (!btnStart.classList.contains('repeatBtn')) {
                        btnStart.classList.add('repeatBtn');
                        btnStart.innerHTML = '<span class="material-icons">loop</span>';
                        document.querySelector('.material-icons').style.fontSize = '38px';
                    }

                    const cardsGuessing = document.querySelectorAll('.card-container-main');
                    cardsGuessing.forEach((el) => {
                        const element = el;
                        element.onclick = (e) => {
                            if (startGuessing) {
                                if (e.target.style.backgroundImage === `url("${findObject(pageCards[guessCardNumber].children[2].innerHTML).image}")`) {
                                    audio = new Audio('assets/audio/correct.mp3');
                                    audio.play();
                                    e.target.closest('.card-container-main').classList.add('inactive');
                                    createElement('div', 'star-succes', ratingString);
                                    const trueWord = e.target.closest('.card-container-main').children[1].children[1].innerHTML;
                                    trueAnswers.push(trueWord);
                                    localStorage.setItem('trueAnswers', JSON.stringify(trueAnswers));

                                    if (guessCardNumber === arrTrsCorrect.length - 1) {
                                        if (wrongAnswers === 0) {
                                            audio = new Audio('assets/audio/success.mp3');
                                            audio.play();
                                            document.querySelector('.wrapper-card-container-main').remove();
                                            const containerLooser = createElement('div', 'containerfinall', main);
                                            createElement('div', 'winner', containerLooser);
                                        } else {
                                            audio = new Audio('assets/audio/failure.mp3');
                                            audio.play();
                                            document.querySelector('.wrapper-card-container-main').remove();
                                            const containerLooser = createElement('div', 'containerfinall', main);
                                            createElement('div', 'looser', containerLooser);
                                            const wrongScore = createElement('div', 'wrongScore', containerLooser);
                                            wrongScore.innerHTML = `${wrongAnswers} wrong answers`;
                                        }
                                        setTimeout(() => {
                                            document.querySelector('.containerfinall').remove();

                                            renderMainPage();
                                        }, 2000);
                                    }

                                    if (guessCardNumber < arrTrsCorrect.length - 1) {
                                        guessCardNumber++;
                                        setTimeout(() => {
                                            audio = new Audio(findObject(pageCards[guessCardNumber]
                                            .children[2].innerHTML).audioSrc);
                                            audio.play();
                                        }, 1000);
                                    }
                                } else {
                                    audio = new Audio('assets/audio/error.mp3');
                                    audio.play();
                                    createElement('div', 'star-error', ratingString);
                                    wrongAnswers++;
                                    const falseWord = findObject(pageCards[guessCardNumber]
                                    .children[2].innerHTML).translation;
                                    falseAnswers.push(falseWord);
                                    localStorage.setItem('falseAnswers', JSON.stringify(falseAnswers));
                                }
                            }
                        };
                    });
                };
            } else {
                document.querySelector('.btns').remove();
            }

            document.querySelectorAll('.card-main-name').forEach((el) => {
                el.classList.toggle('hide');
            });
            document.querySelectorAll('.card-rotate').forEach((el) => {
                el.classList.toggle('hide');
            });
            document.querySelectorAll('.card-main-image').forEach((el) => {
                el.classList.toggle('playCardImage');
            });
        }

        const playGame = document.querySelector('.switch-input');
        playGame.onclick = () => {
            playModeOn = !playModeOn;
            sound = !sound;
            playMode();
        };

        if (playModeOn) {
            playMode();
        }
    };
}

const Navigation = document.querySelectorAll('.menu__item');

renderMenu(Navigation, renderMainPage, renderStatistics, renderPages, burger);
