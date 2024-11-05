const homeButton = document.getElementById("home-button");

// Navigate to the home page
homeButton.addEventListener("click", function() {
    window.location.href = 'index.html'; // Change to your home page URL
});
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5; // Vary size for more dynamic effect
        this.color = getRandomColor();
        this.speed = Math.random() * 3 + 2; // Increase speed for lively falling
        this.rotation = Math.random() * Math.PI * 2;
        this.shape = Math.random() > 0.5 ? 'rectangle' : 'circle'; // Randomize shape
    }

    update() {
        this.y += this.speed;
        this.rotation += 0.1; // Rotate slightly
        if (this.y > canvas.height) {
            this.y = Math.random() * -canvas.height; // Reset to the top
            this.x = Math.random() * canvas.width; // Randomize x position
            this.color = getRandomColor(); // Randomize color
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        
        if (this.shape === 'rectangle') {
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

function getRandomColor() {
    const colors = [
        '#FFC700', // Yellow
        '#FF3D00', // Red
        '#4CAF50', // Green
        '#2196F3', // Blue
        '#FFEB3B', // Bright Yellow
        '#FF5722', // Orange
        '#9C27B0', // Purple
        '#00BCD4', // Cyan
        '#FF9800', // Deep Orange
        '#673AB7'  // Indigo
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfetti() {
    for (let i = 0; i < 300; i++) { // Increase number of confetti pieces
        confettiPieces.push(new ConfettiPiece());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confettiPieces.length; i++) {
        confettiPieces[i].update();
        confettiPieces[i].draw();
    }
    requestAnimationFrame(animate);
}

createConfetti();
animate();




