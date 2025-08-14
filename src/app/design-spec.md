# Sasha Crazy Games - Visual Design Specification

## Overall Aesthetic
- Golden age of arcade gaming (late 1970s to 1980s)
- Pixel art style with vibrant neon colors
- CRT monitor effect for authentic retro feel
- 8-bit inspired UI elements

## Color Scheme
- Primary Background: Pure Black (#000000)
- Secondary Background: Dark Gray (#111111)
- Primary Accent: Neon Green (#00FF00)
- Secondary Accent: Neon Red (#FF0000)
- Tertiary Accent: Neon Yellow (#FFFF00)
- Quaternary Accent: Neon Blue (#00FFFF)
- Text: Pure White (#FFFFFF)
- UI Elements: Dark Gray (#222222) with Neon Green borders

## Typography
- Font Family: Monospace (font-mono in Tailwind)
- Font Weight: Bold for headings, Normal for body text
- Letter Spacing: Widened for retro feel (tracking-wider)
- Text Transform: Uppercase for game titles and UI elements
- Text Shadow: Green glow effect for important text

## UI Elements

### Buttons
- Base Style: 
  - Solid dark background with neon border
  - Sharp corners (no rounded)
  - Bold white text
  - Pixel-perfect sizing
- Hover State:
  - Brighter background
  - Increased border glow
  - Slight scale increase (105%)
- Active State:
  - Inset shadow effect
  - Slightly darker background

### Cards
- Base Style:
  - Solid black background
  - 2px solid neon green border
  - Sharp corners
  - Internal padding for content
- Hover State:
  - Border color shifts to neon yellow
  - Subtle glow effect

### Grid Layout
- Main Menu: 3-column grid on desktop, single column on mobile
- Consistent spacing between elements
- Centered content with maximum width constraints

## Character Design Guidelines

### Pac-Man
- Simple yellow circle with triangular mouth
- Chomping animation (mouth opening/closing)
- Floating motion with slight rotation

### Flappy Bird
- Simple yellow square with wing
- Wing flapping animation
- Floating/bobbing motion

### Dinosaur
- Simple green rectangle with legs
- Running animation (legs alternating)
- Jumping with arc motion

### Tic-Tac-Toe Symbols (X and O)
- Bold, thick lines
- X: Two crossing diagonal lines
- O: Perfect circle
- Both with slight glow effect

## Animation Principles

### Easing Functions
- Floating/Bobbing: easeInOut for smooth oscillation
- Entrance: backOut for bouncy effect
- Exit: easeIn for quick disappearance
- Hover: easeOut for responsive feel

### Timing
- Floating animations: 2-3 seconds cycle
- Entrance animations: 0.5 seconds
- Interactive feedback: 0.2 seconds
- Game state changes: 0.3 seconds

### Motion Paths
- Floating: Vertical oscillation (±10px)
- Bouncing: Vertical with squash and stretch
- Rotation: Subtle (±5 degrees) for floating effect

## CRT Monitor Effect

### Scanlines
- Horizontal lines every 4px
- Subtle opacity (10-20%)
- Darker color (#001100) for authenticity

### Screen Curvature
- Slight barrel distortion
- Darker corners (vignette effect)
- Subtle glow around edges

### Screen Flicker
- Very subtle opacity variation (98-100%)
- Slow pulse (0.5% every 2 seconds)
- More noticeable on older devices

## Retro Effects

### Pixelation
- All graphics aligned to pixel grid
- No anti-aliasing for authentic look
- Sharp edges on all elements

### Color Limitation
- Limited palette of 4-5 main colors
- No gradients except for glow effects
- Solid color fills

### Glitch Effects (Subtle)
- Occasional screen flicker
- Rare RGB separation
- Minimal static noise in background

## Responsive Design

### Mobile Layout
- Single column for all elements
- Larger touch targets
- Simplified animations
- Vertical spacing increased

### Tablet Layout
- Two-column grid for main menu
- Medium touch targets
- Standard animations
- Balanced spacing

### Desktop Layout
- Three-column grid for main menu
- Standard sizing
- Full animations
- Tight spacing

## Accessibility Considerations

### Color Contrast
- All text meets WCAG AA standards
- Important UI elements have sufficient contrast
- Color is not the only indicator of state

### Focus States
- Clear focus indicators for keyboard navigation
- Consistent focus styling across all interactive elements
- Focus visible in all color schemes

### Text Size
- Minimum 16px for body text
- Scalable for users who increase font size
- Line height optimized for readability

## Performance Guidelines

### Animation Budget
- Maximum 10 simultaneous animations
- Reduce animation complexity on mobile
- Pause off-screen animations
- Use hardware acceleration where possible

### Asset Optimization
- SVG for all graphics
- Minimal CSS for performance
- No external fonts (system monospace)
- Efficient Tailwind class usage