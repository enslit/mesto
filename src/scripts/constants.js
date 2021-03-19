import {Popup} from '../components/Popup.js'
import {PopupPreviewImage} from '../components/PopupPreviewImage.js'
// Объекты всплывающих окон редактирования профиля и добавления карточки
const popupEditProfile = new Popup('.popup_type_edit-profile')
const popupPreviewPicture = new PopupPreviewImage('.popup_type_image')
// Элементы всплывающих окон
const popupEditProfileElement = popupEditProfile.getElement()
// Элементы блока профиля
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')

// Элементы формы редактирования профиля
const formEditProfile = popupEditProfileElement.querySelector('.form')
const inputName = formEditProfile.querySelector('.form__input_type_name')
const inputAbout = formEditProfile.querySelector('.form__input_type_about')

/* ------------ EXPORTS --------------- */
// Cелектор списка карточек
export const cardsListSelector = '.cards__list'

// Селектор шаблона карточки
export const cardTemplateSelector = '#cardTemplate'

export const popupAddCardSelector = '.popup_type_add-card'

// Элементы формы редактирования профиля
export const formEditProfileElements = {
  form: formEditProfile,
  name: inputName,
  about: inputAbout
}

// Элементы профиля
export const profileElements = {name, about}

// Всплывающие окна
export const popupElements = {
  editProfile: popupEditProfile,
  previewPicture: popupPreviewPicture,
}

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