const btn = document.querySelector(".menu-btn");
const menu = document.querySelector(".nav-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("active");
});