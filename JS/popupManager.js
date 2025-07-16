const closePopupButton = document.getElementById('close-popup');
const continueButton = document.getElementById('popup-continue-button');
const backdrop = document.getElementById('popup-backdrop');
let popupCloseCallback = null; // 🔥 Missing variable

export function showResultPopup(points, message, actualTemp, onClose) {
  const popup = document.getElementById('result-popup');
  const pointsElement = document.getElementById('points-earned');
  pointsElement.childNodes[0].textContent = `+${points}`;
  document.getElementById('result-message').textContent = message;
  document.getElementById('actual-temperature').textContent = `Actual Temp: ${actualTemp}°C`;

  popup.classList.add('show');
  backdrop.classList.add('show');
  console.log("popup opened");
  popupCloseCallback = onClose; // 🔥 Store the callback here
  if (points === 20) {
    triggerConfetti();
  }
}

export function hideResultPopup() {
  const popup = document.getElementById('result-popup');
  popup.classList.remove('show');
  backdrop.classList.remove('show');

  if (popupCloseCallback) {
    popupCloseCallback(); // 🔥 Execute callback after closing
    popupCloseCallback = null; // Clear it after
  }
}

// Hook buttons

continueButton.addEventListener('click', hideResultPopup);
function triggerConfetti() {
  // Create a canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.style.opacity = '1'; /* 🔥 default opacity */
  canvas.style.transition = 'opacity 1s ease'; /* 🔥 smooth transition */

  document.body.appendChild(canvas);

  const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

  let count = 0;
  const interval = setInterval(() => {
    myConfetti({
      particleCount: 90 - count * 10,
      spread: 90 - count * 10,
      startVelocity: 55 - count * 10,
      origin: { y: 0.8 }, // Lower starting point
      colors: ['#bb0000', '#ffffff', '#00bb00', '#0000bb']
    });

    count++;
    if (count > 4) {
      clearInterval(interval);
      setTimeout(() => {
        canvas.style.opacity = '0'; // 🔥 fade out smoothly
        setTimeout(() => {
          canvas.remove(); // 🔥 only remove after fade is done
        }, 1000); // Match the 1s transition
      }, 3000); // Let confetti rain for a while first
    }
  }, 200);
}



