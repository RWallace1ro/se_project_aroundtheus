class Card {
  constructor(
    { name, link, cardID, isLiked, _id, cardData },
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteSubmit
  ) {
    this._name = name;
    this._link = link;
    this._cardID = cardID;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteSubmit(this._id, this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  _isLiked() {
    return this._isLiked;
  }

  _renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikes(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
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
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._renderLikes();
    this._setEventListeners();
    return this._cardElement;
  }

  getID() {
    return this._id();
  }
}

export default Card;
