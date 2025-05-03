// scoreManager.js

export function calculatePointsAndMessage(guessedTemp, actualTemp) {
  const difference = Math.abs(guessedTemp - actualTemp);

  if (difference === 0) {
    return { points: 20, message: "PERFECT!" };
  } else if (difference === 1) {
    return { points: 18, message: "So Close!" };
  } else if (difference === 2) {
    return { points: 16, message: "So Close!" };
  } else if (difference === 3) {
    return { points: 13, message: "Nice try!" };
  } else if (difference === 4) {
    return { points: 10, message: "Nice try!" };
  } else if (difference >= 5 && difference <= 7) {
    return { points: 6, message: "Not too bad" };
  } else if (difference >= 8 && difference <= 10) {
    return { points: 3, message: "Difficult one" };
  } else {
    return { points: 0, message: "Uh oh..." };
  }
}
