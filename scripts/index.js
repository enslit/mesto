const cardTemplate = document.querySelector('#cardTemplate').content
const profile = document.querySelector('.profile')
const cardList = document.querySelector('.cards__list')

const popups = document.querySelectorAll('.popup')
const popupImage = document.querySelector('.popup_type_image')
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupAddCard = document.querySelector('.popup_type_add-card')

const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')

const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')

const formAddCard = popupAddCard.querySelector('.form')
const formEditProfile = popupEditProfile.querySelector('.form')
const nameInput = formEditProfile.querySelector('.form__input_type_name')
const aboutInput = formEditProfile.querySelector('.form__input_type_about')

const closePopup = (popup) => {
	popup.classList.remove('popup_opened')
}

const openPopup = (popup) => {
	popup.classList.add('popup_opened')
}

const openEditProfilePopup = () => {
	nameInput.value = name.textContent
	aboutInput.value = about.textContent
	openPopup(popupEditProfile)
}

const openAddCardPopup = () => {
	openPopup(popupAddCard)
}

const handleProfileFormSubmit = event => {
	event.preventDefault()

	name.textContent = nameInput.value
	about.textContent = aboutInput.value

	closePopup(popupEditProfile)
}

const handleAddCardFormSubmit = event => {
	event.preventDefault()
	const nameField = formAddCard.querySelector('.form__input_type_name')
	const linkField = formAddCard.querySelector('.form__input_type_link')
	const name = nameField.value
	const link = linkField.value

	const card = createCard({name, link})
	putCard(card)

	closePopup(popupAddCard)

	nameField.value = ''
	linkField.value = ''
}

const createCard = ({name, link}) => {
	const cardElement = cardTemplate.cloneNode(true)
	const title = cardElement.querySelector('.card__title')
	const image = cardElement.querySelector('.card__image')

	title.textContent = name
	image.src = link

	return cardElement
}

const putCard = (card) => {
	cardList.prepend(card)
}

const initCards = (items) => {
	items.forEach(item => {
		const card = createCard(item)
		putCard(card)
	})
}

const onPopupClick = (event) => {
	const target = event.target
	if (target.classList.contains('btn_type_close')) {
		const popup = target.closest('.popup')
		closePopup(popup)
	} else if (target.classList.contains('popup')) {
		closePopup(target)
	}
}

const onCardClick = (event) => {
	const {target} = event
	if (target.classList.contains('btn_type_like')) {
		like(target)
	}

	if (target.classList.contains('card__delete')) {
		cardDelete(target)
	}

	if (target.classList.contains('card__image')) {
		const card = target.closest('.card')
		const link = target.src
		const title = card.querySelector('.card__title').textContent
		openImagePopup(link, title)
	}
}

const openImagePopup = (link, title) => {
	const imagePopup = document.querySelector('.popup_type_image')
	const image = imagePopup.querySelector('.popup__image')
	const sign = imagePopup.querySelector('.popup__sign')
	image.src = link
	image.alt = title
	sign.textContent = title

	openPopup(imagePopup)
}

const like = (btn) => {
	btn.classList.toggle('btn_type_like-active')
}

const cardDelete = (btn) => {
	btn.closest('.card').parentElement.remove()
}

initCards(initialCards)

cardList.addEventListener('click', onCardClick, true)
formEditProfile.addEventListener('submit', handleProfileFormSubmit)
formAddCard.addEventListener('submit', handleAddCardFormSubmit)
btnEditProfile.addEventListener('click', openEditProfilePopup)
btnAddCard.addEventListener('click', openAddCardPopup)
popups.forEach(popup => {
	popup.addEventListener('click', onPopupClick, true)
})