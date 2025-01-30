import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // Plateau de jeu
  const [isXNext, setIsXNext] = useState(true); // Alternance entre X et O

  // Vérifie le gagnant
  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
      [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (let [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Retourne "X" ou "O"
      }
    }
    return null;
  };

  // Gestion du clic sur une case
  const handleClick = (index) => {
    if (board[index] || checkWinner(board)) return; // Empêche de jouer sur une case occupée ou si le jeu est fini

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Réinitialiser le jeu
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = checkWinner(board);
  const isDraw = board.every(cell => cell !== null) && !winner;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🎮 Jeu de Tic-Tac-Toe</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 80px)",
        gap: "5px",
        justifyContent: "center"
      }}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "80px",
              height: "80px",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      <h3>{winner ? `Gagnant : ${winner} 🎉` : isDraw ? "Match nul 🤝" : `Tour de : ${isXNext ? "X" : "O"}`}</h3>
      <button onClick={resetGame} style={{ marginTop: "10px", padding: "10px" }}>Rejouer</button>
    </div>
  );
}

export default App;
