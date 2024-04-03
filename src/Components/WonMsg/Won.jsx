import "./Won.css"

function Won({turns}){
    return (
        <div className="won-container">
            <div>Congrats!</div>
            <div>You have completed the game </div>
            <div>in {turns} turns</div>
        </div>
    )
}

export default Won;