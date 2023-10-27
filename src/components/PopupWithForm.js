import Popup from "./Popup.js";
//ImageBitmapRenderingContext;
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".modal__input");
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setLoading() {
    // const img = document.createElement("img");
    // img.src = imageSrc;
    // return img;
  }

  loadImage(imageSrc) {
    this.image = image;
    this._popupForm.prepend(image);
  }
}
