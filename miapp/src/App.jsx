import React, { useState } from 'react';
import './App.css';

const App = () => {
const [board, setBoard] = useState([ ['', '', ''],
['', '', ''],
['', '', '']
]);
const [player, setPlayer] = useState('X');
const [gameOver, setGameOver] = useState(false);
const [moves, setMoves] = useState(0);

const handleClick = (rowIndex, colIndex) => {
  const updatedBoard = [...board];
  if (updatedBoard[rowIndex][colIndex] !== '' || gameOver) return;

  updatedBoard[rowIndex][colIndex] = player;
  setMoves(moves + 1)
  const winner = checkForWinner(updatedBoard, player);
  if (winner) {
      alert(`EL JUGADOR ${winner} GANO!`);
      setGameOver(true);
  }else if(moves === 8) {
      setGameOver(true);
  }

  setPlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');
  setBoard(updatedBoard);
}

const checkForWinner = (board, player) => {
  for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
          return player;
      }
  }
  for (let i = 0; i < 3; i++) {
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
          return player;
      }
  }
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return player;
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return player;
  }
  return null;
}

const handleReset = () => {
  setBoard([        ['', '', ''],
      ['', '', ''],
      ['', '', '']
  ]);
  setPlayer('X');
  setGameOver(false);
  setMoves(0);
}


   

  

  return (  
<body>
  <div className="game-board">  
  {board.map((row, rowIndex) => (  
    <div key={rowIndex} className="row">  
      {row.map((cell, colIndex) => (  
         <div key={colIndex} className={`cell ${cell === 'O' ? 'o-player' : ''}`} onClick={() => handleClick(rowIndex, colIndex)}>{cell}</div>  
    ))}  
    </div>  
  ))} 
  {gameOver && <div><button onClick={handleReset}>Volver a Jugar</button></div>}

  {moves === 8 && <div><button onClick={handleReset}>Empate, Volver a Jugar</button></div>}
</div>
</body>)
}

 export default App