// input.js
import { updateGuessDisplay } from './ui.js';
import { confirmGuessAndContinue } from './gameManager.js';

let guess = 0;
let intervalId; // ✅ Corrected
let holdTimeoutId; // ✅ Corrected

function updateGuess(change) {
  guess += change;
  updateGuessDisplay(guess);
}

export function setupInputHandlers() {
  const inc = document.getElementById('increase');
  const dec = document.getElementById('decrease');
  const confirmBtn = document.getElementById('confirm-button');

  function startHold(change) {
    updateGuess(change); // Immediate click
    holdTimeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        updateGuess(change);
      }, 100); // repeat every 200ms
    }, 200); // wait 300ms before starting repeat
  }
  
  function stopHold() {
    clearTimeout(holdTimeoutId);
    clearInterval(intervalId);
  }

  // Mouse events
  inc.addEventListener('mousedown', () => startHold(1));
  dec.addEventListener('mousedown', () => startHold(-1));
  
  inc.addEventListener('mouseup', stopHold);
  dec.addEventListener('mouseup', stopHold);
  
  inc.addEventListener('mouseleave', stopHold);
  dec.addEventListener('mouseleave', stopHold);
  confirmBtn.addEventListener('click', () => {
    confirmGuessAndContinue();
  });

  // Mobile touch events
  inc.addEventListener('touchstart', (e) => { e.preventDefault(); startHold(1); });
  dec.addEventListener('touchstart', (e) => { e.preventDefault(); startHold(-1); });
  
  inc.addEventListener('touchend', stopHold);
  dec.addEventListener('touchend', stopHold);
}
