document.addEventListener("DOMContentLoaded", function () {
    // Must match the reveal time in login.js.
    // The date is interpreted in the visitor's local timezone.
    const revealTime = new Date(2026, 10, 8, 0, 0, 0, 0).getTime();

    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    function goToHomePage() {
        // Let the homepage attempt to start the background music.
        sessionStorage.setItem("startDiwaliMusic", "true");
        window.location.replace("home.html");
    }

    function updateCountdown() {
        const remaining = revealTime - Date.now();

        if (remaining <= 0) {
            goToHomePage();
            return;
        }

        const totalSeconds = Math.floor(remaining / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }

    // If the deadline has already passed, do not show the timer.
    updateCountdown();

    // Update once per second while the countdown is active.
    const countdownInterval = window.setInterval(function () {
        if (Date.now() >= revealTime) {
            window.clearInterval(countdownInterval);
        }
        updateCountdown();
    }, 1000);
});
