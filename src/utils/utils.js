const modals = document.querySelectorAll(".modal");

function handleModalClose(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeModalKeypress);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalKeypress);
}

function closeModalKeypress(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

export { closePopup, openPopup };
