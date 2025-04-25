import React, { useState } from 'react';
import './Probability.css';

const Probability = () => {
  const [selectedGame, setSelectedGame] = useState('coin-toss');
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });
  const [diceRolls, setDiceRolls] = useState([]);
  const [diceStats, setDiceStats] = useState({});
  const [cards, setCards] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);

  const games = [
    { id: 'coin-toss', name: 'Coin Toss', icon: '🪙' },
    { id: 'dice-roll', name: 'Dice Roll', icon: '🎲' },
    { id: 'card-draw', name: 'Card Draw', icon: '🃏' }
  ];

  const handleCoinToss = () => {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    setResults([...results, result]);
    setStats({
      heads: stats.heads + (result === 'Heads' ? 1 : 0),
      tails: stats.tails + (result === 'Tails' ? 1 : 0)
    });
  };

  const handleDiceRoll = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceRolls([...diceRolls, result]);
    setDiceStats({
      ...diceStats,
      [result]: (diceStats[result] || 0) + 1
    });
  };

  const initializeDeck = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value });
      }
    }
    return deck;
  };

  const handleCardDraw = () => {
    if (cards.length === 0) {
      setCards(initializeDeck());
      setDrawnCards([]);
    }
    if (cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      const drawnCard = cards[randomIndex];
      if (drawnCard) {
        setDrawnCards([...drawnCards, drawnCard]);
        setCards(cards.filter((_, index) => index !== randomIndex));
      }
    }
  };

  const resetGame = () => {
    setResults([]);
    setStats({ heads: 0, tails: 0 });
    setDiceRolls([]);
    setDiceStats({});
    setCards([]);
    setDrawnCards([]);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case 'coin-toss':
        return (
          <div className="coin-toss-game">
            <button onClick={handleCoinToss} className="action-button">
              Toss Coin
            </button>
            <div className="results-container">
              <h3>Results</h3>
              <div className="results-list">
                {results.map((result, index) => (
                  <span key={index} className={`result ${result.toLowerCase()}`}>
                    {result}
                  </span>
                ))}
              </div>
              <div className="stats">
                <p>Heads: {stats.heads}</p>
                <p>Tails: {stats.tails}</p>
                <p>Total: {results.length}</p>
                <p>Heads Probability: {(stats.heads / results.length * 100 || 0).toFixed(1)}%</p>
                <p>Tails Probability: {(stats.tails / results.length * 100 || 0).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        );

      case 'dice-roll':
        return (
          <div className="dice-roll-game">
            <button onClick={handleDiceRoll} className="action-button">
              Roll Dice
            </button>
            <div className="results-container">
              <h3>Results</h3>
              <div className="results-list">
                {diceRolls.map((roll, index) => (
                  <span key={index} className="dice-result">
                    {roll}
                  </span>
                ))}
              </div>
              <div className="stats">
                {Object.entries(diceStats).map(([value, count]) => (
                  <p key={value}>
                    {value}: {count} ({(count / diceRolls.length * 100 || 0).toFixed(1)}%)
                  </p>
                ))}
              </div>
            </div>
          </div>
        );

      case 'card-draw':
        return (
          <div className="card-draw-game">
            <button onClick={handleCardDraw} className="action-button">
              Draw Card
            </button>
            <div className="results-container">
              <h3>Drawn Cards</h3>
              <div className="cards-list">
                {drawnCards.map((card, index) => (
                  card && (
                    <div key={index} className={`card ${card.suit === '♥' || card.suit === '♦' ? 'red' : 'black'}`}>
                      {card.value}{card.suit}
                    </div>
                  )
                ))}
              </div>
              <div className="stats">
                <p>Cards Remaining: {cards.length}</p>
                <p>Cards Drawn: {drawnCards.length}</p>
                {cards.length === 0 && (
                  <p className="deck-empty">Deck is empty! Click "Draw Card" to shuffle a new deck.</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="probability">
      <div className="game-header">
        <h1>Probability Explorer</h1>
        <p>Explore probability concepts through interactive games</p>
      </div>

      <div className="game-content">
        <div className="games-panel">
          {games.map(game => (
            <button
              key={game.id}
              className={`game-button ${selectedGame === game.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedGame(game.id);
                resetGame();
              }}
            >
              <span className="game-icon">{game.icon}</span>
              {game.name}
            </button>
          ))}
        </div>

        <div className="game-container">
          {renderGame()}
        </div>
      </div>
    </div>
  );
};

export default Probability; 