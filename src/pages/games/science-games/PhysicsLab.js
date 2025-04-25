import React, { useState, useRef, useEffect } from 'react';
import './PhysicsLab.css';

const PhysicsLab = () => {
  const canvasRef = useRef(null);
  const [selectedExperiment, setSelectedExperiment] = useState('pendulum');
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState({
    pendulum: {
      length: 100,
      mass: 1,
      angle: 30,
      gravity: 9.81,
      damping: 0.1
    },
    projectile: {
      initialVelocity: 20,
      angle: 45,
      height: 0,
      gravity: 9.81,
      airResistance: 0.1
    },
    springs: {
      springConstant: 10,
      mass: 1,
      amplitude: 50,
      damping: 0.1
    },
    collision: {
      mass1: 1,
      mass2: 1,
      velocity1: 5,
      velocity2: -5,
      elasticity: 1
    }
  });

  const experiments = [
    {
      id: 'pendulum',
      name: 'Simple Pendulum',
      description: 'Study harmonic motion with a simple pendulum',
      color: '#4D61FC'
    },
    {
      id: 'projectile',
      name: 'Projectile Motion',
      description: 'Analyze the path of projectiles under gravity',
      color: '#FF6B9C'
    },
    {
      id: 'springs',
      name: 'Spring Oscillations',
      description: 'Explore Hooke\'s law and spring motion',
      color: '#22C55E'
    },
    {
      id: 'collision',
      name: 'Elastic Collisions',
      description: 'Study conservation of momentum and energy',
      color: '#00D4FF'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const drawPendulum = (t) => {
      const { length, angle, mass, gravity, damping } = parameters.pendulum;
      const omega = Math.sqrt(gravity / length);
      const currentAngle = angle * Math.PI / 180 * Math.cos(omega * t) * Math.exp(-damping * t);
      
      const x = length * Math.sin(currentAngle) + canvas.width / 2;
      const y = length * Math.cos(currentAngle) + 50;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw pivot point
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 50, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#4D61FC';
      ctx.fill();
      
      // Draw string
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 50);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#666';
      ctx.stroke();
      
      // Draw bob
      ctx.beginPath();
      ctx.arc(x, y, 20 * Math.sqrt(mass), 0, 2 * Math.PI);
      ctx.fillStyle = '#4D61FC';
      ctx.fill();
    };

    const drawProjectile = (t) => {
      const { initialVelocity, angle, height, gravity, airResistance } = parameters.projectile;
      const theta = angle * Math.PI / 180;
      
      const x = initialVelocity * Math.cos(theta) * t;
      const y = height + initialVelocity * Math.sin(theta) * t - 0.5 * gravity * t * t;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw ground
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 50);
      ctx.lineTo(canvas.width, canvas.height - 50);
      ctx.strokeStyle = '#666';
      ctx.stroke();
      
      // Draw projectile
      if (y >= 0) {
        ctx.beginPath();
        ctx.arc(50 + x, canvas.height - 50 - y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF6B9C';
        ctx.fill();
      }
    };

    const drawSprings = (t) => {
      const { springConstant, mass, amplitude, damping } = parameters.springs;
      const omega = Math.sqrt(springConstant / mass);
      const x = amplitude * Math.cos(omega * t) * Math.exp(-damping * t);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw fixed point
      ctx.beginPath();
      ctx.rect(50, canvas.height / 2 - 20, 10, 40);
      ctx.fillStyle = '#666';
      ctx.fill();
      
      // Draw spring (simplified)
      ctx.beginPath();
      ctx.moveTo(60, canvas.height / 2);
      for (let i = 0; i < 20; i++) {
        const xx = 60 + (x + 100) * (i / 20);
        const yy = canvas.height / 2 + (i % 2 === 0 ? 10 : -10);
        ctx.lineTo(xx, yy);
      }
      ctx.lineTo(60 + x + 100, canvas.height / 2);
      ctx.strokeStyle = '#22C55E';
      ctx.stroke();
      
      // Draw mass
      ctx.beginPath();
      ctx.rect(60 + x + 100, canvas.height / 2 - 20, 40, 40);
      ctx.fillStyle = '#22C55E';
      ctx.fill();
    };

    const drawCollision = (t) => {
      const { mass1, mass2, velocity1, velocity2, elasticity } = parameters.collision;
      const x1 = canvas.width / 2 - 100 + velocity1 * t;
      const x2 = canvas.width / 2 + 100 + velocity2 * t;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw masses
      ctx.beginPath();
      ctx.arc(x1, canvas.height / 2, 20 * Math.sqrt(mass1), 0, 2 * Math.PI);
      ctx.fillStyle = '#00D4FF';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x2, canvas.height / 2, 20 * Math.sqrt(mass2), 0, 2 * Math.PI);
      ctx.fillStyle = '#4D61FC';
      ctx.fill();
    };

    const animate = () => {
      if (!isRunning) return;
      
      switch (selectedExperiment) {
        case 'pendulum':
          drawPendulum(time);
          break;
        case 'projectile':
          drawProjectile(time);
          break;
        case 'springs':
          drawSprings(time);
          break;
        case 'collision':
          drawCollision(time);
          break;
        default:
          break;
      }
      
      time += 0.016; // Approximately 60 FPS
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedExperiment, isRunning, parameters]);

  const handleParameterChange = (experiment, parameter, value) => {
    setParameters(prev => ({
      ...prev,
      [experiment]: {
        ...prev[experiment],
        [parameter]: parseFloat(value)
      }
    }));
  };

  const renderParameters = () => {
    const currentParams = parameters[selectedExperiment];
    return Object.entries(currentParams).map(([key, value]) => (
      <div key={key} className="parameter-control">
        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
        <input
          type="range"
          id={key}
          min={0}
          max={key.includes('angle') ? 90 : key.includes('elasticity') ? 1 : 100}
          step={key.includes('elasticity') ? 0.1 : 1}
          value={value}
          onChange={(e) => handleParameterChange(selectedExperiment, key, e.target.value)}
        />
        <span>{value}</span>
      </div>
    ));
  };

  return (
    <div className="physics-lab">
      <div className="lab-header">
        <h1>Physics Lab</h1>
        <p>Interactive physics experiments and simulations</p>
      </div>

      <div className="lab-content">
        <div className="experiments-panel">
          <h3>Experiments</h3>
          <div className="experiment-buttons">
            {experiments.map(experiment => (
              <button
                key={experiment.id}
                className={`experiment-button ${selectedExperiment === experiment.id ? 'selected' : ''}`}
                onClick={() => setSelectedExperiment(experiment.id)}
                style={{ '--experiment-color': experiment.color }}
              >
                <span className="experiment-name">{experiment.name}</span>
                <span className="experiment-description">{experiment.description}</span>
              </button>
            ))}
          </div>

          <div className="parameters-panel">
            <h3>Parameters</h3>
            {renderParameters()}
          </div>

          <div className="control-buttons">
            <button
              className={`control-button ${isRunning ? 'stop' : 'start'}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Stop' : 'Start'} Experiment
            </button>
            <button
              className="control-button reset"
              onClick={() => {
                setIsRunning(false);
                setParameters(prev => ({...prev}));
              }}
            >
              Reset Parameters
            </button>
          </div>
        </div>

        <div className="simulation-area">
          <canvas ref={canvasRef} className="simulation-canvas" />
        </div>
      </div>
    </div>
  );
};

export default PhysicsLab; 