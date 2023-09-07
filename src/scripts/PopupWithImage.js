import Popup from "./Popup.js";
//import Card from "../components/Card.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelectors) {
    super(popupSelectors);

    this._image = document.querySelector(".modal__image");
    this._caption = document.querySelector(".modal__caption");
  }

  open(cardData) {
    this._caption.textContent = data.name;
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    super.open();
  }
}
