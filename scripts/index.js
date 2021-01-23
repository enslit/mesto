/* Надеюсь не перестарался с комментариями :) */

const cardTemplate = document.querySelector('#cardTemplate').content
const profile = document.querySelector('.profile')
const name = profile.querySelector('.profile__name')
const about = profile.querySelector('.profile__about')
const cardsList = document.querySelector('.cards__list')
// Всплывающие окна
const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const popupAddCard = document.querySelector('.popup_type_add-card')
// Кнопки
const buttonsPopupClose = document.querySelectorAll('.btn_type_close')
const btnEditProfile = profile.querySelector('.btn_type_edit-profile')
const btnAddCard = profile.querySelector('.btn_type_add-card')
// Формы и их элементы
const formAddCard = popupAddCard.querySelector('.form')
const formEditProfile = popupEditProfile.querySelector('.form')
const inputName = formEditProfile.querySelector('.form__input_type_name')
const inputAbout = formEditProfile.querySelector('.form__input_type_about')
const inputNameCard = formAddCard.querySelector('.form__input_type_card-name')
const inputLink = formAddCard.querySelector('.form__input_type_link')

// Скрытие переданного всплывающего окна
const closePopup = (popup) => {
	popup.classList.remove('popup_opened')
}

// Показ переданного всплывающего окна
const openPopup = (popup) => {
	popup.classList.add('popup_opened')
}

// Обработчик клика кнопки открытия всплывающего окна с форой редактирования профиля
const openEditProfilePopup = () => {
	// При открытии окна, заполним поля, имя пользователя и обо мне, исходя из текущих данных на странице
	inputName.value = name.textContent
	inputAbout.value = about.textContent
	openPopup(popupEditProfile)
}

// Обработчик клика кнопки открытия всплывающего окна с формой добавления новой карточки
const openAddCardPopup = () => {
	openPopup(popupAddCard)
}

// Обработчик события отправки формы редактирования профиля
const handleProfileFormSubmit = event => {
	event.preventDefault()

	// Перезапишем текст в элементе name и about на странице
	name.textContent = inputName.value
	about.textContent = inputAbout.value

	closePopup(popupEditProfile)
}

// Обработчик события отправки формы добавления новой карточки
const handleAddCardFormSubmit = event => {
	event.preventDefault()
	// Сохраним полученные данные из полей ввода
	const name = inputNameCard.value
	const link = inputLink.value

	// Создаем разметку карточки
	const card = createCard({name, link})
	// Вставляем готовую карточку в начало списка карточек
	putCardToContainer(card, cardsList)

	closePopup(popupAddCard)
	formAddCard.reset()
}

// Создаем карточку и возвращаем ее
const createCard = ({name, link}) => {
	// Клонируем шаблон карточки
	const cardElement = cardTemplate.cloneNode(true)
	// Найдем и запишем все элементы карточки необходимые для работы
	const likeButton = cardElement.querySelector('.btn_type_like')
	const deleteButton = cardElement.querySelector('.btn_type_delete')
	const title = cardElement.querySelector('.card__title')
	const image = cardElement.querySelector('.card__image')

	// Заполним заголовок и адрес изображения
	title.textContent = name
	image.src = link
	image.alt = name

	// Определяем слушатели действий: лайк, удаление и превью изображения
	likeButton.addEventListener('click', handleLikeCard);
	deleteButton.addEventListener('click', handleDeleteCard);
	image.addEventListener('click', () => handlePreviewPicture(link, name));

	return cardElement
}

// Добавление карточки в переданный контейнер
const putCardToContainer = (card, container) => {
	container.prepend(card)
}

// Создание и добавление карточек в разметку из массива
const initCards = (items, container) => {
	// На каждой итерации создаем карточку и добавляем ее в разметку
	items.forEach(item => {
		const card = createCard(item)
		putCardToContainer(card, container)
	})
}

// Обработчик клика кнопки закрытия всплывающего окна
const handleClickClose = (event) => {
	const popup = event.target.closest('.popup')
	closePopup(popup)
}

// Обработчик клика по изображению
const handlePreviewPicture = (link, title) => {
	// Получим и запишем элементы из разметки
	const imagePopup = document.querySelector('.popup_type_image')
	const image = imagePopup.querySelector('.popup__image')
	const sign = imagePopup.querySelector('.popup__sign')
	// Присвоим полученные в параметрах значение элементам из разметки
	image.src = link
	image.alt = title
	sign.textContent = title

	// Покажем всплывающее окно с изображением
	openPopup(imagePopup)
}

// Обработчик клика по кнопке лайка карточки
const handleLikeCard = (event) => {
	event.target.classList.toggle('btn_type_like-active')
}

// Обработчик клика по кнопке удаления карточки
const handleDeleteCard = (event) => {
	event.target.closest('.card').parentElement.remove()
}

// Инициализируем список карточек из стартового массива
initCards(initialCards, cardsList)

// Инициализация слушателей событий
formEditProfile.addEventListener('submit', handleProfileFormSubmit)
formAddCard.addEventListener('submit', handleAddCardFormSubmit)
btnEditProfile.addEventListener('click', openEditProfilePopup)
btnAddCard.addEventListener('click', openAddCardPopup)
buttonsPopupClose.forEach(btn => {
	btn.addEventListener('click', handleClickClose)
})