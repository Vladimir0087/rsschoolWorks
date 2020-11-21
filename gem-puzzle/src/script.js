// eslint-disable-next-line import/extensions
import shuffle from './modules/shuffle.js';

function createDiv(className, parent) {
    const el = document.createElement('div');
    el.classList.add(className);
    parent.prepend(el);
    return el;
}

const wrapper = createDiv('wrapper', document.body);
const field = createDiv('field', wrapper);

let step = 0;
let sec = 0;
let min = 0;
let numberCells = 4;
let cellSize;
let cells = [];
let empty = {};
let changed;
let isSolvedcells;
let soundOn = false;
let winScores = [];
let currentCard;
let image = Math.floor(1 + Math.random() * 10);
const PERCENT = 100;
const audio = new Audio('assets/music.mp3');

function saveGame() {
    localStorage.setItem('savedgame', JSON.stringify(cells));
    localStorage.setItem('sec', seconds.innerHTML);
    localStorage.setItem('min', minutes.innerHTML);
    localStorage.setItem('steps', steps.innerHTML);
    localStorage.setItem('numberCells', numberCells);
}

function fieldMake(n) {
    changed = [...Array(n * n - 1).keys()];
    cellSize = parseInt(field.style.width, 10) / n;
    isSolvedcells = n * n - 2;
}

function start() {
    if (localStorage.getItem('numberCells') !== null) {
        numberCells = +localStorage.getItem('numberCells');
    }

    switch (numberCells) {
        case 3:
            field.style.width = '69vmin';
            field.style.height = '69vmin';
            break;
        case 5:
        case 7:
            field.style.width = '70vmin';
            field.style.height = '70vmin';
            break;
        case 6:
        case 8:
            field.style.width = '72vmin';
            field.style.height = '72vmin';
            break;
        default:
            field.style.width = '70vmin';
            field.style.height = '70vmin';
    }

    fieldMake(numberCells);

    changed = shuffle(changed);

    let countnum;
    function isSolvedgame() {
        if (numberCells % 2 === 0) {
            countnum = 1;
            for (let i = 0; i < isSolvedcells; i++) {
                for (let j = i + 1; j <= isSolvedcells; j++) {
                    if (changed[i] + 1 > changed[j] + 1) {
                        countnum++;
                    }
                }
            }
            if (countnum % 2 !== 0) {
                changed = shuffle(changed);
                isSolvedgame();
            }
        } else {
            countnum = 0;
            for (let i = 0; i < isSolvedcells; i++) {
                for (let j = i + 1; j <= isSolvedcells; j++) {
                    if (changed[i] + 1 > changed[j] + 1) {
                        countnum++;
                    }
                }
            }
            if (countnum % 2 !== 0) {
                changed = shuffle(changed);
                isSolvedgame();
            }
        }
    }
    isSolvedgame();

    empty = {
        value: 0,
        left: 0,
        top: 0,
    };
    cells.length = 0;
    cells.push(empty);

    step = 0;
    sec = 0;
    min = 0;

    if (localStorage.getItem('steps') !== null) {
        step = +localStorage.getItem('steps');
    }
    if (localStorage.getItem('numberCells') !== null) {
        document.querySelectorAll('.cell').forEach((el) => {
            el.remove();
        });
        cells.length = 0;
        cells = JSON.parse(localStorage.getItem('savedgame')).slice();
        empty.value = +cells[0].value;
        empty.left = +cells[0].left;
        empty.top = +cells[0].top;
    }
    for (let i = 1; i <= isSolvedcells + 1; i++) {
        const cell = document.createElement('div');

        let value;
        if (localStorage.getItem('savedgame') !== null) {
            cell.classList.add('cell');
            cell.style.width = `${cellSize}vmin`;
            cell.style.height = `${cellSize}vmin`;
            cell.innerHTML = cells[i].value;
            cell.id = cells[i].value;

            cell.style.left = `${cells[i].left * cellSize}vmin`;
            cell.style.top = `${cells[i].top * cellSize}vmin`;
            cells[i].element = cell;
            image = cells[i].image;

            field.append(cell);

            value = cells[i].value;
        } else {
            value = changed[i - 1] + 1;
            cell.id = value;
            cell.classList.add('cell');
            cell.style.width = `${cellSize}vmin`;
            cell.style.height = `${cellSize}vmin`;
            cell.innerHTML = value;

            const left = i % numberCells;
            const top = (i - left) / numberCells;
            cell.style.left = `${left * cellSize}vmin`;
            cell.style.top = `${top * cellSize}vmin`;

            cells.push({
                value,
                left,
                top,
                element: cell,
                image,
            });

            field.append(cell);
        }

        const leftrpoc = ((value % numberCells) * PERCENT) / (numberCells - 1);
        const topproc = (((value - (value % numberCells)) / numberCells)
            * PERCENT) / (numberCells - 1);

        cell.style.backgroundImage = `url("assets/${image}.jpg")`;
        cell.style.backgroundSize = `${field.style.width} ${field.style.width}`;
        cell.style.backgroundPositionX = `${leftrpoc}%`;
        cell.style.backgroundPositionY = `${topproc}%`;

        cell.addEventListener('click', () => {
            const celll = cells[i];
            const leftdif = Math.abs(cells[0].left - celll.left);
            const topdif = Math.abs(cells[0].top - celll.top);
            if (topdif + leftdif > 1) return;
            celll.element.style.left = `${cells[0].left * cellSize}vmin`;
            celll.element.style.top = `${cells[0].top * cellSize}vmin`;
            const emptyleft = cells[0].left;
            const emptytop = cells[0].top;
            cells[0].left = celll.left;
            cells[0].top = celll.top;
            celll.left = emptyleft;
            celll.top = emptytop;
            stepsgo();
            if (soundOn) {
                audio.currentTime = 0;
                audio.play();
                setTimeout(() => audio.pause(), 300);
            }
            saveGame();
            const isFinished = cells.every((el) => el.value === el.top * numberCells + el.left);
            if (isFinished) {
                clearInterval(timerId);
                setTimeout(winner, 400);
            }
        });

        cell.draggable = true;

        function dragstart() {
            currentCard = this;
            setTimeout(() => {
                this.classList.add('hide');
            }, 0);
        }
        cell.addEventListener('dragstart', dragstart);

        function dragend() {
            this.classList.remove('hide');
        }
        cell.addEventListener('dragend', dragend);
    }
}
start();

