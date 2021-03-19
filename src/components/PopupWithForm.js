import {Popup} from './Popup'

/**
 * @class
 * @classdesc Дочерний класс для работы с всплывающим окном содержащим форму
 */
export default class PopupWithForm extends Popup{
  constructor(selector, callbackSubmit) {
    super(selector);
    this._form = super.getElement().querySelector('.form'); // Элемент формы внутри всплывающего окна
    this._cb = callbackSubmit; // Колбек события сабмита
  }

  // Получение данных полей ввода
  _getInputValues() {
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll('.form__input'));
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Установка значений полей ввода
  setInitValues(values) {
    for (let value in values) {
      if (values.hasOwnProperty(value)) {
        const el = this._form.querySelector(`.form__input_type_${value}`)
        el.value = values[value]
      }
    }
  }

  // Обработчик сабмита формы
  _handleSubmitForm(evt) {
    evt.preventDefault();
    // вызываем колбек и передаем данные формы
    this._cb(this._getInputValues());
    this.close();
  }

  // Установка слушателя сабмита
  setListenersPopup() {
    super.setListenersPopup();
    // бинд метода обработчика для передачи его в удаление слушателей
    this._handleSubmitForm = this._handleSubmitForm.bind(this)
    this._form.addEventListener('submit',  this._handleSubmitForm);
  }

  // Удаление слушателя сабмита
  removeListenersPopup() {
    super.removeListenersPopup();
    this._form.removeEventListener('submit',  this._handleSubmitForm)
  }

  close() {
    super.close();
    // выполним сброс формы после закрытия
    this._form.reset();
  }
}