import { useState } from 'react'
// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];
export default function GameBoard({onSelectSquare, board}) {
    // Create a deep copy to avoid mutating the original initialGameBoard
    // let gameBoard = initialGameBoard.map(row => [...row]);
    // for (const turn of turns){
    //     let {square, player} = turn
    //     let {row, col} = square
    //     gameBoard[row][col] = player
    // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled = {playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
