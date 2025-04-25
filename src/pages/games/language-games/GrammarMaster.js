import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../config/firebase';
import { grammarService } from '../../../services/grammarService';
import './GrammarMaster.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';

const GrammarMaster = () => {
  const [user] = useAuthState(auth);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [difficulty, setDifficulty] = useState('beginner');
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [globalPoints, setGlobalPoints] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);

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
      { id: 'tenses', name: 'Verb Tenses', color: '#FF6B6B' },
      { id: 'articles', name: 'Articles', color: '#4D61FC' },
      { id: 'prepositions', name: 'Prepositions', color: '#22C55E' },
      { id: 'conditionals', name: 'Conditionals', color: '#00D4FF' },
      { id: 'modals', name: 'Modal Verbs', color: '#FF9F43' },
      { id: 'passive', name: 'Passive Voice', color: '#A855F7' }
    ],
    spanish: [
      { id: 'tenses', name: 'Tiempos Verbales', color: '#FF6B6B' },
      { id: 'articles', name: 'Artículos', color: '#4D61FC' },
      { id: 'prepositions', name: 'Preposiciones', color: '#22C55E' },
      { id: 'conditionals', name: 'Condicionales', color: '#00D4FF' },
      { id: 'subjunctive', name: 'Subjuntivo', color: '#FF9F43' },
      { id: 'reflexive', name: 'Verbos Reflexivos', color: '#A855F7' }
    ],
    french: [
      { id: 'tenses', name: 'Temps Verbaux', color: '#FF6B6B' },
      { id: 'articles', name: 'Articles', color: '#4D61FC' },
      { id: 'prepositions', name: 'Prépositions', color: '#22C55E' },
      { id: 'conditionals', name: 'Conditionnels', color: '#00D4FF' },
      { id: 'subjunctive', name: 'Subjonctif', color: '#FF9F43' },
      { id: 'pronouns', name: 'Pronoms', color: '#A855F7' }
    ],
    german: [
      { id: 'tenses', name: 'Zeitformen', color: '#FF6B6B' },
      { id: 'articles', name: 'Artikel', color: '#4D61FC' },
      { id: 'prepositions', name: 'Präpositionen', color: '#22C55E' },
      { id: 'conditionals', name: 'Konditionale', color: '#00D4FF' },
      { id: 'cases', name: 'Fälle', color: '#FF9F43' },
      { id: 'separable', name: 'Trennbare Verben', color: '#A855F7' }
    ],
    japanese: [
      { id: 'tenses', name: '時制', color: '#FF6B6B' },
      { id: 'particles', name: '助詞', color: '#4D61FC' },
      { id: 'verbs', name: '動詞', color: '#22C55E' },
      { id: 'conditionals', name: '条件文', color: '#00D4FF' },
      { id: 'honorifics', name: '敬語', color: '#FF9F43' },
      { id: 'counters', name: '数え方', color: '#A855F7' }
    ]
  };

  const questions = {
    english: {
      tenses: {
        beginner: [
          {
            question: "Complete the sentence: She ___ (go) to the store yesterday.",
            answer: "went",
            explanation: "The past simple tense is used for completed actions in the past.",
            hint: "Think about what tense to use for actions that happened yesterday."
          },
          {
            question: "Choose the correct form: I ___ (study) English for 5 years.",
            answer: "have been studying",
            explanation: "The present perfect continuous is used for actions that started in the past and continue to the present.",
            hint: "This action started in the past and is still continuing."
          }
        ],
        intermediate: [
          {
            question: "Complete: By the time we arrived, they ___ (leave).",
            answer: "had left",
            explanation: "The past perfect tense is used for actions completed before another past action.",
            hint: "This action happened before another past action."
          }
        ],
        advanced: [
          {
            question: "Complete: If I ___ (know) about the meeting, I would have attended.",
            answer: "had known",
            explanation: "Third conditional: past perfect in the if-clause, would have + past participle in the main clause.",
            hint: "This is a hypothetical situation in the past."
          }
        ]
      },
      articles: [
        {
          question: "Fill in the blank: ___ apple a day keeps the doctor away.",
          answer: "An",
          explanation: "Use 'an' before words that begin with a vowel sound."
        },
        {
          question: "Choose the correct article: I saw ___ movie last night.",
          answer: "a",
          explanation: "Use 'a' before words that begin with a consonant sound."
        }
      ]
    },
    spanish: {
      tenses: [
        {
          question: "Completa la oración: Ella ___ (ir) a la tienda ayer.",
          answer: "fue",
          explanation: "El pretérito perfecto simple se usa para acciones completadas en el pasado."
        },
        {
          question: "Elige la forma correcta: Yo ___ (estudiar) español por 5 años.",
          answer: "he estado estudiando",
          explanation: "El presente perfecto continuo se usa para acciones que comenzaron en el pasado y continúan hasta el presente."
        }
      ],
      articles: [
        {
          question: "Completa el espacio: ___ manzana al día mantiene al médico lejos.",
          answer: "Una",
          explanation: "Se usa 'una' antes de palabras que comienzan con sonido de vocal."
        },
        {
          question: "Elige el artículo correcto: Vi ___ película anoche.",
          answer: "una",
          explanation: "Se usa 'una' antes de palabras que comienzan con sonido de consonante."
        }
      ]
    }
  };

  useEffect(() => {
    if (selectedTopic) {
      generateNewQuestion();
    }
  }, [selectedTopic, difficulty]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const userRef = doc(db, 'profiles', user.uid);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          
          // Load game history
          const history = userData?.grammarHistory || [];
          setQuestionHistory(history);
          
          // Load saved game state from localStorage
          const savedState = localStorage.getItem(`grammarGameState_${user.uid}`);
          if (savedState) {
            const { score: savedScore, streak: savedStreak, maxStreak: savedMaxStreak } = JSON.parse(savedState);
            setScore(savedScore);
            setStreak(savedStreak);
            setMaxStreak(savedMaxStreak);
          }

          // Get global points and coins from profiles collection
          setGlobalPoints(userData?.stats?.totalPoints || 0);
          setTotalCoins(userData?.coins || 0);

          // Dispatch coins update event for global display
          window.dispatchEvent(new CustomEvent('coinsUpdated', {
            detail: { coins: userData?.coins || 0 }
          }));
        } catch (error) {
          console.error('Error loading game data:', error);
          setError('Failed to load game data');
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadUserData();
  }, [user]);

  useEffect(() => {
    if (user) {
      const gameState = {
        score,
        streak,
        maxStreak,
        questionHistory
      };
      localStorage.setItem(`grammarGameState_${user.uid}`, JSON.stringify(gameState));
    }
  }, [score, streak, maxStreak, questionHistory, user]);

  const generateNewQuestion = () => {
    const topicQuestions = questions[selectedLanguage]?.[selectedTopic]?.[difficulty];
    if (topicQuestions && topicQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * topicQuestions.length);
      setCurrentQuestion(topicQuestions[randomIndex]);
      setUserAnswer('');
      setFeedback('');
      setIsCorrect(null);
      setShowHint(false);
      setHint(topicQuestions[randomIndex].hint);
      setIsTimerRunning(true);
      setTimer(0);
    }
  };

  const checkAnswer = async () => {
    if (!userAnswer.trim()) {
      setFeedback('Please enter your answer');
      return;
    }

    const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setIsTimerRunning(false);
    
    // Increment total questions
    const newTotalQuestions = totalQuestions + 1;
    setTotalQuestions(newTotalQuestions);
    
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
      setStreak(prevStreak => {
        const newStreak = prevStreak + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });

      // Calculate points for this correct answer
      const basePoints = 1; // 1 point per correct answer
      const streakBonus = Math.min(streak, 3); // Bonus points for streak (max 3)
      const difficultyBonus = difficulty === 'advanced' ? 2 : difficulty === 'intermediate' ? 1 : 0;
      const pointsEarned = basePoints + streakBonus + difficultyBonus;
      
      try {
        setIsLoading(true);
        await grammarService.saveQuestionHistory(user.uid, {
          question: currentQuestion.question,
          answer: currentQuestion.answer,
          userAnswer: userAnswer,
          correct: true,
          difficulty: difficulty,
          language: selectedLanguage,
          topic: selectedTopic,
          time: timer,
          pointsEarned: pointsEarned
        });

        await grammarService.updateGameStats(user.uid, {
          correct: true,
          time: timer,
          streak: streak + 1,
          maxStreak: Math.max(maxStreak, streak + 1),
          language: selectedLanguage,
          pointsEarned: pointsEarned
        });

        await grammarService.addCoins(user.uid, pointsEarned);
      } catch (error) {
        console.error('Error saving progress:', error);
        setError('Failed to save progress. Please try again.');
      } finally {
        setIsLoading(false);
      }

      setFeedback(`Correct! +${pointsEarned} points!`);
    } else {
      setStreak(0);
      setFeedback(`Incorrect. The correct answer is: ${currentQuestion.answer}. ${currentQuestion.explanation}`);

      try {
        setIsLoading(true);
        await grammarService.saveQuestionHistory(user.uid, {
          question: currentQuestion.question,
          answer: currentQuestion.answer,
          userAnswer: userAnswer,
          correct: false,
          difficulty: difficulty,
          language: selectedLanguage,
          topic: selectedTopic,
          time: timer,
          pointsEarned: 0
        });

        await grammarService.updateGameStats(user.uid, {
          correct: false,
          time: timer,
          streak: 0,
          maxStreak: maxStreak,
          language: selectedLanguage,
          pointsEarned: 0
        });
      } catch (error) {
        console.error('Error saving progress:', error);
        setError('Failed to save progress. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    // Check if game is complete (5 questions)
    if (newTotalQuestions >= 5) {
      setIsGameComplete(true);
      setIsTimerRunning(false);
      
      // Calculate final points
      const correctAnswerPoints = score * 1; // 1 point per correct answer
      const timeBonus = Math.max(0, 5 - Math.floor(timer / 60)); // Up to 5 bonus points for completing quickly
      const streakBonus = maxStreak; // Points for max streak achieved
      const difficultyBonus = difficulty === 'advanced' ? 10 : difficulty === 'intermediate' ? 5 : 0;
      const totalPoints = correctAnswerPoints + timeBonus + streakBonus + difficultyBonus;
      
      try {
        setIsLoading(true);
        // Save final game stats
        await grammarService.updateGameStats(user.uid, {
          finalScore: score,
          totalTime: timer,
          maxStreak: maxStreak,
          totalPoints: totalPoints,
          language: selectedLanguage,
          completed: true
        });

        setFeedback(
          `Game Complete! You earned ${totalPoints} points!\n` +
          `Correct Answers: ${correctAnswerPoints} points\n` +
          `Time Bonus: ${timeBonus} points\n` +
          `Streak Bonus: ${streakBonus} points\n` +
          `Difficulty Bonus: ${difficultyBonus} points`
        );
      } catch (error) {
        console.error('Error saving final score:', error);
        setError('Failed to save final score. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Generate new question if game is not complete
      generateNewQuestion();
    }
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setQuestionHistory([]);
    setSelectedTopic('');
    setCurrentQuestion(null);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grammar-master">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Saving progress...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="master-header">
        <h1>Grammar Master</h1>
        <p>Practice grammar rules with interactive exercises</p>
      </div>

      {user && (
        <div className="game-progress-panel">
          <div className="progress-stats">
            <div className="progress-stat-item">
              <span className="stat-label">Total Coins</span>
              <span className="stat-value coins">{totalCoins}</span>
            </div>
            <div className="progress-stat-item">
              <span className="stat-label">Global Points</span>
              <span className="stat-value points">{globalPoints}</span>
            </div>
            <div className="progress-stat-item">
              <span className="stat-label">Current Score</span>
              <span className="stat-value score">{score}</span>
            </div>
          </div>
        </div>
      )}

      <div className="master-content">
        <div className="language-selector">
          <h3>Select Language</h3>
          <div className="language-buttons">
            {languages.map(language => (
              <button
                key={language.id}
                className={`language-button ${selectedLanguage === language.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedLanguage(language.id);
                  setSelectedTopic('');
                  resetGame();
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
                    setSelectedTopic('');
                    resetGame();
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
          <div className="topic-selector">
            <h3>Select Topic</h3>
            <div className="topic-buttons">
              {topics[selectedLanguage].map(topic => (
                <button
                  key={topic.id}
                  className={`topic-button ${selectedTopic === topic.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTopic(topic.id)}
                  style={{ '--topic-color': topic.color }}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion && (
          <div className="game-area">
            {isGameComplete ? (
              <div className="game-complete-overlay">
                <div className="game-complete-content">
                  <h2>Game Complete!</h2>
                  <div className="final-stats">
                    <p>Final Score: {score} out of 5</p>
                    <p>Time: {formatTime(timer)}</p>
                    <p>Max Streak: {maxStreak}</p>
                    <p className="total-points">Total Global Points: {globalPoints}</p>
                  </div>
                  <button 
                    className="play-again-button"
                    onClick={() => {
                      setIsGameComplete(false);
                      setTotalQuestions(0);
                      setScore(0);
                      setStreak(0);
                      setMaxStreak(0);
                      setTimer(0);
                      generateNewQuestion();
                    }}
                  >
                    Play Again
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="stats-panel">
                  <div className="stat-item">
                    <span className="stat-label">Score:</span>
                    <span className="stat-value">{score}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Current Streak:</span>
                    <span className="stat-value">{streak}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Max Streak:</span>
                    <span className="stat-value">{maxStreak}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Time:</span>
                    <span className="stat-value">{formatTime(timer)}</span>
                  </div>
                  <div className="stat-item global-points">
                    <span className="stat-label">Global Points:</span>
                    <span className="stat-value">{globalPoints}</span>
                  </div>
                </div>

                <div className="question-display">
                  <h2>{currentQuestion.question}</h2>
                </div>

                <div className="answer-section">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  />
                  <div className="feedback" style={{ color: isCorrect === true ? '#22C55E' : isCorrect === false ? '#FF6B6B' : '#a0a0a0' }}>
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
                  <button className="control-button check" onClick={checkAnswer}>
                    Check Answer
                  </button>
                  <button className="control-button next" onClick={generateNewQuestion}>
                    Next Question
                  </button>
                  <button className="control-button reset" onClick={resetGame}>
                    Reset Game
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <div className="history-panel">
          <h3>Question History</h3>
          <div className="history-list">
            {questionHistory.map((item, index) => (
              <div key={index} className={`history-item ${item.correct ? 'correct' : 'incorrect'}`}>
                <span className="question">{item.question}</span>
                <div className="history-details">
                  <span className="status">{item.correct ? '✓' : '✗'}</span>
                  <span className="time">{formatTime(item.time)}</span>
                  <span className="difficulty">{item.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarMaster; 