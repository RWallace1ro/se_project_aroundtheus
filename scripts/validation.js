//function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
// const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
// inputEl.classList.add(inputErrorClass);
// errorMessageEl.textContent = inputEl.validationMessage;
// errorMessageEl.classList.add(errorClass);
//}

//function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
// const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
// inputEl.classList.remove(inputErrorClass);
// errorMessageEl.textContent = "";
// errorMessageEl.classList.remove(errorClass);
//}

//function checkInputValidity(formEl, inputEl, options) {
//  if (!inputEl.validity.valid) {
//  return showInputError(formEl, inputEl, options);
// }

// hideInputError(formEl, inputEl, options);
//}

//function hasInvalidInput(inputList) {
//return !inputList.every((inputEl) => inputEl.validity.valid);
//}

//const disableSubmitButton = (submitButton, inactiveButtonClass) => {
//  submitButton.classList.add(inactiveButtonClass);
//  submitButton.disabled = true;
//};

//const enableSubmitButton = (submitButton, inactiveButtonClass) => {
// submitButton.classList.remove(inactiveButtonClass);
// submitButton.disabled = false;
//};

//function toggleButtonState(inputEls, submitButton, config) {
// if (hasInvalidInput(inputEls)) {
// disableSubmitButton(submitButton, config.inactiveButtonClass);
// } else {
//enableSubmitButton(submitButton, config.inactiveButtonClass);
//}
//}

//function setEventListeners(formEl, options) {
// const { inputSelector } = options;
//const inputEls = [...formEl.querySelectorAll(inputSelector)];
//const submitButton = formEl.querySelector(options.submitButtonSelector);
//toggleButtonState(inputEls, submitButton, options);

//inputEls.forEach((inputEl) => {
//inputEl.addEventListener("input", (e) => {
// checkInputValidity(formEl, inputEl, options);
// toggleButtonState(inputEls, submitButton, options);
//});
// });
//}

//function enableValidation(options) {
// const formEls = [...document.querySelectorAll(options.formSelector)];
// formEls.forEach((formEl) => {
//formEl.addEventListener("submit", (e) => {
// e.preventDefault();
//});
//setEventListeners(formEl, options);
//});
//}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disable",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
