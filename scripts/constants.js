const cardTemplate = document.querySelector('#cardTemplate').content
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
const cardsList = document.querySelector('.cards__list')
// Всплывающие окна
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popupPreviewImage = document.querySelector('.popup_type_image')
const imgPreview = popupPreviewImage.querySelector('.popup__image')
const signPreview = popupPreviewImage.querySelector('.popup__sign')
// Кнопки
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')
// Формы и их элементы
const formAddCard = popupAddCard.querySelector('.form')
const formEditProfile = popupEditProfile.querySelector('.form')
const inputName = formEditProfile.querySelector('.form__input_type_name')
const inputAbout = formEditProfile.querySelector('.form__input_type_about')
const inputNameCard = formAddCard.querySelector('.form__input_type_card-name')
const inputLink = formAddCard.querySelector('.form__input_type_link')

const KEY_ESC = 'Escape'

const validateOptions = {
  formSelector: '.form', // Блок формы
  inputSelector: '.form__input', // Поле ввода
  submitButtonSelector: '.form__save', // Кнопка отправки формы
  inactiveButtonClass: 'form__save_disabled', // Модификатор кнопки отправки формы
  inputErrorClass: 'form__input_type_error', // Модификатор поля ввода с невалидным значением
  errorClass: 'form__input-error_visible' // Модификатор видимости элемента с текстом ошибки
}