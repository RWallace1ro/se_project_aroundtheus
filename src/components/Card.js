class Card {
  constructor(
    { name, link, cardID, isLiked, _id },
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    handleDeleteSubmit,
    handleDeleteButton
  ) {
    this._name = name;
    this._link = link;
    this._cardID = cardID;
    this._id = _id;
    this.isLiked = isLiked;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleDeleteSubmit = handleDeleteSubmit;
    this._handleDeleteButton = handleDeleteButton;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton(this);
        //this._handleDeleteClick();
      });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  isLiked() {
    return this.isLiked;
  }

  _setLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
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
    this._setLikes();
    this._setEventListeners();
    return this._cardElement;
  }

  getID() {
    return this._id();
  }
}

export default Card;
