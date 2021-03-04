import {Popup} from './Popup'

export default class PopupWithForm extends Popup{
  constructor(selector, callbackSubmit) {
    super(selector);
    this._form = super.getElement().querySelector('.form');
    this._cb = callbackSubmit;
  }

  _getInputValues() {
    const values = {};
    const inputs = Array.from(this._form.querySelectorAll('.form__input'));
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  _handleSubmitForm(evt) {
    evt.preventDefault();
    this._cb(this._getInputValues());
    this.close();
  }

  setListenersPopup() {
    super.setListenersPopup();
    this._handleSubmitForm = this._handleSubmitForm.bind(this)
    this._form.addEventListener('submit',  this._handleSubmitForm);
  }

  removeListenersPopup() {
    super.removeListenersPopup();
    this._form.removeEventListener('submit',  this._handleSubmitForm)
  }

  close() {
    super.close();
    this._form.reset();
  }
}