import { getFirestore, doc, updateDoc, getDoc, arrayUnion, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

export const conversationService = {
  // Save dialogue history
  async saveDialogueHistory(userId, dialogueData) {
    try {
      const userRef = doc(db, 'profiles', userId);
      await updateDoc(userRef, {
        conversationHistory: arrayUnion({
          context: dialogueData.context,
          speaker: dialogueData.speaker,
          message: dialogueData.message,
          response: dialogueData.response,
          correct: dialogueData.correct,
          time: dialogueData.time,
          difficulty: dialogueData.difficulty,
          language: dialogueData.language,
          scenario: dialogueData.scenario,
          timestamp: new Date(),
          pointsEarned: dialogueData.pointsEarned || 0,
          coins: dialogueData.coins || 0
        })
      });
    } catch (error) {
      console.error('Error saving dialogue history:', error);
      throw error;
    }
  },

  calculateGameCoins(stats, difficulty) {
    // Base coins for completing the game
    let coins = 10;

    // Add coins based on correct answers (3 coins per correct answer)
    coins += (stats.correctAnswers || 0) * 3;

    // Add streak bonus (up to 10 coins)
    const streakBonus = Math.min((stats.maxStreak || 0) * 2, 10);
    coins += streakBonus;

    // Add accuracy bonus (up to 10 coins)
    const accuracy = (stats.correctAnswers / stats.totalDialogues) * 100;
    if (accuracy >= 90) coins += 10;
    else if (accuracy >= 80) coins += 7;
    else if (accuracy >= 70) coins += 5;

    // Add speed bonus (up to 5 coins)
    const averageTime = stats.totalTime / stats.totalDialogues;
    if (averageTime <= 5) coins += 5;
    else if (averageTime <= 10) coins += 3;

    // Difficulty multiplier
    if (difficulty === 'intermediate') coins *= 1.5;
    else if (difficulty === 'advanced') coins *= 2;

    return Math.floor(coins);
  },

  // Update game stats
  async updateGameStats(userId, statsData) {
    if (!userId) throw new Error('userId is required');
    
    try {
      console.log('Starting stats update with data:', JSON.stringify(statsData, null, 2));
      
      const userRef = doc(db, 'profiles', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data() || {};
      
      console.log('Current profile data:', {
        currentCoins: userData.coins || 0,
        profileCoins: userData.profile?.coins || 0,
        gameCoins: userData.games?.conversation?.totalCoins || 0,
        correctAnswers: userData.games?.conversation?.correctAnswers || 0,
        totalDialogues: userData.games?.conversation?.totalDialogues || 0
      });
      
      const updates = {
        lastUpdated: new Date()
      };

      // Ensure isGameComplete is properly set
      const isGameComplete = statsData.isGameComplete === true;
      console.log('Is game complete?', isGameComplete);

      if (isGameComplete) {
        // Calculate final game stats
        const gameStats = {
          correctAnswers: statsData.correctAnswers || 0,
          totalDialogues: statsData.totalDialogues || 0,
          averageTime: statsData.averageTime || 0,
          maxStreak: statsData.maxStreak || 0,
          totalPoints: statsData.totalPoints || 0,
          totalTime: statsData.totalTime || 0
        };

        // Calculate coins earned for the game
        const coinsEarned = this.calculateGameCoins(gameStats, statsData.difficulty);
        console.log('Game completed - Stats:', gameStats);
        console.log('Coins earned:', coinsEarned);

        // Update root level coins (for backward compatibility)
        updates['coins'] = increment(coinsEarned);
        
        // Update profile section
        updates['profile.coins'] = increment(coinsEarned);
        updates['profile.totalCoinsEarned'] = increment(coinsEarned);
        updates['profile.lastGamePlayed'] = 'conversation';
        updates['profile.totalGamesCompleted'] = increment(1);
        
        // Update stats section
        updates['stats.coins'] = increment(coinsEarned);
        updates['stats.totalCoinsEarned'] = increment(coinsEarned);
        updates['stats.totalPoints'] = increment(gameStats.totalPoints);
        updates['stats.gamesCompleted'] = increment(1);
        
        // Update game-specific stats
        updates['games.conversation.gamesCompleted'] = increment(1);
        updates['games.conversation.lastGameScore'] = gameStats.totalPoints;
        updates['games.conversation.lastGameTime'] = gameStats.totalTime;
        updates['games.conversation.totalPoints'] = increment(gameStats.totalPoints);
        updates['games.conversation.totalCoins'] = increment(coinsEarned);
        updates['games.conversation.correctAnswers'] = increment(gameStats.correctAnswers);
        updates['games.conversation.totalDialogues'] = increment(gameStats.totalDialogues);
        updates['games.conversation.maxStreak'] = Math.max(
          gameStats.maxStreak,
          userData.games?.conversation?.maxStreak || 0
        );
        
        // Add to game history
        updates['gameHistory'] = arrayUnion({
          date: new Date().toISOString(),
          game: 'conversation',
          difficulty: statsData.difficulty,
          language: statsData.language,
          stats: {
            ...gameStats,
            totalCoins: coinsEarned
          }
        });

        // Update language-specific stats
        if (statsData.language) {
          const langPath = `games.conversation.languages.${statsData.language}`;
          updates[`${langPath}.gamesCompleted`] = increment(1);
          updates[`${langPath}.totalPoints`] = increment(gameStats.totalPoints);
          updates[`${langPath}.totalCoins`] = increment(coinsEarned);
          updates[`${langPath}.correctAnswers`] = increment(gameStats.correctAnswers);
          updates[`${langPath}.totalDialogues`] = increment(gameStats.totalDialogues);
          
          if (typeof statsData.accuracy === 'number') {
            const langStats = userData.games?.conversation?.languages?.[statsData.language] || {};
            const langGames = langStats.gamesCompleted || 0;
            const langAccuracy = langStats.averageAccuracy || 0;
            const newLangAccuracy = ((langAccuracy * langGames) + statsData.accuracy) / (langGames + 1);
            updates[`${langPath}.averageAccuracy`] = newLangAccuracy;
          }
        }

        // Calculate and update XP
        const xpEarned = Math.round(gameStats.totalPoints * 0.1);
        updates['profile.xp'] = increment(xpEarned);
      } else {
        // Regular in-game updates
        const pointsEarned = statsData.pointsEarned || 0;
        
        updates['games.conversation.totalDialogues'] = increment(1);
        if (statsData.correct) {
          updates['games.conversation.correctAnswers'] = increment(1);
          updates['games.conversation.totalPoints'] = increment(pointsEarned);
          updates['stats.totalPoints'] = increment(pointsEarned);
        }
        updates['games.conversation.totalTime'] = increment(statsData.time || 0);
        
        if (statsData.language) {
          const langPath = `games.conversation.languages.${statsData.language}`;
          updates[`${langPath}.totalDialogues`] = increment(1);
          if (statsData.correct) {
            updates[`${langPath}.correctAnswers`] = increment(1);
            updates[`${langPath}.totalPoints`] = increment(pointsEarned);
          }
        }

        if (typeof statsData.streak === 'number') {
          updates['games.conversation.currentStreak'] = statsData.streak;
          if (statsData.maxStreak && (!userData.games?.conversation?.maxStreak || statsData.maxStreak > userData.games.conversation.maxStreak)) {
            updates['games.conversation.maxStreak'] = statsData.maxStreak;
          }
        }
      }

      console.log('Applying updates to profile:', JSON.stringify(updates, null, 2));
      await updateDoc(userRef, updates);

      // Verify the update
      const updatedDoc = await getDoc(userRef);
      const updatedData = updatedDoc.data();
      console.log('Profile after update:', {
        newTotalCoins: updatedData.coins,
        newProfileCoins: updatedData.profile?.coins,
        newGameCoins: updatedData.games?.conversation?.totalCoins,
        coinsChange: {
          total: (updatedData.coins || 0) - (userData.coins || 0),
          profile: (updatedData.profile?.coins || 0) - (userData.profile?.coins || 0),
          game: (updatedData.games?.conversation?.totalCoins || 0) - (userData.games?.conversation?.totalCoins || 0)
        }
      });

      return { 
        previousData: userData,
        updates,
        currentData: updatedData,
        coinsAdded: isGameComplete ? this.calculateGameCoins(statsData, statsData.difficulty) : 0,
        pointsAdded: statsData.totalPoints || statsData.pointsEarned || 0
      };
    } catch (error) {
      console.error('Error updating game stats:', error);
      throw error;
    }
  }
}; 