import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { closePopup } from "../utils/utils.js";
import "./index.css";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfor.js";

export const initialCards = [
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

export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  previewImageModal: "#preview-image-modal",
  previewImage: ".modal__image",
  previewImageCaption: ".modal__caption",
  profileEditModal: "#profile-edit-modal",
  userInfoProfileTitle: "#profile-title-input",
  userInfoProfileDescription: "#profile-description-input",
};

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Element                                                  */
/*---------------------------------------------------------------------------------------------------------*/

//Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

//Form data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardForm = addCardModal.querySelector(".modal__form");

// const addCardTitle = addCardForm.querySelector("#add-card-input");
// const addCardLink = addCardForm.querySelector("#description-input");

//const previewImageModal = document.querySelector("#preview-image-modal");

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

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Handlers                                           */
/*---------------------------------------------------------------------------------------------------------*/

// function handleProfileEditSubmit(e) {
//   console.log(e);
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   //closePopup(profileEditModal);
//   formProfileEditModal.close();
// }

//function handlePreviewImageModal(e) {
//
/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Listeners                                          */
/*---------------------------------------------------------------------------------------------------------*/
const handleEditClick = () => {
  fillProfileForm();
  //openPopup(modal);
  formProfileEditModal.open();
};

profileEditButton.addEventListener("click", () => {
  handleEditClick(profileEditModal);
});

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//addCardForm.addEventListener("submit", handleAddCardSubmit);

function handleAddCardSubmit({ title, description }) {
  const cardData = {
    name: title,
    link: description,
  };

  const cardElement = renderCard(cardData);
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
  //addCardModal.close();
  addCardForm.reset();
  addFormValidator.toggleButtonState();
}
addNewCardButton.addEventListener("click", () =>
  //openPopup(addCardModal));
  addCardPopup.open()
);

// initialCards.forEach((cardData) => {
//   const cardElement = renderCard(cardData);
//   cardListEl.prepend(cardElement);
// });

function renderCard(cardData) {
  //const card = new Card(cardData, "#card-template");
  const card = new Card(cardData, selectors.cardTemplate, (imgData) => {
    cardPreviewImageModal.open(imgData);
    // const handleImageClick
  });

  return card.getView();
}
// const renderCard = (cardData) => {
//   const card = new Card(cardData, handleImageClick, cardSelector);
//   return card.getView{};
// };

const cardPreviewImageModal = new PopupWithImage(selectors);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardEl = new Card(data, selectors.cardTemplate, (imgData) => {
        cardPreviewImageModal.open(imgData);
      });

      cardSection.addItem(cardEl.getView());
    },
  },
  selectors.cardSection
);
//codes to initialize all instances
cardSection.renderItems();
cardPreviewImageModal.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);

addCardPopup.setEventListeners();

//addCardModal.close();

//Remaining codes
//eventListerners for opening profile and add card modals/popups
const formProfileEditModal = new PopupWithForm(
  selectors.profileEditModal
  //handleProfileEditSubmit
);
formProfileEditModal.setEventListeners();
const formSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const formEl = new Card(data, selectors.cardTemplate, (formData) => {
        formProfileEditModal.open(formData);
      });

      formSection.addItem(formEl.getView());
    },
  },
  selectors.formSection
);

const handleProfileEditSubmit = new UserInfo(profileTitle, profileDescription);
this.userInfo = profileTitle.querySelector("#profile-title-input");
this.userInfo = profileDescription.querySelector("#profile-description-input");
formProfileEditModal.close();
handleProfileEditSubmit();

//  const userInfo = new UserInfo(
//   document.

const userInfo = userInfo.getUserInfo();
//const userInfo = UserInfo.setUserInfo();

export { cardPreviewImageModal };
export { formProfileEditModal };
