import React, { useState, useRef, useEffect } from 'react';
import './BridgeBuilder.css';

const BridgeBuilder = () => {
  const canvasRef = useRef(null);
  const [selectedBridgeType, setSelectedBridgeType] = useState('beam');
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState({
    span: 20,
    height: 5,
    width: 3,
    material: 'steel',
    load: 10,
    supports: 2
  });

  const bridgeTypes = [
    {
      id: 'beam',
      name: 'Beam Bridge',
      description: 'Simple beam bridge design',
      color: '#4D61FC'
    },
    {
      id: 'arch',
      name: 'Arch Bridge',
      description: 'Classic arch bridge design',
      color: '#00D4FF'
    },
    {
      id: 'truss',
      name: 'Truss Bridge',
      description: 'Truss-based bridge design',
      color: '#FF6B9C'
    },
    {
      id: 'suspension',
      name: 'Suspension Bridge',
      description: 'Suspension bridge design',
      color: '#22C55E'
    }
  ];

  const drawBeamBridge = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bridge
    const bridgeLength = canvas.width * 0.8;
    const bridgeHeight = 20;
    const startX = (canvas.width - bridgeLength) / 2;
    const startY = canvas.height / 2;

    // Draw supports
    for (let i = 0; i < parameters.supports; i++) {
      const supportX = startX + (bridgeLength / (parameters.supports - 1)) * i;
      ctx.fillStyle = '#666';
      ctx.fillRect(supportX - 10, startY, 20, 40);
    }

    // Draw bridge deck
    ctx.fillStyle = '#4D61FC';
    ctx.fillRect(startX, startY, bridgeLength, bridgeHeight);

    // Draw load
    ctx.fillStyle = '#FF6B9C';
    ctx.beginPath();
    ctx.moveTo(startX + bridgeLength / 2, startY - 20);
    ctx.lineTo(startX + bridgeLength / 2, startY);
    ctx.strokeStyle = '#FF6B9C';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw load arrow
    ctx.beginPath();
    ctx.moveTo(startX + bridgeLength / 2 - 10, startY - 20);
    ctx.lineTo(startX + bridgeLength / 2, startY - 30);
    ctx.lineTo(startX + bridgeLength / 2 + 10, startY - 20);
    ctx.fillStyle = '#FF6B9C';
    ctx.fill();
  };

  const drawArchBridge = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bridge
    const bridgeLength = canvas.width * 0.8;
    const bridgeHeight = canvas.height * 0.3;
    const startX = (canvas.width - bridgeLength) / 2;
    const startY = canvas.height / 2;

    // Draw arch
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(
      startX + bridgeLength / 2,
      startY - bridgeHeight,
      startX + bridgeLength,
      startY
    );
    ctx.strokeStyle = '#4D61FC';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw supports
    ctx.fillStyle = '#666';
    ctx.fillRect(startX - 10, startY, 20, 40);
    ctx.fillRect(startX + bridgeLength - 10, startY, 20, 40);

    // Draw vertical members
    for (let i = 0; i < 5; i++) {
      const x = startX + (bridgeLength / 4) * i;
      const y = startY - bridgeHeight * (1 - Math.pow((x - startX - bridgeLength/2) / (bridgeLength/2), 2));
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, startY);
      ctx.stroke();
    }
  };

  const drawTrussBridge = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bridge
    const bridgeLength = canvas.width * 0.8;
    const bridgeHeight = canvas.height * 0.2;
    const startX = (canvas.width - bridgeLength) / 2;
    const startY = canvas.height / 2;

    // Draw top chord
    ctx.beginPath();
    ctx.moveTo(startX, startY - bridgeHeight);
    ctx.lineTo(startX + bridgeLength, startY - bridgeHeight);
    ctx.strokeStyle = '#4D61FC';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw bottom chord
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + bridgeLength, startY);
    ctx.stroke();

    // Draw vertical members
    for (let i = 0; i < 5; i++) {
      const x = startX + (bridgeLength / 4) * i;
      ctx.beginPath();
      ctx.moveTo(x, startY - bridgeHeight);
      ctx.lineTo(x, startY);
      ctx.stroke();
    }

    // Draw diagonal members
    for (let i = 0; i < 4; i++) {
      const x1 = startX + (bridgeLength / 4) * i;
      const x2 = startX + (bridgeLength / 4) * (i + 1);
      ctx.beginPath();
      ctx.moveTo(x1, startY - bridgeHeight);
      ctx.lineTo(x2, startY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x1, startY);
      ctx.lineTo(x2, startY - bridgeHeight);
      ctx.stroke();
    }
  };

  const drawSuspensionBridge = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bridge
    const bridgeLength = canvas.width * 0.8;
    const bridgeHeight = canvas.height * 0.3;
    const startX = (canvas.width - bridgeLength) / 2;
    const startY = canvas.height / 2;

    // Draw towers
    ctx.fillStyle = '#666';
    ctx.fillRect(startX + bridgeLength * 0.25 - 10, startY - bridgeHeight, 20, bridgeHeight);
    ctx.fillRect(startX + bridgeLength * 0.75 - 10, startY - bridgeHeight, 20, bridgeHeight);

    // Draw main cables
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(
      startX + bridgeLength * 0.25,
      startY - bridgeHeight * 0.8,
      startX + bridgeLength * 0.5,
      startY - bridgeHeight * 0.5
    );
    ctx.quadraticCurveTo(
      startX + bridgeLength * 0.75,
      startY - bridgeHeight * 0.8,
      startX + bridgeLength,
      startY
    );
    ctx.strokeStyle = '#4D61FC';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw deck
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + bridgeLength, startY);
    ctx.stroke();

    // Draw suspenders
    for (let i = 0; i < 10; i++) {
      const x = startX + (bridgeLength / 9) * i;
      const y = startY - bridgeHeight * (0.5 + 0.3 * Math.sin((x - startX) / bridgeLength * Math.PI));
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, startY);
      ctx.stroke();
    }
  };

  // Initialize canvas and handle window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      // Redraw the bridge after resize
      switch (selectedBridgeType) {
        case 'beam':
          drawBeamBridge(ctx, canvas);
          break;
        case 'arch':
          drawArchBridge(ctx, canvas);
          break;
        case 'truss':
          drawTrussBridge(ctx, canvas);
          break;
        case 'suspension':
          drawSuspensionBridge(ctx, canvas);
          break;
        default:
          drawBeamBridge(ctx, canvas);
      }
    };

    // Initial setup
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [selectedBridgeType, parameters]);

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  return (
    <div className="bridge-builder">
      <div className="simulator-header">
        <h1>Bridge Builder</h1>
        <p>Design and test different types of bridges</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="bridge-selection">
            <h3>Bridge Type</h3>
            <div className="bridge-buttons">
              {bridgeTypes.map(bridge => (
                <button
                  key={bridge.id}
                  className={`bridge-button ${selectedBridgeType === bridge.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBridgeType(bridge.id)}
                >
                  <span className="bridge-name">{bridge.name}</span>
                  <span className="bridge-description">{bridge.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="parameters">
            <h3>Parameters</h3>
            <div className="parameter-group">
              <label>Span (m)</label>
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={parameters.span}
                onChange={(e) => handleParameterChange('span', parseFloat(e.target.value))}
              />
              <span className="parameter-value">{parameters.span} m</span>
            </div>
            <div className="parameter-group">
              <label>Height (m)</label>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={parameters.height}
                onChange={(e) => handleParameterChange('height', parseFloat(e.target.value))}
              />
              <span className="parameter-value">{parameters.height} m</span>
            </div>
            <div className="parameter-group">
              <label>Load (kN)</label>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={parameters.load}
                onChange={(e) => handleParameterChange('load', parseFloat(e.target.value))}
              />
              <span className="parameter-value">{parameters.load} kN</span>
            </div>
            {selectedBridgeType === 'beam' && (
              <div className="parameter-group">
                <label>Number of Supports</label>
                <input
                  type="range"
                  min="2"
                  max="5"
                  step="1"
                  value={parameters.supports}
                  onChange={(e) => handleParameterChange('supports', parseInt(e.target.value))}
                />
                <span className="parameter-value">{parameters.supports}</span>
              </div>
            )}
          </div>

          <div className="simulation-controls">
            <button
              className={`start-button ${isRunning ? 'running' : ''}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Stop Test' : 'Start Test'}
            </button>
            <button className="reset-button" onClick={() => setParameters({
              span: 20,
              height: 5,
              width: 3,
              material: 'steel',
              load: 10,
              supports: 2
            })}>
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

export default BridgeBuilder; 