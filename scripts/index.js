import {initialCards} from './cards.js'

const cardTemplate = document.querySelector('#cardTemplate').content
const profile = document.querySelector('.profile')
const cardsList = document.querySelector('.cards__list')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')

const timeout = 500

const init = () => {
	initialCards.forEach(addCard)
}

const initPopup = (content, title = '', type = '') => {
	const popup = createPopup(content, title, type)
	document.body.append(popup)
	setTimeout(() => {
		openPopup()
	}, 1)
}

const getTemplateElement = (selector) => {
	const template = document.querySelector(selector).content
	return template.cloneNode(true)
}

const getInputValue = (form, field) => form.querySelector(field).value

const openPopup = () => {
	const popup = document.querySelector('.popup')
	popup.addEventListener('click', closePopup)
	popup.classList.add('popup_opened')
}

const closePopup = ({type, target}) => {
	if (type === 'submit' || target.classList.contains('btn_type_close') || target.classList.contains('popup')) {
		const popup = target.closest('.popup')
		popup.classList.remove('popup_opened')

		setTimeout(() => {
			popup.remove()
		}, timeout)
	}
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

const createForm = (name, submitHandler) => {
	const formTemplate = document.querySelector('#form').content
	const formElement = formTemplate.cloneNode(true)
	const form = formElement.querySelector('.form')

	form.name = name
	form.addEventListener('submit', submitHandler)

	return formElement
}

const createEditProfileForm = () => {
	const form = createForm('edit-profile', onSubmitEditProfile)

	const inputName = createInput({
		name: 'name',
		value: name.textContent,
		modsClassName: ['form__input_type_name']
	})
	const inputAbout = createInput({
		name: 'about',
		value: about.textContent,
		modsClassName: ['form__input_type_about']
	})

	putInputToForm(form, inputName)
	putInputToForm(form, inputAbout)

	return form
}

const createAddCardForm = () => {
	const form = createForm('add-card', onSubmitAddCard)

	const inputName = createInput({
		name: 'name',
		placeholder: 'Название',
		modsClassName: ['form__input_type_name']
	})
	const inputLink = createInput({
		name: 'link',
		placeholder: 'Ссылка на картинку',
		modsClassName: ['form__input_type_link']
	})

	putInputToForm(form, inputName)
	putInputToForm(form, inputLink)

	return form
}

const createImage = (src, alt) => {
	const img = document.createElement('img')
	img.src = src
	img.alt = alt
	img.classList.add('popup__image')
	return img
}

const createSignIn = (text) => {
	const el = document.createElement('h2')
	el.classList.add('popup__image-sign')
	el.textContent = text
	return el
}

const createPopup = (content, title, type) => {
	const popupElement = getTemplateElement('#popupTemplate')
	const popup = popupElement.querySelector('.popup')
	const container = popupElement.querySelector('.popup__container')

	switch (type) {
		case 'img':
			popupElement.querySelector('.popup__title').remove()
			container.classList.add('popup__container_image')
			break
		default:
			const $title = popupElement.querySelector('.popup__title')
			$title.textContent = title
	}

	putContentToPopup(content, container)

	popup.addEventListener('click', closePopup)

	return popupElement
}

const putInputToForm = (form, input) => form.querySelector('.form__inputs').append(input)

const putContentToPopup = (content, container) => {
	if (Array.isArray(content)) {
		content.forEach(el => {
			container.append(el)
		})
	} else {
		container.append(content)
	}
}

const addCard = ({link, name}) => {
	cardsList.prepend(createCard(link, name))
}

const onSubmitEditProfile = (event) => {
	event.preventDefault()

	const form = event.target
	name.textContent = getInputValue(form, '.form__input_type_name')
	about.textContent = getInputValue(form, '.form__input_type_about')

	form.removeEventListener('submit', onSubmitEditProfile)
	closePopup(event)
}

const onSubmitAddCard = (event) => {
	event.preventDefault()

	const form = event.target
	const name = getInputValue(form, '.form__input_type_name')
	const link = getInputValue(form, '.form__input_type_link')

	addCard({name, link})

	form.removeEventListener('submit', onSubmitAddCard)
	closePopup(event)
}

const onClickProfile = ({target}) => {
	if (target.classList.contains('btn_type_edit-profile')) {
		initPopup(createEditProfileForm(), 'Редактирование профиля')
	}

	if (target.classList.contains('btn_type_add-card')) {
		initPopup(createAddCardForm(),'Новое место')
	}
}

const onClickCardList = ({target}) => {
	if (target.classList.contains('btn_type_like')) {
		target.classList.toggle('btn_type_like-active')
	}

	if (target.classList.contains('card__delete')) {
		target.closest('.card').parentElement.remove()
	}

	if (target.classList.contains('card__image')) {
		const title = target.closest('.card').querySelector('.card__title').textContent
		const content = [
			createImage(target.src, title),
			createSignIn(title)
		]
		initPopup(content, '', 'img')
	}
}

profile.addEventListener('click', onClickProfile, true)
cardsList.addEventListener('click', onClickCardList, true)

init()
