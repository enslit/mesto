import {Popup} from './Popup.js'

/*
* Дочерний класс для работы с всплывающим окном просмотра изображения
*/
export class PopupPreviewImage extends Popup {
  constructor(data, selector) {
    super(selector)
    this._link = data.link
    this._title = data.title
  }

  // Перегрузка метода
  open() {
    // Получим элемент всплывающего окна, вложенные элементы изображения и подписи
    const popup = super.getElement()
    const imgPreview = popup.querySelector('.popup__image')
    const signPreview = popup.querySelector('.popup__sign')

    // Присвоим полученные в конструкторе значения
    imgPreview.src = this._link
    imgPreview.alt = this._title
    signPreview.textContent = this._title

    // Метод родителя
    super.open()
  }
}
