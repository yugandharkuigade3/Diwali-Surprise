document.addEventListener("DOMContentLoaded", function () {

    // Message popup
    const messageButton = document.getElementById("messageButton");
    const closeMessage = document.getElementById("closeMessage");
    const messageOverlay = document.getElementById("messageOverlay");

    if (messageButton && closeMessage && messageOverlay) {
        function showMessage() {
            messageOverlay.classList.add("show");
            messageOverlay.setAttribute("aria-hidden", "false");
            closeMessage.focus();
        }

        function hideMessage() {
            messageOverlay.classList.remove("show");
            messageOverlay.setAttribute("aria-hidden", "true");
            messageButton.focus();
        }

        messageButton.addEventListener("click", showMessage);
        closeMessage.addEventListener("click", hideMessage);

        messageOverlay.addEventListener("click", function (event) {
            if (event.target === messageOverlay) hideMessage();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && messageOverlay.classList.contains("show")) {
                hideMessage();
            }
        });
    } else {
        console.error("Message popup elements are missing. Check home.html IDs.");
    }

    // Background music
    const audio = document.getElementById("backgroundMusic");
    const toggle = document.getElementById("musicToggle");
    const icon = document.getElementById("musicIcon");
    const status = document.getElementById("musicStatus");

    if (!audio || !toggle || !icon || !status) {
        console.error("Music player elements are missing. Check home.html.");
        return;
    }

    audio.volume = 0.35;

    function updatePlayer() {
        const playing = !audio.paused && !audio.ended;
        icon.textContent = playing ? "Ⅱ" : "▶";
        status.textContent = playing ? "Now playing" : "Tap to play";
        toggle.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
        toggle.setAttribute("aria-pressed", String(playing));
    }

    toggle.addEventListener("click", async function () {
        if (audio.paused) {
            try {
                await audio.play();
            } catch (error) {
                console.error("Unable to play background music:", error);
                status.textContent = "Playback unavailable";
            }
        } else {
            audio.pause();
        }
        updatePlayer();
    });

    audio.addEventListener("play", updatePlayer);
    audio.addEventListener("pause", updatePlayer);
    audio.addEventListener("ended", updatePlayer);
    audio.addEventListener("error", function () {
        status.textContent = "Audio could not load";
        console.error("The Cloudinary audio file could not be loaded.");
    });

    // Try autoplay after successful login. Browsers may block audible autoplay.
    if (sessionStorage.getItem("startDiwaliMusic") === "true") {
        sessionStorage.removeItem("startDiwaliMusic");
        audio.play().then(updatePlayer).catch(function (error) {
            updatePlayer();
            console.info("Autoplay was blocked; visitor can tap Play.", error);
        });
    } else {
        updatePlayer();
    }
});
