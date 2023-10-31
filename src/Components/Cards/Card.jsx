import "./card.css";
import cardImage from "./cover-img.png";

function Card({ cards, choiceHandler, namingClass }) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <div className={`card ${namingClass(card)}`} key={card.id}>
            <img
              className="cover"
              src={cardImage} 
              alt="Check Your Connection Bitch"
              onClick={() => choiceHandler(card)}
            />
            <img
              className="front"
              src={card.src}
              alt="Check Your Connection Bitch"
            />
        </div>
      ))}
    </div>
  );
}

export default Card;