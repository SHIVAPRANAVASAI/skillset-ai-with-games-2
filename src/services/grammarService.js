import { getFirestore, doc, updateDoc, getDoc, arrayUnion, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

export const grammarService = {
  // Save question history
  async saveQuestionHistory(userId, questionData) {
    try {
      const userRef = doc(db, 'profiles', userId);
      await updateDoc(userRef, {
        grammarHistory: arrayUnion({
          question: questionData.question,
          answer: questionData.answer,
          userAnswer: questionData.userAnswer,
          timestamp: new Date(),
          correct: questionData.correct,
          difficulty: questionData.difficulty,
          language: questionData.language,
          topic: questionData.topic,
          pointsEarned: questionData.pointsEarned || 0
        })
      });
    } catch (error) {
      console.error('Error saving question history:', error);
      throw error;
    }
  },

  // Get question history
  async getQuestionHistory(userId) {
    try {
      const userRef = doc(db, 'profiles', userId);
      const userDoc = await getDoc(userRef);
      return userDoc.data()?.grammarHistory || [];
    } catch (error) {
      console.error('Error getting question history:', error);
      throw error;
    }
  },

  // Update game statistics
  async updateGameStats(userId, stats) {
    try {
      const userRef = doc(db, 'profiles', userId);
      
      // If it's a final game completion update
      if (stats.completed) {
        // Calculate global points based on correct answers (1 point per correct answer)
        const globalPoints = stats.finalScore; // Since finalScore represents number of correct answers

        await updateDoc(userRef, {
          // Game specific stats
          'games.grammar.lastGameScore': stats.finalScore,
          'games.grammar.lastGameTime': stats.totalTime,
          'games.grammar.maxStreak': Math.max(stats.maxStreak || 0),
          'games.grammar.totalPoints': increment(stats.totalPoints || 0),
          'games.grammar.gamesCompleted': increment(1),
          [`games.grammar.${stats.language}GamesCompleted`]: increment(1),
          
          // Global stats
          'stats.totalPoints': increment(globalPoints),
          'stats.gamesCompleted': increment(1),
          'stats.totalCorrectAnswers': increment(stats.finalScore)
        });
        return;
      }

      // For regular in-game updates
      await updateDoc(userRef, {
        'games.grammar.totalQuestions': increment(1),
        'games.grammar.correctAnswers': increment(stats.correct ? 1 : 0),
        'games.grammar.totalTime': increment(stats.time || 0),
        'games.grammar.currentStreak': stats.streak,
        'games.grammar.maxStreak': Math.max(stats.maxStreak || 0),
        [`games.grammar.${stats.language}Total`]: increment(1),
        [`games.grammar.${stats.language}Correct`]: increment(stats.correct ? 1 : 0),
        
        // Update global stats for each correct answer
        'stats.totalQuestions': increment(1),
        'stats.totalCorrectAnswers': increment(stats.correct ? 1 : 0)
      });
    } catch (error) {
      console.error('Error updating game stats:', error);
      throw error;
    }
  },

  // Add coins and global points for correct answers
  async addCoins(userId, amount) {
    try {
      const userRef = doc(db, 'profiles', userId);
      await updateDoc(userRef, {
        coins: increment(amount),
        'stats.totalPoints': increment(amount),
        'stats.totalCoins': increment(amount)
      });
    } catch (error) {
      console.error('Error adding coins:', error);
      throw error;
    }
  }
}; 