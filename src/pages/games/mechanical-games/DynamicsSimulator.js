import React, { useState, useRef, useEffect } from 'react';
import './DynamicsSimulator.css';

const DynamicsSimulator = () => {
  const canvasRef = useRef(null);
  const [simulationType, setSimulationType] = useState('projectile');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [parameters, setParameters] = useState({
    initialVelocity: 20,
    angle: 45,
    mass: 1,
    gravity: 9.81,
    radius: 50,
    angularVelocity: 2,
    springConstant: 10,
    amplitude: 100
  });

  const simulationTypes = [
    { id: 'projectile', name: 'Projectile Motion', description: 'Simulate the motion of a projectile under gravity' },
    { id: 'circular', name: 'Circular Motion', description: 'Simulate uniform circular motion' },
    { id: 'harmonic', name: 'Simple Harmonic Motion', description: 'Simulate a mass-spring system' }
  ];

  // Initialize canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let startTime;

    const drawProjectile = (t) => {
      const { initialVelocity, angle, gravity } = parameters;
      const angleRad = (angle * Math.PI) / 180;
      const vx = initialVelocity * Math.cos(angleRad);
      const vy = initialVelocity * Math.sin(angleRad);
      
      const x = vx * t;
      const y = canvas.height - (vy * t - 0.5 * gravity * t * t);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#3498db';
      ctx.fill();
    };

    const drawCircular = (t) => {
      const { radius, angularVelocity } = parameters;
      const x = canvas.width / 2 + radius * Math.cos(angularVelocity * t);
      const y = canvas.height / 2 + radius * Math.sin(angularVelocity * t);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#3498db';
      ctx.fill();
    };

    const drawHarmonic = (t) => {
      const { springConstant, amplitude, mass } = parameters;
      const omega = Math.sqrt(springConstant / mass);
      const x = canvas.width / 2 + amplitude * Math.cos(omega * t);
      const y = canvas.height / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#3498db';
      ctx.fill();
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      setTime(elapsed);

      switch (simulationType) {
        case 'projectile':
          drawProjectile(elapsed);
          break;
        case 'circular':
          drawCircular(elapsed);
          break;
        case 'harmonic':
          drawHarmonic(elapsed);
          break;
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (isRunning) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRunning, simulationType, parameters]);

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: parseFloat(value)
    }));
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="dynamics-simulator">
      <div className="simulator-header">
        <h1>Dynamics Simulator</h1>
        <p>Explore different types of motion in mechanical systems</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="simulation-type">
            <h3>Simulation Type</h3>
            <div className="type-buttons">
              {simulationTypes.map(type => (
                <button
                  key={type.id}
                  className={`type-button ${simulationType === type.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSimulationType(type.id);
                    setIsRunning(false);
                    setTime(0);
                  }}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          <div className="parameters">
            <h3>Parameters</h3>
            {simulationType === 'projectile' && (
              <>
                <div className="parameter">
                  <label>Initial Velocity (m/s)</label>
                  <input
                    type="number"
                    value={parameters.initialVelocity}
                    onChange={(e) => handleParameterChange('initialVelocity', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Angle (degrees)</label>
                  <input
                    type="number"
                    value={parameters.angle}
                    onChange={(e) => handleParameterChange('angle', e.target.value)}
                  />
                </div>
              </>
            )}
            {simulationType === 'circular' && (
              <>
                <div className="parameter">
                  <label>Radius (m)</label>
                  <input
                    type="number"
                    value={parameters.radius}
                    onChange={(e) => handleParameterChange('radius', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Angular Velocity (rad/s)</label>
                  <input
                    type="number"
                    value={parameters.angularVelocity}
                    onChange={(e) => handleParameterChange('angularVelocity', e.target.value)}
                  />
                </div>
              </>
            )}
            {simulationType === 'harmonic' && (
              <>
                <div className="parameter">
                  <label>Spring Constant (N/m)</label>
                  <input
                    type="number"
                    value={parameters.springConstant}
                    onChange={(e) => handleParameterChange('springConstant', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Amplitude (m)</label>
                  <input
                    type="number"
                    value={parameters.amplitude}
                    onChange={(e) => handleParameterChange('amplitude', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Mass (kg)</label>
                  <input
                    type="number"
                    value={parameters.mass}
                    onChange={(e) => handleParameterChange('mass', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="simulation-controls">
            <button
              className={`start-button ${isRunning ? 'running' : ''}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button className="reset-button" onClick={resetSimulation}>
              Reset
            </button>
          </div>

          <div className="simulation-info">
            <p>Time: {time.toFixed(2)} s</p>
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

export default DynamicsSimulator; 