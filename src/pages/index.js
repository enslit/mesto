import {initialCards} from '../scripts/cards.js'
import {
	cardTemplateSelector,
	popupElements,
	cardsListSelector,
	buttonElements,
	formAddCardElements,
	formEditProfileElements,
	profileElements,
	validateOptions,
	forms
} from '../scripts/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import './index.css'

// Обработчик клика кнопки открытия всплывающего окна с форой редактирования профиля
const openEditProfilePopup = () => {
	popupElements.editProfile.open()
}

// Обработчик клика кнопки открытия всплывающего окна с формой добавления новой карточки
const openAddCardPopup = () => {
	popupElements.addCard.open()
}

// Callback обработчика клика на изображение
export const openPreviewPicture = (data) => {
	popupElements.previewPicture.open(data)
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

	const card = createCard(cardData)

	// Вставляем готовую карточку в начало списка карточек
	cardList.addItem(card)

	popupElements.addCard.close()
	formAddCardElements.form.reset()
}

// Создает карточку
const createCard = (cardData) => {
	const card = new Card(cardData, cardTemplateSelector, openPreviewPicture)
	return card.getCard()
}

const cardList = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = createCard(item)
		cardList.addItem(card)
	}
}, cardsListSelector)

cardList.renderElements()

// Заполним значения полей ввода перед инициализацией валидации, чтобы кнопка не блокировалась
formEditProfileElements.name.value = profileElements.name.textContent
formEditProfileElements.about.value = profileElements.about.textContent

// Включаем валидацию
forms.forEach(form => {
	const validator = new FormValidator(validateOptions, form)
	validator.enableValidation()
})

// Инициализация слушателей событий
formEditProfileElements.form.addEventListener('submit', handleProfileFormSubmit)
formAddCardElements.form.addEventListener('submit', handleAddCardFormSubmit)
buttonElements.editProfile.addEventListener('click', openEditProfilePopup)
buttonElements.addCard.addEventListener('click', openAddCardPopup)
