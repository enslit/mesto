import {Popup} from './Popup.js'

/**
 * @class
 * @classdesc Дочерний класс для работы с всплывающим окном просмотра изображения
*/
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    // Получим вложенные элементы изображения и подписи
    this._imgPreview = super.getElement().querySelector('.popup__image')
    this._signPreview = super.getElement().querySelector('.popup__sign')
  }

  // Переопределение метода
  open({link, title}) {
    // Присвоим полученные значения
    this._imgPreview.src = link
    this._imgPreview.alt = title
    this._signPreview.textContent = title
    // Вызываем метод родителя
    super.open()
  }
}
