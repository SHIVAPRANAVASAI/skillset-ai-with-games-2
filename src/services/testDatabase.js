// Test database service with localStorage persistence
const STORAGE_KEY = 'vocabulary_game_data';

const initialUserData = {
  id: 'test-user-1',
  email: 'test@example.com',
  coins: 0,
  totalPoints: 0,
  vocabularyHistory: [],
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
};

const testDatabase = {
  users: [],

  // Initialize database from localStorage or with default data
  init() {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.users = parsedData.users;
      } else {
        this.users = [initialUserData];
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      this.users = [initialUserData];
    }
  },

  // Save current state to localStorage
  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ users: this.users }));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  // Reset database to initial state
  async resetDatabase() {
    this.users = [initialUserData];
    this.saveToStorage();
  },

  // Get user data
  async getUserData(userId) {
    const user = this.users.find(u => u.id === userId);
    return user || null;
  },

  // Add coins to user
  async addCoins(userId, amount) {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    user.coins += amount;
    user.totalPoints += amount;
    this.saveToStorage();
    return user.coins;
  },

  // Update user's vocabulary history
  async updateVocabularyHistory(userId, newHistory) {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    user.vocabularyHistory = [...user.vocabularyHistory, ...newHistory];
    this.saveToStorage();
    return user.vocabularyHistory;
  },

  // Get user's vocabulary history
  async getVocabularyHistory(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    return user.vocabularyHistory;
  }
};

// Initialize the database when the module loads
testDatabase.init();

export default testDatabase; 