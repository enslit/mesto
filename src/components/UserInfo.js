/**
 * @class
 * @classdesc Класс управления данными профиля
 */
export class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name)
    this._about = document.querySelector(selectors.about)
    this._avatarUrl = document.querySelector(selectors.avatar)
    this._id = null
  }

  // Получить данные профиля
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatarUrl.src,
      _id: this._id
    }
  }

  // Установить данные профиля
  setUserInfo(data) {
    this._name.textContent = data.name
    this._about.textContent = data.about
    this._avatarUrl.src = data.avatar
    this._id = data._id
  }
}