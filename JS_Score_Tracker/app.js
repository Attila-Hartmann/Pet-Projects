// GAME SETUP
const p1 = {
    id: 1,
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    name: document.querySelector('#p1Name'),
    colorTheme: "is-primary"
}
const p2 = {
    id: 2,
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    name: document.querySelector('#p2Name'),
    colorTheme: "is-info"
}

const p1NameInput = document.querySelector('#p1NameInput')
const p2NameInput = document.querySelector('#p2NameInput')
const gameStartCont = document.querySelector('#gameStart');
const startButton = document.querySelector('#startBtn');
const winnerModalContainer = document.querySelector('#winModalContainer');
const winnerModalNoti = document.querySelector('.notification');
const winnerModalMessage = document.querySelector('#winModalMessage');
const closeModalBtn = document.querySelector('#delete');
const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');

let winningScore = 3;
let isGameOver = false;

function disableButtons() {
    p1.button.disabled = true;
    p2.button.disabled = true;
}

function enableButtons() {
    p1.button.disabled = false;
    p2.button.disabled = false;
}

p1NameInput.addEventListener('input', function(e) {
    p1.name.textContent = p1NameInput.value
})

p2NameInput.addEventListener('input', function(e) {
    p2.name.textContent = p2NameInput.value
})

// GAMEPLAY
disableButtons()

startButton.addEventListener('click', function() {
    gameStartCont.classList.add('hide');
    enableButtons()
})

winningScoreSelect.addEventListener('change', function() {
    winningScore  = parseInt(this.value);
    reset()
})

function updateScores(player, opponent) {
    if(!isGameOver) {
        player.score++;
        if(player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            winnerModalContainer.classList.add('is-active');
            winnerModalNoti.classList.add(player.colorTheme)
            winnerModalMessage.textContent = `CONGRATS ${player.name.textContent}, YOU WON!` 
        }
        player.display.textContent = player.score
    }
}

p1.button.addEventListener('click', function() {
    updateScores(p1,p2)
})
p2.button.addEventListener('click', function() {
    updateScores(p2,p1)
})

// CLOSING WINNER MODAL
closeModalBtn.addEventListener('click', function() {
    winnerModalContainer.classList.remove('is-active');
})

// RESETTING GAME
resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    for(let p of [p1,p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.name.textContent = `Player ${p.id}`;
        gameStartCont.classList.remove('hide');
        winnerModalNoti.classList.remove(p.colorTheme)
    };
    p1NameInput.value = "";
    p2NameInput.value = "";
    disableButtons()
}