import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm'
import Section from '../components/Section.js'
import {initialCards} from '../scripts/cards.js'
import {
	userInfo,
	popupPreviewPicture,
	selectors,
	buttonAddCard,
	buttonEditProfile
} from '../scripts/constants.js'
import './index.css'

// Callback обработчика клика на изображение
export const openPreviewPicture = (data) => {
	popupPreviewPicture.open(data)
}

// Обработчик события отправки формы редактирования профиля
const handleProfileFormSubmit = (values) => {
	userInfo.setUserInfo(values)
}

// Обработчик события отправки формы добавления новой карточки
const handleAddCardFormSubmit = (values) => {
	const card = createCard(values)
	// Вставляем готовую карточку в начало списка карточек
	cardList.addItem(card)
}

// Обработчик открытия всплывающего окна редактирования профиля
const openEditProfile = () => {
	popupEditProfile.setInitValues(userInfo.getUserInfo())
	validatorEditProfile.toggleButtonState()
	popupEditProfile.open()
}

const openAddCard = () => {
	validatorAddForm.toggleButtonState()
	popupAddCard.open()
}

// Создает карточку
const createCard = (cardData) => {
	const card = new Card(cardData, selectors.cardTemplate, openPreviewPicture)
	return card.getCard()
}

// Включает валидацию формы и возвращает валидатор
const enableValidation = (popup, options) => {
	const form = popup.getElement().querySelector('.form')
	const validator = new FormValidator(options, form)
	validator.enableValidation()
	return validator
}

// Создаем объект секции стартовых карточек
const cardList = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = createCard({place: item.name, ...item})
		cardList.addItem(card)
	}
}, selectors.cardsList)

// Создаем объекты всплывающего окна с формой
const popupAddCard = new PopupWithForm(selectors.popupAddCard, handleAddCardFormSubmit)
const popupEditProfile = new PopupWithForm(selectors.popupEditProfile, handleProfileFormSubmit)

// Включаем валидацию
const validatorAddForm = enableValidation(popupAddCard, selectors.validateOptions)
const validatorEditProfile = enableValidation(popupEditProfile, selectors.validateOptions)

// Отрисовка стартовых карточек
cardList.renderElements()

// Инициализация слушателей событий
buttonEditProfile.addEventListener('click', openEditProfile)
buttonAddCard.addEventListener('click', openAddCard)
