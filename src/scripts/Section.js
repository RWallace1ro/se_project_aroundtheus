export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    //this.initialCards = initialCards;
    this._container = document.querySelector(containerSelector);

    // const initialCards = [
    //   {
    //     name: "Yosemite Valley",
    //     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    //   },
    //   {
    //     name: "Lake Louise",
    //     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    //   },
    //   {
    //     name: "Bald Mountains",
    //     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    //   },
    //   {
    //     name: "Latemar",
    //     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    //   },
    //   {
    //     name: "Vanoise National Park",
    //     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    //   },
    //   {
    //     name: "Lago di Braies",
    //     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    //   },
    // ];

    // initialCards.forEach((cardData) => {
    //   const cardElement = renderCard(cardData);
    //   cardListEl.prepend(cardElement);
    // });
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
