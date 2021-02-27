class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res, err) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}. ${err}`));
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res, 'Карточки не получены...');
      })
      .catch((err) => console.log(err));
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        return this._getResponseData(res, 'Новая карточка не добавлена...');
      })
      .catch((err) => console.log(err));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res, 'Карточка не удалена...');
      })
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res, 'Данные пользователя не получены...');
      })
      .catch((err) => console.log(err));
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        return this._getResponseData(
          res,
          'Данные пользователя не обновлены...',
        );
      })
      .catch((err) => console.log(err));
  }

  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => {
        return this._getResponseData(res, 'Аватар пользователя не обновлён...');
      })
      .catch((err) => console.log(err));
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res, 'Лайк не поставлен...');
      })
      .catch((err) => console.log(err));
  }

  unsetLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res, 'Лайк не удалён...');
      })
      .catch((err) => console.log(err));
  }

  changeLikeCardStatus(id, liked) {
    if (liked) {
      return this.unsetLike(id);
    }

    return this.setLike(id);
  }
}

/** Object with methods to send and request all data on the server side. */
export const api = new Api({
  url: 'http://api.gumlokt.students.nomoreparties.space',
  // url: 'http://localhost:4000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
