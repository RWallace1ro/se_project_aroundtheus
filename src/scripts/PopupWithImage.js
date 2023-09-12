import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ previewImageModal, previewImage, previewImageCaption }) {
    super(previewImageModal);
    this._image = this._popupElement.querySelector(previewImage);
    this._caption = this._popupElement.querySelector(previewImageCaption);
  }

  open(cardData) {
    this._caption.textContent = cardData.name;
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    super.open();
  }
}
