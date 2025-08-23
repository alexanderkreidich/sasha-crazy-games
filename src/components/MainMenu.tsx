'use client'

import { motion } from 'framer-motion'
import GameCard from './GameCard'

interface MainMenuProps {
  onGameSelect: (
    game: 'tic-tac-toe' | 'rock-paper-scissors' | 'dinosaur' | 'memory'
  ) => void
}

export default function MainMenu({ onGameSelect }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 crt-effect">
      <motion.div
        className="text-3xl md:text-5xl font-bold text-center mb-8 text-green-500 tracking-wider retro-title blink"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        SASHA CRAZY GAMES
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <GameCard
          title="Tic-Tac-Toe"
          description="Classic X and O game. Get three in a row to win!"
          emoji="❌"
          onClick={() => onGameSelect('tic-tac-toe')}
        />

        <GameCard
          title="Rock Paper Scissors"
          description="The classic hand game. Outsmart the computer!"
          emoji="✂️"
          onClick={() => onGameSelect('rock-paper-scissors')}
        />

        <GameCard
          title="Dinosaur Game"
          description="Jump over obstacles in this endless runner!"
          emoji="🦖"
          onClick={() => onGameSelect('dinosaur')}
        />

        <GameCard
          title="Memory Match"
          description="Find matching pairs in this memory challenge!"
          emoji="🧠"
          onClick={() => onGameSelect('memory')}
        />
      </motion.div>

      <motion.div
        className="text-center mt-12 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p>Use your keyboard for the best experience</p>
      </motion.div>
    </div>
  )
}
