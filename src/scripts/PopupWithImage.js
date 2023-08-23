import { CardPreviewModal } from "../pages/index.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._caption.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
    return CardPreviewModal;
  }
}
