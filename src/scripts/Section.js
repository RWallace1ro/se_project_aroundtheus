export default class Section {
  constructor({ renderer, selectors }) {
    this._renderer = renderer;
    this._element = document.querySelector(selectors);
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
    this._modalContainer.append(element);
  }
}
