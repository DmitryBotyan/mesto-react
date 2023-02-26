import iconDelete from "../images/Group.svg";

export default function Card({ card, onDelete, onImageClick }) {
  const handleClick = () => {
    onImageClick(card);
  };

  return (
    <div className="elements__element">
      <img
        src={iconDelete}
        alt="Корзина"
        className="elements__delete button"
        onClick={onDelete}
      />
      <img
        src={card.link}
        alt={card.name}
        className="elements__photo"
        onClick={handleClick}
      />
      <h2 className="elements__title">{card.name}</h2>
      <button className="elements__like button" type="button"></button>
      <span className="elements__likes-count">{card.likes.length}</span>
    </div>
  );
}
