import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { addCoins } from '../services/userService';

export const useCoins = () => {
  const [user] = useAuthState(auth);

  const awardCoins = useCallback(async (amount, reason = '') => {
    if (!user) {
      console.error('No user logged in');
      return false;
    }

    try {
      const newTotal = await addCoins(user.uid, amount);
      console.log(`Awarded ${amount} coins for ${reason}. New total: ${newTotal}`);
      return true;
    } catch (error) {
      console.error('Error awarding coins:', error);
      return false;
    }
  }, [user]);

  return { awardCoins };
}; 