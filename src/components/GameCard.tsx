"use client";

import { motion } from "framer-motion";

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
  onClick: () => void;
}

export default function GameCard({ title, description, emoji, onClick }: GameCardProps) {
  return (
    <motion.div
      className="bg-gray-900 pixel-border rounded p-6 flex flex-col items-center text-center cursor-pointer hover:pixel-border-yellow transition-all duration-300"
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {emoji}
      </motion.div>
      <h3 className="text-xl md:text-2xl font-bold mb-2 text-yellow-500 retro-text">
        {title}
      </h3>
      <p className="text-gray-300 mb-4">
        {description}
      </p>
      <motion.button
        className="px-4 py-2 bg-green-500 text-black font-bold hover:bg-green-400 transition-colors retro-text"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        PLAY
      </motion.button>
    </motion.div>
  );
}