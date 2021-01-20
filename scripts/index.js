import {initialCards} from './cards.js'

const popupTemplate = document.querySelector('#popupTemplate').content
const cardTemplate = document.querySelector('#cardTemplate').content
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')
const cardsList = document.querySelector('.cards__list')

const init = () => {
	initialCards.forEach(addCard)
}

const closePopup = (event) => {
	const popup = event.target.closest('.popup')
	const close = popup.querySelector('.btn_type_close')

	close.removeEventListener('click', closePopup)
	popup.classList.remove('popup_opened')
	popup.remove()
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

const createInput = (attrs) => {
	const {
		type = 'text',
		name = '',
		value = '',
		placeholder = '',
		className = 'form__input',
		modsClassName = []
	} = attrs

	const classes = modsClassName
		? className + ' ' + modsClassName.join(' ')
		: className

	return `<input type="${type}" name="${name}" value="${value}" class="${classes}" placeholder="${placeholder}">`
}

const openEditProfilePopup = () => {
	const profilePopupElement = popupTemplate.cloneNode(true)
	const popup = profilePopupElement.querySelector('.popup')
	const form = profilePopupElement.querySelector('.form')
	const title = profilePopupElement.querySelector('.popup__title')
	const btnClosePopup = profilePopupElement.querySelector('.btn_type_close')

	form.name = 'edit-profile'
	title.textContent = 'Редактирование профиля'

	const nameInput = createInput({
		name: 'name',
		value: name.textContent,
		modsClassName: ['form__input_type_name']
	})

	const aboutInput = createInput({
		name: 'about',
		value: about.textContent,
		modsClassName: ['form__input_type_about']
	})

	form.insertAdjacentHTML('afterbegin', nameInput + aboutInput)

	popup.classList.add('popup_opened')

	btnClosePopup.addEventListener('click', closePopup)
	form.addEventListener('submit', handleProfileFormSubmit)

	document.body.append(profilePopupElement)
}

const openAddCardPopup = () => {
	const CardPopupElement = popupTemplate.cloneNode(true)
	const popup = CardPopupElement.querySelector('.popup')
	const title = CardPopupElement.querySelector('.popup__title')
	const form = CardPopupElement.querySelector('.form')
	const btnClosePopup = CardPopupElement.querySelector('.btn_type_close')

	form.name = 'add-card'
	title.textContent = 'Новое место'

	const nameInput = createInput({
		name: 'name',
		placeholder: 'Название',
		modsClassName: ['form__input_type_name']
	})

	const linkInput = createInput({
		name: 'link',
		placeholder: 'Ссылка на картинку',
		modsClassName: ['form__input_type_link']
	})

	form.insertAdjacentHTML('afterbegin', nameInput + linkInput)

	popup.classList.add('popup_opened')

	btnClosePopup.addEventListener('click', closePopup)
	form.addEventListener('submit', handleAddCardFormSubmit)

	document.body.append(CardPopupElement)
}

const handleProfileFormSubmit = event => {
	event.preventDefault()

	const form = event.target
	const nameInput = form.querySelector('.form__input_type_name')
	const aboutInput = form.querySelector('.form__input_type_about')

	name.textContent = nameInput.value
	about.textContent = aboutInput.value

	form.removeEventListener('submit', handleProfileFormSubmit)
	closePopup(event)
}

const handleAddCardFormSubmit = event => {
	event.preventDefault()

	const form = event.target
	const nameInput = form.querySelector('.form__input_type_name')
	const linkInput = form.querySelector('.form__input_type_link')

	addCard({
		name: nameInput.value,
		link: linkInput.value,
	})

	form.removeEventListener('submit', handleAddCardFormSubmit)
	closePopup(event)
}

btnEditProfile.addEventListener('click', openEditProfilePopup)
btnAddCard.addEventListener('click', openAddCardPopup)

init()
