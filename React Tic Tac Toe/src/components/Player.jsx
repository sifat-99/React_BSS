import React, { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleEditing = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            required
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
            }}
            type="text"
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
};

export default Player;
