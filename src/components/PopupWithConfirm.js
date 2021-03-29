import {Popup} from './Popup'
/**
 * @class
 * @classdesc Дочерний класс для работы с всплывающим окном содержащим запрос подтверждения
 */
export class PopupWithConfirm extends Popup{
  constructor(selector, callback) {
    super(selector)
    this._callback = callback
    this._form = super.getElement().querySelector('.form')
    this._idElement = super.getElement().querySelector('.form__input_type_id')
    this._submitButton = super.getElement().querySelector('.form__save')
  }

  _handleSubmitForm(evt) {
    evt.preventDefault()
    const id = this._form.elements.id.value
    this._callback(id, this._listItem)
  }

  setLoading(state) {
    this._submitButton.textContent = state ? 'Удаление...' : 'Да'
  }

  setListenersPopup() {
    super.setListenersPopup();

    this._handleSubmitForm = this._handleSubmitForm.bind(this)
    this._form.addEventListener('submit', this._handleSubmitForm)
  }

  open(id, listItem) {
    this._idElement.value = id
    this._listItem = listItem
    super.open()
  }

  close() {
    this._form.reset()
    this._listItem = null
    super.close()
  }
}