"use client";

import { useState } from "react";
import MainMenu from "@/components/MainMenu";
import TicTacToe from "@/components/TicTacToe";
import RockPaperScissors from "@/components/RockPaperScissors";
import DinosaurGame from "@/components/DinosaurGame";
import MemoryGame from "@/components/MemoryGame";

type CurrentView = "menu" | "tic-tac-toe" | "rock-paper-scissors" | "dinosaur" | "memory";

export default function Home() {
  const [currentView, setCurrentView] = useState<CurrentView>("menu");

  const handleGameSelect = (game: "tic-tac-toe" | "rock-paper-scissors" | "dinosaur" | "memory") => {
    setCurrentView(game);
  };

  const handleBackToMenu = () => {
    setCurrentView("menu");
  };

  return (
    <div className="min-h-screen bg-black text-white crt-effect">
      {currentView === "menu" && (
        <MainMenu onGameSelect={handleGameSelect} />
      )}
      
      {currentView === "tic-tac-toe" && (
        <TicTacToe onBackToMenu={handleBackToMenu} />
      )}
      
      {currentView === "rock-paper-scissors" && (
        <div className="min-h-screen bg-gray-900 py-12 crt-effect">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6 px-6">
              <h1 className="text-3xl font-bold text-green-500 retro-title">Rock Paper Scissors</h1>
              <button
                className="px-4 py-2 bg-red-500 text-black font-bold retro-text hover:bg-red-400 transition-colors"
                onClick={handleBackToMenu}
              >
                MENU
              </button>
            </div>
            <RockPaperScissors />
          </div>
        </div>
      )}
      
      {currentView === "dinosaur" && (
        <DinosaurGame onBackToMenu={handleBackToMenu} />
      )}

      {currentView === "memory" && (
        <MemoryGame onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
}
