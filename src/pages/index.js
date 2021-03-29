import {Api} from '../utils/Api'
import Card from '../components/Card'
import FormValidator from '../components/FormValidator'
import PopupWithForm from '../components/PopupWithForm'
import Section from '../components/Section'
import {
	userInfo,
	popupPreviewPicture,
	selectors,
	buttonAddCard,
	buttonEditProfile
} from '../utils/constants.js'
import './index.css'
import {PopupWithConfirm} from '../components/PopupWithConfirm'

// Callback обработчика клика на изображение
const openPreviewPicture = (data) => popupPreviewPicture.open(data)
// Callback обработчика клика на иконку удаления карточки
const openConfirmDelete = (id, listItem) => popupWidthConfirm.open(id, listItem)

// Обработчик события отправки формы удаления карточки
const handleConfirmDelete = (id, listItem) => {
	popupWidthConfirm.setLoading(true)
	api.delete(id)
		.then(() => {
			listItem.remove()
			popupWidthConfirm.close()
		})
		.catch(err => console.error(err))
		.finally(() => popupWidthConfirm.setLoading(false))
}

// Обработчик события отправки формы редактирования профиля. Устанавливает данные профиля
const handleProfileFormSubmit = (values) => {
	api.updateProfile(values)
		.then((newData) => {
			userInfo.setUserInfo(newData)
			popupEditProfile.close()
		})
		.catch((err) => {
			popupEditProfile.showError(err.message || err.toString())
		})
		.finally(() => {
			popupEditProfile.setLoading(false)
		})
}

// Обработчик события отправки формы добавления новой карточки. Добавляет новую в начало секции
const handleAddCardFormSubmit = (values) => {
	api.postCard(values)
		.then((newCard) => {
			cardList.addItem(createCard(newCard))
			popupAddCard.close()
		})
		.catch((err) => {
			popupAddCard.showError(err.message || err.toString())
		})
		.finally(() => {
			popupAddCard.setLoading(false)
		})
}

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
const createCard = (cardData) => {
	const card = new Card(cardData, selectors.cardTemplate, {
		userId: userInfo.getId(),
		handleClickImage: openPreviewPicture,
		handleClickDelete: openConfirmDelete,
		api,
	})
	return card.getCard()
}

// Включает валидацию формы
const enableValidation = (popup, options) => {
	const form = popup.getElement().querySelector('.form')
	const validator = new FormValidator(options, form)
	validator.enableValidation()
	return validator
}

// Создаем объект секции стартовых карточек
const cardList = new Section({
	renderer: (item) => {
		const card = createCard(item)
		cardList.addItem(card)
	}
}, selectors.cardsList)

// Создаем объекты всплывающего окна с формой
const popupAddCard = new PopupWithForm(selectors.popupAddCard, handleAddCardFormSubmit)
const popupEditProfile = new PopupWithForm(selectors.popupEditProfile, handleProfileFormSubmit)
const popupWidthConfirm = new PopupWithConfirm(selectors.popupDeleteCard, handleConfirmDelete)

// Включаем валидацию
const validatorAddForm = enableValidation(popupAddCard, selectors.validateOptions)
const validatorEditProfile = enableValidation(popupEditProfile, selectors.validateOptions)

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
	.catch((err) => {
		console.error(err.message || err.toString())
	})
	.finally(() => {
		console.log('loading personal info finally')
	})

api.getInitialCards()
	.then(cards => {
		cardList.setItems(cards.reverse())
		cardList.renderElements()
	})
	.catch((err) => {
		console.error(err.message || err.toString())
	})
	.finally(() => {
		console.log('loading initial cards finally')
	})

// Инициализация слушателей событий
buttonEditProfile.addEventListener('click', openEditProfile)
buttonAddCard.addEventListener('click', openAddCard)
