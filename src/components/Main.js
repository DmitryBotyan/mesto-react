import React from "react";
import { api } from "../utils/api.js";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onDelete,
  onImageClick,
}) {
  const [state, setState] = React.useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
  });

  const [cardList, setCardList] = React.useState({
    cards: [],
  });

  React.useEffect(() => {
    api
      .getCardList()
      .then((data) => {
        setCardList({ cards: data });
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserInform()
      .then((data) => {
        setState({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <img
            src={state.userAvatar}
            alt="Аватар"
            className="profile__avatar"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{state.userName}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{state.userDescription}</p>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cardList.cards.map((card) => (
          <Card
            card={card}
            onDelete={onDelete}
            onImageClick={onImageClick}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}
