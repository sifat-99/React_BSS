import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";

function App() {
    const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGameTurns] = useState([]);

    function handleSelectSquare(rowIndex, colIndex) {
        setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
        setGameTurns((prevTurns) => {
            let currentPlater = 'X'
            if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
                currentPlater = 'O'
            }
            const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlater }, ...prevTurns]
            return updatedTurns;
        })
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name={"Player 1"} symbol={"X"}
                        isActive={activePlayer === 'X'} />
                    <Player name={"Player 2"} symbol={"O"}
                        isActive={activePlayer === 'O'} />
                </ol>
                <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
            </div>
            <Log turns={gameTurns} />
        </main>
    )
}

export default App
