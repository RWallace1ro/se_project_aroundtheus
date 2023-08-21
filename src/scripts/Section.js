export default class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  //public function
  //use this._renderer to create the elements fo rendering
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  // take the item and render it into this._element
  addItems(element) {
    this.container.append(element);
  }
}
