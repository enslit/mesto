const cardTemplate = document.querySelector('#cardTemplate').content
const profile = document.querySelector('.profile')
const cardList = document.querySelector('.cards__list')

const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupAddCard = document.querySelector('.popup_type_add-card')

const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')

const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')

const formAddCard = popupAddCard.querySelector('.form')
const formEditProfile = popupEditProfile.querySelector('.form')
const inputName = formEditProfile.querySelector('.form__input_type_name')
const inputAbout = formEditProfile.querySelector('.form__input_type_about')
const inputNameCard = formAddCard.querySelector('.form__input_type_card-name')
const inputLink = formAddCard.querySelector('.form__input_type_link')

const closePopup = (popup) => {
	popup.classList.remove('popup_opened')
}

const openPopup = (popup) => {
	popup.classList.add('popup_opened')
}

const openEditProfilePopup = () => {
	inputName.value = name.textContent
	inputAbout.value = about.textContent
	openPopup(popupEditProfile)
}

const openAddCardPopup = () => {
	openPopup(popupAddCard)
}

const handleProfileFormSubmit = event => {
	event.preventDefault()

	name.textContent = inputName.value
	about.textContent = inputAbout.value

	closePopup(popupEditProfile)
}

const handleAddCardFormSubmit = event => {
	event.preventDefault()
	const name = inputNameCard.value
	const link = inputLink.value

	const card = createCard({name, link})
	putCard(card)

	closePopup(popupAddCard)
	formAddCard.reset()
}

const createCard = ({name, link}) => {
	const cardElement = cardTemplate.cloneNode(true)
	const likeButton = cardElement.querySelector('.btn_type_like')
	const deleteButton = cardElement.querySelector('.btn_type_delete')
	const title = cardElement.querySelector('.card__title')
	const image = cardElement.querySelector('.card__image')

	title.textContent = name
	image.src = link
	image.alt = name

	likeButton.addEventListener('click', handleLikeCard);
	deleteButton.addEventListener('click', handleDeleteCard);
	image.addEventListener('click', () => handlePreviewPicture(link, name));

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

const handlePreviewPicture = (link, title) => {
	const imagePopup = document.querySelector('.popup_type_image')
	const image = imagePopup.querySelector('.popup__image')
	const sign = imagePopup.querySelector('.popup__sign')
	image.src = link
	image.alt = title
	sign.textContent = title

	openPopup(imagePopup)
}

const handleLikeCard = (event) => {
	event.target.classList.toggle('btn_type_like-active')
}

const handleDeleteCard = (event) => {
	event.target.closest('.card').parentElement.remove()
}

initCards(initialCards)

formEditProfile.addEventListener('submit', handleProfileFormSubmit)
formAddCard.addEventListener('submit', handleAddCardFormSubmit)
btnEditProfile.addEventListener('click', openEditProfilePopup)
btnAddCard.addEventListener('click', openAddCardPopup)
popups.forEach(popup => {
	popup.addEventListener('click', onPopupClick, true)
})