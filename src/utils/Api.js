import { configApi } from "./constants";

class Api {
  constructor({ id, headers }) {
    this._id = id;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getCardList() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteCard(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}`,
      {
        headers: this._headers,
        method: "DELETE",
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }
  letLike(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}/likes`,
      {
        headers: this._headers,
        method: "PUT",
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }
  deleteLike(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/cards/${cardId}/likes`,
      {
        headers: this._headers,
        method: "DELETE",
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }
  getUserInform() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  editUserInfo({ name, about }) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._id}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  updateProfilePhoto({ avatar }) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._id}/users/me/avatar`,
      {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify({
          avatar,
        }),
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new Api(configApi);