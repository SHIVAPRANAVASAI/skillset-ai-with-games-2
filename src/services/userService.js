import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

// Initialize user data in Firestore
export const initializeUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      coins: 0,
      totalPoints: 0,
      gamePoints: {},
      createdAt: new Date(),
      lastLogin: new Date()
    });
    return true;
  } catch (error) {
    console.error('Error initializing user data:', error);
    throw error;
  }
};

// Get user data
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

// Add coins to user
export const addCoins = async (userId, amount) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }

    const currentCoins = userSnap.data().coins || 0;
    await updateDoc(userRef, {
      coins: currentCoins + amount
    });

    return currentCoins + amount;
  } catch (error) {
    console.error('Error adding coins:', error);
    throw error;
  }
};

// Update user's last login
export const updateLastLogin = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      lastLogin: new Date()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};

// Test Firestore connection
export const testFirestoreConnection = async () => {
  try {
    const testRef = doc(db, 'test', 'connection');
    await setDoc(testRef, {
      timestamp: new Date(),
      status: 'connected'
    });
    console.log('Firestore connection test successful');
    return true;
  } catch (error) {
    console.error('Firestore connection test failed:', error);
    return false;
  }
}; 