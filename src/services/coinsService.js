import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

// Get user's current coins
export const getUserCoins = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      return 0;
    }
    return userDoc.data().coins || 0;
  } catch (error) {
    console.error('Error getting user coins:', error);
    throw error;
  }
};

// Add coins to user's balance
export const addCoins = async (amount, gameId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userRef = doc(db, 'users', user.uid);
    
    // Update coins and total points
    await updateDoc(userRef, {
      coins: increment(amount),
      totalPoints: increment(amount),
      [`gamePoints.${gameId}`]: increment(amount)
    });

    return true;
  } catch (error) {
    console.error('Error adding coins:', error);
    throw error;
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