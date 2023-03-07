import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('')

  const userContext = React.useContext(CurrentUserContext);

  React.useEffect(() => {
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
  }
  
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
      />
      <span
        className="popup__error-text_job popup__error-text"
        id="job-error"
      ></span>
    </PopupWithForm>
  );
}
