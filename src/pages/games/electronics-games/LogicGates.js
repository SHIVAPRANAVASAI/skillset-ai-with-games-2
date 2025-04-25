import React, { useState, useRef, useEffect } from 'react';
import './LogicGates.css';

const LogicGates = () => {
  const [gates, setGates] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedGate, setSelectedGate] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [inputs, setInputs] = useState({});
  const canvasRef = useRef(null);

  const gateTypes = [
    { id: 'and', name: 'AND Gate', symbol: '&', truthTable: [[0,0,0], [0,1,0], [1,0,0], [1,1,1]] },
    { id: 'or', name: 'OR Gate', symbol: '≥1', truthTable: [[0,0,0], [0,1,1], [1,0,1], [1,1,1]] },
    { id: 'not', name: 'NOT Gate', symbol: '1', truthTable: [[0,1], [1,0]] },
    { id: 'nand', name: 'NAND Gate', symbol: '&', truthTable: [[0,0,1], [0,1,1], [1,0,1], [1,1,0]] },
    { id: 'nor', name: 'NOR Gate', symbol: '≥1', truthTable: [[0,0,1], [0,1,0], [1,0,0], [1,1,0]] },
    { id: 'xor', name: 'XOR Gate', symbol: '=1', truthTable: [[0,0,0], [0,1,1], [1,0,1], [1,1,0]] },
    { id: 'input', name: 'Input', symbol: 'IN', truthTable: null },
    { id: 'output', name: 'Output', symbol: 'OUT', truthTable: null }
  ];

  const drawGate = (ctx, gate) => {
    const width = 60;
    const height = 40;
    const x = gate.x - width/2;
    const y = gate.y - height/2;

    // Draw gate body
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw gate symbol
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const symbol = gateTypes.find(g => g.id === gate.type)?.symbol || '?';
    ctx.fillText(symbol, gate.x, gate.y);

    // Draw input/output points
    const gateType = gateTypes.find(g => g.id === gate.type);
    if (gateType) {
      if (gateType.id === 'input' || gateType.id === 'output') {
        // Single connection point
        ctx.beginPath();
        ctx.arc(gate.x + (gateType.id === 'input' ? -width/2 : width/2), gate.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = inputs[gate.id] ? '#2ecc71' : '#e74c3c';
        ctx.fill();
      } else {
        // Multiple connection points
        // Inputs
        ctx.beginPath();
        ctx.arc(gate.x - width/2, gate.y - 10, 5, 0, Math.PI * 2);
        ctx.arc(gate.x - width/2, gate.y + 10, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#2ecc71';
        ctx.fill();
        // Output
        ctx.beginPath();
        ctx.arc(gate.x + width/2, gate.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
      }
    }
  };

  const drawConnection = (ctx, start, end) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    connections.forEach(connection => {
      const startGate = gates.find(g => g.id === connection.start);
      const endGate = gates.find(g => g.id === connection.end);
      if (startGate && endGate) {
        drawConnection(ctx, startGate, endGate);
      }
    });

    // Draw gates
    gates.forEach(gate => {
      drawGate(ctx, gate);
    });

    // Draw temporary connection if drawing
    if (isDrawing && startPoint) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = startPoint.x;
      const mouseY = startPoint.y;
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(mouseX, mouseY);
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [gates, connections, isDrawing, startPoint, inputs]);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedGate) {
      const newGate = {
        id: Date.now(),
        type: selectedGate,
        x,
        y
      };
      setGates([...gates, newGate]);
      if (selectedGate === 'input') {
        setInputs({ ...inputs, [newGate.id]: false });
      }
      setSelectedGate(null);
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedGate = gates.find(gate => {
      const width = 60;
      const height = 40;
      return x >= gate.x - width/2 && x <= gate.x + width/2 &&
             y >= gate.y - height/2 && y <= gate.y + height/2;
    });

    if (clickedGate) {
      setIsDrawing(true);
      setStartPoint(clickedGate);
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const endGate = gates.find(gate => {
      const width = 60;
      const height = 40;
      return x >= gate.x - width/2 && x <= gate.x + width/2 &&
             y >= gate.y - height/2 && y <= gate.y + height/2 &&
             gate !== startPoint;
    });

    if (endGate) {
      const newConnection = {
        id: Date.now(),
        start: startPoint.id,
        end: endGate.id
      };
      setConnections([...connections, newConnection]);
    }

    setIsDrawing(false);
    setStartPoint(null);
  };

  const toggleInput = (gateId) => {
    setInputs({
      ...inputs,
      [gateId]: !inputs[gateId]
    });
  };

  const clearCircuit = () => {
    setGates([]);
    setConnections([]);
    setInputs({});
  };

  return (
    <div className="logic-gates">
      <div className="simulator-header">
        <h1>Logic Gates Simulator</h1>
        <p>Build and simulate digital logic circuits</p>
      </div>

      <div className="simulator-content">
        <div className="gates-panel">
          <h3>Logic Gates</h3>
          <div className="gate-list">
            {gateTypes.map(gate => (
              <button
                key={gate.id}
                className={`gate-button ${selectedGate === gate.id ? 'selected' : ''}`}
                onClick={() => setSelectedGate(gate.id)}
              >
                <span className="gate-symbol">{gate.symbol}</span>
                {gate.name}
              </button>
            ))}
          </div>
          <div className="controls">
            <button className="clear-button" onClick={clearCircuit}>
              Clear Circuit
            </button>
          </div>
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            className="circuit-canvas"
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            width={800}
            height={600}
          />
          <div className="circuit-stats">
            <p>Gates: {gates.length}</p>
            <p>Connections: {connections.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogicGates; 