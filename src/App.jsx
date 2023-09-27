// App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";


import item1 from './assets/images/item-1.png';
import item2 from './assets/images/item-2.png';
import item3 from './assets/images/item-3.png';
import item4 from './assets/images/item-4.png';
import item5 from './assets/images/item-5.png';
import item6 from './assets/images/item-6.png';

const IMAGES = [item1, item2, item3, item4, item5, item6]


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const cardImages = IMAGES.map((item, index) => {
    return {src: item, matched: false}
  })


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
      <div className="turns">
        <div>Turns</div>
        <div>-</div>
        <div>{turns}</div>
      </div>
    </div>
  );
}

export default App;
