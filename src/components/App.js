import Header from "../components/Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import React from "react";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";

export function App() {
  const [isEditPopupOpen, setEditPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isZoomImagePopupOpen, setZoomImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    id: "",
  });

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInform()
      .then((data) => {
        setCurrentUser({
          userName: data.name,
          userDescription: data.about,
          userAvatar: data.avatar,
          id: data._id,
        });
      })
      .catch((err) => console.log(err));

    api
      .getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    api
      .changeLikeCardStatusletLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setZoomImagePopupOpen(true);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item !== card))
      })
      .catch((err) => console.log(err));
  };

  const closeAllPopus = () => {
    setSelectedCard({});
    setEditPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setZoomImagePopupOpen(false);
  };

  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data)
      .then(() => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          userName: data.name,
          userDescription: data.about,
        }));
        closeAllPopus();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateProfilePhoto(data)
      .then(() => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          userAvatar: data.avatar,
        }));
        closeAllPopus();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopus();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditProfile={setEditPopupOpen}
          onAddPlace={setAddPlacePopupOpen}
          onEditAvatar={setEditAvatarPopupOpen}
          onImageClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopus}
          isOpen={isZoomImagePopupOpen}
        />

        <EditProfilePopup
          isOpen={isEditPopupOpen}
          onClose={closeAllPopus}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopus}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopus}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
