import { initializeGame } from './gameManager.js';
import { showHowToPlay } from './ui.js';
initializeGame();
document.addEventListener('DOMContentLoaded', () => {
  showHowToPlay();
});

