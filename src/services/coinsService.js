import { getFirestore, doc, getDoc, updateDoc, increment, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

export const coinsService = {
  // Get user's current coins
  async getCoins(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'profiles', userId));
      if (!userDoc.exists()) {
        // Initialize user data if it doesn't exist
        await setDoc(doc(db, 'profiles', userId), {
          coins: 0,
          totalPoints: 0,
          gamePoints: {},
          createdAt: new Date(),
          lastLogin: new Date()
        });
        return 0;
      }
      return userDoc.data().coins || 0;
    } catch (error) {
      console.error('Error getting coins:', error);
      throw error;
    }
  },

  // Add coins to user's balance
  async addCoins(userId, amount) {
    try {
      const userRef = doc(db, 'profiles', userId);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Initialize user data if it doesn't exist
        await setDoc(userRef, {
          coins: amount,
          totalPoints: amount,
          gamePoints: {},
          createdAt: new Date(),
          lastLogin: new Date(),
          stats: {
            totalCoins: amount,
            totalPoints: amount,
            gamesCompleted: 0,
            totalCorrectAnswers: 0
          }
        });
        return amount;
      }

      await updateDoc(userRef, {
        coins: increment(amount),
        'stats.totalCoins': increment(amount),
        'stats.totalPoints': increment(amount),
        lastLogin: new Date()
      });
      
      // Get updated coins balance
      const updatedDoc = await getDoc(userRef);
      return updatedDoc.data()?.coins || 0;
    } catch (error) {
      console.error('Error adding coins:', error);
      throw error;
    }
  },

  // Spend coins from user's balance
  async spendCoins(userId, amount) {
    try {
      const userDoc = await getDoc(doc(db, 'profiles', userId));
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      const currentCoins = userDoc.data()?.coins || 0;
      if (currentCoins < amount) {
        throw new Error('Insufficient coins');
      }

      const userRef = doc(db, 'profiles', userId);
      await updateDoc(userRef, {
        coins: increment(-amount),
        lastLogin: new Date()
      });

      return true;
    } catch (error) {
      console.error('Error spending coins:', error);
      throw error;
    }
  },

  // Check if user has enough coins
  async hasEnoughCoins(userId, amount) {
    try {
      const userDoc = await getDoc(doc(db, 'profiles', userId));
      if (!userDoc.exists()) {
        return false;
      }
      const currentCoins = userDoc.data()?.coins || 0;
      return currentCoins >= amount;
    } catch (error) {
      console.error('Error checking coins:', error);
      return false;
    }
  }
};

// Get game-specific points
export const getGamePoints = async (gameId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      return 0;
    }
    return userDoc.data().gamePoints?.[gameId] || 0;
  } catch (error) {
    console.error('Error getting game points:', error);
    throw error;
  }
};

// Get total points across all games
export const getTotalPoints = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      return 0;
    }
    return userDoc.data().totalPoints || 0;
  } catch (error) {
    console.error('Error getting total points:', error);
    throw error;
  }
}; 