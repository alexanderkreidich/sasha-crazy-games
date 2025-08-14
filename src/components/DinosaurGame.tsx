'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Obstacle {
  id: number
  x: number
  type: 'cactus' | 'bird' | 'rock'
  height: number
  size: number
}

interface DinosaurGameProps {
  onBackToMenu: () => void
}

export default function DinosaurGame({ onBackToMenu }: DinosaurGameProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [dinoPosition, setDinoPosition] = useState({ x: 50, y: 0 })
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [isJumping, setIsJumping] = useState(false)
  const [jumpVelocity, setJumpVelocity] = useState(0)

  const gameSpeed = 2
  const gravity = 0.9
  const jumpPower = 15
  const groundHeight = 24
  const dinoHeight = 48

  const gameRef = useRef<HTMLDivElement>(null)
  const obstacleIdRef = useRef(0)
  const frameRef = useRef<number>(0)
  const lastObstacleTimeRef = useRef<number>(0)

  // Initialize high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('dinoHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10))
    }
  }, [])

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('dinoHighScore', score.toString())
    }
  }, [score, highScore])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault()
        if (!isPlaying && !isGameOver) {
          startGame()
        } else if (isPlaying && !isJumping) {
          jump()
        } else if (isGameOver) {
          resetGame()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isGameOver, isJumping])

  const startGame = () => {
    setIsPlaying(true)
    setIsGameOver(false)
    setScore(0)
    setDinoPosition({ x: 50, y: 0 })
    setObstacles([])
    setIsJumping(false)
    setJumpVelocity(0)
    obstacleIdRef.current = 0
    lastObstacleTimeRef.current = Date.now()
  }

  const jump = () => {
    if (dinoPosition.y === 0) {
      setIsJumping(true)
      setJumpVelocity(jumpPower)
    }
  }

  const resetGame = () => {
    setIsPlaying(false)
    setIsGameOver(false)
    setScore(0)
    setDinoPosition({ x: 50, y: 0 })
    setObstacles([])
    setIsJumping(false)
    setJumpVelocity(0)
  }

  // Game loop
  const gameLoop = useCallback(() => {
    if (!isPlaying) return

    // Update dino position
    if (isJumping) {
      setDinoPosition((prev) => {
        const newY = prev.y + jumpVelocity
        if (newY <= 0) {
          setIsJumping(false)
          setJumpVelocity(0)
          return { ...prev, y: 0 }
        }
        return { ...prev, y: newY }
      })

      setJumpVelocity((prev) => prev - gravity)
    }

    // Generate obstacles
    const now = Date.now()
    if (now - lastObstacleTimeRef.current > 1500 - Math.min(score / 10, 1000)) {
      // More varied obstacle types
      let obstacleType: 'cactus' | 'bird' | 'rock' = 'cactus'
      const rand = Math.random()
      if (rand > 0.8) {
        obstacleType = 'bird'
      } else if (rand > 0.6) {
        obstacleType = 'rock'
      }

      const height =
        obstacleType === 'bird' ? Math.floor(Math.random() * 20) + 10 : 0
      const size = Math.random() * 1.5 + 0.5 // 0.5x to 2.0x size

      setObstacles((prev) => [
        ...prev,
        {
          id: obstacleIdRef.current++,
          x: 100,
          type: obstacleType,
          height,
          size,
        },
      ])
      lastObstacleTimeRef.current = now
    }

    // Move obstacles
    setObstacles((prev) => {
      const updated = prev
        .map((obstacle) => ({ ...obstacle, x: obstacle.x - gameSpeed }))
        .filter((obstacle) => obstacle.x > -20)

      return updated
    })

    // Update score
    setScore((prev) => prev + 1)

    // Check collisions
    const gameWidth = gameRef.current?.clientWidth || 640
    const dinoRect = {
      x: (dinoPosition.x / 100) * gameWidth,
      y: 100 - groundHeight - dinoHeight - dinoPosition.y,
      width: 12,
      height: dinoHeight,
    }

    for (const obstacle of obstacles) {
      const obstacleRect = {
        x: (obstacle.x / 100) * gameWidth,
        y:
          obstacle.type === 'bird'
            ? 100 - groundHeight - 30 - obstacle.height
            : 100 - groundHeight - 12 * obstacle.size,
        width: 12 * obstacle.size,
        height:
          obstacle.type === 'bird' ? 8 * obstacle.size : 12 * obstacle.size,
      }

      // Collision detection
      if (
        dinoRect.x < obstacleRect.x + obstacleRect.width &&
        dinoRect.x + dinoRect.width > obstacleRect.x &&
        dinoRect.y < obstacleRect.y + obstacleRect.height &&
        dinoRect.y + dinoRect.height > obstacleRect.y
      ) {
        setIsGameOver(true)
        setIsPlaying(false)
        break
      }
    }

    frameRef.current = requestAnimationFrame(gameLoop)
  }, [isPlaying, isJumping, jumpVelocity, dinoPosition, obstacles, score])

  // Start/stop game loop
  useEffect(() => {
    if (isPlaying) {
      frameRef.current = requestAnimationFrame(gameLoop)
    } else {
      cancelAnimationFrame(frameRef.current)
    }

    return () => cancelAnimationFrame(frameRef.current)
  }, [isPlaying, gameLoop])

  return (
    <div className="min-h-screen bg-black text-white p-4 crt-effect">
      <div
        className="max-w-3xl mx-auto bg-black pixel-border rounded p-4 relative overflow-hidden"
        ref={gameRef}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h1
            className="text-2xl font-bold text-green-500 retro-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            DINOSAUR GAME
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

        {/* Score Display */}
        <div className="flex justify-between mb-2">
          <div className="text-green-500 font-bold retro-text">
            SCORE: {score}
          </div>
          <div className="text-yellow-500 font-bold retro-text">
            HI: {highScore}
          </div>
        </div>

        {/* Game Area */}
        <div
          className="relative h-64 bg-black overflow-hidden cursor-pointer"
          onClick={() => {
            if (isPlaying && !isJumping) {
              jump()
            } else if (!isPlaying && !isGameOver) {
              startGame()
            } else if (isGameOver) {
              resetGame()
            }
          }}
        >
          {/* Ground */}
          <div
            className="absolute bottom-6 left-0 right-0 h-1 bg-green-500"
            style={{ height: `${groundHeight}px` }}
          ></div>

          {/* Dinosaur - looking forward (left) */}
          <motion.div
            className="absolute w-12 h-12 text-4xl"
            style={{
              bottom: `${groundHeight + dinoPosition.y}px`,
              left: `${dinoPosition.x}%`,
              transform: 'scaleX(-1)',
            }}
            animate={{
              y: isJumping ? [0, -20, 0] : 0,
            }}
            transition={{
              duration: isJumping ? 0.3 : 0,
            }}
          >
            🦖
          </motion.div>

          {/* Obstacles */}
          {obstacles.map((obstacle) => (
            <motion.div
              key={obstacle.id}
              className="absolute"
              style={{
                bottom:
                  obstacle.type === 'bird'
                    ? `${groundHeight + 20 + obstacle.height}px`
                    : `${groundHeight}px`,
                left: `${obstacle.x}%`,
                transform: `scale(${obstacle.size})`,
                transformOrigin: 'bottom center',
                fontSize: '2rem',
              }}
            >
              {obstacle.type === 'cactus'
                ? '🌵'
                : obstacle.type === 'rock'
                ? '🪨'
                : '🦅'}
            </motion.div>
          ))}

          {/* Game Over Screen */}
          {isGameOver && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-3xl font-bold text-red-500 mb-4 retro-title">
                GAME OVER
              </div>
              <div className="text-xl mb-6">Score: {score}</div>
              <motion.button
                className="px-6 py-3 bg-green-500 text-black font-bold retro-text hover:bg-green-400 transition-colors"
                onClick={resetGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                PLAY AGAIN
              </motion.button>
            </motion.div>
          )}

          {/* Start Screen */}
          {!isPlaying && !isGameOver && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-3xl font-bold text-green-500 mb-4 retro-title">
                DINOSAUR GAME
              </div>
              <div className="text-xl mb-2">Press SPACE or ↑ to jump</div>
              <div className="text-lg mb-6 text-gray-400">
                Avoid obstacles and survive as long as possible!
              </div>
              <motion.button
                className="px-6 py-3 bg-green-500 text-black font-bold retro-text hover:bg-green-400 transition-colors"
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                START GAME
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>Press SPACE or ↑ to jump over obstacles</p>
        </div>
      </div>
    </div>
  )
}
