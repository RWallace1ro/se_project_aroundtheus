function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }

  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disabledButton(formEl, buttonEl, { inactiveButtonClass }) {
  const disableSubmitButton = formEl.querySelector(`#${buttonEl.id}-error`);
  buttonEl.classList.add(inactiveButtonClass);
  return disableSubmitButton;
  //disableSubmitButton.textContent = buttonEl.disabledButton;
}

function enableButton(formEl, buttonEl, { inactiveButtonClass }) {
  const enableSubmitButton = formEl.querySelector(`#${buttonEl}-error`);
  buttonEl.classList.remove(inactiveButtonClass);
  return enableSubmitButton;
  //enableSubmitButton.classList.remove(inactiveButtonClass);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }

  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...document.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

const config = {
  //formSelector: ".popup__form",
  formSelector: ".modal__form",
  // inputSelector: ".popup__input",
  inputSelector: ".modal__input",
  //submitButtonSelector: ".popup__button",
  submitButtonSelector: ".modal__button",
  //inactiveButtonClass: "popup__button_disabled",
  inactiveButtonClass: "modal__button_disable",
  //inputErrorClass: "popup__input_type_error",
  inputErrorClass: "modal__input_type_error",
  //errorClass: "popup__error_visible",
  errorClass: "modal__error_visible",
};

enableValidation(config);
