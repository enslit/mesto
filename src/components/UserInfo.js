export class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name)
    this._about = document.querySelector(selectors.about)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo({userName, about}) {
    this._name.textContent = userName
    this._about.textContent = about
  }
}