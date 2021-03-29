/*
* Класс создания карточки с изображением
* */

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

    this._isLiked = this._checkIsLiked(options.userId, data)
    this._canDelete = this._checkCanDelete(options.userId, data)

    this._cardElement = this._getTemplate()
    this._likeCount = this._cardElement.querySelector('.card__like-cnt')
    this._likeButton = this._cardElement.querySelector('.btn_type_like')
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
  _setListeners(cardElement) {
    const likeButton = cardElement.querySelector('.btn_type_like')
    likeButton.addEventListener('click', this._handleLikeCard.bind(this))

    const image = cardElement.querySelector('.card__image')
    image.addEventListener('click', this._handlePreviewPicture.bind(this))

    if (this._canDelete) {
      const deleteButton = cardElement.querySelector('.btn_type_delete')
      deleteButton.classList.remove('card__delete_hidden')
      deleteButton.addEventListener('click', this._handleDeleteCard.bind(this))
    }
  }

  getElement() {
    return this._cardElement
  }

  // Возвращает готовую для вставки карточку
  getCard() {
    this._setListeners(this._cardElement)

    const title = this._cardElement.querySelector('.card__title')
    const image = this._cardElement.querySelector('.card__image')

    // Заполним заголовок и адрес изображения
    title.textContent = this._name
    image.src = this._link
    image.alt = this._name
    // Если есть лайк пользователя
    if (this._isLiked) {
      const likeButton = this._cardElement.querySelector('.btn_type_like')
      likeButton.classList.add('btn_type_like-active')
    }
    // Отображение количества лайков
    this.renderCountLikes(this._likes)

    return this._cardElement
  }
}

export default Card
