import React, { useState, useRef, useEffect } from 'react';
import './ChemicalReactionSimulator.css';

const ChemicalReactionSimulator = () => {
  const canvasRef = useRef(null);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionState, setReactionState] = useState({
    temperature: 25,
    pressure: 1,
    concentration: 1,
    catalyst: 'none',
    time: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [particles, setParticles] = useState([]);

  const reactions = [
    {
      id: 'combustion',
      name: 'Combustion',
      equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
      description: 'Methane combustion reaction',
      color: '#e74c3c',
      activationEnergy: 50
    },
    {
      id: 'neutralization',
      name: 'Neutralization',
      equation: 'HCl + NaOH → NaCl + H₂O',
      description: 'Acid-base neutralization',
      color: '#3498db',
      activationEnergy: 30
    },
    {
      id: 'decomposition',
      name: 'Decomposition',
      equation: '2H₂O₂ → 2H₂O + O₂',
      description: 'Hydrogen peroxide decomposition',
      color: '#2ecc71',
      activationEnergy: 40
    },
    {
      id: 'synthesis',
      name: 'Synthesis',
      equation: '2H₂ + O₂ → 2H₂O',
      description: 'Water synthesis',
      color: '#9b59b6',
      activationEnergy: 45
    }
  ];

  const catalysts = [
    { id: 'none', name: 'No Catalyst' },
    { id: 'platinum', name: 'Platinum', efficiency: 0.8 },
    { id: 'palladium', name: 'Palladium', efficiency: 0.6 },
    { id: 'nickel', name: 'Nickel', efficiency: 0.4 }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw background
    const drawBackground = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Draw particles
    const drawParticles = () => {
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    };

    // Draw reaction equation
    const drawEquation = () => {
      if (selectedReaction) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(selectedReaction.equation, canvas.width / 2, 50);
      }
    };

    // Clear and redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawParticles();
    drawEquation();
  }, [particles, selectedReaction]);

  const handleReactionSelect = (reaction) => {
    setSelectedReaction(reaction);
    initializeParticles(reaction);
  };

  const initializeParticles = (reaction) => {
    const newParticles = [];
    const canvas = canvasRef.current;
    
    // Create reactant particles
    const reactants = reaction.equation.split('→')[0].trim().split('+');
    reactants.forEach((reactant, index) => {
      newParticles.push({
        x: canvas.width * 0.2 + index * 100,
        y: canvas.height * 0.5,
        radius: 20,
        color: reaction.color,
        type: 'reactant',
        velocity: { x: 0, y: 0 }
      });
    });

    // Create product particles
    const products = reaction.equation.split('→')[1].trim().split('+');
    products.forEach((product, index) => {
      newParticles.push({
        x: canvas.width * 0.8 + index * 100,
        y: canvas.height * 0.5,
        radius: 20,
        color: reaction.color,
        type: 'product',
        velocity: { x: 0, y: 0 }
      });
    });

    setParticles(newParticles);
  };

  const updateParticles = () => {
    if (!isRunning) return;

    setParticles(prevParticles => {
      return prevParticles.map(particle => {
        // Update particle position based on velocity
        const newX = particle.x + particle.velocity.x;
        const newY = particle.y + particle.velocity.y;

        // Add some random movement
        const randomX = (Math.random() - 0.5) * 2;
        const randomY = (Math.random() - 0.5) * 2;

        return {
          ...particle,
          x: newX + randomX,
          y: newY + randomY,
          velocity: {
            x: particle.velocity.x + randomX * 0.1,
            y: particle.velocity.y + randomY * 0.1
          }
        };
      });
    });
  };

  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      updateParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning]);

  const startSimulation = () => {
    setIsRunning(true);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    if (selectedReaction) {
      initializeParticles(selectedReaction);
    }
  };

  return (
    <div className="chemical-simulator">
      <div className="simulator-header">
        <h1>Chemical Reaction Simulator</h1>
        <p>Visualize and understand chemical reactions</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="reaction-selection">
            <h3>Reactions</h3>
            <div className="reaction-buttons">
              {reactions.map(reaction => (
                <button
                  key={reaction.id}
                  className={`reaction-button ${selectedReaction?.id === reaction.id ? 'selected' : ''}`}
                  onClick={() => handleReactionSelect(reaction)}
                >
                  <span className="reaction-name">{reaction.name}</span>
                  <span className="reaction-equation">{reaction.equation}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="parameters">
            <h3>Parameters</h3>
            <div className="parameter-group">
              <label>Temperature (°C)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={reactionState.temperature}
                onChange={(e) => setReactionState(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
              />
              <span className="parameter-value">{reactionState.temperature}°C</span>
            </div>

            <div className="parameter-group">
              <label>Pressure (atm)</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={reactionState.pressure}
                onChange={(e) => setReactionState(prev => ({ ...prev, pressure: parseFloat(e.target.value) }))}
              />
              <span className="parameter-value">{reactionState.pressure} atm</span>
            </div>

            <div className="parameter-group">
              <label>Concentration (M)</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={reactionState.concentration}
                onChange={(e) => setReactionState(prev => ({ ...prev, concentration: parseFloat(e.target.value) }))}
              />
              <span className="parameter-value">{reactionState.concentration} M</span>
            </div>

            <div className="parameter-group">
              <label>Catalyst</label>
              <select
                value={reactionState.catalyst}
                onChange={(e) => setReactionState(prev => ({ ...prev, catalyst: e.target.value }))}
              >
                {catalysts.map(catalyst => (
                  <option key={catalyst.id} value={catalyst.id}>
                    {catalyst.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="simulation-controls">
            <button
              className={`start-button ${isRunning ? 'running' : ''}`}
              onClick={isRunning ? stopSimulation : startSimulation}
            >
              {isRunning ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <button className="reset-button" onClick={resetSimulation}>
              Reset
            </button>
          </div>
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            className="simulation-canvas"
          />
        </div>
      </div>
    </div>
  );
};

export default ChemicalReactionSimulator; 