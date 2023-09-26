import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const cardImages = [
    { src: "/item-1.png", matched : false },
    { src: "/item-2.png", matched : false },
    { src: "/item-3.png", matched : false },
    { src: "/item-4.png", matched : false },
    { src: "/item-5.png", matched : false },
    { src: "/item-6.png", matched : false },
  ];

  function shuffleImg() {
    const shuffledImages = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledImages);
    setTurns(0);
  }

  function choiceHandler(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("Matched")
        setCards(prevCards => {
          return prevCards.map(card =>{
            if(card.src == choiceOne.src){
              return {...card, matched : true}
            }
            else{
              return card
            }
          })
        }
        )
        
        resetTurn();
      } else {
        console.log("Didn't Match");
        setTimeout(() => {
          resetTurn()
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);


  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
  }
  

  function namingClass(card){

    if(card == choiceOne || card == choiceTwo || card.matched){
      return "flipped"
    }
    else{
      return ""
    }
  }

  return (
    <div className="header">
      <h1 className="header__heading">Memory Game</h1>
      <button className="header__button" onClick={shuffleImg}>
        New Game
      </button>
      <div className="card-container">
        <Card 
          cards={cards} 
          choiceHandler={choiceHandler} 
          namingClass = {namingClass}
          />
      </div>
      <div className="turns">{turns}</div>
    </div>
  );
}

export default App;
