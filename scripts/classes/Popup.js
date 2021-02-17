/*
* Класс создания всплывающего окна
* */

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
    this._KEY_ESC = 'Escape'
  }

  // Слушатель клика по всплывающему окну
  _handleClickPopup({target}) {
    if (target.classList.contains('btn_type_close') || target.classList.contains('popup')) {
      this.close()
    }
  }

  // Слушатель нажатия на клавиатуру
  _handlePressEsc({key}) {
    // Если нажата кнопка ESC находим открытое окно и закрываем его
    if (key === this._KEY_ESC) {
      this.close()
    }
  }

  // Назначаем слушателей событий
  _setListenersPopup() {
    // Биндим для сохранения контекста
    this._handleClickPopup = this._handleClickPopup.bind(this)
    this._handlePressEsc = this._handlePressEsc.bind(this)

    this._popup.addEventListener('click', this._handleClickPopup, true)
    document.addEventListener('keydown', this._handlePressEsc)
  }

  // Удаляем слушателей событий
  _removeListenersPopup() {
    this._popup.removeEventListener('click', this._handleClickPopup)
    document.removeEventListener('keydown', this._handlePressEsc)
  }

  // Показывает окно
  open() {
    this._setListenersPopup()
    this._popup.classList.add('popup_opened')
  }

  // Закрывает окно
  close() {
    this._removeListenersPopup()
    this._popup.classList.remove('popup_opened')
  }

  // Возвращает элемент всплывающего окна
  getElement() {
    return this._popup
  }
}
