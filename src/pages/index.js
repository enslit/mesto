import Card from '../components/Card'
import FormValidator from '../components/FormValidator'
import PopupWithForm from '../components/PopupWithForm'
import Section from '../components/Section'
import {
	userInfo,
	popupPreviewPicture,
	selectors,
	buttonAddCard,
	buttonEditProfile,
	avatar,
	api,
} from '../utils/constants.js'
import './index.css'
import {PopupWithConfirm} from '../components/PopupWithConfirm'

// Callback обработчика клика на изображение
const openPreviewPicture = (data) => popupPreviewPicture.open(data)

// Callback обработчика клика на иконку удаления карточки
const openConfirmDelete = (id, listItem) => popupWidthConfirm.open(id, listItem)

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

// Обработчик клика на аватар
const openUpdateAvatar = () => {
	validatorUpdateAvatar.toggleButtonState()
	popupUpdateAvatar.open()
}

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

// Обработчик события отправки формы добавления новой карточки. Добавляет новую в начало секции
const handleAddCardFormSubmit = (values) => {
	api.postCard(values)
		.then((newCard) => {
			cardList.addItem(createCard(newCard))
			popupAddCard.close()
		})
		.catch((err) => {
			console.error(err.message || err.toString())
		})
		.finally(() => {
			popupAddCard.setLoading(false)
		})
}

// Обработчик события отправки формы обновления аватара
const handleUpdateAvatarSubmit = (values) => {
	api.updateAvatar(values)
		.then(res => {
			userInfo.setUserInfo(res)
			popupUpdateAvatar.close()
		})
		.catch(err => console.error(err))
		.finally(() => popupUpdateAvatar.setLoading(false))
}

// Обработчик события отправки формы редактирования профиля. Устанавливает данные профиля
const handleProfileFormSubmit = (values) => {
	api.updateProfile(values)
		.then((newData) => {
			userInfo.setUserInfo(newData)
			popupEditProfile.close()
		})
		.catch((err) => {
			console.error(err.message || err.toString())
		})
		.finally(() => {
			popupEditProfile.setLoading(false)
		})
}

// Обработчик клика на кнопку лайк
const handleClickLike = ({id, isLiked}, cardApi) => {
	api.like(id, !isLiked)
	  .then(({likes}) => {
		  cardApi.toggleLike()
	    cardApi.renderCountLikes(likes)
	  })
	  .catch(err => console.error(err))
}

// Создает новую карточку карточку
const createCard = (cardData) => {
	const card = new Card(cardData, selectors.cardTemplate, {
		userId: userInfo.getId(),
		handleClickImage: openPreviewPicture,
		handleClickDelete: openConfirmDelete,
		handleClickLike
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
const popupUpdateAvatar = new PopupWithForm(selectors.popupUpdateAvatar, handleUpdateAvatarSubmit)
const popupWidthConfirm = new PopupWithConfirm(selectors.popupDeleteCard, handleConfirmDelete)

// Включаем валидацию
const validatorAddForm = enableValidation(popupAddCard, selectors.validateOptions)
const validatorEditProfile = enableValidation(popupEditProfile, selectors.validateOptions)
const validatorUpdateAvatar = enableValidation(popupUpdateAvatar, selectors.validateOptions)

// Загрузка данных профиля
api.getMe()
	.then(data => {
		userInfo.setUserInfo(data)
	})
	.catch((err) => {
		console.error(err.message)
	})

// Инициализация карточек
api.getInitialCards()
	.then(cards => {
		cardList.setItems(cards.reverse())
		cardList.renderElements()
	})
	.catch((err) => {
		console.error(err.message)
	})

// Инициализация слушателей событий
buttonEditProfile.addEventListener('click', openEditProfile)
buttonAddCard.addEventListener('click', openAddCard)
avatar.addEventListener('click', openUpdateAvatar)
