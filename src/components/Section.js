export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._containerElement = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }

  renderElements() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}