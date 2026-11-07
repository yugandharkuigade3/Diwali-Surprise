// ===================================
// LOGIN CREDENTIALS
// ===================================

const VALID_USERNAME = "Tejaswini";
const VALID_PASSWORD = "Tejaa1306";

// Midnight deadline: 12:00 AM at the start of November 8, 2026.
// This uses the visitor's local device timezone.
const REVEAL_TIME = new Date(2026, 10, 8, 0, 0, 0, 0);

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const loginButton = document.getElementById("loginButton");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredUsername = document.getElementById("username").value.trim();
    const enteredPassword = document.getElementById("password").value;

    if (
        enteredUsername === VALID_USERNAME &&
        enteredPassword === VALID_PASSWORD
    ) {
        errorMessage.style.color = "#a8f0b0";
        errorMessage.textContent = "✨ Welcome! Opening your surprise...";

        loginButton.disabled = true;
        loginButton.textContent = "Unlocking... ❤️";

        setTimeout(function () {
            if (Date.now() >= REVEAL_TIME.getTime()) {
                // The reveal time has passed: open the Diwali homepage.
                sessionStorage.setItem("startDiwaliMusic", "true");
                window.location.href = "home.html";
            } else {
                // Before midnight: show the countdown page.
                window.location.href = "timer.html";
            }
        }, 800);
    } else {
        errorMessage.style.color = "#ff9c9c";
        errorMessage.textContent =
            "Oops! Those details don't match. Try again ❤️";

        document.getElementById("password").value = "";
    }
});
