import React, { useState, useEffect } from 'react';
import './ConversationPractice.css';
import { auth } from '../../../config/firebase';
import { conversationService } from '../../../services/conversationService';
import { onAuthStateChanged } from 'firebase/auth';
import { Dialog } from '@headlessui/react';
import { Modal, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

// Helper function to check response accuracy
const checkResponseAccuracy = (userResponse, correctResponses) => {
  const normalizedUserResponse = userResponse.trim().toLowerCase();
  const isCorrect = correctResponses.some(response => 
    normalizedUserResponse === response.toLowerCase()
  );

  let feedback = isCorrect 
    ? "Correct! Well done!" 
    : "Not quite right. Try again or check the hint.";

  return { isCorrect, feedback };
};

const ConversationPractice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedScenario, setSelectedScenario] = useState('');
  const [currentDialogue, setCurrentDialogue] = useState(null);
  const [userResponse, setUserResponse] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const [difficulty, setDifficulty] = useState('beginner');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [user, setUser] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 5;

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

  const scenarios = {
    english: [
      { id: 'restaurant', name: 'Restaurant', color: '#FF6B6B' },
      { id: 'shopping', name: 'Shopping', color: '#4D61FC' },
      { id: 'travel', name: 'Travel', color: '#22C55E' },
      { id: 'work', name: 'Work', color: '#00D4FF' },
      { id: 'social', name: 'Social', color: '#FF9F43' }
    ],
    spanish: [
      { id: 'restaurante', name: 'Restaurante', color: '#FF6B6B' },
      { id: 'compras', name: 'Compras', color: '#4D61FC' },
      { id: 'viaje', name: 'Viaje', color: '#22C55E' },
      { id: 'trabajo', name: 'Trabajo', color: '#00D4FF' },
      { id: 'social', name: 'Social', color: '#FF9F43' }
    ],
    french: [
      { id: 'restaurant', name: 'Restaurant', color: '#FF6B6B' },
      { id: 'shopping', name: 'Shopping', color: '#4D61FC' },
      { id: 'voyage', name: 'Voyage', color: '#22C55E' },
      { id: 'travail', name: 'Travail', color: '#00D4FF' },
      { id: 'social', name: 'Social', color: '#FF9F43' }
    ],
    german: [
      { id: 'restaurant', name: 'Restaurant', color: '#FF6B6B' },
      { id: 'einkaufen', name: 'Einkaufen', color: '#4D61FC' },
      { id: 'reise', name: 'Reise', color: '#22C55E' },
      { id: 'arbeit', name: 'Arbeit', color: '#00D4FF' },
      { id: 'sozial', name: 'Sozial', color: '#FF9F43' }
    ],
    japanese: [
      { id: 'restaurant', name: 'レストラン', color: '#FF6B6B' },
      { id: 'shopping', name: 'ショッピング', color: '#4D61FC' },
      { id: 'travel', name: '旅行', color: '#22C55E' },
      { id: 'work', name: '仕事', color: '#00D4FF' },
      { id: 'social', name: '社交', color: '#FF9F43' }
    ]
  };

  const dialogues = {
    english: {
      restaurant: {
        beginner: [
          {
            context: "You're at a restaurant ordering food",
            speaker: "Waiter",
            message: "Good evening! Would you like to see the menu?",
            correctResponses: ["Yes, please", "Could I see the menu?", "I'd like to see the menu"],
            hint: "A polite way to ask for the menu",
            translation: "はい、お願いします"
          },
          {
            context: "You're ordering your meal",
            speaker: "Waiter",
            message: "What would you like to order?",
            correctResponses: ["I'll have the pasta", "I'd like the steak", "Could I get the salad?"],
            hint: "Ways to order food politely",
            translation: "何を注文しますか？"
          }
        ],
        intermediate: [
          {
            context: "You have a special request",
            speaker: "Waiter",
            message: "Is everything to your liking?",
            correctResponses: ["Could I get some more water?", "The steak is a bit undercooked", "Everything is perfect, thank you"],
            hint: "Ways to make requests or give feedback",
            translation: "お料理はいかがですか？"
          }
        ]
      }
    },
    spanish: {
      restaurante: {
        beginner: [
          {
            context: "Estás en un restaurante pidiendo comida",
            speaker: "Camarero",
            message: "¡Buenas noches! ¿Quiere ver el menú?",
            correctResponses: ["Sí, por favor", "¿Podría ver el menú?", "Me gustaría ver el menú"],
            hint: "Una forma educada de pedir el menú",
            translation: "Would you like to see the menu?"
          }
        ]
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedScenario) {
      generateNewDialogue();
    }
  }, [selectedScenario, difficulty]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const generateNewDialogue = () => {
    const scenarioDialogues = dialogues[selectedLanguage]?.[selectedScenario]?.[difficulty];
    if (scenarioDialogues && scenarioDialogues.length > 0) {
      const randomIndex = Math.floor(Math.random() * scenarioDialogues.length);
      setCurrentDialogue(scenarioDialogues[randomIndex]);
      setUserResponse('');
      setFeedback('');
      setIsCorrect(null);
      setShowHint(false);
      setHint(scenarioDialogues[randomIndex].hint);
      setIsTimerRunning(true);
      setTimer(0);
    }
  };

  const startNewGame = async () => {
    // Ensure any pending updates are completed before resetting
    if (user && dialogueHistory.length > 0) {
      try {
        // Calculate final stats
        const correctAnswers = dialogueHistory.filter(item => item.isCorrect).length;
        const totalDialogues = dialogueHistory.length;
        const averageTime = Math.round(timer / totalDialogues);
        const accuracyRate = correctAnswers / totalDialogues;
        
        // Calculate final game stats
        const gameStats = {
          correctAnswers,
          totalDialogues: MAX_QUESTIONS,
          averageTime,
          maxStreak,
          totalPoints,
          totalTime: timer
        };

        console.log('Saving final stats before new game:', gameStats);

        // Save final stats with isGameComplete flag
        const result = await conversationService.updateGameStats(user.uid, {
          ...gameStats,
          lastGameScore: totalPoints,
          lastGameTime: timer,
          difficulty,
          language: selectedLanguage,
          isGameComplete: true,
          accuracy: accuracyRate * 100
        });

        console.log('Stats saved before new game:', result);

        // Verify the update
        const userRef = doc(db, 'profiles', user.uid);
        const afterUpdate = await getDoc(userRef);
        console.log('Profile before starting new game:', afterUpdate.data());
      } catch (error) {
        console.error('Error saving final stats before new game:', error);
      }
    }

    // Reset game state
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimer(0);
    setQuestionCount(0);
    setGameStartTime(Date.now());
    setIsTimerRunning(true);
    setShowCompletionModal(false);
    setDialogueHistory([]);
    setUserResponse('');
    setFeedback('');
    setIsCorrect(null);
    setShowHint(false);
    setShowTranslation(false);
    setTotalPoints(0);

    // Generate new dialogue
    generateNewDialogue();
  };

  const checkResponse = async () => {
    if (!currentDialogue || !userResponse.trim()) return;

    const responseCheck = checkResponseAccuracy(userResponse, currentDialogue.correctResponses);
    const isAnswerCorrect = responseCheck.isCorrect;
    
    // Update streak and question count
    let newStreak = isAnswerCorrect ? streak + 1 : 0;
    const newQuestionCount = questionCount + 1;
    setStreak(newStreak);
    setMaxStreak(Math.max(maxStreak, newStreak));
    setQuestionCount(newQuestionCount);

    // Calculate points based on difficulty and streak
    const difficultyMultiplier = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3
    };
    const points = isAnswerCorrect ? 10 * difficultyMultiplier[difficulty] * (1 + streak * 0.1) : 0;
    const newTotalPoints = totalPoints + points;
    setTotalPoints(newTotalPoints);

    // Update feedback and history
    setIsCorrect(isAnswerCorrect);
    setFeedback(responseCheck.feedback);
    setDialogueHistory([...dialogueHistory, {
      prompt: currentDialogue.prompt,
      userResponse: userResponse,
      isCorrect: isAnswerCorrect,
      time: timer
    }]);

    // Save progress if user is authenticated
    if (user) {
      try {
        await conversationService.updateGameStats(user.uid, {
          language: selectedLanguage,
          correct: isAnswerCorrect,
          pointsEarned: points,
          streak: newStreak,
          maxStreak: Math.max(maxStreak, newStreak),
          time: timer,
          difficulty: difficulty,
          isGameComplete: false
        });
      } catch (error) {
        console.error('Error updating game stats:', error);
      }
    }

    setUserResponse('');
    
    // Check if game should end
    if (newQuestionCount >= MAX_QUESTIONS) {
      await finishGame();
    } else {
      generateNewDialogue();
    }
  };

  const finishGame = async () => {
    setIsTimerRunning(false);
    
    if (user) {
      try {
        // Calculate final stats
        const correctAnswers = dialogueHistory.filter(item => item.isCorrect).length;
        const totalDialogues = dialogueHistory.length;
        const averageTime = Math.round(timer / totalDialogues);
        const accuracyRate = correctAnswers / MAX_QUESTIONS;
        
        // Calculate final game stats
        const gameStats = {
          correctAnswers,
          totalDialogues: MAX_QUESTIONS,
          averageTime,
          maxStreak,
          totalPoints,
          totalTime: timer
        };

        console.log('Final game stats:', gameStats);

        // Save final stats with isGameComplete flag
        const result = await conversationService.updateGameStats(user.uid, {
          ...gameStats,
          lastGameScore: totalPoints,
          lastGameTime: timer,
          difficulty,
          language: selectedLanguage,
          isGameComplete: true,
          accuracy: accuracyRate * 100
        });

        console.log('Game completion result:', result);

        // Verify the coins were added
        const userRef = doc(db, 'profiles', user.uid);
        const afterUpdate = await getDoc(userRef);
        console.log('Profile after game completion:', afterUpdate.data());
      } catch (error) {
        console.error('Error updating final game stats:', error);
      }
    }
    setShowCompletionModal(true);
  };

  const resetPractice = () => {
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setDialogueHistory([]);
    setSelectedScenario('');
    setCurrentDialogue(null);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const CompletionModal = ({ open, onClose, score, timer, onStartNewGame }) => {
    const navigate = useNavigate();
    const correctAnswers = dialogueHistory.filter(item => item.isCorrect).length;
    const accuracyRate = (correctAnswers / MAX_QUESTIONS) * 100;
    const [isStartingNewGame, setIsStartingNewGame] = useState(false);

    const handleStartNewGame = async () => {
      setIsStartingNewGame(true);
      try {
        await onStartNewGame();
      } catch (error) {
        console.error('Error starting new game:', error);
      } finally {
        setIsStartingNewGame(false);
      }
    };

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="completion-modal-title"
        aria-describedby="completion-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography id="completion-modal-title" variant="h6" component="h2" gutterBottom>
            Game Complete!
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Correct Answers: {correctAnswers} / {MAX_QUESTIONS}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Accuracy: {accuracyRate.toFixed(1)}%
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Time: {Math.floor(timer / 60)}m {timer % 60}s
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Max Streak: {maxStreak}
          </Typography>
          <Typography sx={{ mt: 1, color: 'primary.main', fontWeight: 'bold' }}>
            Total Points: {totalPoints}
          </Typography>
          <Typography sx={{ mt: 1, color: 'secondary.main', fontWeight: 'bold' }}>
            Coins Earned: {Math.round((correctAnswers * 10 + maxStreak * 5 + (accuracyRate * 0.5) + (timer < MAX_QUESTIONS * 30 ? 20 : 0)) * (difficulty === 'advanced' ? 2 : difficulty === 'intermediate' ? 1.5 : 1))}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={() => navigate('/games')} variant="outlined" disabled={isStartingNewGame}>
              Return to Menu
            </Button>
            <Button 
              onClick={handleStartNewGame} 
              variant="contained"
              disabled={isStartingNewGame}
            >
              {isStartingNewGame ? 'Starting...' : 'Play Again'}
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <div className="container">
      <div className="game-header">
        <h1>Conversation Practice</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Score</div>
            <div className="stat-value">{score}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Streak</div>
            <div className="stat-value">{streak}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Points</div>
            <div className="stat-value">{totalPoints}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Time</div>
            <div className="stat-value">{formatTime(timer)}</div>
          </div>
        </div>
      </div>

      <div className="language-selector">
        <h3>Select Language</h3>
        <div className="language-buttons">
          {languages.map(language => (
            <button
              key={language.id}
              className={`language-button ${selectedLanguage === language.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedLanguage(language.id);
                setSelectedScenario('');
                resetPractice();
              }}
              style={{ '--language-color': language.color }}
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>

      {selectedLanguage && (
        <div className="difficulty-selector">
          <h3>Select Difficulty</h3>
          <div className="difficulty-buttons">
            {difficulties.map(level => (
              <button
                key={level.id}
                className={`difficulty-button ${difficulty === level.id ? 'selected' : ''}`}
                onClick={() => {
                  setDifficulty(level.id);
                  setSelectedScenario('');
                  resetPractice();
                }}
                style={{ '--difficulty-color': level.color }}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedLanguage && (
        <div className="scenario-selector">
          <h3>Select Scenario</h3>
          <div className="scenario-buttons">
            {scenarios[selectedLanguage].map(scenario => (
              <button
                key={scenario.id}
                className={`scenario-button ${selectedScenario === scenario.id ? 'selected' : ''}`}
                onClick={() => setSelectedScenario(scenario.id)}
                style={{ '--scenario-color': scenario.color }}
              >
                {scenario.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentDialogue && (
        <div className="practice-area">
          <div className="dialogue-display">
            <div className="context">{currentDialogue.context}</div>
            <div className="message">
              <span className="speaker">{currentDialogue.speaker}: </span>
              {currentDialogue.message}
            </div>
            {showTranslation && (
              <div className="translation">
                Translation: {currentDialogue.translation}
              </div>
            )}
          </div>

          <div className="response-section">
            <input
              type="text"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Enter your response..."
              onKeyPress={(e) => e.key === 'Enter' && checkResponse()}
            />
            <div className="feedback" style={{ color: isCorrect === true ? '#059669' : isCorrect === false ? '#dc2626' : '#94a3b8' }}>
              {feedback}
            </div>
          </div>

          <div className="hint-section">
            {!showHint && !isCorrect && (
              <button className="hint-button" onClick={() => setShowHint(true)}>
                Show Hint
              </button>
            )}
            {showHint && <div className="hint-text">{hint}</div>}
          </div>

          <div className="control-buttons">
            <button className="control-button check" onClick={checkResponse}>
              Check Response
            </button>
            <button className="control-button next" onClick={generateNewDialogue}>
              Next Dialogue
            </button>
            <button className="control-button translation" onClick={() => setShowTranslation(!showTranslation)}>
              {showTranslation ? 'Hide Translation' : 'Show Translation'}
            </button>
            <button className="control-button reset" onClick={resetPractice}>
              Reset Practice
            </button>
          </div>
        </div>
      )}

      {dialogueHistory.length > 0 && (
        <div className="history-panel">
          <h3>Dialogue History</h3>
          <div className="history-list">
            {dialogueHistory.map((item, index) => (
              <div key={index} className={`history-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="context">{item.prompt}</div>
                <div className="dialogue">
                  <span className="speaker">You: </span>
                  {item.userResponse}
                </div>
                <div className="history-details">
                  <span>{item.isCorrect ? '✓' : '✗'}</span>
                  <span>{formatTime(item.time)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CompletionModal
        open={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        score={score}
        timer={timer}
        onStartNewGame={startNewGame}
      />
    </div>
  );
};

export default ConversationPractice;