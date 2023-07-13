function handleModalClose(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__form-close-button")
  ) {
    closePopup(evt.currentTarget);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

const modals = document.querySelectorAll(".modal");

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
 closePopup(profileEditModal);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: addCardTitle.value,
    link: addCardLink.value,
  };

  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
  addCardForm.reset();
  const cardFormSubmitButton = addCardModal.querySelector(".modal__button");
  toggleButtonState([addCardTitle, addCardLink], cardFormSubmitButton, config);
}

addCardForm.addEventListener("submit", handleAddCardSubmit);

function handleCardClick(data) {
 popupCaption.textContent = data.name;
 popupImage.src = data.link;
popupImage.alt = data.name;

openPopup(previewImageModal);
}

cardImageEl.addEventListener("click", () => {
  handleCardClick(cardData);
});

export default utils { closePopup, openPopup, handle };
