import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, selectors } from "../utils/constants.js";
import { validationSettings } from "../utils/constants.js";
import { Api } from "../components/Api.js";
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

function handleDeleteClick() {
  deleteModal.open();
  const id = cardElement.getID();
  api.deleteCard(id).then(() => {
    cardElement.handleDeleteButton();
    deleteModal.close();
  });
}

function handleLikeClick() {
  const id = cardElement.getID();
  if (cardElement.isLiked()) {
    api
      .unlikeCard(id)
      .then((data) => {
        cardelement.setlikes(data.likes);
      })
      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(id)
      .then((data) => {
        cardElement.setlikes(data.likes);
      })
      .catch((err) => console.error(err));
  }
}

function handleImageClick() {
  cardPreviewImageModal.open(imageData);
}
/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Listeners                                          */
/*---------------------------------------------------------------------------------------------------------*/
const handleEditClick = () => {
  fillProfileForm();
  formProfileEditModal.open();
};

profileEditButton.addEventListener("click", handleEditClick);

// function handleAddCardSubmit({ title, description }) {
//   const cardData = {
//     name: title,
//     link: description,
//   };

//   const card = renderCard(cardData);
//   cardSection.addItem(card);
//   addCardPopup.close();
// }

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addFormValidator.toggleButtonState();
});

function renderCard(cardData) {
  const card = new Card(
    cardData,
    selectors.cardTemplate,
    handleDeleteClick,
    handleLikeClick,
    handleImageClick,
    (imgData) => {
      cardPreviewImageModal.open(imgData);
    }
  );
  return card.getView();
}

const cardPreviewImageModal = new PopupWithImage(selectors);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = renderCard(data);
      cardSection.addItem(card);
    },
  },
  selectors.cardSection
);
//codes to initialize all instances
cardSection.renderItems();
cardPreviewImageModal.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

addCardPopup.setEventListeners();

//eventListerners for opening profile and add card modals/popups
const formProfileEditModal = new PopupWithForm(
  selectors.profileEditModal,
  handleProfileEditSubmit
);
formProfileEditModal.setEventListeners();

//Api

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
    "Content-Type": "application/json",
  },
});

function handleAddCardFormSubmit(cardData) {
  addCardPopup.setLoading(true);
  api
    .addCard(cardData)
    .then((res) => {
      renderCard(res, cardListEL);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })

    .finally(() => addCardPopup.setLoading(false, "addCard"));
}

function handleDeleteCard(cardID) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.renderLoading(true);
    api.deleteCard(cardID);
    cardElement
      .remove()
      .then(() => {
        cardID.deleteCard();
        deleteCardPopup.close();
      })
      .catch(() => {
        console.log(err);
      })
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

const updateAvatarForm = new PopupWithForm("#profile-image-modal", (avatar) => {
  api
    .updateAvatar(avatar)
    .then((avatar) => {
      userData.getUserInfo(avatar.link);
      updateAvatarForm.close();
    })
    .catch((err) => {
      console.error(err);
    });
});

updateAvatarForm.setEventListeners();

// function handleUpdateAvatar(data) {
//   api.
// updateAvatar.
// }

export { cardPreviewImageModal };
export { formProfileEditModal };
