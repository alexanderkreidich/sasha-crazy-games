# Sasha Crazy Games - Architecture Plan

## Project Overview
Create a retro arcade game collection with a main menu featuring animated character previews and three classic games:
1. Tic-Tac-Toe
2. Rock Paper Scissors (already implemented)
3. Dinosaur Game (Chrome Dinosaur clone)

## Visual Style
- Authentic 8-bit retro graphics similar to classic arcade games
- Golden age of gaming aesthetic (late 1970s through 1980s)
- Pixel art styling with vibrant colors
- CRT monitor effect for authentic retro feel

## Technical Architecture

### File Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Main application - contains all game components)
│   └── globals.css
├── components/
│   ├── MainMenu.tsx
│   ├── TicTacToe.tsx
│   ├── RockPaperScissors.tsx (already exists)
│   ├── DinosaurGame.tsx
│   └── GameCard.tsx
└── lib/
    └── utils.ts
```

### Component Breakdown

#### 1. MainMenu.tsx
- Grid layout with game cards
- Animated character previews using Framer Motion
- Retro 8-bit styling
- State management for game selection

#### 2. GameCard.tsx
- Reusable component for each game in the menu
- Animated character preview
- Game title and description
- Click handler to select game

#### 3. TicTacToe.tsx
- Classic 3x3 grid implementation
- Retro styling with pixel art
- Score tracking
- Win/lose/draw detection
- Back to menu button

#### 4. RockPaperScissors.tsx
- Already implemented, will be integrated into the menu system
- Add back to menu button

#### 5. DinosaurGame.tsx
- Full implementation of Chrome Dinosaur game
- Player character (dinosaur) that jumps over obstacles
- Score tracking
- Game over and restart functionality
- Back to menu button

### State Management
- Main application state in page.tsx to track which game is currently active
- Each game component manages its own internal state
- Navigation between menu and games through state changes

### Animation System
- Use Framer Motion for all animations
- Character bouncing/floating effects with easing
- Smooth transitions between menu and games
- CRT scanline effects for authentic retro feel

### Styling Approach
- Tailwind CSS for utility-first styling
- Custom CSS for pixel art elements
- Retro color palette (bright primary colors, black backgrounds)
- Pixelated fonts for authentic 8-bit feel

## Component Hierarchy
```
graph TD
    A[page.tsx - Main App] --> B[MainMenu.tsx]
    A --> C[TicTacToe.tsx]
    A --> D[RockPaperScissors.tsx]
    A --> E[DinosaurGame.tsx]
    B --> F[GameCard.tsx]
    B --> G[GameCard.tsx]
    B --> H[GameCard.tsx]
```

## Implementation Steps
1. Create main menu with grid layout
2. Implement animated character previews with Framer Motion
3. Create Tic-Tac-Toe game component
4. Integrate existing Rock Paper Scissors into menu system
5. Create Dinosaur Game component
6. Add state management for navigation between menu and games
7. Apply retro styling and animations
8. Test all games and animations
9. Optimize for responsiveness

## Dependencies
- framer-motion (for animations)
- react-icons (for game icons)
- tailwindcss (for styling)