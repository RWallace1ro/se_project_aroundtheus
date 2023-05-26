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
const profileModalEditCloseButton =
  profileEditModal.querySelector(".modal__close");
const addCardModalEditCloseButton = addCardModal.querySelector(".modal__close");
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

//preview image modal
const popupImage = document.querySelector(".modal__image");
const popupCaption = document.querySelector(".modal__caption");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalCloseButton =
  previewImageModal.querySelector(".modal__close");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const modals = document.querySelectorAll(".modal");
/*---------------------------------------------------------------------------------------------------------*/
/*                                                Functions                                                */
/*---------------------------------------------------------------------------------------------------------*/
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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    handleCardClick(cardData);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function closeImagePreviewModal() {
  closePopup(previewImageModal);
}

previewImageModalCloseButton.addEventListener("click", () => {
  closeImagePreviewModal();
});

/*---------------------------------------------------------------------------------------------------------*/
/*                                                Event Handlers                                           */
/*---------------------------------------------------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardClick(data) {
  popupCaption.textContent = data.name;
  popupImage.src = data.link;
  popupImage.alt = data.name;

  openPopup(previewImageModal);
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

profileModalEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardSubmit);

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

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalEditCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
