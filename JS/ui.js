// ui.js
export function updateGuessDisplay(value) {
    const el = document.getElementById('guess-number');
    if (el) el.textContent = value;
  }
  
  export function getCurrentGuess() {
    const guessText = document.getElementById('guess-number').textContent;
    return parseInt(guessText, 10);
  }
  
  export function updateUIWithWeather(data) {
    const cityEl = document.getElementById('city-name');
    const countryEl = document.getElementById('country-name');
  
    if (!cityEl || !countryEl) {
      console.error('City or Country element not found in DOM');
      return;
    }
  
    if (!data.city || !data.country) {
      console.error('Invalid data provided to updateUIWithWeather:', data);
      return;
    }
  
    cityEl.textContent = data.city;
    countryEl.textContent = data.country;
  
    try {
      adjustCityFontSize('.city-wrapper', '#city-name');
    } catch (err) {
      console.error('Error applying scale:', err);
    }
  
    // document.querySelector('.clue-time').textContent = data.localtime.slice(-5);
  
    // const cluesBox = document.querySelector('.clues-box');
    // cluesBox.querySelectorAll('.clue-item').forEach(el => el.remove());
  
    // const clues = [
    //   data.isDay ? '☀️ Day' : '🌙 Night',
    //   mapConditionToEmoji(data.conditionCode)
    // ];
  
    // clues.forEach(clue => {
    //   const div = document.createElement('div');
    //   div.className = 'clue-item';
    //   div.textContent = clue;
    //   cluesBox.insertBefore(div, cluesBox.querySelector('.clue-time'));
    // });
  }
  export function adjustCityFontSize() {
    const cityElement = document.getElementById('city-name');
    const cityWrapper = document.querySelector('.city-wrapper');
    if (!cityElement) return;
  
    // Reset font-size to maximum
    cityElement.style.fontSize = '120px';
  
    const maxWidth = cityWrapper.offsetWidth;  // box width (40vw)
    const maxHeight = cityWrapper.offsetHeight; // box height (200px)
  
    let fontSize = 120;
  
    // Shrink until it fits both horizontally and vertically
    while (
      (cityElement.scrollWidth > maxWidth || cityElement.scrollHeight > maxHeight) &&
      fontSize > 40
    ) {
      fontSize -= 10;
      cityElement.style.fontSize = `${fontSize}px`;
    }
    cityElement.classList.remove('pop'); // reset if already running
    void cityElement.offsetWidth; // force reflow
    cityElement.classList.add('pop');
    console.log(`Adjusted font size to ${fontSize}px for city: ${cityElement.textContent}`);

  }
  
  
  
  
  
  
  function mapConditionToEmoji(code) {
    const map = {
      1000: '☀️ Sunny',
      1003: '⛅ Partly Cloudy',
      1006: '☁️ Cloudy',
      1009: '🌫️ Overcast',
      1030: '🌫️ Mist',
      1063: '🌦️ Showers',
      1087: '⛈️ Thunder',
      1117: '❄️ Blizzard'
    };
    return map[code] || '❓ Unknown';
  }