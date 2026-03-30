const isLoggedIn = document.body.dataset.user === "true";

document.addEventListener("DOMContentLoaded", () => {

    const isLoggedIn = document.body.dataset.user === "true";

    const bookButtons = document.querySelectorAll(".book-btn");
    const loginModal = document.querySelector(".login-modal");

    bookButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {

            if (!isLoggedIn) {
                e.preventDefault();
                loginModal.classList.remove("hidden");
            }
        });
    });

});

const bookButtons = document.querySelectorAll(".book-btn");
const loginModal = document.querySelector(".login-modal");

bookButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {

        if (!isLoggedIn) {
            e.preventDefault(); // спира линка
            loginModal.classList.remove("hidden");
        }
    });
});
