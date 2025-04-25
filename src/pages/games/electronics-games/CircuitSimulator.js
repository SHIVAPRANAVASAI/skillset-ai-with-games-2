import React, { useState, useRef, useEffect } from 'react';
import './CircuitSimulator.css';

const CircuitSimulator = () => {
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [voltage, setVoltage] = useState(5);
  const [current, setCurrent] = useState(0);
  const canvasRef = useRef(null);

  const componentTypes = [
    { id: 'battery', name: 'Battery', symbol: '🔋', value: '5V' },
    { id: 'resistor', name: 'Resistor', symbol: '⏳', value: '100Ω' },
    { id: 'led', name: 'LED', symbol: '💡', value: '2V' },
    { id: 'switch', name: 'Switch', symbol: '🔘', value: 'ON/OFF' },
    { id: 'capacitor', name: 'Capacitor', symbol: '⚡', value: '100μF' }
  ];

  const drawComponent = (ctx, component) => {
    ctx.beginPath();
    ctx.arc(component.x, component.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw component symbol
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const symbol = componentTypes.find(c => c.id === component.type)?.symbol || '?';
    ctx.fillText(symbol, component.x, component.y);
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
      const startComp = components.find(c => c.id === connection.start);
      const endComp = components.find(c => c.id === connection.end);
      if (startComp && endComp) {
        drawConnection(ctx, startComp, endComp);
      }
    });

    // Draw components
    components.forEach(component => {
      drawComponent(ctx, component);
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
  }, [components, connections, isDrawing, startPoint]);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedComponent) {
      const newComponent = {
        id: Date.now(),
        type: selectedComponent,
        x,
        y,
        value: componentTypes.find(c => c.id === selectedComponent).value
      };
      setComponents([...components, newComponent]);
      setSelectedComponent(null);
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedComponent = components.find(comp => {
      const dx = comp.x - x;
      const dy = comp.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 20;
    });

    if (clickedComponent) {
      setIsDrawing(true);
      setStartPoint(clickedComponent);
    }
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const endComponent = components.find(comp => {
      const dx = comp.x - x;
      const dy = comp.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 20 && comp !== startPoint;
    });

    if (endComponent) {
      const newConnection = {
        id: Date.now(),
        start: startPoint.id,
        end: endComponent.id
      };
      setConnections([...connections, newConnection]);
    }

    setIsDrawing(false);
    setStartPoint(null);
  };

  const calculateCircuit = () => {
    let totalResistance = 0;
    let totalVoltage = voltage;

    components.forEach(comp => {
      if (comp.type === 'resistor') {
        const resistance = parseInt(comp.value);
        totalResistance += resistance;
      }
    });

    if (totalResistance > 0) {
      const calculatedCurrent = totalVoltage / totalResistance;
      setCurrent(calculatedCurrent.toFixed(2));
    } else {
      setCurrent(0);
    }
  };

  const clearCircuit = () => {
    setComponents([]);
    setConnections([]);
    setCurrent(0);
  };

  useEffect(() => {
    calculateCircuit();
  }, [components, connections, voltage]);

  return (
    <div className="circuit-simulator">
      <div className="simulator-header">
        <h1>Circuit Simulator</h1>
        <p>Build and simulate basic electronic circuits</p>
      </div>

      <div className="simulator-content">
        <div className="components-panel">
          <h3>Components</h3>
          <div className="component-list">
            {componentTypes.map(comp => (
              <button
                key={comp.id}
                className={`component-button ${selectedComponent === comp.id ? 'selected' : ''}`}
                onClick={() => setSelectedComponent(comp.id)}
              >
                <span className="component-icon">{comp.symbol}</span>
                {comp.name}
              </button>
            ))}
          </div>
          <div className="controls">
            <div className="voltage-control">
              <label>Voltage (V):</label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(parseFloat(e.target.value))}
                min="0"
                max="12"
                step="0.1"
              />
            </div>
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
            <p>Voltage: {voltage}V</p>
            <p>Current: {current}A</p>
            <p>Components: {components.length}</p>
            <p>Connections: {connections.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitSimulator; 