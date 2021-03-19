import {initialCards} from '../scripts/cards.js'
import {
	popupPreviewPicture,
	cardTemplateSelector,
	cardsListSelector,
	popupAddCardSelector,
	popupEditProfileSelector,
	buttonEditProfile,
	buttonAddCard,
	validateOptions,
} from '../scripts/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import './index.css'
import PopupWithForm from '../components/PopupWithForm'

// Callback обработчика клика на изображение
export const openPreviewPicture = (data) => {
	popupPreviewPicture.open(data)
}

// Обработчик события отправки формы редактирования профиля
const handleProfileFormSubmit = (values) => {
	// TODO SetUserInfo
}

// Обработчик события отправки формы добавления новой карточки
const handleAddCardFormSubmit = (values) => {
	const card = createCard(values)
	// Вставляем готовую карточку в начало списка карточек
	cardList.addItem(card)
}

// Создает карточку
const createCard = (cardData) => {
	const card = new Card(cardData, cardTemplateSelector, openPreviewPicture)
	return card.getCard()
}

// Включает валидацию формы в всплывающем окне
const enableValidation = (popup, options) => {
	const form = popup.getElement().querySelector('.form')
	const validator = new FormValidator(options, form)
	validator.enableValidation()
	return validator
}

// Создаем объект контейнера стартовых карточек
const cardList = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = createCard({place: item.name, ...item})
		cardList.addItem(card)
	}
}, cardsListSelector)
// Отрисовка стартовых карточек
cardList.renderElements()

// Создаем объект всплывающего окна с формой добавления карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector, handleAddCardFormSubmit)
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleProfileFormSubmit)

// Включаем валидацию
const validatorAddForm = enableValidation(popupAddCard, validateOptions)
const validatorEditProfile = enableValidation(popupEditProfile, validateOptions)

// Инициализация слушателей событий
buttonEditProfile.addEventListener('click', () => {
	validatorEditProfile.toggleButtonState()
	popupEditProfile.open()
})
buttonAddCard.addEventListener('click', () => {
	validatorAddForm.toggleButtonState()
	popupAddCard.open()
})
