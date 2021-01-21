const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
const popup = document.querySelector('.popup')
const form = popup.querySelector('.form')
const nameInput = form.querySelector('.form__input_type_name')
const aboutInput = form.querySelector('.form__input_type_about')
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnClosePopup = popup.querySelector('.btn_type_close')

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

const createCard = ({name, link}) => {
	const cardElement = cardTemplate.cloneNode(true)
	const title = cardElement.querySelector('.card__title')
	const image = cardElement.querySelector('.card__image')

	title.textContent = name
	image.src = link

	return cardElement
}

const initCards = (items) => {
	items.forEach(item => {
		cardList.append(createCard(item))
	})
}

initCards(initialCards)

form.addEventListener('submit', handleFormSubmit)
btnEditProfile.addEventListener('click', openPopup)
btnClosePopup.addEventListener('click', closePopup)