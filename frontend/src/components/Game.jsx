import React from "react"
import "../styles/Game.css"

function Game({game, onDelete, onEdit, onDetail}) {

    return (
        <div className="game-container" onClick={() => onDetail(game.id)}>
            <p className="game-title">{game.name}</p>
            <p className="game-genre">{game.genre}</p>
            <p className="game-developer">{game.developer}</p>
            <p className="game-publisher">{game.publisher}</p>
            <p className="game-platforms">{game.supported_platforms.map((platform) => platform.name).join(", ")}</p>
            <p className="game-languages">
                {game.languages.map((language) => 
                language.name).join(", ")}
            </p>
        </div>
    );
}

export default Game;