import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { selectors } from "../utils/constants.js";
import { validationSettings } from "../utils/constants.js";
import { Api } from "../utils/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
    "Content-Type": "application/json",
  },
});

let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const card = renderCard(data);
          cardSection.addItem(card);
        },
      },
      selectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

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
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

function handleProfileEditSubmit(userData) {
  formProfileEditModal.setLoading(true);
  api
    .updateUserProfile(userData)
    .then(() => {
      userInfo.setUserInfo(userData.name, userData.about);
      formProfileEditModal.close();
    })
    .catch((err) => {
      console.error(err);
    })

    .finally(() => {
      formProfileEditModal.setLoading(false);
    });
}

function handleLikeClick(card) {
  if (card._isLiked) {
    api
      .dislikeCard(card._id)
      .then(() => {
        card.updateLikes();
      })

      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(card._id)
      .then(() => {
        card.updateLikes(card._id);
      })
      .catch((err) => console.error(err));
  }
}

function handleImageClick(imageData) {
  cardPreviewImageModal.open(imageData);
}

const deleteCardPopup = new PopupWithConfirmation(selectors.deleteCardPopup);

function handleDeleteButton(cardID, card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setLoading(true);
    api
      .deleteCard(cardID)
      .then(() => {
        card.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteCardPopup.setLoading(false);
      });
  });
}

deleteCardPopup.setEventListeners();

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Listeners                                          */
/*---------------------------------------------------------------------------------------------------------*/
const handleEditClick = () => {
  fillProfileForm();
  formProfileEditModal.open();
};

profileEditButton.addEventListener("click", handleEditClick);

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
  addFormValidator.toggleButtonState();
});

function renderCard(cardData) {
  const card = new Card(
    cardData,
    selectors.cardTemplate,
    handleImageClick,
    handleLikeClick,
    handleDeleteButton
  );
  return card.getView();
}

const cardPreviewImageModal = new PopupWithImage(selectors);

//codes to initialize all instances

cardPreviewImageModal.setEventListeners();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

//eventListerners for opening profile and add card modals/popups
const formProfileEditModal = new PopupWithForm(
  selectors.profileEditModal,
  handleProfileEditSubmit
);

formProfileEditModal.setEventListeners();

function handleAddCardFormSubmit(cardData) {
  addCardPopup.setLoading(true);
  api
    .addCard(cardData)
    .then((res) => {
      const card = renderCard(res);
      cardSection.addItem(card);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })

    .finally(() => {
      addCardPopup.setLoading(false);
    });
}
addCardPopup.setEventListeners();

const updateAvatarForm = new PopupWithForm("#profile-image-modal", (avatar) => {
  updateAvatarForm.setLoading(true);
  api
    .updateAvatar(avatar.link)
    .then((user) => {
      userInfo.setAvatar(user.avatar);
      updateAvatarForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      updateAvatarForm.setLoading(false);
    });
});

const editPencilIcon = document.querySelector("#avatar-edit-button");

editPencilIcon.addEventListener("click", () => {
  updateAvatarForm.open();
});

updateAvatarForm.setEventListeners();

export { cardPreviewImageModal };
export { formProfileEditModal };
