import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { use } from "react";
import { WINNING_COMBINATIONS } from "./winning_combination";
import GameOver from "./components/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function derivedActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = derivedActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((row) => [...row])];
  let winner;
  const hasDraw = gameTurns.length === 9 && !winner;
  for (const turn of gameTurns) {
    let { square, player } = turn;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }
  function handleRematch() {
    setGameTurns([]);
  }

  function handleChangeName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  // if (gameTurns.length === 9 && !winner){
  //   hasDraw = true
  // }
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((prevActivePlayer) =>
    //   prevActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurns((prevGameTurn) => {
      // let currentPlayer = "X"
      // if (prevGameTurn.length > 0 && prevGameTurn[0].player === "X"){
      //   currentPlayer = "O"
      // }
      let currentPlayer = derivedActivePlayer(prevGameTurn);
      const updatedGameTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];
      return updatedGameTurn;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleChangeName}
          ></Player>
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleChangeName}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
