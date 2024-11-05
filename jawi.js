const gameContainer = document.getElementById("game-container");
const restartButton = document.getElementById("restart-button");
const menuButton = document.getElementById("menu-button");
const homeButton = document.getElementById("home-button");
const timerDisplay = document.getElementById("timer-display");
const stageDisplay = document.getElementById("stage-display");
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let timer;
let seconds = 0;
let currentStage = 1;
const totalStages = 5; // Total number of stages

// Jawi letters array divided into stages
const jawiStages = [
    ['ج', 'ح', 'خ', 'د', 'ذ'], // Stage 1
    ['ر', 'ز', 'س', 'ش', 'ص'], // Stage 2
    ['ض', 'ط', 'ظ', 'ع', 'غ'], // Stage 3
    ['ف', 'ق', 'ك', 'ل', 'م'], // Stage 4
    ['ن', 'هـ', 'و', 'ي', 'أ']  // Stage 5
];

function createCards() {
    const letters = jawiStages[currentStage - 1];
    const shuffledLetters = shuffleArray(letters.concat(letters)); // Create pairs and shuffle

    gameContainer.innerHTML = ''; // Clear previous cards
    cards = []; // Reset the cards array
    shuffledLetters.forEach(letter => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.letter = letter;
        card.addEventListener("click", flipCard);
        gameContainer.appendChild(card);
        cards.push(card);
    });

    // Reset timer for the new game
    seconds = 0;
    timerDisplay.textContent = `Time: ${seconds} seconds`;
    stageDisplay.textContent = `Current Stage: ${currentStage} / ${totalStages}`; // Update stage display with total stages
    clearInterval(timer);
    timer = setInterval(updateTimer, 400);
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
    this.textContent = this.dataset.letter;

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
    const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

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
        clearInterval(timer); // Stop the timer
        setTimeout(() => {
            if (currentStage < totalStages) {
                currentStage++; // Move to the next stage
                createCards(); // Create cards for the next stage
            } else {
                // Redirect to the congratulation page after completing all stages
                window.location.href = 'congratulations.html'; // Change to your congratulations page URL
            }
        }, 500); // Wait for 0.5 seconds before progressing
    }
}

// Restart the game
function restartGame() {
    gameContainer.innerHTML = '';
    cards = [];
    firstCard = null;
    secondCard = null;
    currentStage = 1; // Reset to the first stage
    createCards(); // Create cards for the game
    menuButton.style.display = "none"; // Hide menu button
    restartButton.style.display = "none"; // Hide restart button
}

// Navigate back to the menu
function backToMenu() {
    window.location.href = 'index.html'; // Change to the appropriate menu URL
}

// Navigate back to the home page
function backToHome() {
    window.location.href = 'index.html'; // Change to your home page URL
}

// Event listener for the restart button
restartButton.addEventListener("click", restartGame);

// Event listener for the menu button
menuButton.addEventListener("click", backToMenu);

// Event listener for the home button (using the transparent "return.png" image as a button)
homeButton.addEventListener("click", backToHome); // Ensure the home button works

// Start the game
createCards();



