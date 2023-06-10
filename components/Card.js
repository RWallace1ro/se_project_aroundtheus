const popupImage = document.querySelector(".modal__image");
const popupCaption = document.querySelector(".modal__caption");
const previewImageModal = document.querySelector("#preview-image-modal");
//const previewImageModalCloseButton =
//  previewImageModal.querySelector(".modal__close");

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

class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //".card__like-button" handleLikeIcon
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    //.card__delete-button" handleDeleteCard
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton;
      });

    //.card__image handlePreviewPicture
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", this._hanlePreviewImage);
  }

  //handleDeleteCard
  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //handleLikeIcon
  _handleLikeButton() {
    this._cardElement
      .querySelector("card__like-button")
      .classList.toggle("card__like-button_active");
  }

  //handlePreviewPicture
  handlePreviewPicture() {
    popupCaption.textContent = data.name;
    popupImage.src = data.link;
    popupImage.alt = data.name;

    openPopup(previewImageModal);
  }

  _handleCardImage;

  _getTemplate() {
    return document
      .querySelector(this.cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //this is a public method

  getView() {
    this.cardElement = this._getTemplate();

    this._cardElement.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
  //getView() {
  // this.cardElement = document
  //  .querySelector(this._cardSelector)
  // .content.querySelector(".card")
  // .cloneNode(true);

  //get the card view

  //set event listners
  //this._setEventListeners();
  //return the card
}

export default Card;
