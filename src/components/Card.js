class Card {
  constructor({ name, link }, cardSelector, _handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    //this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        //this._handleImageClick({ link: this._link, text: this._text });
        this._handleImageClick();
      });
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

  _handlePreviewImageModal() {
    // const image = previewImageModal.querySelector(".modal__image");
    // const caption = previewImageModal.querySelector(".modal__caption");
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
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
