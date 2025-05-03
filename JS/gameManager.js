// game.js
import { fetchWeatherData } from './api-handler.js';
import { updateUIWithWeather, adjustCityFontSize, getCurrentGuess } from './ui.js';
import { showResultPopup } from './popupManager.js';
import { calculatePointsAndMessage } from './scoreManager.js';


let currentWeather;

export async function startNewRound() {
  try {
    const data = await fetchWeatherData();
    currentWeather = data;
    updateUIWithWeather(data);
    //updateGuessDisplay(0);
  } catch (err) {
    alert('Failed to load weather data');
  }
}

export function confirmGuessAndContinue() {
  const guessedTemp = getCurrentGuess();
  const actualTemp = Math.round(currentWeather.temperatureC); // 🔥 round it

  const { points, message } = calculatePointsAndMessage(guessedTemp, actualTemp);

  showResultPopup(points, message, actualTemp, () => {
    startNewRound();
  });
}
