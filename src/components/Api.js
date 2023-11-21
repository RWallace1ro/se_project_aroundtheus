export class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  updateUserProfile(name, about) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateAvatar(name, about, avatar) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCards(name, link, _id) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/cards`, {
      method: "GET",
      headers: {
        name: name,
        link: link,
        _id: _id,
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addCard({ name, link }) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/cards`, {
      method: "POST",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCard(cardID) {
    return fetch(`${this.url}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  likeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  dislikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
