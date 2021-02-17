class Validator {
  constructor(selectors, formElement) {
    this._formElement = formElement
    this._inactiveButtonClass = selectors.inactiveButtonClass
    this._inputErrorClass = selectors.inputErrorClass
    this._errorClass = selectors.errorClass
    this._submitButton = formElement.querySelector(selectors.submitButtonSelector)
    this._inputs = Array.from(formElement.querySelectorAll(selectors.inputSelector))
  }

  _showInputError() {

  }

  _hideInputError() {

  }

  _getElementError() {

  }

  _checkValidity() {

  }

  _hasInvalidInput() {

  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._submitButton.classList.add(this._inactiveButtonClass)
      this._submitButton.disabled = true
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass)
      this._submitButton.disabled = false
    }
  }

  enableValidation() {
    this._toggleButtonState()
  }
}