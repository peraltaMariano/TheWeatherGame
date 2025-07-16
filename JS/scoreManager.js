
  let perfectGuesses = 0;
  let guessCount = 0;
  let history = [];

export function compareGuess(userInput, apiValue, currentHP, bonus, city) {
  const diff = Math.abs(apiValue - userInput);
  let updatedHP;
  let isPerfect = false;
  let lost = false;

  guessCount++;

  if (diff === 0) {
    updatedHP = currentHP + bonus;
    isPerfect = true;
    perfectGuesses++;
    document.getElementById('feedback-message').textContent = "Correct!";
    document.getElementById('actual-temp').textContent = `The temperature was indeed ${apiValue}°C.`;
  } else {
    updatedHP = currentHP - diff;
    if (updatedHP <= 0) {
      updatedHP = 0;
      lost = true;
    }

    if (diff <= 2) {
      document.getElementById('feedback-message').textContent = "So close!";
    } else if (diff <= 5) {
      document.getElementById('feedback-message').textContent = "Almost.";
    } else if (diff <= 9) {
      document.getElementById('feedback-message').textContent = "Fair guess.";
    } else {
      document.getElementById('feedback-message').textContent = "Uh-oh.";
    }

    document.getElementById('actual-temp').textContent = `The actual temperature was ${apiValue}°C.`;
  }

  history.push({
    index: guessCount,
    city: city,
    actual: apiValue,
    guessed: userInput
  });

  document.getElementById('current-hp').textContent = updatedHP;
  document.getElementById('perfect-guesses').textContent = perfectGuesses;
  document.getElementById('guess-count').textContent = guessCount;

  return { updatedHP, lost, isPerfect };
}



export function resetScore(){
  guessCount = 0;
  perfectGuesses = 0;
  history = [];
}
export function getGuessCount() {
  return guessCount;
}
export function getPerfectGuesses() {
  return perfectGuesses;
}

export function getHistory() {
  return history;
}