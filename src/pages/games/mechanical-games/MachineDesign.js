import React, { useState, useRef, useEffect } from 'react';
import './MachineDesign.css';

const MachineDesign = () => {
  const canvasRef = useRef(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [components, setComponents] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [simulationMode, setSimulationMode] = useState(false);
  const [force, setForce] = useState(0);
  const [material, setMaterial] = useState('steel');
  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 50,
    thickness: 10
  });

  const componentTypes = [
    { id: 'beam', name: 'Beam', icon: '📏', description: 'Structural beam' },
    { id: 'gear', name: 'Gear', icon: '⚙️', description: 'Rotating gear' },
    { id: 'spring', name: 'Spring', icon: '🌀', description: 'Mechanical spring' },
    { id: 'pulley', name: 'Pulley', icon: '⭕', description: 'Pulley system' },
    { id: 'lever', name: 'Lever', icon: '⚖️', description: 'Lever mechanism' }
  ];

  const materials = [
    { id: 'steel', name: 'Steel', strength: 400, density: 7850 },
    { id: 'aluminum', name: 'Aluminum', strength: 200, density: 2700 },
    { id: 'titanium', name: 'Titanium', strength: 800, density: 4500 },
    { id: 'copper', name: 'Copper', strength: 300, density: 8960 }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw grid
    const drawGrid = () => {
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Draw components
    const drawComponents = () => {
      components.forEach(component => {
        ctx.save();
        ctx.translate(component.x, component.y);
        
        switch (component.type) {
          case 'beam':
            ctx.fillStyle = '#3498db';
            ctx.fillRect(-component.width/2, -component.height/2, component.width, component.height);
            break;
          case 'gear':
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(0, 0, component.radius, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'spring':
            ctx.strokeStyle = '#2ecc71';
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let i = 0; i < 10; i++) {
              ctx.lineTo(i * 10, Math.sin(i) * 10);
            }
            ctx.stroke();
            break;
          case 'pulley':
            ctx.fillStyle = '#9b59b6';
            ctx.beginPath();
            ctx.arc(0, 0, component.radius, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'lever':
            ctx.strokeStyle = '#f1c40f';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(-component.length/2, 0);
            ctx.lineTo(component.length/2, 0);
            ctx.stroke();
            break;
        }
        
        ctx.restore();
      });
    };

    // Clear and redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawComponents();
  }, [components]);

  const handleMouseDown = (e) => {
    if (!selectedComponent) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPoint({ x, y });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update component position
    setComponents(prev => {
      const newComponents = [...prev];
      const lastComponent = newComponents[newComponents.length - 1];
      if (lastComponent) {
        lastComponent.x = x;
        lastComponent.y = y;
      }
      return newComponents;
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    setSelectedComponent(null);
  };

  const addComponent = (type) => {
    setSelectedComponent(type);
    setComponents(prev => [...prev, {
      type,
      x: startPoint.x,
      y: startPoint.y,
      width: dimensions.width,
      height: dimensions.height,
      radius: 30,
      length: 100
    }]);
  };

  const runSimulation = () => {
    setSimulationMode(true);
    // Add simulation logic here
  };

  const stopSimulation = () => {
    setSimulationMode(false);
  };

  return (
    <div className="machine-design">
      <div className="design-header">
        <h1>Machine Design Simulator</h1>
        <p>Design and test mechanical components</p>
      </div>

      <div className="design-content">
        <div className="components-panel">
          <h3>Components</h3>
          <div className="component-buttons">
            {componentTypes.map(component => (
              <button
                key={component.id}
                className={`component-button ${selectedComponent === component.id ? 'selected' : ''}`}
                onClick={() => addComponent(component.id)}
              >
                <span className="component-icon">{component.icon}</span>
                {component.name}
              </button>
            ))}
          </div>

          <div className="parameters">
            <h3>Parameters</h3>
            <div className="parameter-group">
              <label>Material</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)}>
                {materials.map(mat => (
                  <option key={mat.id} value={mat.id}>{mat.name}</option>
                ))}
              </select>
            </div>

            <div className="parameter-group">
              <label>Force (N)</label>
              <input
                type="number"
                value={force}
                onChange={(e) => setForce(parseFloat(e.target.value))}
                min="0"
                step="10"
              />
            </div>

            <div className="parameter-group">
              <label>Width (mm)</label>
              <input
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions(prev => ({ ...prev, width: parseFloat(e.target.value) }))}
                min="10"
                step="10"
              />
            </div>

            <div className="parameter-group">
              <label>Height (mm)</label>
              <input
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions(prev => ({ ...prev, height: parseFloat(e.target.value) }))}
                min="10"
                step="10"
              />
            </div>
          </div>

          <div className="simulation-controls">
            <button
              className={`start-button ${simulationMode ? 'running' : ''}`}
              onClick={simulationMode ? stopSimulation : runSimulation}
            >
              {simulationMode ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <button className="clear-button" onClick={() => setComponents([])}>
              Clear Design
            </button>
          </div>
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            className="design-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </div>
      </div>
    </div>
  );
};

export default MachineDesign; 