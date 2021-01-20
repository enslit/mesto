import {initialCards} from './cards.js'

const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
// const popup = document.querySelector('.popup')
// const form = popup.querySelector('.form')
// const nameInput = form.querySelector('.form__input_type_name')
// const aboutInput = form.querySelector('.form__input_type_about')
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
// const btnClosePopup = popup.querySelector('.btn_type_close')

// Cards
const cardsList = document.querySelector('.cards__list')
const cardTemplate = document.querySelector('#cardTemplate').content

const closePopup = () => popup.classList.remove('popup_opened')

const openPopup = () => {
	nameInput.value = name.textContent
	aboutInput.value = about.textContent
	popup.classList.add('popup_opened')
}

const handleFormSubmit = event => {
	event.preventDefault()

	name.textContent = nameInput.value
	about.textContent = aboutInput.value

	closePopup()
}

const addCard = (card) => {
	const cardElement = cardTemplate.cloneNode(true)

	const cardImg = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')

	cardImg.src = card.link
	cardImg.alt = card.name
	cardTitle.textContent = card.name

	cardsList.prepend(cardElement)
}

const init = () => {
	initialCards.forEach(addCard)
}

// form.addEventListener('submit', handleFormSubmit)
// btnEditProfile.addEventListener('click', openPopup)
// btnClosePopup.addEventListener('click', closePopup)

init()
