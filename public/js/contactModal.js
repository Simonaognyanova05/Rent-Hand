const contactBtn = document.querySelector(".contact-btn");
const modal = document.querySelector(".contact-modal");
const loginModal = document.querySelector(".login-modal");

const closeBtn = document.querySelector(".close-btn");
const closeLoginBtn = document.querySelector(".close-login-btn");

const isLogged = document.body.dataset.user === "true";


if (contactBtn) {

    contactBtn.addEventListener("click", () => {

        if (isLogged) {
            modal.classList.remove("hidden");
        } else {
            loginModal.classList.remove("hidden");
        }

    });

}


if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

if (closeLoginBtn) {
    closeLoginBtn.addEventListener("click", () => {
        loginModal.classList.add("hidden");
    });
}