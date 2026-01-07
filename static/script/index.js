'use strict';

(() => {
  const game = new Game('canvas');
  const state = {
    score: 0,
    life: PacmanConstants.DEFAULT_LIFE,
  };

  const initGame = () => {
    PacmanStages.buildStages(game, window.PACMAN_LEVELS, state);
    const font = new FontFace('PressStart2P', 'url(./static/font/PressStart2P.ttf)');

    return font
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        game.init();
      })
      .catch(() => {
        // If the font fails to load, start the game anyway with a fallback font.
        game.init();
      });
  };

  initGame();
})();
