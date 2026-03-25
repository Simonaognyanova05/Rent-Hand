const addBtn = document.querySelector(".add-time-btn");
const container = document.getElementById("timeSlots");

addBtn.addEventListener("click", () => {

    const div = document.createElement("div");

    div.classList.add("time-slot");

    div.innerHTML = `
<input type="datetime-local" name="availableTimes">
<button type="button" class="remove-btn">X</button>
`;

    container.appendChild(div);

    div.querySelector(".remove-btn").addEventListener("click", () => {
        div.remove();
    });

});

document.querySelectorAll(".remove-btn").forEach(btn => {

    btn.addEventListener("click", (e) => {
        e.target.parentElement.remove();
    });

});