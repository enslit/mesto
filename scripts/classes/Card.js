import {PopupPreviewImage} from './Popup'

class Card {
  constructor(data, selector) {
    this._selector = selector
    this._name = data.name
    this._link = data.link
    this._isLiked = false
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content
      .cloneNode(true)
  }

  _handleLikeCard(evt) {
    this._isLiked = !this._isLiked
    evt.target.classList.toggle('btn_type_like-active')
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.cards__list-item').remove()
  }

  _handlePreviewPicture() {
    const previewData = {
      link: this._link,
      title: this._name
    }
    new PopupPreviewImage(previewData, '.popup_type_image').open()
  }

  _setListeners(cardElement) {
    const likeButton = cardElement.querySelector('.btn_type_like')
    const deleteButton = cardElement.querySelector('.btn_type_delete')
    const image = cardElement.querySelector('.card__image')

    likeButton.addEventListener('click', this._handleLikeCard.bind(this))
    deleteButton.addEventListener('click', this._handleDeleteCard.bind(this))
    image.addEventListener('click', this._handlePreviewPicture.bind(this))
  }

  getCard() {
    const cardElement = this._getTemplate()
    this._setListeners(cardElement)

    const title = cardElement.querySelector('.card__title')
    const image = cardElement.querySelector('.card__image')

    // Заполним заголовок и адрес изображения
    title.textContent = this._name
    image.src = this._link
    image.alt = this._name

    return cardElement
  }
}

export default Card
