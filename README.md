# Pac-Man (Canvas Edition)

Arcade-style Pac-Man built with nothing but HTML5 canvas and vanilla JavaScript. A tiny game engine in `static/script/game.js` drives the animation loop, maps, collisions, and stage transitions, while the gameplay in `static/script/index.js` recreates the classic chase with 12 handcrafted mazes, animated ghosts, and a retro UI.

## Features
- Runs in any modern browser—no build step or external dependencies.
- 12 unique mazes with different wall colors and power-pellet layouts.
- Responsive controls (Arrow keys/WASD), pause/resume, and wrap-around tunnels.
- Ghost AI that hunts, turns frightened on power pellets, and returns home when caught.
- HUD with score, level indicator, life counter, and start/end screens using the PressStart2P font.

## Getting Started
1. Prerequisite: a modern desktop browser.
2. Serve the folder (recommended to avoid font/CORS issues). For example:
   ```bash
   python3 -m http.server 8000
   # or: npx serve
   ```
3. Open http://localhost:8000/ and press `Enter` to begin. (You can also open `index.html` directly if your browser allows local font loading.)

## Controls
- Arrow keys or `W` `A` `S` `D`: move Pac-Man
- `Space`: pause/resume
- `Enter`: start from the title screen or restart after win/lose

## Project Structure
- `index.html` — Canvas container and script wiring.
- `static/style/index.css` — Full-screen black backdrop and responsive canvas sizing.
- `static/script/game.js` — Minimal engine (Game/Stage/Map/Item) with RAF loop, event binding, and map pathfinding.
- `static/script/index.js` — Main game logic: 12 level definitions, HUD, player controls, ghost AI, and state transitions.
- `static/script/constants.js` — Tunable settings (speeds, colors, scoring, lives).
- `static/script/levels.js` — Standalone level dataset in the same format as the inlined `_COIGIG` array.
- `static/script/stages.js` — Modular stage builders (start/level/end) useful if you refactor away from the inlined setup.
- `static/font/PressStart2P.ttf` — Retro arcade typeface used throughout the UI.

## Gameplay Notes
- Lives: start with 5 (`PacmanConstants.DEFAULT_LIFE` / `_LIFE`); remaining lives add 50 points each to the final score.
- Scoring: pellets +1, frightened ghost +10, power pellets trigger the frightened timer, and tunnels wrap you to the opposite side.
- Ghosts chase in normal mode, flee when frightened, and pathfind back to spawn when eaten.
- Levels advance automatically after clearing every pellet; the end screen shows win/lose plus your final score.

## Customizing
- Adjust speed, lives, and scoring in `static/script/constants.js`.
- Add or tweak mazes by editing the level arrays in `static/script/index.js` (or `static/script/levels.js` if you prefer keeping data separate).
- Update wall colors (`wall_color`) or ghost colors (`PacmanConstants.NPC_COLORS`) to set a new theme.
