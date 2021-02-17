class Validator {
  constructor(selectors, formElement) {
    this._formElement = formElement
    this._inactiveButtonClass = selectors.inactiveButtonClass
    this._inputErrorClass = selectors.inputErrorClass
    this._errorClass = selectors.errorClass
    this._submitButton = formElement.querySelector(selectors.submitButtonSelector)
    this._inputs = Array.from(formElement.querySelectorAll(selectors.inputSelector))
  }

  _showInputError(input) {
    const error = this._getElementError(input.id) // Находим в форме элемент текста ошибки нужного поля ввода
    input.classList.add(this._inputErrorClass)
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const error = this._getElementError(input.id) // Находим в форме элемент текста ошибки нужного поля ввода
    input.classList.remove(this._inputErrorClass)
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  _getElementError(inputId) {
    return this._formElement.querySelector(`.${inputId}-error`)
  }

  _checkValidity(input) {
    !input.validity.valid
      ? this._showInputError(input)
      : this._hideInputError(input)
  }

  _hasInvalidInput() {
    return this._inputs.some(input => !input.validity.valid)
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

  _setListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault()
      // В момент добавления карточки выполним сброс состояния кнопки
      this._toggleButtonState()
    })

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        // Проверяем валидацию поля ввода
        this._checkValidity(input)
        // На каждом событии определяем состояние кнопки
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._toggleButtonState()
    this._setListeners()
  }
}

export default Validator