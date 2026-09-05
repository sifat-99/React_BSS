import React, { useState } from 'react'
const Player = ({ name, symbol, isActive }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name)
    const handleEditing = () => {
        setIsEditing((e) => !e)
    }
    console.log(playerName)
    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {
                    !isEditing ? <span className="player-name">{playerName}</span> :
                        <input required value={playerName} onChange={(e) => {
                            setPlayerName(e.target.value);
                        }} type="text" />
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing}>{!isEditing ? "Edit" : "Save"}</button>
        </li>
    )
}
export default Player
