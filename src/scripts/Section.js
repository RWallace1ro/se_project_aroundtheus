export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  //public function
  //use this._renderer to create the elements fo rendering
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  // take the item and render it into this._element
  addItem(element) {
    this._container.append(element);
  }
}
