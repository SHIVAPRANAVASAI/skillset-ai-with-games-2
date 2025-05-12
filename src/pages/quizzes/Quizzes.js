import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Quizzes.css';
import { QUIZZES } from './quizData';
import excitedGoat from '../../assets/excitet-goat.png';
import goodGoat from '../../assets/good-goat.png';
import angryGoat from '../../assets/angry-goat.png';
import sadGoat from '../../assets/sad-goat.png';

function Quizzes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const filteredQuizzes = Object.entries(QUIZZES).filter(([key, quiz]) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !difficulty || quiz.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const handleStartQuiz = (quizId) => {
    setSelectedQuiz(QUIZZES[quizId]);
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === selectedQuiz.questions[currentQuestion].correctAnswer;
    if (correct) setScore(score + 1);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  if (selectedQuiz) {
    if (quizComplete) {
      const percentage = (score / selectedQuiz.questions.length) * 100;
      let goatImage, message;

      if (percentage >= 80) {
        goatImage = excitedGoat;
        message = "Amazing work! You're absolutely crushing it! 🎉 Keep up the fantastic learning!";
      } else if (percentage >= 60) {
        goatImage = goodGoat;
        message = "Great job! You're making excellent progress! 👍 Keep pushing forward!";
      } else if (percentage >= 30) {
        goatImage = angryGoat;
        message = "You're on the right track! Keep practicing and you'll improve! 💪";
      } else {
        goatImage = sadGoat;
        message = "Don't worry! Every expert was once a beginner. Keep learning! 🌟";
      }

      return (
        <div className="quiz-complete">
          <h2>Quiz Complete!</h2>
          <div className="score-display">
            <div className="score">
              {score}/{selectedQuiz.questions.length}
            </div>
            <p>Correct Answers</p>
          </div>
          <div className="goat-display">
            <img src={goatImage} alt="Result goat" className="result-goat" />
            <p className="performance-message">{message}</p>
          </div>
          <button onClick={restartQuiz}>Try Another Quiz</button>
        </div>
      );
    }

    const question = selectedQuiz.questions[currentQuestion];

    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>{selectedQuiz.title}</h2>
          <div className="quiz-progress">
            Question {currentQuestion + 1} of {selectedQuiz.questions.length}
          </div>
        </div>

        <div className="question-card">
          <h3>{question.question}</h3>
          
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${selectedAnswer !== null ? 'disabled' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="explanation">
              <h4>
                {selectedAnswer === question.correctAnswer
                  ? "Correct! 🎉"
                  : "Incorrect 😕"}
              </h4>
              <p>{question.explanation}</p>
              <button onClick={nextQuestion}>
                {currentQuestion < selectedQuiz.questions.length - 1
                  ? "Next Question"
                  : "Complete Quiz"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="quizzes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="quizzes-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skill Assessment Quizzes
        </motion.h1>

        <motion.div 
          className="quiz-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input 
            type="text" 
            placeholder="Search quizzes..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="filter-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {difficulties.map(diff => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </motion.div>

        {filteredQuizzes.length === 0 ? (
          <div className="no-quizzes">
            No quizzes match your search criteria
          </div>
        ) : (
          <motion.div 
            className="quizzes-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredQuizzes.map(([key, quiz], index) => (
              <motion.div 
                key={key}
                className="quiz-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleStartQuiz(key)}
              >
                <div className="quiz-header">
                  <h2>{quiz.title}</h2>
                  <span className={`quiz-badge ${quiz.difficulty?.toLowerCase() || 'beginner'}`}>
                    {quiz.difficulty || 'Beginner'}
                  </span>
                </div>
                <p>{quiz.description}</p>
                <div className="quiz-meta">
                  <span>{quiz.category || 'Programming'}</span>
                </div>
                <div className="quiz-details">
                  <div className="detail">
                    <span className="detail-value">{quiz.questions.length}</span>
                    <span className="detail-label">Questions</span>
                  </div>
                  <div className="detail">
                    <span className="detail-value">10m</span>
                    <span className="detail-label">Time Limit</span>
                  </div>
                  <div className="detail">
                    <span className="detail-value">4.5/5</span>
                    <span className="detail-label">Rating</span>
                  </div>
                </div>
                <button className="start-button">
                  Start Quiz
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Quizzes;
