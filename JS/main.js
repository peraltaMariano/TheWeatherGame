import { setupInputHandlers } from './input.js';
import { startNewRound } from './gameManager.js';
import { adjustCityFontSize }from './ui.js';

setupInputHandlers();
startNewRound();
adjustCityFontSize();
// document.getElementById('theme-toggle-button').addEventListener('click', () => {
//     document.body.classList.toggle('dark');
