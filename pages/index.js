import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { closePopup, openPopup } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Element                                                  */
/*---------------------------------------------------------------------------------------------------------*/

//Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
//const profileModalEditCloseButton =
// profileEditModal.querySelector(".modal__close");
//const addCardModalEditCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

//Form data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardForm = addCardModal.querySelector(".modal__form");

const addCardTitle = addCardForm.querySelector("#add-card-input");
const addCardLink = addCardForm.querySelector("#description-input");

const previewImageModal = document.querySelector("#preview-image-modal");
//const previewImageModalCloseButton =
// previewImageModal.querySelector(".modal__close");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

/*----------------------------------------------------------------------------------------------------------*/
/*                                                 Validation                                                                                       */
/*--------------------------------------------------------------------------------------------------------- */

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disable",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

//function closeImagePreviewModal() {
//closePopup(previewImageModal);
//}

// previewImageModalCloseButton.addEventListener("click", () => {
//   closeImagePreviewModal();
// });

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Handlers                                           */
/*---------------------------------------------------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Listeners                                          */
/*---------------------------------------------------------------------------------------------------------*/
const handleEditClick = (modal) => {
  fillProfileForm();
  openPopup(modal);
};

profileEditButton.addEventListener("click", () => {
  handleEditClick(profileEditModal);
});

// profileModalEditCloseButton.addEventListener("click", () => {
//   closePopup(profileEditModal);
// });

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: addCardTitle.value,
    link: addCardLink.value,
  };

  const cardElement = renderCard(cardData);
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
  addCardForm.reset();
  addFormValidator.toggleButtonState();
}

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
// addCardModalEditCloseButton.addEventListener("click", () =>
//   closePopup(addCardModal)
// );

initialCards.forEach((cardData) => {
  const cardElement = renderCard(cardData);
  cardListEl.prepend(cardElement);
});

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.getView();
}

export { previewImageModal };
