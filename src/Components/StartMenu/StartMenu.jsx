import { useState } from "react";
import "./StartMenu.css"

function StartMenu({startHandler}){
    return (
        <div className="startMenu">
            <div className="title">
                Memory Game
            </div>
            <div className="start">
                <button onClick={() => startHandler()}>Play</button>
            </div>
        </div>
    );
}

export default StartMenu;