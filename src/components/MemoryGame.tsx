"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface MemoryGameProps {
  onBackToMenu: () => void;
}

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
const cardPairs = [...emojis, ...emojis];

export default function MemoryGame({ onBackToMenu }: MemoryGameProps) {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  const initGame = useCallback(() => {
    const shuffled = [...cardPairs]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
    
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
    setTimer(0);
    setGameStarted(false);
  }, []);

  // Start timer when first move is made
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (moves === 1 && !gameStarted) {
      setGameStarted(true);
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [moves, gameStarted]);

  // Check for win
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameWon(true);
    }
  }, [cards]);

  // Initialize game on mount
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Handle card click
  const handleCardClick = (id: number) => {
    if (flippedCards.length >= 2 || cards[id].flipped || gameWon) return;
    
    const updatedCards = [...cards];
    updatedCards[id].flipped = true;
    setCards(updatedCards);
    
    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlipped;
      
      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              card.id === firstId || card.id === secondId 
                ? {...card, matched: true} 
                : card
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              card.id === firstId || card.id === secondId 
                ? {...card, flipped: false} 
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 crt-effect">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg pixel-border">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className="text-2xl font-bold text-green-500 retro-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            MEMORY MATCH
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

        {/* Game Stats */}
        <div className="flex justify-between mb-6">
          <div className="text-lg">
            <span className="text-yellow-500">Moves:</span> {moves}
          </div>
          <div className="text-lg">
            <span className="text-yellow-500">Time:</span> {formatTime(timer)}
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`aspect-square cursor-pointer rounded-lg flex items-center justify-center text-4xl ${
                card.flipped || card.matched ? 'bg-white' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: card.id * 0.05 }}
            >
              {card.flipped || card.matched ? card.emoji : "?"}
            </motion.div>
          ))}
        </div>

        {/* Game Over Screen */}
        {gameWon && (
          <motion.div
            className="bg-black bg-opacity-80 rounded-lg p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-green-500 mb-4">You Win!</h2>
            <p className="mb-2">Completed in {moves} moves</p>
            <p className="mb-4">Time: {formatTime(timer)}</p>
            <motion.button
              className="px-6 py-3 bg-green-500 text-black font-bold retro-text hover:bg-green-400 transition-colors"
              onClick={initGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PLAY AGAIN
            </motion.button>
          </motion.div>
        )}

        {/* Reset Button */}
        {!gameWon && (
          <div className="text-center">
            <motion.button
              className="px-6 py-3 bg-blue-500 text-white font-bold retro-text hover:bg-blue-400 transition-colors"
              onClick={initGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              RESTART
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}