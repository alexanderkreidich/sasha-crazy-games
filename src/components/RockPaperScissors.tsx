"use client";

import { useState } from "react";

type Choice = "rock" | "paper" | "scissors" | null;
type Result = "win" | "lose" | "draw" | null;

const choices: Choice[] = ["rock", "paper", "scissors"];

const getEmoji = (choice: Choice) => {
  switch (choice) {
    case "rock":
      return "🪨";
    case "paper":
      return "📄";
    case "scissors":
      return "✂️";
    default:
      return "";
  }
};

const getResult = (player: Choice, computer: Choice): Result => {
  if (!player || !computer) return null;
  
  if (player === computer) return "draw";
  
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }
  
  return "lose";
};

const getResultText = (result: Result) => {
  switch (result) {
    case "win":
      return "You win!";
    case "lose":
      return "You lose!";
    case "draw":
      return "It's a draw!";
    default:
      return "";
  }
};

const getResultColor = (result: Result) => {
  switch (result) {
    case "win":
      return "text-green-500";
    case "lose":
      return "text-red-500";
    case "draw":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState(0);
  const [gameHistory, setGameHistory] = useState<{player: Choice, computer: Choice, result: Result}[]>([]);

  const playGame = (choice: Choice) => {
    if (!choice) return;
    
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerSelection = choices[randomIndex];
    
    setPlayerChoice(choice);
    setComputerChoice(computerSelection);
    
    const gameResult = getResult(choice, computerSelection);
    setResult(gameResult);
    
    if (gameResult === "win") {
      setScore(prev => prev + 1);
    } else if (gameResult === "lose") {
      setScore(prev => Math.max(0, prev - 1));
    }
    
    // Add to history
    setGameHistory(prev => [
      { player: choice, computer: computerSelection, result: gameResult },
      ...prev.slice(0, 4) // Keep only last 5 games
    ]);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded pixel-border">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-500 retro-title">Rock Paper Scissors</h1>
        <button
          className="px-4 py-2 bg-red-500 text-black font-bold retro-text hover:bg-red-400 transition-colors"
          onClick={() => window.location.reload()}
        >
          MENU
        </button>
      </div>
      
      {/* Score Display */}
      <div className="text-center mb-8">
        <div className="text-2xl font-semibold">Score: <span className="text-blue-500">{score}</span></div>
      </div>
      
      {/* Game Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        {/* Choices Display */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">You</h2>
            <div className="text-6xl mb-2">
              {playerChoice ? getEmoji(playerChoice) : "❓"}
            </div>
            <p className="capitalize">{playerChoice || "Make a choice"}</p>
          </div>
          
          <div className="text-3xl font-bold self-start mt-8">VS</div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Computer</h2>
            <div className="text-6xl mb-2">
              {computerChoice ? getEmoji(computerChoice) : "❓"}
            </div>
            <p className="capitalize">{computerChoice || "Waiting"}</p>
          </div>
        </div>
        
        {/* Result Display */}
        {result && (
          <div className={`text-2xl font-bold text-center my-6 ${getResultColor(result)}`}>
            {getResultText(result)}
          </div>
        )}
        
        {/* Choice Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-4xl mb-2">{getEmoji(choice)}</span>
              <span className="capitalize">{choice}</span>
            </button>
          ))}
        </div>
        
        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>
      
      {/* Game History */}
      {gameHistory.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Games</h2>
          <div className="space-y-3">
            {gameHistory.map((game, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{getEmoji(game.player)}</span>
                  <span>vs</span>
                  <span className="text-2xl">{getEmoji(game.computer)}</span>
                </div>
                <span className={`font-semibold ${getResultColor(game.result)}`}>
                  {getResultText(game.result)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}