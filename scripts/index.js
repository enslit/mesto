import {initialCards} from './cards.js'

const popupTemplate = document.querySelector('#popupTemplate').content
const cardTemplate = document.querySelector('#cardTemplate').content
const cardImageTemplate = document.querySelector('#popupImageTemplate').content
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')
const cardsList = document.querySelector('.cards__list')

const init = () => {
	initialCards.forEach(addCard)
}

const createCard = (link, name) => {
	const cardElement = cardTemplate.cloneNode(true)

	const img = cardElement.querySelector('.card__image')
	const title = cardElement.querySelector('.card__title')

	img.src = link
	img.alt = name
	title.textContent = name

	return cardElement
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

	const input = document.createElement('input')
	input.type = type
	input.name = name
	input.value = value
	input.placeholder = placeholder
	input.className = classes

	return input
}

const createForm = (name, submitHandler, fields = []) => {
	const formTemplate = document.querySelector('#form').content
	const formElement = formTemplate.cloneNode(true)
	const form = formElement.querySelector('.form')

	formElement.name = name

	fields.reverse().forEach(field => {
		const input = createInput(field)
		form.prepend(input)
	})

	form.addEventListener('submit', submitHandler)

	return formElement
}

const createPopup = (title, withForm = false, formOptions = {}) => {
	const popupElement = popupTemplate.cloneNode(true)
	const $popup = popupElement.querySelector('.popup')
	const $popupContainer = popupElement.querySelector('.popup__container')
	const $title = popupElement.querySelector('.popup__title')
	const $btnClosePopup = popupElement.querySelector('.btn_type_close')

	$title.textContent = 'Редактирование профиля'

	if (withForm) {
		const {
			name = 'form',
			submitHandler = (e) => console.log(`Default handler for ${e.target}`),
			fields = []
		} = formOptions
		const form = createForm(name, submitHandler, fields)
		$popupContainer.append(form)
	}

	$popup.classList.add('popup_opened')

	$btnClosePopup.addEventListener('click', closePopup)

	return popupElement
}

const addCard = ({link, name}) => {
	const card = createCard(link, name)

	const cardImg = card.querySelector('.card__image')
	const likeButton = card.querySelector('.btn_type_like')
	const deleteButton = card.querySelector('.card__delete')

	cardImg.addEventListener('click', onClickCard)
	likeButton.addEventListener('click', onClickLike)
	deleteButton.addEventListener('click', onClickDelete)

	cardsList.prepend(card)
}

const closePopup = (event) => {
	const popup = event.target.closest('.popup')
	const close = popup.querySelector('.btn_type_close')

	close.removeEventListener('click', closePopup)
	popup.classList.remove('popup_opened')
	popup.remove()
}

const openEditProfilePopup = () => {
	const title = 'Редактирование профиля'

	const nameField = {
		name: 'name',
		value: name.textContent,
		modsClassName: ['form__input_type_name']
	}
	const aboutField = {
		name: 'about',
		value: about.textContent,
		modsClassName: ['form__input_type_about']
	}
	const fields = [nameField, aboutField]

	const formOptions = {
		name: 'edit-profile',
		submitHandler: onSubmitEditProfile,
		fields
	}

	const popup = createPopup(title, true, formOptions)
	document.body.append(popup)
}

const openAddCardPopup = () => {
	const title = 'Новое место'

	const nameField = {
		name: 'name',
		placeholder: 'Название',
		modsClassName: ['form__input_type_name']
	}
	const linkField = {
		name: 'link',
		placeholder: 'Ссылка на картинку',
		modsClassName: ['form__input_type_link']
	}
	const fields = [nameField, linkField]

	const formOptions = {
		name: 'add-card',
		submitHandler: onSubmitAddCard,
		fields
	}

	const popup = createPopup(title, true, formOptions)
	document.body.append(popup)
}

const onSubmitEditProfile = (event) => {
	event.preventDefault()

	const form = event.target
	const nameInput = form.querySelector('.form__input_type_name')
	const aboutInput = form.querySelector('.form__input_type_about')

	name.textContent = nameInput.value
	about.textContent = aboutInput.value

	form.removeEventListener('submit', onSubmitEditProfile)
	closePopup(event)
}

const onSubmitAddCard = (event) => {
	event.preventDefault()

	const form = event.target
	const nameInput = form.querySelector('.form__input_type_name')
	const linkInput = form.querySelector('.form__input_type_link')

	addCard({
		name: nameInput.value,
		link: linkInput.value,
	})

	form.removeEventListener('submit', onSubmitAddCard)
	closePopup(event)
}

const onClickLike = (event) => {
	event.target.classList.toggle('btn_type_like-active')
}

const onClickDelete = (event) => {
	event.target.closest('.card').parentElement.remove()
}

const onClickCard = (event) => {
	const ImagePopupElement = cardImageTemplate.cloneNode(true)
	const popup = ImagePopupElement.querySelector('.popup')
	const img = ImagePopupElement.querySelector('.popup__image')
	const sign = ImagePopupElement.querySelector('.popup__image-sign')
	const btnClosePopup = ImagePopupElement.querySelector('.btn_type_close')

	const link = event.target.src
	const title = event.target.closest('.card').querySelector('.card__title').textContent
	img.src = link
	sign.textContent = title

	popup.classList.add('popup_opened')

	btnClosePopup.addEventListener('click', closePopup)
	document.body.append(ImagePopupElement)
}

btnEditProfile.addEventListener('click', openEditProfilePopup)
btnAddCard.addEventListener('click', openAddCardPopup)

init()
