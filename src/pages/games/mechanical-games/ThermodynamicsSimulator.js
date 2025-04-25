import React, { useState, useRef, useEffect } from 'react';
import './ThermodynamicsSimulator.css';

const ThermodynamicsSimulator = () => {
  const canvasRef = useRef(null);
  const [simulationType, setSimulationType] = useState('heat-transfer');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [parameters, setParameters] = useState({
    initialTemp: 25,
    finalTemp: 100,
    mass: 1,
    specificHeat: 4.18,
    heatTransferCoeff: 0.1,
    pressure: 101.325,
    volume: 1,
    temperature: 273,
    moles: 1
  });

  const simulationTypes = [
    { id: 'heat-transfer', name: 'Heat Transfer', description: 'Simulate heat transfer between objects' },
    { id: 'phase-change', name: 'Phase Change', description: 'Observe phase transitions of water' },
    { id: 'ideal-gas', name: 'Ideal Gas', description: 'Explore ideal gas behavior' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let startTime;

    const drawHeatTransfer = (t) => {
      const { initialTemp, finalTemp, heatTransferCoeff } = parameters;
      const currentTemp = initialTemp + (finalTemp - initialTemp) * (1 - Math.exp(-heatTransferCoeff * t));
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw temperature scale
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.lineTo(50, canvas.height - 50);
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();

      // Draw temperature markers
      for (let temp = 0; temp <= 100; temp += 20) {
        const y = canvas.height - 50 - (temp / 100) * (canvas.height - 100);
        ctx.fillText(`${temp}°C`, 30, y);
        ctx.beginPath();
        ctx.moveTo(45, y);
        ctx.lineTo(50, y);
        ctx.stroke();
      }

      // Draw current temperature
      const currentY = canvas.height - 50 - (currentTemp / 100) * (canvas.height - 100);
      ctx.beginPath();
      ctx.arc(100, currentY, 20, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${200 - currentTemp * 2}, 70%, 50%)`;
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.fillText(`${currentTemp.toFixed(1)}°C`, 80, currentY + 5);
    };

    const drawPhaseChange = (t) => {
      const { initialTemp, finalTemp } = parameters;
      const currentTemp = initialTemp + (finalTemp - initialTemp) * (t / 10);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw phase diagram
      ctx.beginPath();
      ctx.moveTo(50, canvas.height - 50);
      ctx.lineTo(canvas.width - 50, canvas.height - 50);
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();

      // Draw phase regions
      ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
      ctx.fillRect(50, 50, (canvas.width - 100) * 0.3, canvas.height - 100);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(50 + (canvas.width - 100) * 0.3, 50, (canvas.width - 100) * 0.7, canvas.height - 100);

      // Draw current state
      const x = 50 + (currentTemp / 100) * (canvas.width - 100);
      ctx.beginPath();
      ctx.arc(x, canvas.height - 50, 10, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${200 - currentTemp * 2}, 70%, 50%)`;
      ctx.fill();
    };

    const drawIdealGas = (t) => {
      const { pressure, volume, temperature, moles } = parameters;
      const R = 8.314; // Universal gas constant
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw container
      ctx.strokeStyle = '#e0e0e0';
      ctx.strokeRect(100, 100, volume * 100, 200);
      
      // Draw particles
      const numParticles = Math.floor(moles * 6.022e23 / 1e23); // Scaled down for visualization
      for (let i = 0; i < numParticles; i++) {
        const x = 100 + Math.random() * volume * 100;
        const y = 100 + Math.random() * 200;
        const speed = Math.sqrt(temperature / 273) * 2;
        const dx = (Math.random() - 0.5) * speed;
        const dy = (Math.random() - 0.5) * speed;
        
        ctx.beginPath();
        ctx.arc(x + dx * t, y + dy * t, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#3498db';
        ctx.fill();
      }
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      setTime(elapsed);

      switch (simulationType) {
        case 'heat-transfer':
          drawHeatTransfer(elapsed);
          break;
        case 'phase-change':
          drawPhaseChange(elapsed);
          break;
        case 'ideal-gas':
          drawIdealGas(elapsed);
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
    <div className="thermodynamics-simulator">
      <div className="simulator-header">
        <h1>Thermodynamics Simulator</h1>
        <p>Explore heat transfer, phase changes, and ideal gas behavior</p>
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
            {simulationType === 'heat-transfer' && (
              <>
                <div className="parameter">
                  <label>Initial Temperature (°C)</label>
                  <input
                    type="number"
                    value={parameters.initialTemp}
                    onChange={(e) => handleParameterChange('initialTemp', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Final Temperature (°C)</label>
                  <input
                    type="number"
                    value={parameters.finalTemp}
                    onChange={(e) => handleParameterChange('finalTemp', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Heat Transfer Coefficient</label>
                  <input
                    type="number"
                    value={parameters.heatTransferCoeff}
                    onChange={(e) => handleParameterChange('heatTransferCoeff', e.target.value)}
                  />
                </div>
              </>
            )}
            {simulationType === 'phase-change' && (
              <>
                <div className="parameter">
                  <label>Initial Temperature (°C)</label>
                  <input
                    type="number"
                    value={parameters.initialTemp}
                    onChange={(e) => handleParameterChange('initialTemp', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Final Temperature (°C)</label>
                  <input
                    type="number"
                    value={parameters.finalTemp}
                    onChange={(e) => handleParameterChange('finalTemp', e.target.value)}
                  />
                </div>
              </>
            )}
            {simulationType === 'ideal-gas' && (
              <>
                <div className="parameter">
                  <label>Pressure (kPa)</label>
                  <input
                    type="number"
                    value={parameters.pressure}
                    onChange={(e) => handleParameterChange('pressure', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Volume (m³)</label>
                  <input
                    type="number"
                    value={parameters.volume}
                    onChange={(e) => handleParameterChange('volume', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Temperature (K)</label>
                  <input
                    type="number"
                    value={parameters.temperature}
                    onChange={(e) => handleParameterChange('temperature', e.target.value)}
                  />
                </div>
                <div className="parameter">
                  <label>Moles of Gas</label>
                  <input
                    type="number"
                    value={parameters.moles}
                    onChange={(e) => handleParameterChange('moles', e.target.value)}
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

export default ThermodynamicsSimulator; 