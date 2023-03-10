import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef(null);
  const linkRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  };

  React.useEffect(() => {
    nameRef.current.value = ''
    linkRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Создать'
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
        ref={nameRef}
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
        ref={linkRef}
      />
      <span
        className="popup__error-text_job popup__error-text"
        id="link-error"
      ></span>
    </PopupWithForm>
  );
}
