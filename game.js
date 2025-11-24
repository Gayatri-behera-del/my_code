const grid = document.getElementById('game-grid');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let timeLeft = 30;
let timerInterval;
let gameActive = false;

let targetId = -1;
let trapId = -1;
const totalBlocks = 16;

// Utility to get a random ID from 1 to 16
const getRandomId = () => Math.floor(Math.random() * totalBlocks) + 1;

// --- CORE GAME LOGIC ---

/** Sets the random target and trap blocks */
function setNewBlocks() {
    // Remove existing classes from all blocks
    document.querySelectorAll('.block').forEach(block => {
        block.classList.remove('target-block', 'trap-block');
    });

    // Get two unique random IDs
    targetId = getRandomId();
    do {
        trapId = getRandomId();
    } while (trapId === targetId);

    // Apply new classes to the selected blocks
    document.querySelector('.block[data-id="${targetId}"]').classList.add('target-block');
    document.querySelector('.block[data-id="${trapId}"]').classList.add('trap-block');
}
 
/** Handles block clicks */
function handleBlockClick(event) {
    if (!gameActive || !event.target.classList.contains('block')) return;

    const clickedId = parseInt(event.target.dataset.id);

    if (clickedId === targetId) {
        // Correct click: increase score and shift blocks
        score += 10;
        scoreDisplay.textContent = score;
        setNewBlocks(); 
    } else if (clickedId === trapId) {
        // Trap click: game over
        gameOver(false);
    } else {
        // Passive block click: penalty
        score = Math.max(0, score - 5);
        scoreDisplay.textContent = score;
    }
}

/** Starts the timer */
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            gameOver(true);
        }
    }, 1000);
}

/** Initializes the game grid (16 blocks) */
function initializeGrid() {
    grid.innerHTML = ''; // Clear previous grid
    for (let i = 1; i <= totalBlocks; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.dataset.id = i;
        grid.appendChild(block);
    }
}

/** Starts a new game */
function startGame() {
    gameActive = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    clearInterval(timerInterval); // Clear any running timer
    initializeGrid();
    setNewBlocks();
    startTimer();
    restartBtn.textContent = 'Restart Game';
}

/** Ends the game */
function gameOver(timeUp) {
    gameActive = false;
    clearInterval(timerInterval);

    if (timeUp) {
        alert( 'Times up! Final Score: ${score}' );
    } else {
        alert( 'Game Over! You hit the TRAP! Final Score: ${score}');
    }
    restartBtn.textContent = 'Play Again';
}

// --- EVENT LISTENERS ---
// Event delegation: listen for clicks on the grid container
grid.addEventListener('click', handleBlockClick); 
restartBtn.addEventListener('click', startGame);

// Start the game when the page loads
startGame();