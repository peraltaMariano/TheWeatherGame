// gameManager.js

import { fetchWeatherData } from './api-handler.js';
import { updateCity, updateClues, enhanceGuessInput } from './ui.js';
import { compareGuess, resetScore, getGuessCount, getPerfectGuesses, getHistory } from './scoreManager.js';

let currentHP = 50;
let bonus = 10;
let currentSlide = 0;
let currentCity = "";
let currentTemperature = 0;

export function initializeGame() {
  const okButton = document.getElementById("guess-submit");
  const guessInput = document.getElementById("guess-input");
  const nextButton = document.getElementById("next-button");
  const retryButton = document.getElementById("retry-button");

  document.getElementById("guess-count").textContent = getGuessCount();
  document.getElementById("current-hp").textContent = currentHP;

  retryButton.addEventListener("click", resetGame);

  if (!okButton || !guessInput || !nextButton) {
    console.error("Required elements not found");
    return;
  }

  okButton.addEventListener("click", handleOkClick);
  nextButton.addEventListener("click", handleNextClick);
  guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleOkClick();
  });

  enhanceGuessInput();
  fetchAndUpdateWeather();
}

async function fetchAndUpdateWeather() {
  try {
    const data = await fetchWeatherData();
    updateCity(data.city);
    updateClues(data);
    currentCity = data.city;
    currentTemperature = data.temperatureC;
    console.log("New location loaded:", currentCity);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

async function handleOkClick() {
  const guessInput = document.getElementById("guess-input");
  const guessButton = document.getElementById("guess-submit");
  const slider = document.getElementById("guess-slider");

  const userGuess = parseInt(guessInput.value, 10);
  if (isNaN(userGuess)) {
    console.error("Invalid input, please enter a number.");
    return;
  }

  guessInput.value = "";
  guessInput.disabled = true;
  guessButton.disabled = true;

  const { updatedHP, lost } = compareGuess(userGuess, currentTemperature, currentHP, bonus, currentCity);
  currentHP = updatedHP;

  if (lost) {
    showLoseScreen();
    return;
  }

  currentSlide++;
  slider.style.transform = `translateX(-${(currentSlide * 100) / 3}%)`;
}

async function handleNextClick() {
  const slider = document.getElementById("guess-slider");
  const guessInput = document.getElementById("guess-input");
  const guessButton = document.getElementById("guess-submit");

  currentSlide++;
  slider.style.transform = `translateX(-${(currentSlide * 100) / 3}%)`;

  setTimeout(() => {
    currentSlide = 0;
    slider.style.transition = "none";
    slider.style.transform = `translateX(0)`;
    slider.offsetHeight;
    slider.style.transition = "transform 0.5s ease";

    guessInput.disabled = false;
    guessButton.disabled = false;
    guessInput.value = "";
    guessInput.focus();
  }, 500);

  fetchAndUpdateWeather();
}

function resetGame() {
  const loseScreen = document.getElementById("lose-screen");
  const guessInput = document.getElementById("guess-input");
  const guessButton = document.getElementById("guess-submit");
  const slider = document.getElementById("guess-slider");

  currentHP = 50;
  resetScore();

  document.getElementById("current-hp").textContent = currentHP;
  document.getElementById("guess-count").textContent = getGuessCount();

  loseScreen.style.display = "none";

  slider.style.transition = "none";
  slider.style.transform = `translateX(0)`;
  slider.offsetHeight;
  slider.style.transition = "transform 0.5s ease";

  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.value = "";
  guessInput.focus();

  fetchAndUpdateWeather();
}

function showLoseScreen() {
  const loseScreen = document.getElementById("lose-screen");
  const historyList = document.getElementById("history-list");

  document.getElementById("final-streak").textContent = getGuessCount();
  document.getElementById("perfect-guesses").textContent = getPerfectGuesses();
  const title = loseScreen.querySelector('.lose-screen-title');
  const stats = loseScreen.querySelector('.game-statistics');
  const history = loseScreen.querySelector('.history');
  const buttons = loseScreen.querySelector('.button-row');

  // Reset everything
  title.classList.remove('visible');
  stats.classList.remove('visible');
  history.classList.remove('visible');
  buttons.classList.remove('visible');

  // Fade in container first
  loseScreen.classList.add('visible');

  // Animate in stages
  setTimeout(() => {
    title.classList.add('visible');
  }, 100); // after container

  setTimeout(() => {
    stats.classList.add('visible');
  }, 400); // after title

  setTimeout(() => {
    history.classList.add('visible');
  }, 700); // after stats

  setTimeout(() => {
    buttons.classList.add('visible');
  }, 1000); // after history
  historyList.innerHTML = "";

  const historyData = getHistory();
  const totalRows = Math.max(5, historyData.length); // Always show at least 5 rows

  for (let i = 0; i < totalRows; i++) {
    const row = document.createElement("div");
    row.classList.add("history-row");

    if (i < historyData.length) {
      const entry = historyData[i];
      row.innerHTML = `
        <div>${entry.index}</div>
        <div>${entry.city}</div>
        <div>${entry.actual}°C</div>
        <div>${entry.guessed}°C</div>
      `;
    } else {
      row.innerHTML = `
        <div>-</div>
        <div>---</div>
        <div>--</div>
        <div>--</div>
      `;
    }

    row.style.backgroundColor = i % 2 === 0 ? "white" : "#ecf6fa";

    historyList.appendChild(row);
  }

  loseScreen.style.display = "flex";
}

