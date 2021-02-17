const KEY_ESC = 'Escape'

export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
  }

  getElement() {
    return this._popup
  }

  _handleClickPopup({target}) {
    if (target.classList.contains('btn_type_close') || target.classList.contains('popup')) {
      this.close()
    }
  }

  _handlePressEsc({key}) {
    // Если нажата кнопка ESC находим открытое окно и закрываем его
    if (key === KEY_ESC) {
      this.close()
    }
  }

  _setListenersPopup() {
    const handleClickPopup = this._handleClickPopup.bind(this)
    const handlePressEsc = this._handlePressEsc.bind(this)

    this._popup.addEventListener('click', handleClickPopup, true)
    document.addEventListener('keydown', handlePressEsc)
  }

  _removeListenersPopup() {
    this._popup.removeEventListener('click', this._handleClickPopup)
    document.removeEventListener('keydown', this._handlePressEsc)
  }

  open() {
    this._setListenersPopup()
    this._popup.classList.add('popup_opened')
  }

  close() {
    this._removeListenersPopup()
    this._popup.classList.remove('popup_opened')
  }
}
