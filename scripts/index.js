import Card from './classes/Card.js'
import {initialCards} from './cards.js'
import {
	selectors,
	popupElements,
	cardsList,
	buttonElements,
	formAddCardElements,
	formEditProfileElements,
	profileElements,
	validateOptions
} from './constants.js'

// Обработчик клика кнопки открытия всплывающего окна с форой редактирования профиля
const openEditProfilePopup = () => {
	popupElements.editProfile.open()
}

// Обработчик клика кнопки открытия всплывающего окна с формой добавления новой карточки
const openAddCardPopup = () => {
	popupElements.addCard.open()
}

// Обработчик события отправки формы редактирования профиля
const handleProfileFormSubmit = event => {
	event.preventDefault()

	// Перезапишем текст в элементе name и about на странице
	profileElements.name.textContent = formEditProfileElements.name.value
	profileElements.about.textContent = formEditProfileElements.about.value

	popupElements.editProfile.close()
}

// Обработчик события отправки формы добавления новой карточки
const handleAddCardFormSubmit = event => {
	event.preventDefault()

	// Создаем разметку карточки
	const cardData = {
		name: formAddCardElements.name.value,
		link: formAddCardElements.link.value
	}
	const card = new Card(cardData, selectors.cardTemplateSelector).getCard()
	// Вставляем готовую карточку в начало списка карточек
	putCardToContainer(card, cardsList)

	popupElements.addCard.close()
	formAddCardElements.form.reset()
}

// Добавление карточки в переданный контейнер
const putCardToContainer = (card, container) => {
	container.prepend(card)
}

// Инициализируем список карточек из стартового массива
initialCards.forEach(item => {
	const card = new Card(item, selectors.cardTemplateSelector).getCard()
	putCardToContainer(card, cardsList)
})

// Заполним значения полей ввода перед инициализацией валидации, чтобы кнопка не блокировалась
formEditProfileElements.name.value = profileElements.name.textContent
formEditProfileElements.about.value = profileElements.about.textContent

// Включаем валидацию
enableValidation(validateOptions)

// Инициализация слушателей событий
formEditProfileElements.form.addEventListener('submit', handleProfileFormSubmit)
formAddCardElements.form.addEventListener('submit', handleAddCardFormSubmit)
buttonElements.editProfile.addEventListener('click', openEditProfilePopup)
buttonElements.addCard.addEventListener('click', openAddCardPopup)
