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
        'alp/a.png', 'alp/a.png', 'alp/b.png', 'alp/b.png',
        'alp/c.png','alp/c.png','alp/d.png', 'alp/d.png'
    ],
    [ // Stage 2
        'alp/e.png', 'alp/e.png', 'alp/f.png', 'alp/f.png',
        'alp/g.png','alp/g.png','alp/h.png', 'alp/h.png'
    ],    
    [ // Stage 3
        'alp/i.png', 'alp/i.png', 'alp/j.png', 'alp/j.png', 
        'alp/k.png', 'alp/k.png', 'alp/l.png', 'alp/l.png'
    ],
   
    [ // Stage 4
        'alp/m.png', 'alp/m.png', 'alp/n.png', 'alp/n.png', 
        'alp/o.png', 'alp/o.png','alp/p.png', 'alp/p.png'
    ],
    [ // Stage 5
         'alp/q.png', 'alp/q.png','alp/r.png','alp/r.png',
        'alp/s.png', 'alp/s.png', ,'alp/t.png','alp/t.png' 
    ],
    [//stage 6
        'alp/u.png', 'alp/u.png','alp/v.png','alp/v.png', 
        'alp/w.png', 'alp/w.png','alp/x.png', 'alp/x.png'

    ],
    [//stage 7
        'alp/y.png', 'alp/y.png','alp/z.png','alp/z.png',
        'alp/w.png', 'alp/w.png','alp/x.png','alp/x.png'

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


