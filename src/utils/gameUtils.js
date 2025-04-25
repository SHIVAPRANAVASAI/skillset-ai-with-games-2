import { addCoins } from '../services/coinsService';

// Game difficulty multipliers
const DIFFICULTY_MULTIPLIERS = {
  easy: 1,
  medium: 1.5,
  hard: 2
};

// Base points for different game types
const GAME_BASE_POINTS = {
  quiz: 10,
  puzzle: 15,
  simulation: 20,
  challenge: 25
};

// Calculate points based on game type, difficulty, and performance
export const calculateGamePoints = (gameType, difficulty, performance) => {
  const basePoints = GAME_BASE_POINTS[gameType] || 10;
  const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[difficulty] || 1;
  const performanceMultiplier = performance / 100; // performance is a percentage

  return Math.round(basePoints * difficultyMultiplier * performanceMultiplier);
};

// Award coins after completing a game
export const awardGameCoins = async (gameId, gameType, difficulty, performance) => {
  try {
    const points = calculateGamePoints(gameType, difficulty, performance);
    await addCoins(points, gameId);
    return points;
  } catch (error) {
    console.error('Error awarding game coins:', error);
    throw error;
  }
};

// Get game completion message
export const getGameCompletionMessage = (points) => {
  if (points >= 20) {
    return 'Excellent work! You earned a lot of coins! 🎉';
  } else if (points >= 15) {
    return 'Great job! Keep it up! 🌟';
  } else if (points >= 10) {
    return 'Good effort! You earned some coins! 💫';
  } else {
    return 'Keep practicing to earn more coins! 💪';
  }
}; 