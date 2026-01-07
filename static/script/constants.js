'use strict';

const PacmanConstants = {
  DIRECTIONS: {
    COS: [1, 0, -1, 0],
    SIN: [0, 1, 0, -1],
  },
  NPC_COLORS: ['#F00', '#F93', '#0CF', '#F9C'],
  DEFAULT_LIFE: 5,
  PLAYER: {
    SPEED: 2,
    START_COORD: { x: 13.5, y: 23 },
  },
  GHOST: {
    SPEED: 1,
    START_COORD: { x: 12, y: 14 },
  },
  SCORE: {
    pellet: 1,
    ghostBonus: 10,
    lifeBonus: 50,
  },
};

window.PacmanConstants = PacmanConstants;
