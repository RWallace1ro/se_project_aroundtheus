//import { Escape } from "../utils/utils.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose;
  }

  open() {
    //opens popup
    this._popupElement.classList.add("modal__opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    //closes popup
    this._popupElement.classList.remove("modal__opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    // listens for esc button
    evt.preventDefault();
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal_close")
      ) {
        this.close();
      }
    });
  }
}

// create a class for each popup type that inherits the properties and methods of the popup class
// edit profile and popup with image will inherit the popup class
// they are two different types of popup
// one is an image - popup
// one is a form - profile
