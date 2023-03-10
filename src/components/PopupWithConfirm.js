import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function PopupWithConfirm({ isOpen, onClose }) {
    
    return (
        <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        isOpen={isOpen}
        onClose={onClose}
        buttonText='Да'
      />
    )
}