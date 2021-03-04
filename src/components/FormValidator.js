/* Класс валидации формы.
* Принимает объект с селекторами элементов блока формы.
* Валидация проводится согласно указанным атрибутам в html разметке
* */

class FormValidator {
  constructor(selectors, formElement) {
    this._formElement = formElement // Элемент формы
    this._inputErrorClass = selectors.inputErrorClass // Модификатор поля ввода с невалидным значением
    this._errorClass = selectors.errorClass // Модификатор видимости элемента с текстом ошибки
    this._inactiveButtonClass = selectors.inactiveButtonClass // Модификатор кнопки отправки формы
    this._submitButton = formElement.querySelector(selectors.submitButtonSelector) // Кнопка отправки формы
    this._inputs = Array.from(formElement.querySelectorAll(selectors.inputSelector)) // Поля ввода формы
  }

  // Показать ошибку
  _showInputError(input) {
    const error = this._getElementError(input.id) // Находим в форме элемент текста ошибки нужного поля ввода
    input.classList.add(this._inputErrorClass)
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  }

  // Скрыть ошибку
  _hideInputError(input) {
    const error = this._getElementError(input.id) // Находим в форме элемент текста ошибки нужного поля ввода
    input.classList.remove(this._inputErrorClass)
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  // Возвращает элемент текста ошибки
  _getElementError(inputId) {
    return this._formElement.querySelector(`.${inputId}-error`)
  }

  // Проверяет валидность поля ввода. Если значение невалидно, показывает ошибку
  _checkValidity(input) {
    !input.validity.valid
      ? this._showInputError(input)
      : this._hideInputError(input)
  }

  // Проверяет поля ввода формы и возвращает true, если хоть одно из них невалидно
  _hasInvalidInput() {
    return this._inputs.some(input => !input.validity.valid)
  }

  // Смена состояния кнопки отправки формы
  _toggleButtonState() {
    // Если есть невалидные поля в форме, блокируем кнопку
    if (this._hasInvalidInput(this._inputs)) {
      this._submitButton.classList.add(this._inactiveButtonClass)
      this._submitButton.disabled = true
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass)
      this._submitButton.disabled = false
    }
  }

  // Устанавливает слушатели событий
  _setListeners() {
    // Слушатель ввода на все поля
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        // Проверяем валидацию поля ввода
        this._checkValidity(input)
        // На каждом событии определяем состояние кнопки
        this._toggleButtonState()
      })
    })
  }

  // Включение валидации
  enableValidation() {
    this._toggleButtonState()
    this._setListeners()
  }
}

export default FormValidator