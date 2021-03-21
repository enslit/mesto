/*
* Класс создания карточки с изображением
* */

class Card {
  constructor(data, selector, cb) {
    this._selector = selector
    this._name = data.name
    this._link = data.link
    this._likes = data.likes.length || 0
    this._callback = cb
    this._isLiked = false
  }

  // Возвращает клон шаблона
  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content
      .cloneNode(true)
  }

  // Слушатель клика на кнопку лайк
  _handleLikeCard(evt) {
    this._isLiked = !this._isLiked
    evt.target.classList.toggle('btn_type_like-active')
  }

  // Слушатель клика на кнопку удаления карточки
  _handleDeleteCard(evt) {
    evt.target.closest('.cards__list-item').remove()
  }

  // Слушатель клика на изображение
  _handlePreviewPicture() {
    const previewData = {
      link: this._link,
      title: this._name
    }
    
    this._callback(previewData)
  }

  // Устанавливаем слушатели событий
  _setListeners(cardElement) {
    const likeButton = cardElement.querySelector('.btn_type_like')
    const deleteButton = cardElement.querySelector('.btn_type_delete')
    const image = cardElement.querySelector('.card__image')

    likeButton.addEventListener('click', this._handleLikeCard.bind(this))
    deleteButton.addEventListener('click', this._handleDeleteCard.bind(this))
    image.addEventListener('click', this._handlePreviewPicture.bind(this))
  }

  // Возвращает готовую для вставки карточку
  getCard() {
    const cardElement = this._getTemplate()
    this._setListeners(cardElement)

    const title = cardElement.querySelector('.card__title')
    const image = cardElement.querySelector('.card__image')
    const likeCount = cardElement.querySelector('.card__like-cnt')

    // Заполним заголовок и адрес изображения
    title.textContent = this._name
    image.src = this._link
    image.alt = this._name
    likeCount.textContent = this._likes || ''

    return cardElement
  }
}

export default Card
