import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../Games.css';

const MechanicalGames = () => {
  const games = [
    {
      id: 'dynamics-simulator',
      title: 'Dynamics Simulator',
      description: 'Explore different types of motion including projectile, circular, and harmonic motion',
      icon: '⚙️',
      level: 'intermediate',
      path: '/games/mechanical/dynamics-simulator'
    },
    {
      id: 'thermodynamics-simulator',
      title: 'Thermodynamics Lab',
      description: 'Interactive thermodynamics experiments',
      icon: '🌡️',
      level: 'intermediate',
      path: '/games/mechanical/thermodynamics-simulator'
    },
    {
      title: 'Machine Design',
      description: 'Design and test mechanical components',
      icon: '🔧',
      level: 'advanced',
      path: '/games/mechanical/machine-design'
    }
  ];

  return (
    <div className="category-page">
      <Link to="/games" className="back-button">
        <FiArrowLeft size={20} />
        Back to Categories
      </Link>
      
      <div className="category-header">
        <div className="icon">⚙️</div>
        <h1>Mechanical Engineering</h1>
        <p>Explore mechanical systems and simulations</p>
      </div>

      <div className="games-grid">
        {games.map((game, index) => (
          <Link to={game.path} key={index} className="game-card glass-morphism">
            <span className={`level-tag ${game.level}`}>
              {game.level}
            </span>
            <div className="game-icon">{game.icon}</div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="card-blur"></div>
            <div className="hover-indicator"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MechanicalGames;
