import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo'

// Селекторы
export const selectors = {
  cardsList: '.cards__list', // список карточек
  cardTemplate: '#cardTemplate', // шаблон карточки
  popupAddCard: '.popup_type_add-card', // всплывающее окно добавления новой карточки
  popupEditProfile: '.popup_type_edit-profile', // всплывающее окно редактирования информации
  validateOptions: {
    inputSelector: '.form__input', // Поле ввода
    submitButtonSelector: '.form__save', // Кнопка отправки формы
    inactiveButtonClass: 'form__save_disabled', // Модификатор кнопки отправки формы
    inputErrorClass: 'form__input_type_error', // Модификатор поля ввода с невалидным значением
    errorClass: 'form__input-error_visible' // Модификатор видимости элемента с текстом ошибки
  } // Селекторы элементов формы для валидации
}

// Классы
export const userInfo = new UserInfo({name: '.profile__name', about: '.profile__about'}) // Информация профиля
export const popupPreviewPicture = new PopupWithImage('.popup_type_image') // Всплывающее окно с изображением

// Элементы
export const buttonEditProfile = document.querySelector('.btn_type_edit-profile') // Кнопка добавления редактирования профиля
export const buttonAddCard = document.querySelector('.btn_type_add-card') // Кнопка добавления новой карточки