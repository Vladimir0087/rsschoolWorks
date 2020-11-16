// eslint-disable-next-line import/extensions
import shuffle from './modules/shuffle.js';

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
document.body.prepend(wrapper);
const field = document.createElement('div');
field.classList.add('field');
wrapper.prepend(field);
let step = 0;
let sec = 0;
let min = 0;
let numbercells = 4;
let cellsize;
let cells = [];
let empty = {};
let changed;
let isSolvedcells;
let soundOn = false;
let winScores = [];
let currentCard;
let image = Math.floor(1 + Math.random() * 10);

function saveGame() {
    localStorage.setItem('savedgame', JSON.stringify(cells));
    localStorage.setItem('sec', seconds.innerHTML);
    localStorage.setItem('min', minutes.innerHTML);
    localStorage.setItem('steps', steps.innerHTML);
    localStorage.setItem('numbercells', numbercells);
}

function start() {
    if (localStorage.getItem('numbercells') !== null) {
        numbercells = +localStorage.getItem('numbercells');
    }

    if (numbercells === 4) {
        field.style.width = '70vmin';
        field.style.height = '70vmin';
        changed = [...Array(15).keys()];
        cellsize = parseInt(field.style.width, 10) / numbercells;
        isSolvedcells = 14;
    }
    if (numbercells === 3) {
        field.style.width = '69vmin';
        field.style.height = '69vmin';
        changed = [...Array(8).keys()];
        cellsize = parseInt(field.style.width, 10) / numbercells;
        isSolvedcells = 7;
    }

    if (numbercells === 5) {
        field.style.width = '70vmin';
        field.style.height = '70vmin';
        changed = [...Array(24).keys()];
        cellsize = parseInt(field.style.width, 10) / numbercells;
        isSolvedcells = 23;
    }
    if (numbercells === 6) {
        field.style.width = '72vmin';
        field.style.height = '72vmin';
        changed = [...Array(35).keys()];
        cellsize = parseInt(field.style.width, 10) / numbercells;
        isSolvedcells = 34;
    }
    if (numbercells === 7) {
        field.style.width = '70vmin';
        field.style.height = '70vmin';
        changed = [...Array(48).keys()];
        cellsize = parseInt(field.style.width, 10) / numbercells;
        isSolvedcells = 47;
    }
    if (numbercells === 8) {
        field.style.width = '72vmin';
        field.style.height = '72vmin';
        changed = [...Array(63).keys()];
        cellsize = parseInt(field.style.width, 10) / numbercells;
        isSolvedcells = 62;
    }

    shuffle(changed);

    let countnum;
    function isSolvedgame() {
        if (numbercells % 2 === 0) {
            countnum = 1;
            for (let i = 0; i < isSolvedcells; i++) {
                for (let j = i + 1; j <= isSolvedcells; j++) {
                    if (changed[i] + 1 > changed[j] + 1) {
                        countnum++;
                    }
                }
            }
            if (countnum % 2 !== 0) {
                shuffle(changed);
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
                shuffle(changed);
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
    if (localStorage.getItem('numbercells') !== null) {
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
            cell.style.width = `${cellsize}vmin`;
            cell.style.height = `${cellsize}vmin`;
            cell.innerHTML = cells[i].value;
            cell.id = cells[i].value;

            cell.style.left = `${cells[i].left * cellsize}vmin`;
            cell.style.top = `${cells[i].top * cellsize}vmin`;
            cells[i].element = cell;
            image = cells[i].image;

            field.append(cell);

            value = cells[i].value;
        } else {
            value = changed[i - 1] + 1;
            cell.id = value;
            cell.classList.add('cell');
            cell.style.width = `${cellsize}vmin`;
            cell.style.height = `${cellsize}vmin`;
            cell.innerHTML = value;

            const left = i % numbercells;
            const top = (i - left) / numbercells;
            cell.style.left = `${left * cellsize}vmin`;
            cell.style.top = `${top * cellsize}vmin`;

            cells.push({
                value,
                left,
                top,
                element: cell,
                image,
            });

            field.append(cell);
        }

        const leftrpoc = ((value % numbercells) * 100) / (numbercells - 1);
        const topproc = (((value - (value % numbercells)) / numbercells) * 100) / (numbercells - 1);

        cell.style.backgroundImage = `url("assets/${image}.jpg")`;
        cell.style.backgroundSize = `${field.style.width} ${field.style.width}`;
        cell.style.backgroundPositionX = `${leftrpoc}%`;
        cell.style.backgroundPositionY = `${topproc}%`;

        cell.addEventListener('click', () => {
            const celll = cells[i];
            const leftdif = Math.abs(cells[0].left - celll.left);
            const topdif = Math.abs(cells[0].top - celll.top);
            if (topdif + leftdif > 1) return;
            celll.element.style.left = `${cells[0].left * cellsize}vmin`;
            celll.element.style.top = `${cells[0].top * cellsize}vmin`;
            const emptyleft = cells[0].left;
            const emptytop = cells[0].top;
            cells[0].left = celll.left;
            cells[0].top = celll.top;
            celll.left = emptyleft;
            celll.top = emptytop;
            stepsgo();
            if (soundOn) {
                const audio = new Audio('assets/music.mp3');
                audio.currentTime = 0;
                audio.play();
                setTimeout(() => audio.pause(), 300);
            }
            saveGame();
            const isFinished = cells.every((el) => el.value === el.top * numbercells + el.left);
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

    if (e.target.classList.contains('cell')) {
        return false;
    }

    const leftdif = Math.abs((cells[0].left
        * cellsize - parseFloat(currentCard.style.left)) / cellsize);
    const topdif = Math.abs((cells[0].top * cellsize
        - parseFloat(currentCard.style.top)) / cellsize);

    if (topdif + leftdif <= 1) {
        const emptyleft = cells[0].left;
        const emptytop = cells[0].top;

        cells[0].left = parseFloat(currentCard.style.left) / cellsize;
        cells[0].top = parseFloat(currentCard.style.top) / cellsize;

        currentCard.style.left = `${emptyleft * cellsize}vmin`;
        currentCard.style.top = `${emptytop * cellsize}vmin`;

        cells.find((el) => +el.value === +currentCard.id).left = emptyleft;
        cells.find((el) => +el.value === +currentCard.id).top = emptytop;

        stepsgo();

        if (soundOn) {
            const audio = new Audio('assets/music.mp3');
            audio.currentTime = 0;
            audio.play();
            setTimeout(() => audio.pause(), 300);
        }

        saveGame();

        const isFinished = cells.every((el) => el.value === el.top * numbercells + el.left);
        if (isFinished) {
            clearInterval(timerId);
            setTimeout(winner, 400);
        }
    }
    return true;
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
            numbercells,
        });
    } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const el of winScores.reverse()) {
            if (+steps.innerHTML < +el.steps || (+steps.innerHTML === +el.steps
                && minutes.innerHTML < el.min) || (+steps.innerHTML === +el.steps
                    && minutes.innerHTML === el.min && seconds.innerHTML < el.sec)) {
                el.steps = steps.innerHTML;
                el.min = minutes.innerHTML;
                el.sec = seconds.innerHTML;
                el.numbercells = numbercells;
                winScores.reverse();
                break;
            }
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

function restartgame() {
    image = Math.floor(1 + Math.random() * 10);
    localStorage.removeItem('savedgame');
    localStorage.removeItem('sec');
    localStorage.removeItem('min');
    localStorage.removeItem('steps');
    localStorage.removeItem('numbercells');
    clearInterval(timerId);
    const elements = document.querySelectorAll('.cell');

    elements.forEach((el) => {
        el.remove();
    });
    start();
    time.innerHTML = "<span>Time: </span><span id='minutes'>00</span>:<span id='seconds'>00</span>";
    stepsdiv.innerHTML = "<span>Steps: </span><span id='steps'>0</span>";
    timerId = setInterval(timego, 1000);
}

win.onclick = () => {
    win.remove();
    restartgame();
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

const stepsdiv = document.createElement('div');
stepsdiv.classList.add('steps');
stepsdiv.innerHTML = "<span>Steps: </span><span id='steps'>0</span>";
field.prepend(stepsdiv);
steps.innerHTML = step;

const newgamebtn = document.createElement('button');
newgamebtn.classList.add('button');
newgamebtn.classList.add('newgame');
newgamebtn.innerHTML = '<span>New game</span>';
field.prepend(newgamebtn);

newgamebtn.onclick = () => {
    restartgame();
};

const gamemode = document.createElement('select');
gamemode.classList.add('select');
for (let i = 1; i <= 6; i++) {
    const name = document.createElement('option');
    name.id = `option${i}`;
    name.value = `${i + 2}x${i + 2}`;
    name.innerHTML = `${i + 2}x${i + 2}`;
    gamemode.append(name);
}
gamemode.value = '4x4';
if (localStorage.getItem('numbercells') !== null) {
    const num = +localStorage.getItem('numbercells');
    gamemode.value = `${num}x${num}`;
}
field.prepend(gamemode);

document.querySelector('.select').addEventListener('change', (e) => {
    if (e.target.value === '3x3') {
        numbercells = 3;
        restartgame();
    }
    if (e.target.value === '4x4') {
        numbercells = 4;
        restartgame();
    }
    if (e.target.value === '5x5') {
        numbercells = 5;
        restartgame();
    }
    if (e.target.value === '6x6') {
        numbercells = 6;
        restartgame();
    }
    if (e.target.value === '7x7') {
        numbercells = 7;
        restartgame();
    }
    if (e.target.value === '8x8') {
        numbercells = 8;
        restartgame();
    }
});

const bestresults = document.createElement('button');
bestresults.classList.add('button');
bestresults.classList.add('bestresults');
bestresults.innerHTML = '<span>Best results</span>';
field.prepend(bestresults);

const bestres = document.createElement('div');

bestresults.onclick = () => {
    bestres.innerHTML = `<div class="content">
    <div class="contentsize">Size</div>
    <div class="contenttime">Time</div>
    <div class="contentstep"><p>Steps</p></div>
    </div>`;
    field.prepend(bestres);
    bestres.classList.add('popup');
    if (localStorage.getItem('winScores') !== null) {
        const winScoress = JSON.parse(localStorage.getItem('winScores')).slice();
        winScoress.forEach((el) => {
            document.querySelector('.contentstep').insertAdjacentHTML('beforeend', `<p>${el.steps}</p>`);
            document.querySelector('.contenttime').insertAdjacentHTML('beforeend', `<p>${el.min}:${el.sec}</p>`);
            document.querySelector('.contentsize').insertAdjacentHTML('beforeend', `<p>${el.numbercells}x${el.numbercells}</p>`);
        });
    }
};

bestres.onclick = () => {
    bestres.remove();
};

const sound = document.createElement('button');
sound.classList.add('sound');
field.prepend(sound);
sound.style.backgroundImage = "url('assets/mute.png')";
sound.onclick = () => {
    soundOn = !soundOn;
    if (soundOn) {
        sound.style.backgroundImage = "url('assets/audio.png')";
    } else {
        sound.style.backgroundImage = "url('assets/mute.png')";
    }
};
