import React, { useState, useRef, useEffect } from 'react';
import './StructuralAnalysis.css';

const StructuralAnalysis = () => {
  const canvasRef = useRef(null);
  const [selectedStructure, setSelectedStructure] = useState('beam');
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState({
    length: 5,
    load: 10,
    supportType: 'fixed',
    material: 'steel',
    crossSection: 'rectangular'
  });

  const structures = [
    {
      id: 'beam',
      name: 'Beam Analysis',
      description: 'Analyze beam deflection and stress',
      color: '#4D61FC'
    },
    {
      id: 'truss',
      name: 'Truss Analysis',
      description: 'Calculate forces in truss members',
      color: '#00D4FF'
    },
    {
      id: 'frame',
      name: 'Frame Analysis',
      description: 'Analyze rigid frame structures',
      color: '#FF6B9C'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drawBeam = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw beam
      const beamLength = canvas.width * 0.8;
      const beamHeight = 20;
      const startX = (canvas.width - beamLength) / 2;
      const startY = canvas.height / 2;

      // Draw supports
      if (parameters.supportType === 'fixed') {
        // Fixed support at left end
        ctx.fillStyle = '#666';
        ctx.fillRect(startX - 20, startY, 20, 40);
      } else {
        // Pinned support at left end
        ctx.beginPath();
        ctx.arc(startX, startY + 20, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#666';
        ctx.fill();
      }

      // Draw beam
      ctx.fillStyle = '#4D61FC';
      ctx.fillRect(startX, startY, beamLength, beamHeight);

      // Draw load
      ctx.fillStyle = '#FF6B9C';
      ctx.beginPath();
      ctx.moveTo(startX + beamLength / 2, startY - 20);
      ctx.lineTo(startX + beamLength / 2, startY);
      ctx.strokeStyle = '#FF6B9C';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw load arrow
      ctx.beginPath();
      ctx.moveTo(startX + beamLength / 2 - 10, startY - 20);
      ctx.lineTo(startX + beamLength / 2, startY - 30);
      ctx.lineTo(startX + beamLength / 2 + 10, startY - 20);
      ctx.fillStyle = '#FF6B9C';
      ctx.fill();
    };

    const drawTruss = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw truss
      const trussWidth = canvas.width * 0.8;
      const trussHeight = canvas.height * 0.4;
      const startX = (canvas.width - trussWidth) / 2;
      const startY = (canvas.height - trussHeight) / 2;

      // Draw bottom chord
      ctx.beginPath();
      ctx.moveTo(startX, startY + trussHeight);
      ctx.lineTo(startX + trussWidth, startY + trussHeight);
      ctx.strokeStyle = '#4D61FC';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw top chord
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + trussWidth, startY);
      ctx.stroke();

      // Draw vertical members
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX, startY + trussHeight);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(startX + trussWidth, startY);
      ctx.lineTo(startX + trussWidth, startY + trussHeight);
      ctx.stroke();

      // Draw diagonal members
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + trussWidth, startY + trussHeight);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(startX + trussWidth, startY);
      ctx.lineTo(startX, startY + trussHeight);
      ctx.stroke();
    };

    const drawFrame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw frame
      const frameWidth = canvas.width * 0.6;
      const frameHeight = canvas.height * 0.6;
      const startX = (canvas.width - frameWidth) / 2;
      const startY = (canvas.height - frameHeight) / 2;

      // Draw columns
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX, startY + frameHeight);
      ctx.strokeStyle = '#4D61FC';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(startX + frameWidth, startY);
      ctx.lineTo(startX + frameWidth, startY + frameHeight);
      ctx.stroke();

      // Draw beams
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + frameWidth, startY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(startX, startY + frameHeight);
      ctx.lineTo(startX + frameWidth, startY + frameHeight);
      ctx.stroke();
    };

    // Draw selected structure
    switch (selectedStructure) {
      case 'beam':
        drawBeam();
        break;
      case 'truss':
        drawTruss();
        break;
      case 'frame':
        drawFrame();
        break;
      default:
        drawBeam();
    }
  }, [selectedStructure, parameters]);

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  return (
    <div className="structural-analysis">
      <div className="simulator-header">
        <h1>Structural Analysis Simulator</h1>
        <p>Analyze and visualize structural behavior under different loads</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="structure-selection">
            <h3>Structure Type</h3>
            <div className="structure-buttons">
              {structures.map(structure => (
                <button
                  key={structure.id}
                  className={`structure-button ${selectedStructure === structure.id ? 'selected' : ''}`}
                  onClick={() => setSelectedStructure(structure.id)}
                >
                  <span className="structure-name">{structure.name}</span>
                  <span className="structure-description">{structure.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="parameters">
            <h3>Parameters</h3>
            {selectedStructure === 'beam' && (
              <>
                <div className="parameter-group">
                  <label>Length (m)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={parameters.length}
                    onChange={(e) => handleParameterChange('length', parseFloat(e.target.value))}
                  />
                  <span className="parameter-value">{parameters.length} m</span>
                </div>
                <div className="parameter-group">
                  <label>Load (kN)</label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={parameters.load}
                    onChange={(e) => handleParameterChange('load', parseFloat(e.target.value))}
                  />
                  <span className="parameter-value">{parameters.load} kN</span>
                </div>
                <div className="parameter-group">
                  <label>Support Type</label>
                  <select
                    value={parameters.supportType}
                    onChange={(e) => handleParameterChange('supportType', e.target.value)}
                  >
                    <option value="fixed">Fixed</option>
                    <option value="pinned">Pinned</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="simulation-controls">
            <button
              className={`start-button ${isRunning ? 'running' : ''}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Stop Analysis' : 'Start Analysis'}
            </button>
            <button className="reset-button" onClick={() => setParameters({
              length: 5,
              load: 10,
              supportType: 'fixed',
              material: 'steel',
              crossSection: 'rectangular'
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

export default StructuralAnalysis; 