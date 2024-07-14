import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Cards/Card";
import StartMenu from "./Components/StartMenu/StartMenu";
import Won from "./Components/WonMsg/Won";

import item1 from "../public/item-1.png";
import item2 from "../public/item-2.png";
import item3 from "../public/item-3.png";
import item4 from "../public/item-4.png";
import item5 from "../public/item-5.png";
import item6 from "../public/item-6.png";

const IMAGES = [item1, item2, item3, item4, item5, item6];

function App() {
  const [cards, setCards] = useState([shuffleImg]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [start, setStart] = useState(false);
  const [result, setResult] = useState(false);

  const cardImages = IMAGES.map((item) => {
    return { src: item, matched: false };
  });

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
    let allMatched = true;

    for (let card of cards)
      if (!card.matched) {
        allMatched = false;
      }

    if (allMatched) {
      console.log("Game completed.");
      setTimeout(() => {
        setResult(true);
      }, 500);
      
    }
  }, [cards]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("Matched");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src == choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        console.log("Didn't Match");
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
  }

  function namingClass(card) {
    if (card == choiceOne || card == choiceTwo || card.matched) {
      return "flipped";
    } else {
      return "";
    }
  }

  function startHandler() {
    setStart(!start);
    shuffleImg();
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return (<div className="for-mobile">
            Try on a computer
          </div>
        );
  } else {
      return (
        <div className="header">
          {start && !result && <h1 className="header__heading">Memory Game</h1>}
          {start && !result && (
            <button className="header__button" onClick={shuffleImg}>
              Reset
            </button>
          )}
          {!start && <StartMenu startHandler={startHandler} />}
          {start && !result && (
            <div className="card-container">
              <Card
                cards={cards}
                choiceHandler={choiceHandler}
                namingClass={namingClass}
              />
            </div>
          )}
          {start && !result && (
            <div className="turns">
              <div>Turns</div>
              <div>-</div>
              <div>{turns}</div>
            </div>
          )}
          {result && <Won turns={turns} />}
        </div>
      );
  }
  
}

export default App;
