//import { previewImageModal } from "../utils/utils.js";
//import { closePopup, openPopup } from "../utils/utils.js";

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
        this._handleDeleteButton();
      });

    //.card__image handlePreviewPicture
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewImageModal();
      });
  }

  //handleDeleteCard
  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //handleLikeIcon
  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  //handlePreviewPicture
  _handlePreviewImageModal() {
    const image = previewImageModal.querySelector(".modal__image");
    const caption = previewImageModal.querySelector(".modal__caption");
    caption.textContent = this._name;
    image.src = this._link;
    image.alt = this._name;

    openPopup(previewImageModal);
  }

  _handleCardImage;

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //this is a public method

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
