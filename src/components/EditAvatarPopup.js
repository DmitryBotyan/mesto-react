import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
        avatar: avatarRef.current.value
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = ""
  }, [isOpen])

  return (
    <PopupWithForm
      name="edit-photo"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
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
        ref={avatarRef}
      />
    </PopupWithForm>
  );
}
