//import api from "../components/Api.js";

class Card {
  constructor(
    { name, link, cardID, likes, isLiked, _id },
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._cardID = cardID;
    this.id = _id;
    (this.likes = likes),
      (this.isLiked = isLiked),
      (this._cardSelector = cardSelector);
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
        //this.updateIsLiked(this._cardID);
      });

    // this._likeButton.addEventListener("click", () => {
    //   this._updateIsLaked(this._cardID);
    // });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
        this._handleDeleteClick();
      });

    // this._deleteButton.addEventListener("click", () => {
    //   this._handleDeleteSubmit(this._cardID);
    // });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  isLiked() {
    if (!this._cardIsLiked) {
      return true;
    } else {
      return false;
    }
  }

  _updateIsLiked(cardID) {
    if (this.cardIsLiked(cardID)) {
      this.cardIsLiked = true;
      this._handleLikeButton();
    } else {
      this._cardIsLiked = false;
      this._handleLikeButton();
    }
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeButton = this._likes;
    this.deleteButtom = this._deleteButton;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }

  getID() {
    return this._id();
  }
}

export default Card;
