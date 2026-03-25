const addBtn = document.querySelector(".add-time-btn");
const container = document.getElementById("timeSlots");

function createTimeSlot() {

    const div = document.createElement("div");
    div.classList.add("time-slot");

    const input = document.createElement("input");
    input.type = "datetime-local";
    input.name = "availableTimes";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "X";

    removeBtn.addEventListener("click", () => {
        div.remove();
    });

    div.appendChild(input);
    div.appendChild(removeBtn);

    return div;
}

if (addBtn) {
    addBtn.addEventListener("click", () => {
        container.appendChild(createTimeSlot());
    });
}