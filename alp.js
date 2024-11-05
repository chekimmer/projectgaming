const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const gameContainer = document.getElementById("game-container");
const restartButton = document.getElementById("restart-button");
const homeButton = document.getElementById("home-button");
const menuButton = document.getElementById("menu-button");
const stageDisplay = document.getElementById("stage-display");
const timerDisplay = document.getElementById("timer-display");

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let currentStage = 1;
const stageSizes = [4, 4, 4, 4, 4]; // 4 unique letters per stage to make 8 cards per stage
let timer;
let seconds = 0;

// Create cards for the current stage
function createCards() {
    let stageAlphabet;
    const startIndex = stageSizes.slice(0, currentStage - 1).reduce((a, b) => a + b, 0);

    stageAlphabet = alphabet.slice(startIndex, startIndex + stageSizes[currentStage - 1]); // Get 4 letters for the current stage

    const shuffledAlphabet = shuffleArray(stageAlphabet.split('').concat(stageAlphabet.split(''))); // Create pairs

    gameContainer.innerHTML = '';
    cards = [];
    shuffledAlphabet.forEach(letter => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.letter = letter;
        card.addEventListener("click", flipCard);
        gameContainer.appendChild(card);
        cards.push(card);
    });

    // Reset timer for the new stage
    seconds = 0;
    timerDisplay.textContent = `Time: ${seconds} seconds`;
    clearInterval(timer);
    timer = setInterval(updateTimer, 400);
    stageDisplay.textContent = `Current Stage: ${currentStage} / ${stageSizes.length}`; // Update stage display

    menuButton.style.display = "inline";
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
        clearInterval(timer);
        setTimeout(() => {
            if (currentStage < stageSizes.length) {
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
    restartButton.style.display = "none";
    homeButton.style.display = "none";
    menuButton.style.display = "none";
    createCards();
}

// Navigate to the home page
function returnToHome() {
    window.location.href = 'index.html';
}

// Navigate back to the menu
function backToMenu() {
    restartGame();
    window.location.href = 'index.html';
}

// Event listener for the restart button
restartButton.addEventListener("click", restartGame);

// Event listener for the home button
homeButton.addEventListener("click", returnToHome);

// Event listener for the menu button
menuButton.addEventListener("click", backToMenu);

// Start the game
createCards();




