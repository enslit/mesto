// Скрытие переданного всплывающего окна
const closePopup = (popup) => {
	removeListenersPopup(popup)
	popup.classList.remove('popup_opened')
}

// Показ переданного всплывающего окна
const openPopup = (popup) => {
	setListenersPopup(popup)
	popup.classList.add('popup_opened')
}

// Обработчик клика кнопки открытия всплывающего окна с форой редактирования профиля
const openEditProfilePopup = () => {
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

	// Создаем разметку карточки
	const card = createCard({name: inputNameCard.value, link: inputLink.value})
	// Вставляем готовую карточку в начало списка карточек
	putCardToContainer(card, cardsList)

	closePopup(popupAddCard)
	formAddCard.reset()
}

// Создаем карточку и возвращаем ее
const createCard = (card) => {
	// Получим поля карточки из переданного объекта
	const {name, link} = card
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
	image.addEventListener('click', () => handlePreviewPicture(card));

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

// Обработчик клика по изображению
const handlePreviewPicture = ({link, title}) => {
	// Присвоим полученные в параметрах значения
	imgPreview.src = link
	imgPreview.alt = title
	signPreview.textContent = title

	// Покажем всплывающее окно с изображением
	openPopup(popupPreviewImage)
}

// Обработчик клика по кнопке лайка карточки
const handleLikeCard = (event) => {
	event.target.classList.toggle('btn_type_like-active')
}

// Обработчик клика по кнопке удаления карточки
const handleDeleteCard = (event) => {
	event.target.closest('.cards__list-item').remove()
}

// Инициализируем список карточек из стартового массива
initCards(initialCards, cardsList)

// Слушатель события клика по всплывающему окну
const handleClickPopup = ({target}) => {
	if (target.classList.contains('btn_type_close')) { // Клик по кнопке закрытия
		closePopup(target.closest('.popup'))
	} else if (target.classList.contains('popup')) { // Клик по оверлею
		closePopup(target)
	}
}

const handlePressEsc = ({key}) => {
	// Если нажата кнопка ESC находим открытое окно и закрываем его
	if (key === 'Escape') {
		closePopup(document.querySelector('.popup_opened'))
	}
}

// Добавление слушателей событий для всплывающего окна
const setListenersPopup = (popup) => {
	popup.addEventListener('click', handleClickPopup, true)
	document.addEventListener('keydown', handlePressEsc)
}

// Удаление слушателей событий для всплывающего окна
const removeListenersPopup = (popup) => {
	popup.removeEventListener('click', handleClickPopup)
	document.removeEventListener('keydown', handlePressEsc)
}

// Включаем валидацию
enableValidation(validateOptions)

// Инициализация слушателей событий
formEditProfile.addEventListener('submit', handleProfileFormSubmit)
formAddCard.addEventListener('submit', handleAddCardFormSubmit)
btnEditProfile.addEventListener('click', openEditProfilePopup)
btnAddCard.addEventListener('click', openAddCardPopup)
