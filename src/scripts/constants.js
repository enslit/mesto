import {PopupPreviewImage} from '../components/PopupPreviewImage.js'

const profile = document.querySelector('.profile')

// Cелектор списка карточек
export const cardsListSelector = '.cards__list'
// Селектор шаблона карточки
export const cardTemplateSelector = '#cardTemplate'
// Селекторы всплывающих окон
export const popupAddCardSelector = '.popup_type_add-card'
export const popupEditProfileSelector = '.popup_type_edit-profile'
// Всплывающее окно с изображением
export const popupPreviewPicture = new PopupPreviewImage('.popup_type_image')
// Кнопки
export const buttonEditProfile = profile.querySelector('.btn_type_edit-profile')
export const buttonAddCard = profile.querySelector('.btn_type_add-card')
// Селекторы для валидации
export const validateOptions = {
  inputSelector: '.form__input', // Поле ввода
  submitButtonSelector: '.form__save', // Кнопка отправки формы
  inactiveButtonClass: 'form__save_disabled', // Модификатор кнопки отправки формы
  inputErrorClass: 'form__input_type_error', // Модификатор поля ввода с невалидным значением
  errorClass: 'form__input-error_visible' // Модификатор видимости элемента с текстом ошибки
}