const profile = document.querySelector('.profile')
const popups = document.querySelectorAll('.popup')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')

const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const editProfileForm = editProfilePopup.querySelector('.form')
const nameInput = editProfileForm.querySelector('.form__input_type_name')
const aboutInput = editProfileForm.querySelector('.form__input_type_about')

const buttonAddCard = profile.querySelector('.btn_type_add-card')
const addCardPopup = document.querySelector('.popup_type_add-card')
const addCardForm = addCardPopup.querySelector('.form')

const cardTemplate = document.querySelector('#cardTemplate').content
const cardList = document.querySelector('.cards__list')

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
]

const closePopup = (event) => {
	const popup = event.target.closest('.popup')
	popup.classList.remove('popup_opened')
}

const openPopup = (popup) => {
	popup.classList.add('popup_opened')
}

const openEditProfilePopup = () => {
	nameInput.value = name.textContent
	aboutInput.value = about.textContent
	openPopup(editProfilePopup)
}

const openAddCardPopup = () => {
	openPopup(addCardPopup)
}

const handleProfileFormSubmit = event => {
	event.preventDefault()

	name.textContent = nameInput.value
	about.textContent = aboutInput.value

	closePopup(event)
}

const handleAddCardFormSubmit = event => {
	event.preventDefault()
	const nameField = addCardForm.querySelector('.form__input_type_name')
	const linkField = addCardForm.querySelector('.form__input_type_link')
	const name = nameField.value
	const link = linkField.value

	const card = createCard({name, link})
	putCard(card)

	closePopup(event)

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
	if (target.classList.contains('btn_type_close') || target.classList.contains('popup')) {
		closePopup(event)
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
}

const like = (btn) => {
	btn.classList.toggle('btn_type_like-active')
}

const cardDelete = (btn) => {
	btn.closest('.card').parentElement.remove()
}

initCards(initialCards)

cardList.addEventListener('click', onCardClick, true)
editProfileForm.addEventListener('submit', handleProfileFormSubmit)
addCardForm.addEventListener('submit', handleAddCardFormSubmit)
btnEditProfile.addEventListener('click', openEditProfilePopup)
buttonAddCard.addEventListener('click', openAddCardPopup)
popups.forEach(popup => {
	popup.addEventListener('click', onPopupClick, true)
})