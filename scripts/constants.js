import {Popup} from './classes/Popup'

const addCard = new Popup('.popup_type_add-card')
const editProfile = new Popup('.popup_type_edit-profile')
const popupEditProfileElement = editProfile.getElement()
const popupAddCardElement = addCard.getElement()

const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')

const formAddCard = popupAddCardElement.querySelector('.form')
const inputNameCard = formAddCard.querySelector('.form__input_type_card-name')
const inputLink = formAddCard.querySelector('.form__input_type_link')

const formEditProfile = popupEditProfileElement.querySelector('.form')
const inputName = formEditProfile.querySelector('.form__input_type_name')
const inputAbout = formEditProfile.querySelector('.form__input_type_about')

export const cardsList = document.querySelector('.cards__list')

export const selectors = {
  cardTemplateSelector: '#cardTemplate'
}

export const formAddCardElements = {
  form: formAddCard,
  name: inputNameCard,
  link: inputLink
}

export const formEditProfileElements = {
  form: formEditProfile,
  name: inputName,
  about: inputAbout
}

export const profileElements = {name, about}

export const popupElements = {editProfile, addCard}

export const buttonElements = {
  editProfile: btnEditProfile,
  addCard: btnAddCard
}

export const validateOptions = {
  formSelector: '.form', // Блок формы
  inputSelector: '.form__input', // Поле ввода
  submitButtonSelector: '.form__save', // Кнопка отправки формы
  inactiveButtonClass: 'form__save_disabled', // Модификатор кнопки отправки формы
  inputErrorClass: 'form__input_type_error', // Модификатор поля ввода с невалидным значением
  errorClass: 'form__input-error_visible' // Модификатор видимости элемента с текстом ошибки
}