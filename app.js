let total = 0;
const afficherConfirmation = true;
const reserveButton = document.querySelector("#reserve");
const resetButton = document.querySelector("#reset");
const totalOutput = document.querySelector("#total");
const confirmation = document.querySelector("#confirmation");

function updatePage() {
    totalOutput.textContent = `Places réservées : ${total}`;
    confirmation.hidden = !afficherConfirmation || total === 0;
    confirmation.textContent = `Réservation confirmée. Places réservées : ${total}`;
}

reserveButton.addEventListener("click", () => {
    total += 1;
    updatePage();
});

resetButton.addEventListener("click", () => {
    total = 0;
    updatePage();
});
