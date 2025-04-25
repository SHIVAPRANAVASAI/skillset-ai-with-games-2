import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

// Initialize user data in Firestore
export const initializeUserData = async (userId) => {
  try {
    const userRef = doc(db, 'profiles', userId);
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
    const userRef = doc(db, 'profiles', userId);
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
    const userRef = doc(db, 'profiles', userId);
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
    const userRef = doc(db, 'profiles', userId);
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

export const userService = {
  async getUserProfile(userId) {
    try {
      const userRef = doc(db, 'profiles', userId);
      const userDoc = await getDoc(userRef);
      return userDoc.data();
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  async createUserProfile(userId, userData) {
    try {
      const userRef = doc(db, 'profiles', userId);
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date(),
        coins: 0,
        stats: {
          totalPoints: 0,
          gamesCompleted: 0,
          totalCorrectAnswers: 0,
          totalCoins: 0
        },
        games: {
          grammar: {
            totalQuestions: 0,
            correctAnswers: 0,
            totalTime: 0,
            maxStreak: 0,
            gamesCompleted: 0,
            totalPoints: 0
          },
          vocabulary: {
            totalWords: 0,
            correctWords: 0,
            totalTime: 0,
            maxStreak: 0,
            gamesCompleted: 0,
            totalPoints: 0
          }
        }
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  async updateUserProfile(userId, updates) {
    try {
      const userRef = doc(db, 'profiles', userId);
      await updateDoc(userRef, updates);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
}; 