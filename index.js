const musicButton = document.getElementById("music-button");
const musicIcon = document.getElementById("music-icon");
const audio = new Audio("piano.mp3");
audio.loop = true;
let isPlaying = false;

musicButton.addEventListener("click", toggleMusic);

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicIcon.src = "play.png"; 
    } else {
        audio.play();
        musicIcon.src = "pause.png"; 
    }
    isPlaying = !isPlaying;
}
