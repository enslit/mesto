import Popup from './Popup.js'

export default class PopupPreviewImage extends Popup {
  constructor(data, selector) {
    super(selector)
    this._link = data.link
    this._title = data.title
  }

  open() {
    const popup = super.getElement()
    const imgPreview = popup.querySelector('.popup__image')
    const signPreview = popup.querySelector('.popup__sign')
    // Присвоим полученные в параметрах значения
    imgPreview.src = this._link
    imgPreview.alt = this._title
    signPreview.textContent = this._title

    // Покажем всплывающее окно с изображением
    super.open()
  }
}
