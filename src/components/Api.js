export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
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

  getUserInfo(name, about, avatar, myID) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: {
        name: name,
        about: about,
        avatar: avatar,
        myID: myID,
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
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
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
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
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
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      // body: JSON.stringify({
      //   name: "test",
      //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
      // }),
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

  deleteCard(name, about) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/cardId",
      {
        method: "DELETE",
        headers: {
          authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }
    )
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

  likeCard(name, about) {
    return fetch("around-api.en.tripleten-services.com/v1/cards/cardId/likes", {
      method: "PUT",
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

  dislikeCard(name, about, cardID) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "DELETE",
      headers: {
        authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
      },
      body: JSON.stringify({
        name: name,
        about: about,
        cardID: cardID,
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
}

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "fe7e07a4-81c5-490b-807b-e6a7cec619a0",
//     "Content-Type": "application/json",
//   },
// });
