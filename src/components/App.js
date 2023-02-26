import Header from "../components/Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

export function App() {
  const [isEditPopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isZoomImagePopupOpen, setZoomImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState([]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setZoomImagePopupOpen(true);
  };

  const closeAllPopus = () => {
    setEditPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setZoomImagePopupOpen(false);
  };

  return (
    <body className="page">
      <Header />

      <Main
        onEditProfile={setEditPopupOpen}
        onAddPlace={setAddPlacePopupOpen}
        onEditAvatar={setEditAvatarPopupOpen}
        onDelete={setConfirmPopupOpen}
        onImageClick={handleCardClick}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopus}
        isOpen={isZoomImagePopupOpen}
      />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isEditPopupOpen}
        onClose={closeAllPopus}
      >
        <input
          type="text"
          className="popup__name input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          id="name"
          name="name"
        />
        <span
          className="popup__error-text_name popup__error-text"
          id="name-error"
        ></span>

        <input
          type="text"
          className="popup__job input"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          id="job"
          name="about"
        />
        <span
          className="popup__error-text_job popup__error-text"
          id="job-error"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopus}
      >
        <input
          type="text"
          className="popup__place input"
          placeholder="Название"
          id="place"
          minLength="2"
          maxLength="30"
          required
          name="name"
        />
        <span
          className="popup__error-text_name popup__error-text"
          id="place-error"
        ></span>
        <input
          type="url"
          className="popup__link input"
          placeholder="Ссылка на картинку"
          id="link"
          required
          name="link"
        />
        <span
          className="popup__error-text_job popup__error-text"
          id="link-error"
        ></span>
      </PopupWithForm>

      <PopupWithForm
        name="edit-photo"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopus}
      >
        <input
          type="text"
          className="popup__job input"
          placeholder="Введите ссылку"
          minLength="2"
          maxLength="200"
          required
          id="photo"
          name="avatar"
        />
      </PopupWithForm>

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopus}
      />

      <Footer />
    </body>
  );
}

export default App;
