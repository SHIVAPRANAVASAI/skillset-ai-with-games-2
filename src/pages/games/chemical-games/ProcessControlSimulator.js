import React, { useState, useRef, useEffect } from 'react';
import './ProcessControlSimulator.css';

const ProcessControlSimulator = () => {
  const canvasRef = useRef(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [controlState, setControlState] = useState({
    setpoint: 50,
    kp: 1.0,
    ki: 0.1,
    kd: 0.01,
    disturbance: 0,
    time: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [processData, setProcessData] = useState([]);
  const [maxDataPoints] = useState(100);

  const processes = [
    {
      id: 'temperature',
      name: 'Temperature Control',
      description: 'Control temperature in a reactor',
      color: '#e74c3c',
      timeConstant: 10,
      gain: 1.0
    },
    {
      id: 'level',
      name: 'Level Control',
      description: 'Control liquid level in a tank',
      color: '#3498db',
      timeConstant: 15,
      gain: 1.2
    },
    {
      id: 'flow',
      name: 'Flow Control',
      description: 'Control flow rate in a pipe',
      color: '#2ecc71',
      timeConstant: 5,
      gain: 0.8
    },
    {
      id: 'pressure',
      name: 'Pressure Control',
      description: 'Control pressure in a vessel',
      color: '#9b59b6',
      timeConstant: 8,
      gain: 1.5
    }
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

    // Draw grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Draw process data
    const drawProcessData = () => {
      if (processData.length < 2) return;

      ctx.strokeStyle = selectedProcess?.color || '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();

      processData.forEach((point, index) => {
        const x = (index / maxDataPoints) * canvas.width;
        const y = canvas.height - (point.value / 100) * canvas.height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw setpoint line
      ctx.strokeStyle = '#ffffff';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - (controlState.setpoint / 100) * canvas.height);
      ctx.lineTo(canvas.width, canvas.height - (controlState.setpoint / 100) * canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    // Clear and redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawGrid();
    drawProcessData();
  }, [processData, selectedProcess, controlState.setpoint]);

  const handleProcessSelect = (process) => {
    setSelectedProcess(process);
    setProcessData([]);
  };

  const updateProcessData = () => {
    if (!isRunning || !selectedProcess) return;

    setProcessData(prevData => {
      const newData = [...prevData];
      const lastPoint = newData[newData.length - 1] || { value: 0, time: 0 };
      
      // Calculate error
      const error = controlState.setpoint - lastPoint.value;
      
      // Calculate PID terms
      const pTerm = controlState.kp * error;
      const iTerm = controlState.ki * error * 0.1; // 0.1 is time step
      const dTerm = controlState.kd * (error - (newData[newData.length - 2]?.error || 0)) / 0.1;
      
      // Calculate control output
      const controlOutput = pTerm + iTerm + dTerm;
      
      // Calculate new process value
      const newValue = lastPoint.value + 
        (controlOutput + controlState.disturbance) * 
        selectedProcess.gain * 
        (1 - Math.exp(-0.1 / selectedProcess.timeConstant));

      // Add new data point
      newData.push({
        value: Math.max(0, Math.min(100, newValue)),
        time: lastPoint.time + 0.1,
        error: error
      });

      // Keep only last maxDataPoints
      if (newData.length > maxDataPoints) {
        newData.shift();
      }

      return newData;
    });
  };

  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      updateProcessData();
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
  }, [isRunning, selectedProcess, controlState]);

  const startSimulation = () => {
    setIsRunning(true);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setProcessData([]);
  };

  return (
    <div className="process-control-simulator">
      <div className="simulator-header">
        <h1>Process Control Simulator</h1>
        <p>Simulate and tune industrial process control systems</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="process-selection">
            <h3>Processes</h3>
            <div className="process-buttons">
              {processes.map(process => (
                <button
                  key={process.id}
                  className={`process-button ${selectedProcess?.id === process.id ? 'selected' : ''}`}
                  onClick={() => handleProcessSelect(process)}
                >
                  <span className="process-name">{process.name}</span>
                  <span className="process-description">{process.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="parameters">
            <h3>Control Parameters</h3>
            <div className="parameter-group">
              <label>Setpoint (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={controlState.setpoint}
                onChange={(e) => setControlState(prev => ({ ...prev, setpoint: parseFloat(e.target.value) }))}
              />
              <span className="parameter-value">{controlState.setpoint}%</span>
            </div>

            <div className="parameter-group">
              <label>Proportional Gain (Kp)</label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={controlState.kp}
                onChange={(e) => setControlState(prev => ({ ...prev, kp: parseFloat(e.target.value) }))}
              />
              <span className="parameter-value">{controlState.kp}</span>
            </div>

            <div className="parameter-group">
              <label>Integral Gain (Ki)</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={controlState.ki}
                onChange={(e) => setControlState(prev => ({ ...prev, ki: parseFloat(e.target.value) }))}
              />
              <span className="parameter-value">{controlState.ki}</span>
            </div>

            <div className="parameter-group">
              <label>Derivative Gain (Kd)</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={controlState.kd}
                onChange={(e) => setControlState(prev => ({ ...prev, kd: parseFloat(e.target.value) }))}
              />
              <span className="parameter-value">{controlState.kd}</span>
            </div>

            <div className="parameter-group">
              <label>Disturbance</label>
              <input
                type="range"
                min="-10"
                max="10"
                step="0.1"
                value={controlState.disturbance}
                onChange={(e) => setControlState(prev => ({ ...prev, disturbance: parseFloat(e.target.value) }))}
              />
              <span className="parameter-value">{controlState.disturbance}</span>
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

export default ProcessControlSimulator; 