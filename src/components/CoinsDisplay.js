import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { getUserData } from '../services/userService';
import { FaCoins } from 'react-icons/fa';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const CoinsDisplay = () => {
  const [user] = useAuthState(auth);
  const [coins, setCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const userData = await getUserData(user.uid);
          if (userData) {
            setCoins(userData.coins || 0);
          } else {
            // If user data doesn't exist, initialize it
            const userRef = doc(db, 'profiles', user.uid);
            await setDoc(userRef, {
              coins: 0,
              totalPoints: 0,
              gamePoints: {},
              createdAt: new Date(),
              lastLogin: new Date()
            });
            setCoins(0);
          }
        } catch (error) {
          console.error('Error fetching coins:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    // Listen for coin updates
    const handleCoinUpdate = (event) => {
      setCoins(event.detail.coins);
    };

    window.addEventListener('coinsUpdated', handleCoinUpdate);
    fetchCoins();

    return () => {
      window.removeEventListener('coinsUpdated', handleCoinUpdate);
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className="coins-display" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      padding: '5px 10px',
      background: 'rgba(255, 215, 0, 0.15)',
      borderRadius: '20px',
      color: '#ffd700',
      fontWeight: 'bold',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    }}>
      <FaCoins style={{ color: '#ffd700' }} />
      <span>{isLoading ? '...' : coins}</span>
    </div>
  );
};

export default CoinsDisplay; 