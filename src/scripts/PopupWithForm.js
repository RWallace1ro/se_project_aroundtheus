import Popup from "./Popup.js";
//import FormValidator from "../components/FormValidator.js";
//import UserInfo from "./UserInfor.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = (this._popup.querySelector(
      "#profile-title-input"
    ).profileDescriptionInput = document.querySelector(
      "#profile-description-input"
    ));
    const data = {};
    inputList.forEach((input) => {
      data[(input.title, input.descriptiom)];
    });
    return data;
  }

  open() {
    super.open();
    this.buttom.textContent = "submit";
  }

  setEventListeners() {
    super.setEventListeners("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  //named this method in child class close
  //there is a method in the parent class close
  close() {
    this._popupForm.reset();
    super.close();
    this._popupElement.removeEventListener("submit", this._handleFormSubmit);
  }
}

//
