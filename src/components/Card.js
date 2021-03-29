/**
 * @class
 * @classdesc Класс создания карточки с изображением
 */
class Card {
  constructor(data, selector, options) {
    this._selector = selector

    this._callbackClickImage = options.handleClickImage
    this._callbackDeleteCard = options.handleClickDelete
    this._callbackClickLike = options.handleClickLike

    this._id = data._id
    this._name = data.name
    this._link = data.link
    this._likes = data.likes

    this._isLiked = this._checkIsLiked(options.userId, data) // Проверка установлен ли лайк пользователя
    this._canDelete = this._checkCanDelete(options.userId, data) // Проверка на возможность удалить карточку

    this._initElements() // Инициализация элементов
  }

  _initElements() {
    this._cardElement = this._getTemplate()
    this._title = this._cardElement.querySelector('.card__title')
    this._deleteButton = this._cardElement.querySelector('.btn_type_delete')
    this._likeCount = this._cardElement.querySelector('.card__like-cnt')
    this._likeButton = this._cardElement.querySelector('.btn_type_like')
    this._image = this._cardElement.querySelector('.card__image')
  }

  // Возвращает клон шаблона
  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content
      .cloneNode(true)
  }

  _checkCanDelete(userId, cardData) {
    if (cardData.hasOwnProperty('owner')) {
      return userId === cardData.owner._id
    }
    return false
  }

  _checkIsLiked(userId, cardData) {
    if (cardData.hasOwnProperty('likes')) {
      return cardData.likes.some(user => user._id === userId)
    }
    return false
  }

  // Отрисовка количества лайков
  renderCountLikes(likes) {
    this._likeCount.textContent = likes.length || ''
  }

  toggleLike() {
    this._isLiked = !this._isLiked
    this._likeButton.classList.toggle('btn_type_like-active')
  }

  // Слушатель клика на кнопку лайк
  _handleLikeCard() {
    const cardData = {
      id: this._id,
      isLiked: this._isLiked
    }
    this._callbackClickLike(cardData, this)
  }

  // Слушатель клика на кнопку удаления карточки
  _handleDeleteCard(evt) {
    const listItem = evt.target.closest('.cards__list-item')
    this._callbackDeleteCard(this._id, listItem)
  }

  // Слушатель клика на изображение
  _handlePreviewPicture() {
    const previewData = {
      link: this._link,
      title: this._name
    }
    
    this._callbackClickImage(previewData)
  }

  // Устанавливаем слушатели событий
  _setListeners() {
    this._likeButton.addEventListener('click', this._handleLikeCard.bind(this))
    this._image.addEventListener('click', this._handlePreviewPicture.bind(this))
    if (this._canDelete) {
      this._deleteButton.addEventListener('click', this._handleDeleteCard.bind(this))
    }
  }

  // Возвращает готовую для вставки карточку
  getCard() {
    // Если карточка принадлежит пользователю, то покажем кнопку удаления
    if (this._canDelete) {
      this._deleteButton.classList.remove('card__delete_hidden')
    }

    // Заполним заголовок и адрес изображения
    this._title.textContent = this._name
    this._image.src = this._link
    this._image.alt = this._name
    // Если есть лайк пользователя
    if (this._isLiked) {
      this._likeButton.classList.add('btn_type_like-active')
    }
    // Отображение количества лайков
    this.renderCountLikes(this._likes)

    this._setListeners(this._cardElement)

    return this._cardElement
  }
}

export default Card
