export default class UserInfo extends Popup {
  constructor(titleElement, descriptionElement) {
    super({ titleElement, descriptionElement });
    this._titleElement = this._titleElement.querySelector(".profile__title");
    this._descriptionElement = this._descriptionElement.querySelector(
      ".profile__descriptiom"
    );
  }

  getUserInfor(profileTitle, profileDescription) {
    this._userInfo.profileTitle = profileTitle;
    this._userInfo.description = profileDescription;
    return this._userInfo;
  }

  setUserInfo(titleInfo, descriptionInfo) {
    this._titleElement.textcontent = titleInfo;
    this._descriptionElement.textcontent = descriptionInfo;
  }

  //named this method in child class close
  //there is a method in the parent class close
  close() {
    this._popupForm.reset();
    super.close();
  }
}
