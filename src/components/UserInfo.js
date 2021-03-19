/**
 * @class
 * @classdesc Класс управления данными профиля
 */
export class UserInfo {
  constructor(selectors) {
    this._name = document.querySelector(selectors.name)
    this._about = document.querySelector(selectors.about)
  }

  // Получить данные профиля
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  // Установить данные профиля
  setUserInfo({userName, about}) {
    this._name.textContent = userName
    this._about.textContent = about
  }
}