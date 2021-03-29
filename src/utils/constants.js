import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo'
import {Api} from './Api'

// API backend
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: '52186c90-0ae5-45bb-99b5-e4acaa2b939f',
    'Content-Type': 'application/json',
  }
})

// Селекторы
export const selectors = {
  cardsList: '.cards__list', // список карточек
  cardTemplate: '#cardTemplate', // шаблон карточки
  popupAddCard: '.popup_type_add-card', // всплывающее окно добавления новой карточки
  popupEditProfile: '.popup_type_edit-profile', // всплывающее окно редактирования информации
  popupDeleteCard: '.popup_type_delete', // всплывающее окно уведомления удаления карточки
  popupUpdateAvatar: '.popup_type_update-profile', // всплывающее окно формы обновления аватара
  validateOptions: {
    inputSelector: '.form__input', // Поле ввода
    submitButtonSelector: '.form__save', // Кнопка отправки формы
    inactiveButtonClass: 'form__save_disabled', // Модификатор кнопки отправки формы
    inputErrorClass: 'form__input_type_error', // Модификатор поля ввода с невалидным значением
    errorClass: 'form__input-error_visible' // Модификатор видимости элемента с текстом ошибки
  } // Селекторы элементов формы для валидации
}

// Классы
export const userInfo = new UserInfo({name: '.profile__name', about: '.profile__about', avatar: '.profile__avatar'}) // Информация профиля
export const popupPreviewPicture = new PopupWithImage('.popup_type_image') // Всплывающее окно с изображением

// Элементы
export const buttonEditProfile = document.querySelector('.btn_type_edit-profile') // Кнопка добавления редактирования профиля
export const buttonAddCard = document.querySelector('.btn_type_add-card') // Кнопка добавления новой карточки
export const avatar = document.querySelector('.profile__avatar-wrapper') // Аватар