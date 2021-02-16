import FormValidator from "../components/FormValidator.js";


/** The set of CSS selectors and classes. */
export const cssClasses = {
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__btn-save',
  inactiveButtonClass: 'form__btn-save_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__input-error_active'
};

/** Prepares array containing all forms of the page. */
const formList = Array.from(document.querySelectorAll(cssClasses.formSelector));


/**
 * Hides error message for editing input.
 * @function
 * @param {object} formElement - The form.
 * @param {object} inputElement - The input.
 */
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  // Скрываем сообщение об ошибке
  inputElement.classList.remove(cssClasses.inputErrorClass);
  errorElement.classList.remove(cssClasses.errorClass);
  errorElement.textContent = '';
};


/**
 * Checks if at least one of all inputs has invalid value.
 * @function
 * @param {object} inputList - All inputs of the editing form.
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся фунцкция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};


/**
 * Sets/unsets 'disabled' state for submit button.
 * @function
 * @param {object} inputList - All inputs of the editing form.
 * @param {object} buttonElement - The submit button.
 * @param {string} inactiveButtonClass - The CSS class for disabled button.
 */
export const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(cssClasses.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(cssClasses.inactiveButtonClass);
  }
};


// /**
//  * Resets form to default values.
//  * @function
//  * @param {object} formElement - The form of popup window.
//  */
export function resetForm(formElement, inputList) {
  formElement.reset();

  // const inputList = Array.from(formElement.querySelectorAll(cssClasses.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, formElement.elements.saveButton);
}




/** Starts to validate inputs of the forms. */
formList.forEach((formElement) => {
  const validatingForm = new FormValidator(cssClasses, formElement);
  validatingForm.enableValidation();
});
