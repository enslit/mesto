import {Popup} from './classes/Popup.js'
import {PopupPreviewImage} from './classes/PopupPreviewImage.js'
// Объекты всплывающих окон редактирования профиля и добавления карточки
const addCard = new Popup('.popup_type_add-card')
const editProfile = new Popup('.popup_type_edit-profile')
// Элементы всплывающих окон
const popupEditProfileElement = editProfile.getElement()
const popupAddCardElement = addCard.getElement()
// Элементы блока профиля
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')
// Элементы формы добавления карточки
const formAddCard = popupAddCardElement.querySelector('.form')
const inputNameCard = formAddCard.querySelector('.form__input_type_card-name')
const inputLink = formAddCard.querySelector('.form__input_type_link')
// Элементы формы редактирования профиля
const formEditProfile = popupEditProfileElement.querySelector('.form')
const inputName = formEditProfile.querySelector('.form__input_type_name')
const inputAbout = formEditProfile.querySelector('.form__input_type_about')

/* ------------ EXPORTS --------------- */
// Callback обработчика клика на изображение
export const openPreviewPicture = (data) => {
  new PopupPreviewImage(data, '.popup_type_image').open()
}

// Элемент списка карточек
export const cardsList = document.querySelector('.cards__list')

// Элементы всех форм на странице
export const forms = Array.from(document.querySelectorAll('.form'))

// Селектор шаблона карточки
export const cardTemplateSelector = '#cardTemplate'

// Элементы формы добавления карточки
export const formAddCardElements = {
  form: formAddCard,
  name: inputNameCard,
  link: inputLink
}

// Элементы формы редактирования профиля
export const formEditProfileElements = {
  form: formEditProfile,
  name: inputName,
  about: inputAbout
}

// Элементы профиля
export const profileElements = {name, about}

// Всплывающие окна
export const popupElements = {editProfile, addCard}

// Кнопки
export const buttonElements = {
  editProfile: btnEditProfile,
  addCard: btnAddCard
}

// Селекторы для валидации
export const validateOptions = {
  inputSelector: '.form__input', // Поле ввода
  submitButtonSelector: '.form__save', // Кнопка отправки формы
  inactiveButtonClass: 'form__save_disabled', // Модификатор кнопки отправки формы
  inputErrorClass: 'form__input_type_error', // Модификатор поля ввода с невалидным значением
  errorClass: 'form__input-error_visible' // Модификатор видимости элемента с текстом ошибки
}