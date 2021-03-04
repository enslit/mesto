import {initialCards} from '../scripts/cards.js'
import {
	cardTemplateSelector,
	popupElements,
	cardsListSelector,
	buttonElements,
	formEditProfileElements,
	profileElements,
	validateOptions,
	forms
} from '../scripts/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import './index.css'
import PopupWithForm from '../components/PopupWithForm'

// Обработчик клика кнопки открытия всплывающего окна с форой редактирования профиля
const openEditProfilePopup = () => {
	popupElements.editProfile.open()
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

const cardList = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = createCard(item)
		cardList.addItem(card)
	}
}, cardsListSelector)

cardList.renderElements()

const formAddCard = new PopupWithForm(popupElements.addCard, handleAddCardFormSubmit)

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
buttonElements.editProfile.addEventListener('click', openEditProfilePopup)
buttonElements.addCard.addEventListener('click', () => formAddCard.open())
