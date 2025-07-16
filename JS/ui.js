import { countryToISO } from "./clueManager.js";
import { seasonIcons } from "./clueManager.js";
import { getWeatherData } from "./clueManager.js";
import { getSeason } from "./clueManager.js";
import { extractTime } from "./clueManager.js";
import { compareGuess } from "./scoreManager.js";

export function updateCity(city) {
  const cityElement = document.querySelector(".city-name");
  cityElement.textContent = city;
  adjustCityFontSize();
}

export function updateClues(data) {
  console.log("Updating clues with data:", data);

  // Season Icon
  const season = getSeason(data.latitude);
  const seasonIconPath = seasonIcons[season];
  const seasonIcon = document.querySelector(".season-icon");
  if (seasonIcon) seasonIcon.src = seasonIconPath;

  const seasonLabel = document.getElementById("season-label");
  if (seasonLabel) seasonLabel.innerText = season;

  // Weather Icon & Text
  const { iconPath, text } = getWeatherData(data.conditionCode, data.isDay);

  const weatherIcon = document.querySelector(".weather-icon");
  if (weatherIcon) {
    weatherIcon.src = iconPath;
    console.log("Weather icon set to:", iconPath);
  } else {
    console.error("Weather icon element not found!");
  }

  const weatherLabel = document.getElementById("weather-label");
  if (weatherLabel) weatherLabel.innerText = text;

  // Time
  const timeLabel = document.getElementById("time-label");
  if (timeLabel) timeLabel.innerText = extractTime(data.localtime);

  // Country Flag
  const flagIcon = document.querySelector(".flag-icon");
  const isoCode = countryToISO[data.country];
  if (flagIcon && isoCode) {
    flagIcon.src = `https://flagcdn.com/${isoCode}.svg`;
  } else {
    console.warn(`No ISO code found for country ${data.country}`);
  }
  document
    .getElementById("country-tooltip")
    ?.setAttribute("data-tooltip", `${data.country}`);
  document
    .getElementById("conditions-tooltip")
    ?.setAttribute("data-tooltip", `${data.conditionText}`);
  document
    .getElementById("season-tooltip")
    ?.setAttribute("data-tooltip", `${season}`);
}

export function adjustCityFontSize() {
  const cityElement = document.getElementById("city-name");
  const wrapper = document.querySelector(".city-wrapper");
  if (!cityElement || !wrapper) return;

  // Start large
  let fontSize = 80;
  cityElement.style.fontSize = `${fontSize}px`;

  // Measure loop
  const maxWidth = wrapper.clientWidth;
  const maxHeight = wrapper.clientHeight;

  while (
    (cityElement.scrollWidth > maxWidth ||
      cityElement.scrollHeight > maxHeight) &&
    fontSize > 24
  ) {
    fontSize -= 2;
    cityElement.style.fontSize = `${fontSize}px`;
  }
}
// Input enhancements
export function enhanceGuessInput() {
  const guessInput = document.getElementById("guess-input");

  guessInput.addEventListener("input", () => {
    let value = guessInput.value;

    // Step 1: Remove all characters except digits and minus
    value = value.replace(/[^0-9\-]/g, "");

    // Step 2: Ensure minus only at the start
    if (value.startsWith("-")) {
      // Remove any other minus signs after the first char
      value = "-" + value.slice(1).replace(/-/g, "");
    } else {
      // Remove all minus signs if not at start
      value = value.replace(/-/g, "");
    }

    // Step 3: Limit total length to 3 characters
    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    guessInput.value = value;
  });
}

export function updateHealthPoints(points) {
  const hpElement = document.getElementById("current-hp");

  if (!hpElement) {
    console.error("HP element not found");
    return;
  }

  hpElement.innerText = points;

  // Optional: Add animation
  hpElement.classList.add("pop");

  setTimeout(() => {
    hpElement.classList.remove("pop");
  }, 300);
}
export function showHowToPlay() {
  const openBtn = document.getElementById('how-to-play-button');
  const closeBtn = document.getElementById('close-how-to-play');
  const modal = document.getElementById('how-to-play-modal');

  if (!openBtn || !closeBtn || !modal) return;

  // Manual open (via button)
  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // 🔥 Show modal automatically if user hasn't seen it
  if (!localStorage.getItem('hasSeenHowToPlay')) {
    modal.classList.remove('hidden');
    localStorage.setItem('hasSeenHowToPlay', 'true');
  }
}


