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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
    "Content-Type": "application/json",
  },
});

let cardSection;

api
  .getInitialCards()
  .then((res) => {
    cardSection = new Section(
      {
        items: res,
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

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
  })
  .catch((err) => {
    console.error(err);
  });

// api
//   .updateAvatar(name, about, avatar)
//   .then((userData) => {
//     avatar.setUserInfo(userData.name, userData.about, userData.avatar);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// api
//   .addCard(name, link)
//   .then((cardData) => {
//     addCard(cardData.link, cardData.name);
//     cardSection.addItem(cardData);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

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

// function handleDeleteClick() {
//   deleteModal.open();
//   const _id = cardElement.getID();
//   api.deleteCard(_id).then(() => {
//     cardElement.handleDeleteButton();
//     deleteModal.close();
//   });
// }

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card._id)
      .then(() => {
        card.handleLikeButton();
      })
      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(card._id)
      .then(() => {
        card.handleLikeButton();
      })
      .catch((err) => console.error(err));
  }
}

function handleImageClick() {
  cardPreviewImageModal.open(imageData);
}

// function handleDeleteButton(card) {
//   deleteCardPopup.open();
//   deleteCardPopup.setSubmitAction(() => {});
//   if (card) {
//     api.deleteCard(card._id).then(() => {
//       card.deleteCard();
//     });
//     card.remove();
//   }
// }

//const deleteCardPopup = document.querySelector("deleteCardPopup");
//Instantiate the modal
// Call setEventListeners

function handleDeleteButton(cardID) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    //deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardID)
      .then(() => {
        cardElement.remove();
        cardID.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //deleteCardPopup.renderLoading(false);
      });
  });
}

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
    // handleDeleteClick,
    handleLikeClick,
    handleImageClick,
    handleDeleteButton
    //(imgData) => {
    // cardPreviewImageModal.open(imgData);
    //}
  );
  return card.getView();
}

const cardPreviewImageModal = new PopupWithImage(selectors);
// const cardSection = new Section(
//   {
//     items: initialCards,
//     renderer: (data) => {
//       const card = renderCard(data);
//       cardSection.addItem(card);
//     },
//   },
//   selectors.cardSection
// );

//codes to initialize all instances
// cardSection.renderItems();
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

    .finally(() => addCardPopup.setLoading(false, "addCard"));
}

const updateAvatarForm = new PopupWithForm("#profile-image-modal", (avatar) => {
  api
    .updateAvatar(avatar)
    .then((avatar) => {
      userData.updateAvatar(avatar.link, avatar.name);
      updateAvatarForm.close();
    })
    .catch((err) => {
      console.error(err);
    });
});

const editPencilIcon = document.querySelector("#avatar-edit-button");

editPencilIcon.addEventListener("click", () => {
  updateAvatarForm.open();
});

updateAvatarForm.setEventListeners();

export { cardPreviewImageModal };
export { formProfileEditModal };
