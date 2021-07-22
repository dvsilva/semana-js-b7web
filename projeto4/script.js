// initial data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player1 = '';
let player2 = '';
let currentPlayer = '';

let warning = '';
let playing = false;

let winnerCombinations = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
];

reset();

// events
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})

document.querySelector('.play').addEventListener('click', startGame);

// functions
function itemClick(event) {
   let item = event.target.getAttribute('data-item');

   if(playing && square[item] == '') {
       square[item] = currentPlayer;
       renderSquare();
       tooglePlayer();
       computerPlay();
   }
}

function computerPlay() {
    let validChooses = getValidChoose();

    let random = Math.floor(Math.random() * validChooses.length);

    let item = validChooses[random];
    square[item] = currentPlayer;

    renderSquare();
    tooglePlayer();
}

function getValidChoose() {
    let validChooses = [];

    Object.keys(square).forEach(function(key, index) {
        if(square[key] === '') {
            validChooses.push(key);
        }
    });

    return validChooses;
}

function startGame () {
    player1 = document.querySelector('#playerChar').value;
    
    if(player1 == 'o') {
        player2 = 'x';
    }
    else if(player1 == 'x') {
        player2 = 'o';
    }
    else {
        let random = Math.floor(Math.random() * 2);
        player2 = (random === 0) ? 'x' : 'o';
    }

    playing = true;
    currentPlayer = player1;
}

function reset () {
    warning = '--';
    
    document.querySelector('#playerChar').value = '';
    currentPlayer = '--';

    for(let i in square){
        square[i] = '';
    }

    playing = false;

    renderSquare();
    renderInfo();

    document.querySelectorAll('.item').forEach(item => {
        item.classList.remove("won");
    });
}

function renderSquare () {
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    if(playing) {
        checkGame();
    }
}

function renderInfo () {
    document.querySelector('.vez').innerHTML = currentPlayer;
    document.querySelector('.resultado').innerHTML = warning;
}

function tooglePlayer(){
    currentPlayer = (currentPlayer == player1) ? player2 : player1;
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor(player1)) {
        warning = `O ${player1} venceu`;
        playing = false;
    }
    else if(checkWinnerFor(player2)) {
        warning = `O ${player2} venceu`;
        playing = false;
    }
    else if(isFull()) {
        warning = "Deu empate";
        playing = false;
        currentPlayer = '';
    }
}

function checkWinnerFor(player) {
    for(let pattern in winnerCombinations) {
        let pArray = winnerCombinations[pattern].split(','); // [a1, a2, a3]
        let hasWon = pArray.every(option => square[option] === player);

        if(hasWon) {
            showResult(pArray);
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
}

function showResult(array) {
    for(let p in array) {
        let item = document.querySelector(`div[data-item=${array[p]}]`);
        item.classList.add("won");
    }
}