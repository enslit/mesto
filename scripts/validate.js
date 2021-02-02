/* Функция включения валидации всех форм.
*  Принимает объект с селекторами элементов блока формы.
* */
const enableValidation = (options) => {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = options

  // Собираем все формы на странице
  const forms = Array.from(document.querySelectorAll(formSelector))

  // Инициализация валидации каждой отдельной формы
  forms.forEach(form => {
    const button = form.querySelector(submitButtonSelector) // Кнопка отправки формы
    const inputs = Array.from(form.querySelectorAll(inputSelector)) // Все поля ввода в форме

    // Определяем состояние кнопки
    toggleButtonState(inputs, button, inactiveButtonClass)

    // Слушатель отправки формы
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      // В момент добавления карточки выполним сброс состояния кнопки
      toggleButtonState(inputs, button, inactiveButtonClass)
    })

    // Назначаем слушатель ввода каждому отдельному полю в форме
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        // Проверяем валидацию поля ввода
        checkValidity(form, input, errorClass, inputErrorClass)
        // На каждом событии определяем состояние кнопки
        toggleButtonState(inputs, button, inactiveButtonClass)
      })
    })
  })
}

// Проверяет поля ввода формы и возвращает true, если хоть одно из них невалидно
const hasInvalidInput = (inputs) => inputs.some(input => !input.validity.valid)

// Смена состояния кнопки отправки формы
const toggleButtonState = (inputs, button, disableClass) => {
  // Если есть невалидные поля в форме, блокируем кнопку
  if (hasInvalidInput(inputs)) {
    button.classList.add(disableClass)
    button.disabled = true
  } else {
    button.classList.remove(disableClass)
    button.disabled = false
  }
}

// Проверяет валидность поля ввода. Если значение невалидно, показывает ошибку
const checkValidity = (form, input, errorClass, inputErrorClass) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, errorClass, inputErrorClass)
  } else {
    hideInputError(form, input, errorClass, inputErrorClass)
  }
}

// Возвращает элемент текста ошибки
const getElementError = (form, inputId) => form.querySelector(`.${inputId}-error`)

// Показать ошибку
const showInputError = (form, input, errorMessage, errorClass, inputErrorClass) => {
  const error = getElementError(form, input.id) // Находим в форме элемент текста ошибки нужного поля ввода
  input.classList.add(inputErrorClass)
  error.classList.add(errorClass);
  error.textContent = errorMessage;
};

// Скрыть ошибку
const hideInputError = (form, input, errorClass, inputErrorClass) => {
  const error = getElementError(form, input.id) // Находим в форме элемент текста ошибки нужного поля ввода
  input.classList.remove(inputErrorClass)
  error.classList.remove(errorClass);
  error.textContent = '';
};