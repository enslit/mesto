import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm'
import Section from '../components/Section.js'
import {initialCards} from '../utils/cards.js'
import {
	userInfo,
	popupPreviewPicture,
	selectors,
	buttonAddCard,
	buttonEditProfile
} from '../utils/constants.js'
import './index.css'
import {Api} from '../utils/Api'

// Callback обработчика клика на изображение
export const openPreviewPicture = (data) => popupPreviewPicture.open(data)

// Обработчик события отправки формы редактирования профиля. Устанавливает данные профиля
const handleProfileFormSubmit = (values) => userInfo.setUserInfo(values)

// Обработчик события отправки формы добавления новой карточки. Добавляет новую в начало секции
const handleAddCardFormSubmit = (values) => cardList.addItem(createCard(values))

// Обработчик клика на кнопку открытия всплывающего окна редактирования профиля
const openEditProfile = () => {
	popupEditProfile.setInitValues(userInfo.getUserInfo())
	validatorEditProfile.toggleButtonState()
	popupEditProfile.open()
}

// Обработчик клика на кнопку открытия всплывающего окна добавления новой карточки
const openAddCard = () => {
	validatorAddForm.toggleButtonState() // Выполняется сброс состояния кнопки
	popupAddCard.open()
}

// Создает новую карточку карточку
const createCard = (cardData) => (
	new Card(cardData, selectors.cardTemplate, openPreviewPicture).getCard()
)

// Включает валидацию формы
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

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
	headers: {
		authorization: '52186c90-0ae5-45bb-99b5-e4acaa2b939f',
		'Content-Type': 'application/json',
	}
})

api.getMe()
	.then(data => {
		userInfo.setUserInfo(data)
	})

// api.getInitialCards()
// 	.then(cards => console.log(cards))

// Инициализация слушателей событий
buttonEditProfile.addEventListener('click', openEditProfile)
buttonAddCard.addEventListener('click', openAddCard)
