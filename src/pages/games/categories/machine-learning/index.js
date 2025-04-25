import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MLIcon } from '../../../../components/icons/CategoryIcons';
import './styles.css';

const MLGames = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'image-classifier',
      title: 'Image Classifier Challenge',
      description: 'Test your pattern recognition skills against a real ML model! Classify images and learn how AI sees the world.',
      difficulty: 'Intermediate',
      estimatedTime: '10-15 min',
      path: '/games/machine-learning/image-classifier',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #FF6B9C 0deg, #4D61FC 180deg, #FF6B9C 360deg)',
      icon: '🤖'
    },
    {
      id: 'neural-network',
      title: 'Neural Network Playground',
      description: 'Coming Soon! Build and train your own neural network to solve simple problems.',
      difficulty: 'Advanced',
      estimatedTime: '15-20 min',
      path: '/games/machine-learning/neural-network',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #4D61FC 0deg, #22C55E 180deg, #4D61FC 360deg)',
      icon: '🧠',
      comingSoon: true
    },
    {
      id: 'reinforcement',
      title: 'Reinforcement Learning Arena',
      description: 'Coming Soon! Guide an AI agent through challenges using reinforcement learning principles.',
      difficulty: 'Advanced',
      estimatedTime: '20-25 min',
      path: '/games/machine-learning/reinforcement',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #22C55E 0deg, #FF6B9C 180deg, #22C55E 360deg)',
      icon: '🎮',
      comingSoon: true
    }
  ];

  return (
    <div className="ml-games-page">
      <div className="category-header">
        <div className="category-icon">
          <MLIcon />
        </div>
        <div className="category-info">
          <h1>Machine Learning Games</h1>
          <p>Experience AI concepts through interactive games and challenges</p>
        </div>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div
            key={game.id}
            className={`game-card ${game.comingSoon ? 'coming-soon' : ''}`}
            onClick={() => !game.comingSoon && navigate(game.path)}
            style={{
              '--game-gradient': game.gradient
            }}
          >
            <div className="game-icon">{game.icon}</div>
            <div className="game-content">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="game-meta">
                <span className="difficulty">{game.difficulty}</span>
                <span className="time">{game.estimatedTime}</span>
              </div>
            </div>
            {game.comingSoon && (
              <div className="coming-soon-overlay">
                <span>Coming Soon!</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MLGames; 