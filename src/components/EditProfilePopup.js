import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const userContext = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (!userContext) return;
    setName(userContext.userName);
    setDescription(userContext.userDescription)
  }, [userContext]);
 
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
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
        onChange={handleChangeName}
        value={name || ""}
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
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span
        className="popup__error-text_job popup__error-text"
        id="job-error"
      ></span>
    </PopupWithForm>
  );
}
