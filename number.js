const gameContainer = document.getElementById("game-container");
const restartButton = document.getElementById("restart-button");
const menuButton = document.getElementById("menu-button");
const homeButton = document.getElementById("home-button"); // New button
const timerDisplay = document.getElementById("timer-display");
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let timer; // Timer variable
let seconds = 0; // Seconds counter
let currentStage = 1; // Track the current stage

// Define arrays for each stage of numbers
const stages = [
    [ // Stage 1
        '1', '1', '2', '2', '3', '3', '4', '4', '5', '5', // Stage 1 with pairs of numbers 1-5
    ],
    [ // Stage 2
        '6', '6', '7', '7', '8', '8', '9', '9', '10', '10' // Stage 2 with pairs of numbers 6-10
    ]
];

function createCards() {
    const numbers = stages[currentStage - 1]; // Get numbers for the current stage
    const shuffledNumbers = shuffleArray(numbers); // Shuffle numbers

    gameContainer.innerHTML = ''; // Clear previous cards
    cards = []; // Reset the cards array
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
    timer = setInterval(updateTimer, 1000);
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
            if (currentStage < stages.length) {
                currentStage++; // Move to the next stage
                createCards(); // Create cards for the next stage
            } else {
                // Redirect to the congratulation page after completing all stages
                window.location.href = 'congratulations.html'; // Change to your congratulations page URL
            }
        }, 1000); // Wait for 1 second before moving to the next stage
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

// Event listener for the home button
homeButton.addEventListener("click", backToHome); // Add event listener for home button

// Start the game
createCards();
