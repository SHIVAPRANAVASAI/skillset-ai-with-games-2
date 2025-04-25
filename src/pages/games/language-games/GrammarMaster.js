import React, { useState, useEffect } from 'react';
import './GrammarMaster.css';

const GrammarMaster = () => {
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

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback('Please enter your answer');
      return;
    }

    const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setIsTimerRunning(false);
    
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
      setStreak(prevStreak => {
        const newStreak = prevStreak + 1;
        if (newStreak > maxStreak) {
          setMaxStreak(newStreak);
        }
        return newStreak;
      });
      setFeedback('Correct! Well done!');
      setQuestionHistory(prev => [...prev, { 
        question: currentQuestion.question, 
        correct: true,
        time: timer,
        difficulty: difficulty
      }]);
    } else {
      setStreak(0);
      setFeedback(`Incorrect. The correct answer is: ${currentQuestion.answer}. ${currentQuestion.explanation}`);
      setQuestionHistory(prev => [...prev, { 
        question: currentQuestion.question, 
        correct: false,
        time: timer,
        difficulty: difficulty
      }]);
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
      <div className="master-header">
        <h1>Grammar Master</h1>
        <p>Practice grammar rules with interactive exercises</p>
      </div>

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