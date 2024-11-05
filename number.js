const gameContainer = document.getElementById("game-container");
const restartButton = document.getElementById("restart-button");
const menuButton = document.getElementById("menu-button");
const homeButton = document.getElementById("home-button");
const timerDisplay = document.getElementById("timer-display");
const stageDisplay = document.getElementById("stage-display"); // New stage display
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let timer;
let seconds = 0;
let currentStage = 1;
const totalStages = 2; // Define the total number of stages

// Define arrays for each stage of numbers
const stages = [
    [ // Stage 1
        '1', '1', '2', '2', '3', '3', '4', '4', '5', '5',
    ],
    [ // Stage 2
        '6', '6', '7', '7', '8', '8', '9', '9', '10', '10'
    ]
];

function createCards() {
    const numbers = stages[currentStage - 1];
    const shuffledNumbers = shuffleArray(numbers);

    gameContainer.innerHTML = '';
    cards = [];
    shuffledNumbers.forEach(number => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.number = number;
        card.addEventListener("click", flipCard);
        gameContainer.appendChild(card);
        cards.push(card);
    });

    // Reset timer for the new game
    seconds = 0;
    timerDisplay.textContent = `Time: ${seconds} seconds`;
    clearInterval(timer);
    timer = setInterval(updateTimer, 400);

    // Update stage display
    stageDisplay.textContent = `Current Stage: ${currentStage} / ${totalStages}`;
}

// Shuffle the cards
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Update the timer
function updateTimer() {
    seconds++;
    timerDisplay.textContent = `Time: ${seconds} seconds`;
}

// Flip the card
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.number;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }
}

// Check for a match
function checkForMatch() {
    const isMatch = firstCard.dataset.number === secondCard.dataset.number;

    isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    resetBoard();
    checkForWin();
}

// Unflip cards if not matched
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 450);
}

// Reset the board for the next turn
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Check if all cards are matched
function checkForWin() {
    const matchedCards = document.querySelectorAll(".matched");
    if (matchedCards.length === cards.length) {
        clearInterval(timer);
        setTimeout(() => {
            if (currentStage < stages.length) {
                currentStage++;
                createCards();
            } else {
                window.location.href = 'congratulations.html';
            }
        }, 500);
    }
}

// Restart the game
function restartGame() {
    gameContainer.innerHTML = '';
    cards = [];
    firstCard = null;
    secondCard = null;
    currentStage = 1;
    createCards();
    menuButton.style.display = "none";
    restartButton.style.display = "none";
}

// Navigate back to the menu
function backToMenu() {
    window.location.href = 'index.html';
}

// Navigate back to the home page
function backToHome() {
    window.location.href = 'index.html';
}

// Event listener for the restart button
restartButton.addEventListener("click", restartGame);

// Event listener for the menu button
menuButton.addEventListener("click", backToMenu);

// Event listener for the home button
homeButton.addEventListener("click", backToHome);

// Start the game
createCards();


const musicButton = document.getElementById("music-button");
const musicIcon = document.getElementById("music-icon");
const audio = new Audio("piano.mp3");
audio.loop = true;
let isPlaying = false;

musicButton.addEventListener("click", toggleMusic);

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicIcon.src = "play.png"; // Update the icon to show 'play'
    } else {
        audio.play();
        musicIcon.src = "pause.png"; // Update the icon to show 'pause' (make sure to have this image)
    }
    isPlaying = !isPlaying;
}




