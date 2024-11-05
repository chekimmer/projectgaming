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
