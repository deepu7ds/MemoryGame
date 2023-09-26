import "./card.css";

function Card({ cards, choiceHandler, namingClass }) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <div className={`card ${namingClass(card)}`} key={card.id}>
            <img
              className="cover"
              src="cover-img.png"
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