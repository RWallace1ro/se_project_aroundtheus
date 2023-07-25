class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorClassEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorClassEl.textContent = inputEl.errorClass;
    errorClassEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorClassEl = this.form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorClassEl.textContent = "";
    errorClassEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(formEl, inputEl) {
    if (!this._inputEl.validity.valid) {
      return this._showInputError(formEl, inputEl);
    }

    this._hideInputError(formEl, inputEl);
  }

  _disableSubmitButton = (submitButton) => {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  };

  _enableSubmitButton = (submitButton) => {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {
      this._disableSubmitButton(
        this._submitButtonSelector,
        this._config.inactiveButtonClass
      );
    } else {
      this._enableSubmitButton(
        this._submitButtonSelector,
        this._config.inactiveButtonClass
      );
    }
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this.submitButtonSelector);
    this._toggleButtonState();

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
