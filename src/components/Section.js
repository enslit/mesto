/**
 * @class
 * @classdesc Класс создания секции
 */
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._containerElement = document.querySelector(containerSelector);
    this._items = items; // Данные для для вставки
    this._renderer = renderer; // Колбек отрисовки
  }

  setItems(items) {
    this._items = items;
  }

  // Добавление элемента в секцию
  addItem(element) {
    this._containerElement.prepend(element);
  }

  // Отрисовка элементов секции
  renderElements() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}