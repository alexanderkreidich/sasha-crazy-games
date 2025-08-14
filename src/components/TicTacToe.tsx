"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TicTacToeProps {
  onBackToMenu: () => void;
}

export default function TicTacToe({ onBackToMenu }: TicTacToeProps) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const checkWinner = (board: (string | null)[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const checkDraw = (board: (string | null)[]) => {
    return board.every(cell => cell !== null) && !checkWinner(board);
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setScores(prev => ({
        ...prev,
        [newWinner]: prev[newWinner as keyof typeof prev] + 1
      }));
    } else if (checkDraw(newBoard)) {
      setIsDraw(true);
      setScores(prev => ({
        ...prev,
        draws: prev.draws + 1
      }));
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };

  const getEmoji = (player: string | null) => {
    if (player === "X") return "❌";
    if (player === "O") return "⭕";
    return "";
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 crt-effect">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded pixel-border">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-2xl font-bold text-green-500 retro-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            TIC-TAC-TOE
          </motion.h1>
          <motion.button
            className="px-4 py-2 bg-red-500 text-black font-bold retro-text hover:bg-red-400 transition-colors"
            onClick={onBackToMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MENU
          </motion.button>
        </div>

        {/* Score Board */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-500">X</div>
            <div className="text-2xl">{scores.X}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-400">DRAW</div>
            <div className="text-2xl">{scores.draws}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-500">O</div>
            <div className="text-2xl">{scores.O}</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 my-6">
          {board.map((cell, index) => (
            <motion.div
              key={index}
              className="w-20 h-20 md:w-24 md:h-24 bg-black pixel-border flex items-center justify-center text-4xl font-bold cursor-pointer hover:bg-gray-800"
              onClick={() => handleCellClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {getEmoji(cell)}
            </motion.div>
          ))}
        </div>

        {/* Game Status */}
        <div className="text-center mb-6 h-8">
          {winner && (
            <motion.div
              className="text-2xl font-bold text-green-500 retro-text"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              PLAYER {winner} WINS!
            </motion.div>
          )}
          {isDraw && !winner && (
            <motion.div
              className="text-2xl font-bold text-yellow-500 retro-text"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              IT'S A DRAW!
            </motion.div>
          )}
          {!winner && !isDraw && (
            <div className="text-xl font-bold text-yellow-500">
              PLAYER {currentPlayer}'S TURN
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <motion.button
            className="px-6 py-3 bg-green-500 text-black font-bold retro-text hover:bg-green-400 transition-colors mr-4"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RESET
          </motion.button>
        </div>
      </div>
    </div>
  );
}