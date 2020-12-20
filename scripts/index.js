const $profile = document.querySelector('.profile')
const $name = $profile.querySelector('.profile__name')
const $about = $profile.querySelector('.profile__about')
const $popup = document.querySelector('.popup')
const $form = $popup.querySelector('.form')
const $nameInput = $form.querySelector('input[name="name"]')
const $aboutInput = $form.querySelector('input[name="about"]')
const $btnEditProfile = $profile.querySelector('.btn_type_edit-profile')
const $btnClosePopup = $popup.querySelector('.btn_type_close')

const popupIsOpened = () => $popup.classList.contains('popup_opened')

const closePopup = () => $popup.classList.remove('popup_opened')

const openPopup = () => {
	$nameInput.value = $name.innerText
	$aboutInput.value = $about.innerText
	$popup.classList.add('popup_opened')
}

const togglePopup = event => {
	if (event.target === event.currentTarget) {
		popupIsOpened() ? closePopup() : openPopup()
	}
}

const handleFormSubmit = event => {
	event.preventDefault()

	$name.innerText = $nameInput.value.trim()
	$about.innerText = $aboutInput.value.trim()

	closePopup()
}

$form.addEventListener('submit', handleFormSubmit)
$popup.addEventListener('click', togglePopup)
$btnEditProfile.addEventListener('click', togglePopup)
$btnClosePopup.addEventListener('click', togglePopup)