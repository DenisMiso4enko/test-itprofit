const modalMessage = document.getElementById("modal-message");
const closeButton = document.querySelector(".close-button");

export function openModal(message) {
  modalMessage.textContent = message;
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  document.body.classList.add("modal-open");
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  document.body.classList.remove("modal-open");
  modal.style.display = "none";
  overlay.style.display = "none";
}

closeButton.addEventListener("click", closeModal);
