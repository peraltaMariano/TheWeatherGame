const closePopupButton = document.getElementById('close-popup');
const continueButton = document.getElementById('continue-button');
const backdrop = document.getElementById('popup-backdrop');
let popupCloseCallback = null; // 🔥 Missing variable

export function showResultPopup(points, message, actualTemp, callback) {
  const popup = document.getElementById('result-popup');
  document.getElementById('points-earned').textContent = `+${points}`;
  document.getElementById('result-message').textContent = message;
  document.getElementById('actual-temperature').textContent = `Actual Temp: ${actualTemp}°C`;

  popup.classList.add('show');
  backdrop.classList.add('show');
  console.log("popup opened");
  popupCloseCallback = callback; // 🔥 Store the callback here
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
closePopupButton.addEventListener('click', hideResultPopup);
continueButton.addEventListener('click', hideResultPopup);
