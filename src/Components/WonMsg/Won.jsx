import "./Won.css";

function Won({ turns }) {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="won-container">
      <div>Congrats!</div>
      <div>You have completed the game </div>
      <div>in {turns} turns</div>
      <button onClick={reloadPage}>Play Again</button>
    </div>
  );
}

export default Won;
