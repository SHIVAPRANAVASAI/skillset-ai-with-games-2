import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../../../config/firebase';
import { doc, updateDoc, arrayUnion, increment, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../config/firebase';
import './VocabularyBuilder.css';

const VocabularyBuilder = () => {
  const [user] = useAuthState(auth);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [currentWord, setCurrentWord] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [wordHistory, setWordHistory] = useState([]);
  const [difficulty, setDifficulty] = useState('beginner');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [totalUserCoins, setTotalUserCoins] = useState(0);
  const [gameStats, setGameStats] = useState({
    totalWords: 5,
    correctAnswers: 0,
    averageTime: 0,
    topStreak: 0,
    totalCoins: 0
  });

  const languages = [
    { id: 'english', name: 'English', color: '#FF6B6B' },
    { id: 'spanish', name: 'Spanish', color: '#4D61FC' },
    { id: 'french', name: 'French', color: '#22C55E' },
    { id: 'german', name: 'German', color: '#00D4FF' },
    { id: 'japanese', name: 'Japanese', color: '#FF9F43' }
  ];

  const difficulties = [
    { id: 'beginner', name: 'Beginner', color: '#22C55E' },
    { id: 'intermediate', name: 'Intermediate', color: '#FF9F43' },
    { id: 'advanced', name: 'Advanced', color: '#FF6B6B' }
  ];

  const topics = {
    english: [
      { id: 'academic', name: 'Academic Words', color: '#FF6B6B' },
      { id: 'business', name: 'Business Terms', color: '#4D61FC' },
      { id: 'technology', name: 'Technology', color: '#22C55E' },
      { id: 'science', name: 'Scientific Terms', color: '#00D4FF' },
      { id: 'literature', name: 'Literary Terms', color: '#FF9F43' }
    ],
    spanish: [
      { id: 'common', name: 'Common Words', color: '#FF6B6B' },
      { id: 'travel', name: 'Travel Vocabulary', color: '#4D61FC' },
      { id: 'food', name: 'Food & Dining', color: '#22C55E' },
      { id: 'business', name: 'Business Spanish', color: '#00D4FF' },
      { id: 'culture', name: 'Cultural Terms', color: '#FF9F43' }
    ],
    // Add more languages here
  };

  const vocabulary = {
    english: {
      academic: {
        beginner: [
          {
            word: 'Analysis',
            meaning: 'Detailed examination of something',
            hint: 'Think about breaking something down into parts'
          },
          {
            word: 'Hypothesis',
            meaning: 'A proposed explanation for something',
            hint: 'Scientists make these before experiments'
          },
          {
            word: 'Theory',
            meaning: 'A system of ideas explaining something',
            hint: 'A well-tested explanation based on evidence'
          },
          {
            word: 'Research',
            meaning: 'Systematic investigation to establish facts',
            hint: 'Looking for information in a methodical way'
          },
          {
            word: 'Method',
            meaning: 'A particular way of doing something',
            hint: 'A systematic procedure or technique'
          },
          {
            word: 'Data',
            meaning: 'Facts and statistics collected for reference',
            hint: 'Information gathered for analysis'
          },
          {
            word: 'Evidence',
            meaning: 'Information indicating whether something is true',
            hint: 'Facts that support a conclusion'
          },
          {
            word: 'Concept',
            meaning: 'An abstract idea or general notion',
            hint: 'A basic understanding of something'
          },
          {
            word: 'Variable',
            meaning: 'A factor that can change in an experiment',
            hint: 'Something that can be different each time'
          },
          {
            word: 'Conclusion',
            meaning: 'A judgment reached by reasoning',
            hint: 'The final result of thinking about evidence'
          }
        ],
        intermediate: [
          {
            word: 'Paradigm',
            meaning: 'A typical example or pattern of something',
            hint: 'A model or framework that others follow'
          },
          {
            word: 'Methodology',
            meaning: 'A system of methods used in a field',
            hint: 'The study of how to do research'
          },
          {
            word: 'Correlation',
            meaning: 'A mutual relationship between things',
            hint: 'When two things change together'
          },
          {
            word: 'Synthesis',
            meaning: 'Combination of parts to form a whole',
            hint: 'Putting different ideas together'
          },
          {
            word: 'Empirical',
            meaning: 'Based on observation or experience',
            hint: 'Knowledge from direct observation'
          },
          {
            word: 'Inference',
            meaning: 'A conclusion reached from evidence',
            hint: 'What you figure out from the facts'
          },
          {
            word: 'Qualitative',
            meaning: 'Relating to quality or characteristics',
            hint: 'Describing things without numbers'
          },
          {
            word: 'Quantitative',
            meaning: 'Relating to quantity or measurement',
            hint: 'Using numbers and data'
          }
        ],
        advanced: [
          {
            word: 'Epistemology',
            meaning: 'The theory of knowledge',
            hint: 'Study of how we know what we know'
          },
          {
            word: 'Heuristic',
            meaning: 'Enabling discovery or problem-solving',
            hint: 'A practical method for finding answers'
          },
          {
            word: 'Axiom',
            meaning: 'A statement accepted as true',
            hint: 'A basic principle that needs no proof'
          },
          {
            word: 'Empiricism',
            meaning: 'Knowledge from sensory experience',
            hint: 'Learning through observation'
          },
          {
            word: 'Dialectic',
            meaning: 'Investigation through discussion',
            hint: 'Finding truth through logical arguments'
          },
          {
            word: 'Paradigmatic',
            meaning: 'Serving as a model or pattern',
            hint: 'Setting an example for others'
          }
        ]
      },
      // Add more topics
    },
    // Add more languages
  };

  // Update addCoins function to also update local state and dispatch event
  const addCoins = useCallback(async (amount) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'profiles', user.uid);
      await updateDoc(userRef, {
        coins: increment(amount)
      });
      const newTotal = totalUserCoins + amount;
      setTotalUserCoins(newTotal);
      
      // Dispatch custom event for CoinsDisplay
      window.dispatchEvent(new CustomEvent('coinsUpdated', {
        detail: { coins: newTotal }
      }));
    } catch (error) {
      console.error('Error adding coins:', error);
    }
  }, [user, totalUserCoins]);

  // Add useEffect to fetch initial coins and dispatch event
  useEffect(() => {
    const fetchUserCoins = async () => {
      if (!user) return;
      try {
        const userRef = doc(db, 'profiles', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const coins = userDoc.data().coins || 0;
          setTotalUserCoins(coins);
          // Dispatch initial coins event
          window.dispatchEvent(new CustomEvent('coinsUpdated', {
            detail: { coins }
          }));
        }
      } catch (error) {
        console.error('Error fetching user coins:', error);
      }
    };
    fetchUserCoins();
  }, [user]);

  const calculateCoins = () => {
    let coins = 1; // Base coin
    
    // Streak bonus (1-3 coins)
    const streakBonus = Math.min(streak, 3);
    coins += streakBonus;
    
    // Speed bonus (2 coins if under 15 seconds)
    if (timer <= 15) {
      coins += 2;
    }
    
    // Difficulty multiplier (last step)
    if (difficulty === 'intermediate') coins *= 1.5;
    if (difficulty === 'advanced') coins *= 2;
    
    return Math.floor(coins);
  };

  // Save word history to Firebase
  const saveWordHistory = async (newWordHistory) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'profiles', user.uid);
      
      // First check if the word exists in history
      const hasAnsweredBefore = wordHistory.some(item => 
        item.word === newWordHistory[0].word && item.correct
      );

      // Only save if it's a first-time correct answer or an incorrect answer
      if (!hasAnsweredBefore || !newWordHistory[0].correct) {
        await updateDoc(userRef, {
          vocabularyHistory: arrayUnion(...newWordHistory)
        });
      }
    } catch (error) {
      console.error('Error saving word history:', error);
    }
  };

  const handleGameCompletion = async () => {
    setIsTimerRunning(false);
    
    // Calculate stats only from unique correct answers
    const uniqueCorrectWords = new Set();
    const correctAnswers = wordHistory.filter(item => {
      if (item.correct && !uniqueCorrectWords.has(item.word)) {
        uniqueCorrectWords.add(item.word);
        return true;
      }
      return false;
    }).length;

    const totalTime = wordHistory.reduce((sum, item) => sum + item.time, 0);
    const averageTime = Math.round(totalTime / wordHistory.length);
    const totalCoins = wordHistory.reduce((sum, item) => sum + (item.coins || 0), 0);

    const stats = {
      totalWords: 5,
      correctAnswers,
      averageTime,
      topStreak: maxStreak,
      totalCoins
    };

    setGameStats(stats);
    setShowCompletionModal(true);

    // Save completion stats to Firebase
    if (user) {
      try {
        const userRef = doc(db, 'profiles', user.uid);
        await updateDoc(userRef, {
          gameHistory: arrayUnion({
            date: new Date().toISOString(),
            game: 'vocabulary',
            difficulty,
            topic: selectedTopic,
            stats: {
              correctAnswers,
              totalWords: 5,
              averageTime,
              topStreak: maxStreak,
              totalCoins
            }
          })
        });
      } catch (error) {
        console.error('Error saving game completion:', error);
      }
    }
  };

  const generateNewWord = useCallback(() => {
    const topicWords = vocabulary[selectedLanguage]?.[selectedTopic]?.[difficulty];
    if (topicWords && topicWords.length > 0) {
      // Check if we've completed 5 words
      if (wordHistory.length >= 5) {
        handleGameCompletion();
        return;
      }

      // Filter out words that have already been used
      const usedWords = new Set(wordHistory.map(item => item.word));
      const availableWords = topicWords.filter(word => !usedWords.has(word.word));

      if (availableWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        setCurrentWord(availableWords[randomIndex]);
        setUserAnswer('');
        setFeedback('');
        setIsCorrect(null);
        setShowHint(false);
        setHint(availableWords[randomIndex].hint);
        setIsTimerRunning(true);
        setTimer(0);
      }
    }
  }, [selectedLanguage, selectedTopic, difficulty, wordHistory, vocabulary]);

  useEffect(() => {
    if (selectedTopic && !currentWord) {  // Only generate a word if we don't have one
      generateNewWord();
    }
  }, [selectedTopic, generateNewWord]); // Remove difficulty dependency

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const checkAnswer = async () => {
    if (!userAnswer.trim()) {
      setFeedback('Please enter your answer');
      return;
    }

    setIsLoading(true);
    const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentWord.meaning.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setIsTimerRunning(false);
    
    // Check if word was answered correctly before
    const hasAnsweredBefore = wordHistory.some(item => 
      item.word === currentWord.word && item.correct
    );
    
    if (isAnswerCorrect) {
      setStreak(prevStreak => {
        const newStreak = prevStreak + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });

      let earnedCoins = 0;
      if (!hasAnsweredBefore) {
        earnedCoins = calculateCoins();
        await addCoins(earnedCoins);
        setFeedback(`Correct! +${earnedCoins} coins`);
      } else {
        setFeedback('Correct! (Already answered before - no coins awarded)');
      }
      
      const newWordHistory = [{
        word: currentWord.word, 
        correct: true,
        time: timer,
        difficulty: difficulty,
        coins: earnedCoins,
        timestamp: new Date().toISOString()
      }];
      
      setWordHistory(prev => [...prev, ...newWordHistory]);
      await saveWordHistory(newWordHistory);
    } else {
      setStreak(0);
      setFeedback(`Incorrect. The correct meaning is: ${currentWord.meaning}`);
      const newWordHistory = [{
        word: currentWord.word, 
        correct: false,
        time: timer,
        difficulty: difficulty,
        coins: 0,
        timestamp: new Date().toISOString()
      }];
      
      setWordHistory(prev => [...prev, ...newWordHistory]);
      await saveWordHistory(newWordHistory);
    }

    setIsLoading(false);
    if (wordHistory.length >= 4) { // Check if this was the last word
      handleGameCompletion();
    } else {
      setTimeout(() => {
        generateNewWord();
      }, 1500);
    }
  };

  const resetGame = () => {
    setStreak(0);
    setMaxStreak(0);
    setWordHistory([]);
    setSelectedTopic('');
    setCurrentWord(null);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Add a manual next word button handler
  const handleNextWord = () => {
    if (!isLoading) {
      generateNewWord();
    }
  };

  const startNewGame = () => {
    setShowCompletionModal(false);
    setWordHistory([]);
    setStreak(0);
    setMaxStreak(0);
    setCurrentWord(null);
    setTimer(0);
    generateNewWord();
  };

  return (
    <div className="vocabulary-builder">
      <div className="builder-header">
        <h1>Vocabulary Builder</h1>
        <p>Expand your vocabulary in different languages</p>
      </div>

      {/* Debug panel with total coins */}
      {user && (
        <div style={{
          background: '#1a1a1a',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #333'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '1.2rem' }}>Game Progress</h3>
          <div style={{ 
            color: '#fff',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px'
          }}>
            <div style={{ 
              background: '#2a2a2a',
              padding: '10px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#ffd700', marginBottom: '5px', fontSize: '1.5rem' }}>{totalUserCoins}</p>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Total Coins</p>
            </div>
            <div style={{ 
              background: '#2a2a2a',
              padding: '10px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#4ade80', marginBottom: '5px', fontSize: '1.5rem' }}>{streak}</p>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Current Streak</p>
            </div>
            <div style={{ 
              background: '#2a2a2a',
              padding: '10px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#ff9f43', marginBottom: '5px', fontSize: '1.5rem' }}>
                {wordHistory.filter(item => item.correct).length} / {wordHistory.length}
              </p>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>Words Correct</p>
            </div>
          </div>
        </div>
      )}

      <div className="builder-content">
        <div className="settings-panel">
          <div className="language-selector">
            <h3>Select Language</h3>
            <div className="language-buttons">
              {languages.map(language => (
                <button
                  key={language.id}
                  onClick={() => setSelectedLanguage(language.id)}
                  className={`language-button ${selectedLanguage === language.id ? 'selected' : ''}`}
                  style={{ '--button-color': language.color }}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>

          <div className="difficulty-selector">
            <h3>Select Difficulty</h3>
            <div className="difficulty-buttons">
              {difficulties.map(level => (
                <button
                  key={level.id}
                  onClick={() => setDifficulty(level.id)}
                  className={`difficulty-button ${difficulty === level.id ? 'selected' : ''}`}
                  style={{ '--button-color': level.color }}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          <div className="topic-selector">
            <h3>Select Topic</h3>
            <div className="topic-buttons">
              {topics[selectedLanguage]?.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`topic-button ${selectedTopic === topic.id ? 'selected' : ''}`}
                  style={{ '--button-color': topic.color }}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {currentWord && (
          <div className="game-area">
            <div className="stats">
              <div className="streak">Streak: {streak}</div>
              <div className="timer">Time: {formatTime(timer)}</div>
            </div>

            <div className="word-display">
              <h2>{currentWord.word}</h2>
              <p>What does this word mean?</p>
            </div>

            <div className="answer-section">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter the meaning..."
                rows="3"
              />
              {showHint && hint && (
                <div className="hint">{hint}</div>
              )}
              <div className="feedback" style={{ color: isCorrect ? '#22C55E' : '#FF6B6B' }}>
                {feedback}
              </div>
            </div>

            <div className="control-buttons">
              {!showHint && hint && (
                <button className="hint-button" onClick={() => setShowHint(true)}>
                  Show Hint
                </button>
              )}
              <button 
                className="check-button" 
                onClick={checkAnswer}
                disabled={isLoading}
              >
                Check Answer
              </button>
              <button 
                className="next-button" 
                onClick={handleNextWord}
                disabled={isLoading}
              >
                Next Word
              </button>
              <button 
                className="reset-button" 
                onClick={resetGame}
                disabled={isLoading}
              >
                Reset Game
              </button>
            </div>
          </div>
        )}

        <div className="history-panel">
          <h3>Word History</h3>
          <div className="history-list">
            {wordHistory.map((item, index) => (
              <div key={index} className={`history-item ${item.correct ? 'correct' : 'incorrect'}`}>
                <span className="word">{item.word}</span>
                <span className="status">
                  {item.correct ? `✓ +${item.coins}` : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCompletionModal && (
        <div className="completion-modal-overlay">
          <div className="completion-modal">
            <h2>Game Complete! 🎉</h2>
            <div className="completion-stats">
              <div className="stat-item">
                <span className="stat-label">Accuracy</span>
                <span className="stat-value">
                  {Math.round((gameStats.correctAnswers / gameStats.totalWords) * 100)}%
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Time</span>
                <span className="stat-value">{formatTime(gameStats.averageTime)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Top Streak</span>
                <span className="stat-value">{gameStats.topStreak}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Coins</span>
                <span className="stat-value">+{gameStats.totalCoins}</span>
              </div>
            </div>
            
            <div className="completion-buttons">
              <button className="primary-button" onClick={startNewGame}>
                Play Again
              </button>
              <button className="secondary-button" onClick={() => setSelectedTopic('')}>
                Change Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyBuilder; 