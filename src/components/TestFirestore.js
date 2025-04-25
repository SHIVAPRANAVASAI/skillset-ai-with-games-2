import React, { useEffect, useState } from 'react';
import { testFirestoreConnection } from '../services/userService';

const TestFirestore = () => {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    const testConnection = async () => {
      const result = await testFirestoreConnection();
      setStatus(result ? 'Connected successfully!' : 'Connection failed');
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Firestore Connection Test</h2>
      <p>Status: {status}</p>
    </div>
  );
};

export default TestFirestore; 