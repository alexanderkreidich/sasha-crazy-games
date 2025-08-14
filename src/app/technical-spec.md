# Sasha Crazy Games - Technical Specification

## Color Palette (Tailwind Classes)
- Background: `bg-black`
- Primary: `text-green-500` (Neon Green)
- Secondary: `text-red-500` (Neon Red)
- Tertiary: `text-yellow-500` (Neon Yellow)
- Accent: `text-blue-500` (Neon Blue)
- Text: `text-white`
- Borders: `border-green-500`

## Fonts
- Primary: Pixel-style using `font-mono` with custom styling
- Retro effect: `tracking-wider` and `uppercase`

## Main Menu Component (MainMenu.tsx)

### Features
- Grid layout with `grid grid-cols-1 md:grid-cols-3 gap-6`
- Animated background with floating pixels
- Retro title "SASHA CRAZY GAMES" with blinking effect using Tailwind animations
- Each game card has:
  - Animated character preview (floating/bouncing)
  - Game title
  - Brief description
  - Play button

### Tailwind Classes for Menu
- Container: `min-h-screen bg-black text-white p-4 md:p-8`
- Title: `text-3xl md:text-5xl font-bold text-center mb-8 text-green-500 tracking-wider`
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto`

## Game Card Component (GameCard.tsx)

### Features
- Pixel border with corner accents using `border-2 border-green-500`
- Character preview with animation
- Game title in large retro font: `text-xl md:text-2xl font-bold mb-2 text-yellow-500`
- Description text: `text-gray-300 mb-4`
- Play button with hover effect: `px-4 py-2 bg-green-500 text-black font-bold hover:bg-green-400 transition-colors`

### Tailwind Classes for Card
- Card container: `bg-gray-900 border-2 border-green-500 rounded p-6 flex flex-col items-center text-center`
- Hover effect: `hover:border-yellow-500 transition-colors`
- Character container: `w-32 h-32 flex items-center justify-center mb-4`

## Tic-Tac-Toe Component (TicTacToe.tsx)

### Features
- 3x3 grid with pixel styling using `grid grid-cols-3 gap-2`
- Player 'X' and 'O' as retro characters
- Win detection for rows, columns, and diagonals
- Score tracking
- Reset game button
- Back to menu button

### Tailwind Classes for Tic-Tac-Toe
- Container: `max-w-md mx-auto bg-gray-900 p-6 rounded border-2 border-green-500`
- Board: `grid grid-cols-3 gap-2 my-6`
- Cell: `w-20 h-20 md:w-24 md:h-24 bg-black border-2 border-green-500 flex items-center justify-center text-4xl font-bold cursor-pointer hover:bg-gray-800`
- Win cell: `bg-green-900`
- Score display: `flex justify-between items-center mb-4`
- Button: `px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors mx-2`

## Rock Paper Scissors Component (RockPaperScissors.tsx)

### Modifications Needed
- Add back to menu button with consistent styling
- Ensure consistent styling with other games
- Verify animations work with overall theme

### Tailwind Classes for Buttons
- Choice buttons: `flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border-2 border-transparent hover:border-green-500`
- Action buttons: `px-6 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors font-bold mx-2`

## Dinosaur Game Component (DinosaurGame.tsx)

### Features
- Dinosaur character that jumps with spacebar/up arrow
- Randomly generated obstacles (cacti and birds)
- Score tracking with increasing difficulty
- High score persistence
- Game over screen with restart option
- Back to menu button

### Tailwind Classes for Dinosaur Game
- Game container: `max-w-3xl mx-auto bg-black border-2 border-green-500 rounded p-4 relative overflow-hidden`
- Ground: `h-4 bg-green-500 absolute bottom-20 left-0 right-0`
- Dinosaur: `w-12 h-12 bg-green-500 absolute bottom-24 left-16`
- Obstacle: `w-8 h-12 bg-red-500 absolute bottom-24`
- Score: `text-2xl font-bold text-green-500 text-right mb-4`
- Game over screen: `absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center`
- Buttons: `px-6 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors mt-4`

## Main Application (page.tsx)

### Features
- State management for view switching
- Consistent styling across all views
- Smooth transitions between views
- Global game reset option

### Tailwind Classes for Main App
- Container: `min-h-screen bg-black text-white p-4`
- View container: `max-w-6xl mx-auto`
- Navigation: `flex justify-between items-center mb-6`
- Title: `text-2xl font-bold text-green-500`

## Animation Implementation Details (Tailwind + Framer Motion)

### Framer Motion with Tailwind
- Use Tailwind for static styling
- Use Framer Motion for animations
- Combine classes using `motion.div` with `className` prop

### Character Animations
1. Pac-Man: Chomping mouth animation
2. Flappy Bird: Wing flapping and floating
3. Dinosaur: Running and jumping
4. X/O symbols: Bouncing entrance

### Tailwind Animation Classes
- Floating effect: Custom animations using Framer Motion
- Hover effects: `hover:scale-105` and `hover:brightness-125`
- Transitions: `transition-all duration-300`

## Responsive Design (Tailwind Breakpoints)

### Breakpoints
- Mobile: `sm:` (640px)
- Tablet: `md:` (768px)
- Laptop: `lg:` (1024px)
- Desktop: `xl:` (1280px)

### Adjustments
- Game card stack on mobile: `grid-cols-1` -> `md:grid-cols-3`
- Font size scaling: `text-xl` -> `md:text-2xl`
- Padding/margin scaling: `p-4` -> `md:p-8`
- Button sizes: `px-4 py-2` -> `md:px-6 md:py-3`

## Performance Considerations

### Tailwind Optimization
- Use only necessary utility classes
- Leverage Tailwind's built-in responsive prefixes
- Avoid unnecessary custom CSS

### Animation Performance
- Limit simultaneous animations
- Use CSS transforms for animations
- Throttle animation updates
- Pause animations when not visible

## Accessibility

### Tailwind Features
- Focus states: `focus:outline-none focus:ring-2 focus:ring-green-500`
- Screen reader utilities: `sr-only`
- ARIA attributes where needed
- Semantic HTML structure

## Testing Plan

### Visual Testing
- Check Tailwind classes render correctly
- Verify responsive design works on all breakpoints
- Test dark mode compatibility (already implemented)

### Functionality Testing
- Game logic validation
- State management
- Win condition detection
- Animation performance