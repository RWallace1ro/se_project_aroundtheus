//export default function getCardElement(cardData) {
 // cardImageEl.addEventListener("click", () => {
//   handleCardClick(cardData);
 // });

  //cardImageEl.src = cardData.link;
 // cardImageEl.alt = cardData.name;
 // cardTitleEl.textContent = cardData.name;

 // return cardElement;
//}


const profileModalEditCloseButton =
  profileEditModal.querySelector(".modal__close");
const addCardModalEditCloseButton = addCardModal.querySelector(".modal__close")


_handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

_fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

_closeImagePreviewModal() {
  closePopup(previewImageModal);
}

previewImageModalCloseButton.addEventListener("click", () => {
  closeImagePreviewModal();
});

_handleModalClose(evt) {
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

addCardForm.addEventListener("submit", handleAddCardSubmit);

_handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: addCardTitle.value,
    link: addCardLink.value,
  };

  _cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
  addCardForm.reset();
  const cardFormSubmitButton = addCardModal.querySelector(".modal__button");
  toggleButtonState([addCardTitle, addCardLink], cardFormSubmitButton, config);
}

_handleEditClick = (modal) => {
  fillProfileForm();
  openPopup(modal);
};

profileEditButton.addEventListener("click", () => {
  handleEditClick(profileEditModal);
});

profileModalEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});
