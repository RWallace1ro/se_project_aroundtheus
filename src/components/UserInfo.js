//import Api from "../components/Api.js";

export default class UserInfo extends Api {
  constructor(titleSelector, descriptionSelector) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(title, description) {
    this._titleElement.textContent = title;
    this._descriptionElement.textContent = description;
  }
}

api.getUserInfo().then((userData) => {
  userData.setUserInfo({
    title: userData.name,
    description: userData.about,
  });
  user.setAvatatarInfo(userData, avatar);
});