function dragover(e) {
    e.preventDefault();
}

field.addEventListener('dragover', dragover);

function stepsgo() {
    step++;
    steps.innerHTML = step;
}

function dragdrop(e) {
    e.preventDefault();

    if (!e.target.classList.contains('cell')) {
        const leftdif = Math.abs((cells[0].left
            * cellSize - parseFloat(currentCard.style.left)) / cellSize);
        const topdif = Math.abs((cells[0].top * cellSize
            - parseFloat(currentCard.style.top)) / cellSize);

        if (topdif + leftdif <= 1) {
            const emptyleft = cells[0].left;
            const emptytop = cells[0].top;

            cells[0].left = parseFloat(currentCard.style.left) / cellSize;
            cells[0].top = parseFloat(currentCard.style.top) / cellSize;

            currentCard.style.left = `${emptyleft * cellSize}vmin`;
            currentCard.style.top = `${emptytop * cellSize}vmin`;

            cells.find((el) => +el.value === +currentCard.id).left = emptyleft;
            cells.find((el) => +el.value === +currentCard.id).top = emptytop;

            stepsgo();

            if (soundOn) {
                audio.currentTime = 0;
                audio.play();
                setTimeout(() => audio.pause(), 300);
            }

            saveGame();

            const isFinished = cells.every((el) => el.value === el.top * numberCells + el.left);
            if (isFinished) {
                clearInterval(timerId);
                setTimeout(winner, 400);
            }
        }
    }
    return false;
}
field.addEventListener('drop', dragdrop);

const win = document.createElement('div');
function winner() {
    win.classList.add('popup');
    win.innerHTML = `Ура! Вы решили головоломку за ${min}:${seconds.innerHTML} и ${step} ходов`;
    field.prepend(win);

    if (localStorage.getItem('winScores') !== null) {
        winScores = JSON.parse(localStorage.getItem('winScores')).slice();
    }

    if (winScores.length < 10) {
        winScores.push({
            steps: steps.innerHTML,
            min: minutes.innerHTML,
            sec: seconds.innerHTML,
            numberCells,
        });
    } else {
        const elem = winScores.reverse().find((el) => +steps.innerHTML < +el.steps
            || (+steps.innerHTML === +el.steps
                && minutes.innerHTML < el.min) || (+steps.innerHTML === +el.steps
                    && minutes.innerHTML === el.min && seconds.innerHTML < el.sec));

        if (elem) {
            elem.steps = steps.innerHTML;
            elem.min = minutes.innerHTML;
            elem.sec = seconds.innerHTML;
            elem.numberCells = numberCells;
            winScores.reverse();
        }
    }

    winScores.sort((a, b) => {
        if (a.steps === b.steps) {
            if (a.min === b.min) {
                return a.sec - b.sec;
            }
            return a.min - b.min;
        }
        return a.steps - b.steps;
    });

    localStorage.setItem('winScores', JSON.stringify(winScores));
}

