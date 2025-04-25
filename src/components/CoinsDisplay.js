import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { getUserData } from '../services/userService';
import { FaCoins } from 'react-icons/fa';

const CoinsDisplay = () => {
  const [user] = useAuthState(auth);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData) {
            setCoins(userData.coins || 0);
          }
        } catch (error) {
          console.error('Error fetching coins:', error);
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
      <span>{coins}</span>
    </div>
  );
};

export default CoinsDisplay; 