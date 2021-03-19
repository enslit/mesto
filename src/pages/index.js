import {initialCards} from '../scripts/cards.js'
import {
	cardTemplateSelector,
	popupElements,
	cardsListSelector,
	buttonElements,
	formEditProfileElements,
	profileElements,
	validateOptions,
	popupAddCardSelector,
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

// Включаем валидацию
const popupElement = popupAddCard.getElement()
const formEl = popupElement.querySelector('.form_type_add-card')
const validatorAddForm = new FormValidator(validateOptions, formEl)
validatorAddForm.enableValidation()

// Инициализация слушателей событий
formEditProfileElements.form.addEventListener('submit', handleProfileFormSubmit)
buttonElements.editProfile.addEventListener('click', openEditProfilePopup)
buttonElements.addCard.addEventListener('click', () => {
	validatorAddForm.toggleButtonState()
	popupAddCard.open()
})
