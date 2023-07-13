class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl, errorMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl, errorMessage) {
    const errorMessageEl = this.form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(formEl, inputEl, options) {
    if (!this._inputEl.validity.valid) {
      return showInputError(formEl, inputEl, options);
    }

    _hideInputError(formEl, inputEl, options);
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
    if (hasInvalidInput(this._inputEls)) {
      this._disableSubmitButton(
        this._submitButton,
        this._config.inactiveButtonClass
      );
    } else {
      this._enableSubmitButton(submitButton, config.inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this.inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this.submitButton = this._form.querySelector(
      this.options.submitButtonSelector
    );
    toggleButtonState(inputEls, submitButton, options);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  _enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.setEventListeners(formEl, options);
  }
}

export default FormValidator;
