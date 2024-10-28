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
let currentStage = 1; // Track the current stage
const stageSizes = [5, 5, 5, 5, 6]; // Number of unique letters in each stage
let timer; // Timer variable
let seconds = 0; // Seconds counter

// Create cards for the current stage
function createCards() {
    let stageAlphabet;
    const startIndex = stageSizes.slice(0, currentStage - 1).reduce((a, b) => a + b, 0); // Calculate start index

    if (currentStage === 1) {
        stageAlphabet = alphabet.slice(0, stageSizes[0]); // A-E
    } else if (currentStage === 2) {
        stageAlphabet = alphabet.slice(startIndex, startIndex + stageSizes[1]); // F-J
    } else if (currentStage === 3) {
        stageAlphabet = alphabet.slice(startIndex, startIndex + stageSizes[2]); // K-O
    } else if (currentStage === 4) {
        stageAlphabet = alphabet.slice(startIndex, startIndex + stageSizes[3]); // P-T
    } else {
        stageAlphabet = alphabet.slice(startIndex); // U-Z
    }

    const shuffledAlphabet = shuffleArray(stageAlphabet.split('').concat(stageAlphabet.split(''))); // Create pairs

    gameContainer.innerHTML = ''; // Clear previous cards
    cards = []; // Reset the cards array for the new stage
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
    timer = setInterval(updateTimer, 1000);
    stageDisplay.textContent = `Current Stage: ${currentStage}`; // Update stage display

    menuButton.style.display = "inline"; // Show back to menu button
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
    }, 1000);
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
            if (currentStage < 5) {
                // Automatically progress to the next stage after a delay
                currentStage++; // Move to the next stage
                createCards(); // Create cards for the next stage
            } else {
                // Redirect to the congratulation page after completing all stages
                window.location.href = 'congratulations.html'; // Change to your congratulations page URL
            }
        }, 2000); // Wait for 2 seconds before progressing to the next stage
    }
}

// Restart the game
function restartGame() {
    gameContainer.innerHTML = '';
    cards = [];
    firstCard = null;
    secondCard = null;
    currentStage = 1; // Reset to the first stage
    restartButton.style.display = "none";
    homeButton.style.display = "none"; // Hide return button
    menuButton.style.display = "none"; // Hide menu button
    createCards(); // Create cards for the first stage
}

// Navigate to the home page (or any designated page)
function returnToHome() {
    window.location.href = 'index.html'; // Change to the appropriate home page URL
}

// Navigate back to the menu
function backToMenu() {
    restartGame(); // Reset game state
    window.location.href = 'index.html'; // Change to the appropriate menu URL
}

// Event listener for the restart button
restartButton.addEventListener("click", restartGame);

// Event listener for the home button
homeButton.addEventListener("click", returnToHome);

// Event listener for the menu button
menuButton.addEventListener("click", backToMenu);

// Start the game
createCards();
