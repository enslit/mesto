export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(url, method = 'GET', body = null) {
    const fetchUrl = `${this._baseUrl}/${url}`
    const options = {
      method,
      headers: this._headers
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    return fetch(fetchUrl, options)
      .then((res) => {
        if ( ! res.ok) {
          return Promise.reject({
            statusCode: res.status,
            message: res.statusText
          })
        }
        return res.json();
      })
  }

  getMe() {
    return this._fetch('users/me')
  }

  getInitialCards() {
    return this._fetch('cards')
  }

  updateProfile(data) {
    return this._fetch('users/me', 'PATCH', data)
  }

  postCard(card) {
    return this._fetch('cards', 'POST', card)
  }
}