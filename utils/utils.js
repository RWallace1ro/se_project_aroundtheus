function handleModalClose(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__form-close-button")
  ) {
    closePopup(evt.currentTarget);
  }
}

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

_handleEditClick = (modal) => {
  fillProfileForm();
  openPopup(modal);
};

profileModalEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

export { closePopup, openPopup, handle };
