import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
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

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "loading...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  renderLoading() {
    const img = document.createElement("img");
    img.src = imageSrc;
    return img;
  }

  loadImage() {
    this.image = image;
    this._popupForm.append(image);
  }
}
