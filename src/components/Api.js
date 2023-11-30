export class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
      },
    }).then(this._processResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
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
  }

  updateUserProfile(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
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
    return fetch(`${this._url}/cards`, {
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
    return fetch(`${this._url}/cards`, {
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
    return fetch(`${this._url}/cards/${cardID}`, {
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
    return fetch(`${this._url}/cards/${id}/likes`, {
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
    return fetch(`${this._url}/cards/${id}/likes`, {
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