function restartGame() {
    image = Math.floor(1 + Math.random() * 10);
    localStorage.removeItem('savedgame');
    localStorage.removeItem('sec');
    localStorage.removeItem('min');
    localStorage.removeItem('steps');
    localStorage.removeItem('numberCells');
    clearInterval(timerId);
    const elements = document.querySelectorAll('.cell');

    elements.forEach((el) => {
        el.remove();
    });
    start();
    time.innerHTML = "<span>Time: </span><span id='minutes'>00</span>:<span id='seconds'>00</span>";
    stepsDiv.innerHTML = "<span>Steps: </span><span id='steps'>0</span>";
    timerId = setInterval(timego, 1000);
}

win.onclick = () => {
    win.remove();
    restartGame();
};

function timego() {
    sec++;

    if (sec % 60 < 10) {
        seconds.innerHTML = `0${sec % 60}`;
    } else {
        seconds.innerHTML = sec % 60;
    }
    min = Math.floor(sec / 60);
    if (min < 10) {
        minutes.innerHTML = `0${min}`;
    } else {
        minutes.innerHTML = min;
    }
}

const time = document.createElement('div');
time.classList.add('time');
time.innerHTML = "<span>Time: </span><span id='minutes'>00</span>:<span id='seconds'>00</span>";
field.prepend(time);
if (localStorage.getItem('sec') !== null) {
    sec = localStorage.getItem('sec');
    seconds.innerHTML = sec;
}
if (localStorage.getItem('min') !== null) {
    min = localStorage.getItem('min');
    minutes.innerHTML = min;
}

let timerId = setInterval(timego, 1000);
const stoptime = false;
if (stoptime) {
    clearInterval(timerId);
}

const stepsDiv = document.createElement('div');
stepsDiv.classList.add('steps');
stepsDiv.innerHTML = "<span>Steps: </span><span id='steps'>0</span>";
field.prepend(stepsDiv);
steps.innerHTML = step;

const newgameBtn = document.createElement('button');
newgameBtn.classList.add('button', 'newgame');
newgameBtn.innerHTML = '<span>New game</span>';
field.prepend(newgameBtn);

newgameBtn.onclick = () => {
    restartGame();
};

const gameMode = document.createElement('select');
gameMode.classList.add('select');
for (let i = 1; i <= 6; i++) {
    const name = document.createElement('option');
    name.id = `option${i}`;
    name.value = `${i + 2}x${i + 2}`;
    name.innerHTML = `${i + 2}x${i + 2}`;
    gameMode.append(name);
}
gameMode.value = '4x4';
if (localStorage.getItem('numberCells') !== null) {
    const num = +localStorage.getItem('numberCells');
    gameMode.value = `${num}x${num}`;
}
field.prepend(gameMode);

document.querySelector('.select').addEventListener('change', (e) => {
    switch (e.target.value) {
        case '3x3':
            numberCells = 3;
            restartGame();
            break;
        case '5x5':
            numberCells = 5;
            restartGame();
            break;
        case '6x6':
            numberCells = 6;
            restartGame();
            break;
        case '7x7':
            numberCells = 7;
            restartGame();
            break;
        case '8x8':
            numberCells = 8;
            restartGame();
            break;
        default:
            numberCells = 4;
            restartGame();
    }
});

const bestResults = document.createElement('button');
bestResults.classList.add('button', 'bestresults');
bestResults.innerHTML = '<span>Best results</span>';
field.prepend(bestResults);

const bestRes = document.createElement('div');

bestResults.onclick = () => {
    bestRes.innerHTML = `<div class="content">
    <div class="contentsize">Size</div>
    <div class="contenttime">Time</div>
    <div class="contentstep"><p>Steps</p></div>
    </div>`;
    field.prepend(bestRes);
    bestRes.classList.add('popup');
    if (localStorage.getItem('winScores') !== null) {
        const winScoress = JSON.parse(localStorage.getItem('winScores')).slice();
        winScoress.forEach((el) => {
            document.querySelector('.contentstep').insertAdjacentHTML('beforeend', `<p>${el.steps}</p>`);
            document.querySelector('.contenttime').insertAdjacentHTML('beforeend', `<p>${el.min}:${el.sec}</p>`);
            document.querySelector('.contentsize').insertAdjacentHTML('beforeend', `<p>${el.numberCells}x${el.numberCells}</p>`);
        });
    }
};

bestRes.onclick = () => {
    bestRes.remove();
};

const sound = document.createElement('button');
sound.classList.add('sound');
field.prepend(sound);
sound.style.backgroundImage = "url('assets/mute.png')";
sound.onclick = () => {
    soundOn = !soundOn;
    sound.style.backgroundImage = soundOn ? "url('assets/audio.png')" : "url('assets/mute.png')";
};
