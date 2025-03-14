import { useState, useEffect } from 'react';
import './TicTacToe.css';

type Player = 'X' | 'O' | null;
type BoardState = Player[];

const TicTacToe = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'draw'>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  const calculateWinner = (squares: BoardState): { winner: Player; line: number[] } | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (!board.includes(null)) {
      setWinner('draw');
    }
  }, [board]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  const renderCell = (index: number) => {
    const isWinningCell = winningLine.includes(index);
    return (
      <button
        key={index}
        className={`cell ${board[index] ? 'filled' : ''} ${
          isWinningCell ? 'winner' : ''
        }`}
        onClick={() => handleClick(index)}
        disabled={!!winner}
      >
        {board[index] && (
          <span className={`symbol ${board[index]}`}>
            {board[index]}
          </span>
        )}
      </button>
    );
  };

  const getGameStatus = () => {
    if (winner === 'draw') return 'Game Draw!';
    if (winner) return `Winner: ${winner}`;
    return `Next Player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-status">{getGameStatus()}</div>
      <div className="game-board">
        {Array(9).fill(null).map((_, index) => renderCell(index))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
};

export default TicTacToe;