// Start confetti effect when the page loads
function launchConfetti() {
    // Configuring the confetti settings
    confetti({
        particleCount: 150, // Increased particle count for more confetti
        spread: 90,
        origin: { y: 0.6 }
    });

    // Create a continuous confetti effect
    const duration = 5 * 1000; // Duration of 5 seconds
    const end = Date.now() + duration;

    const colors = ['#bb0000', '#ffffff', '#3333ff', '#ffcc00'];

    (function frame() {
        confetti({
            particleCount: 7, // Slightly higher count for each interval
            angle: 60,
            spread: 70, // Increased spread for a wider confetti range
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 70,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// Run the confetti function immediately when the script loads
launchConfetti();
