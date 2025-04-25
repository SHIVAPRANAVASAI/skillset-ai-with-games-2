import React, { useState, useEffect } from 'react';
import './ConversationPractice.css';

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

  const checkResponse = () => {
    if (!userResponse.trim()) {
      setFeedback('Please enter your response');
      return;
    }

    const isResponseCorrect = currentDialogue.correctResponses.some(
      response => userResponse.toLowerCase().trim() === response.toLowerCase().trim()
    );
    setIsCorrect(isResponseCorrect);
    setIsTimerRunning(false);
    
    if (isResponseCorrect) {
      setScore(prevScore => prevScore + 1);
      setStreak(prevStreak => {
        const newStreak = prevStreak + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });
      setFeedback('Great response!');
      setDialogueHistory(prev => [...prev, { 
        context: currentDialogue.context,
        speaker: currentDialogue.speaker,
        message: currentDialogue.message,
        response: userResponse,
        correct: true,
        time: timer,
        difficulty: difficulty
      }]);
    } else {
      setStreak(0);
      setFeedback(`Good try! Here are some possible responses: ${currentDialogue.correctResponses.join(', ')}`);
      setDialogueHistory(prev => [...prev, { 
        context: currentDialogue.context,
        speaker: currentDialogue.speaker,
        message: currentDialogue.message,
        response: userResponse,
        correct: false,
        time: timer,
        difficulty: difficulty
      }]);
    }
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

  return (
    <div className="conversation-practice">
      <div className="practice-header">
        <h1>Conversation Practice</h1>
        <p>Practice real-world conversations in different languages</p>
      </div>

      <div className="practice-content">
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
            </div>

            <div className="dialogue-display">
              <div className="context">{currentDialogue.context}</div>
              <div className="message">
                <span className="speaker">{currentDialogue.speaker}:</span>
                <span className="text">{currentDialogue.message}</span>
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
              <button className="control-button check" onClick={checkResponse}>
                Check Response
              </button>
              <button className="control-button next" onClick={generateNewDialogue}>
                Next Dialogue
              </button>
              <button className="control-button reset" onClick={resetPractice}>
                Reset Practice
              </button>
              <button 
                className="control-button translation" 
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? 'Hide Translation' : 'Show Translation'}
              </button>
            </div>
          </div>
        )}

        <div className="history-panel">
          <h3>Dialogue History</h3>
          <div className="history-list">
            {dialogueHistory.map((item, index) => (
              <div key={index} className={`history-item ${item.correct ? 'correct' : 'incorrect'}`}>
                <div className="context">{item.context}</div>
                <div className="dialogue">
                  <span className="speaker">{item.speaker}:</span>
                  <span className="message">{item.message}</span>
                </div>
                <div className="response">
                  <span className="label">Your response:</span>
                  <span className="text">{item.response}</span>
                </div>
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

export default ConversationPractice; 