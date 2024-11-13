const gameContainer = document.getElementById("game-container");
const restartButton = document.getElementById("restart-button");
const homeButton = document.getElementById("home-button");
const timerDisplay = document.getElementById("timer-display");
const stageDisplay = document.createElement("div");
document.body.insertBefore(stageDisplay, gameContainer);

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let timer;
let seconds = 0;
let currentStage = 1;
const totalStages = 7; // Total number of stages

// Define arrays for each stage of images
const stages = [
    [ // Stage 1
        'jawi/alif.png', 'jawi/alif.png', 'jawi/baa.png', 'jawi/baa.png',
        'jawi/taa.png','jawi/taa.png','jawi/thaa.png', 'jawi/thaa.png'
    ],
    [ // Stage 2
        'jawi/haa.png', 'jawi/haa.png', 'jawi/khaa.png', 'jawi/khaa.png',
        'jawi/dall.png','jawi/dall.png','jawi/jeem.png', 'jawi/jeem.png'
    ],    
    [ // Stage 3
        'jawi/zai.png', 'jawi/zai.png', 'jawi/sin.png', 'jawi/sin.png', 
        'jawi/ra.png', 'jawi/ra.png', 'jawi/zal.png', 'jawi/zal.png'
    ],
   
    [ // Stage 4
        'jawi/to.png', 'jawi/to.png', 'jawi/sod.png', 'jawi/sod.png', 
        'jawi/dot.png', 'jawi/dot.png','jawi/shin.png', 'jawi/shin.png'
    ],
    [ // Stage 5
         'jawi/ain.png', 'jawi/ain.png','jawi/ghoin.png','jawi/ghoin.png',
        'jawi/fa.png', 'jawi/fa.png', ,'jawi/zo.png','jawi/zo.png' 
    ],
    [//stage 6
        'jawi/lam.png', 'jawi/lam.png','jawi/mem.png','jawi/mem.png', 
        'jawi/kaaf.png', 'jawi/kaaf.png',,'jawi/qaaf.png', 'jawi/qaaf.png'

    ],
    [//stage 7
        'jawi/ha.png', 'jawi/ha.png','jawi/ya.png','jawi/ya.png',
        'jawi/noon.png', 'jawi/noon.png','jawi/waow.png','jawi/waow.png'

    ]
];

function createCards() {
    const images = stages[currentStage - 1]; // Get images for the current stage
    const shuffledImages = shuffleArray(images); // Shuffle images

    gameContainer.innerHTML = ''; // Clear previous cards
    cards = []; // Reset the cards array
    shuffledImages.forEach(imageSrc => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = imageSrc;

        const img = document.createElement("img");
        img.src = imageSrc;
        card.appendChild(img);

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
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    
    // Mark cards as matched
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
        resetBoard();
    }, 450);
}

// Reset the board for the next turn
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Check if all cards are matched
function checkForWin() {
    const matchedCards = document.querySelectorAll(".card.matched");
    
    if (matchedCards.length === cards.length) {
        clearInterval(timer); // Stop the timer

        setTimeout(() => {
            if (currentStage < totalStages) {
                currentStage++; // Move to the next stage
                createCards(); // Create cards for the next stage
            } else {
                // Redirect to the congratulation page after completing all stages
                window.location.href = `congratulations.html?time=${seconds}`; // Pass the time as a URL parameter
            }
        }, 500); // Wait for 1 second before moving to the next stage
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
    restartButton.style.display = "none"; // Hide restart button
    homeButton.style.display = "none"; // Hide home button
}


restartButton.addEventListener("click", restartGame);

// Event listener for the home button
homeButton.addEventListener("click", function() {
    window.location.href = 'index.html'; // Change to your home page URL
});

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


