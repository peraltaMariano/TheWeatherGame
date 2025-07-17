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
    document.getElementById("country-clue")?.setAttribute("data-tooltip", `${data.country}`);
    setupCountryTooltip();
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
  const belowZeroButton = document.getElementById("below-zero");

  // Clean input as user types
  guessInput.addEventListener("input", () => {
    let value = guessInput.value;

    // Remove all except digits and minus
    value = value.replace(/[^0-9\-]/g, "");

    // Keep minus only at start
    if (value.startsWith("-")) {
      value = "-" + value.slice(1).replace(/-/g, "");
    } else {
      value = value.replace(/-/g, "");
    }

    // Limit length
    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    guessInput.value = value;
  });

  // Insert minus on ± click (only if not already there)
belowZeroButton?.addEventListener("click", (e) => {
  e.preventDefault();

  const value = guessInput.value;

  if (value.startsWith("-")) {
    guessInput.value = value.substring(1);
  } else {
    guessInput.value = "-" + value;
  }

  // Keep keyboard open
  guessInput.focus();

  // Move cursor to end (some Android devices require this)
  setTimeout(() => {
    guessInput.setSelectionRange(guessInput.value.length, guessInput.value.length);
  }, 0);
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

export function setupCountryTooltip() {
  const target = document.getElementById("country-clue");
  if (!target) return;

  // Remove old tooltip if it exists
  const old = target.querySelector(".tooltip-popup");
  if (old) old.remove();

  const message = target.getAttribute("data-tooltip");
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip-popup";
  tooltip.textContent = message;
  target.appendChild(tooltip);

  let hideTimeout;

  const showTooltip = () => {
    tooltip.classList.add("active");

    // Always hide after 2.5s
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      tooltip.classList.remove("active");
    }, 1500);
  };

  const hideTooltip = () => {
    tooltip.classList.remove("active");
    if (hideTimeout) clearTimeout(hideTimeout);
  };

  // Mobile tap
  target.addEventListener("click", (e) => {
    e.stopPropagation();
    showTooltip();
  });

  // Desktop hover
  target.addEventListener("mouseenter", showTooltip);
  target.addEventListener("mouseleave", hideTooltip);

  // Click outside (optional for mobile)
  document.addEventListener("click", (e) => {
    if (!target.contains(e.target)) hideTooltip();
  });
}


