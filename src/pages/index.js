import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, selectors } from "../utils/constants.js";
import { validationSettings } from "../utils/constants.js";

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Element                                                  */
/*---------------------------------------------------------------------------------------------------------*/

//Buttons and other DOM nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");

const addNewCardButton = document.querySelector(".profile__add-button");

//Form data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardForm = addCardModal.querySelector(".modal__form");

const profileEditForm = profileEditModal.querySelector(".modal__form");

/*----------------------------------------------------------------------------------------------------------*/
/*                                                 Validation                                                                                       */
/*--------------------------------------------------------------------------------------------------------- */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
}
/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Handlers                                           */
/*---------------------------------------------------------------------------------------------------------*/
const userInfo = new UserInfo(".profile__title", ".profile__description");

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData.title, formData.description);
  formProfileEditModal.close();
}

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Listeners                                          */
/*---------------------------------------------------------------------------------------------------------*/
const handleEditClick = () => {
  fillProfileForm();
  formProfileEditModal.open();
};

profileEditButton.addEventListener("click", handleEditClick);

function handleAddCardSubmit({ title, description }) {
  const cardData = {
    name: title,
    link: description,
  };

  const card = renderCard(cardData);
  cardSection.addItem(card);
  addCardPopup.close();
}

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addFormValidator.toggleButtonState();
});

function renderCard(cardData) {
  const card = new Card(cardData, selectors.cardTemplate, (imgData) => {
    cardPreviewImageModal.open(imgData);
  });

  return card.getView();
}

const cardPreviewImageModal = new PopupWithImage(selectors);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const renderCard = new Card(data, selectors.cardTemplate, (imgData) => {
        cardPreviewImageModal.open(imgData);
      });

      cardSection.addItem(renderCard.getView());
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

//eventListerners for opening profile and add card modals/popups
const formProfileEditModal = new PopupWithForm(
  selectors.profileEditModal,
  handleProfileEditSubmit
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

export { cardPreviewImageModal };
export { formProfileEditModal };
