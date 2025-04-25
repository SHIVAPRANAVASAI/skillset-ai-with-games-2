import React, { useState, useRef, useEffect } from 'react';
import './MicrocontrollerLab.css';

const MicrocontrollerLab = () => {
  const canvasRef = useRef(null);
  const [selectedMicrocontroller, setSelectedMicrocontroller] = useState('arduino');
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [pins, setPins] = useState({
    digital: Array(14).fill(0),
    analog: Array(6).fill(0),
    pwm: Array(6).fill(0)
  });
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const microcontrollers = [
    {
      id: 'arduino',
      name: 'Arduino Uno',
      description: '8-bit microcontroller with 14 digital I/O pins',
      pins: {
        digital: 14,
        analog: 6,
        pwm: 6
      },
      color: '#00979D'
    },
    {
      id: 'esp32',
      name: 'ESP32',
      description: '32-bit microcontroller with WiFi and Bluetooth',
      pins: {
        digital: 34,
        analog: 18,
        pwm: 16
      },
      color: '#E74C3C'
    },
    {
      id: 'raspberry',
      name: 'Raspberry Pi Pico',
      description: 'RP2040 microcontroller with dual-core processor',
      pins: {
        digital: 26,
        analog: 3,
        pwm: 16
      },
      color: '#C51A4A'
    }
  ];

  const availableComponents = [
    { id: 'led', name: 'LED', type: 'output', color: '#FFD700' },
    { id: 'button', name: 'Push Button', type: 'input', color: '#FF6B6B' },
    { id: 'potentiometer', name: 'Potentiometer', type: 'input', color: '#4ECDC4' },
    { id: 'servo', name: 'Servo Motor', type: 'output', color: '#45B7D1' },
    { id: 'sensor', name: 'Temperature Sensor', type: 'input', color: '#96CEB4' },
    { id: 'buzzer', name: 'Buzzer', type: 'output', color: '#FFEEAD' }
  ];

  const drawMicrocontroller = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw microcontroller
    const mc = microcontrollers.find(m => m.id === selectedMicrocontroller);
    if (!mc) return;

    // Draw microcontroller body
    ctx.fillStyle = mc.color;
    ctx.fillRect(50, 50, 200, 300);
    
    // Draw pins
    const pinSpacing = 20;
    const startY = 60;
    
    // Digital pins
    for (let i = 0; i < mc.pins.digital; i++) {
      const pinState = pins.digital[i];
      ctx.fillStyle = pinState ? '#00FF00' : '#666';
      ctx.fillRect(40, startY + i * pinSpacing, 10, 10);
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`D${i}`, 55, startY + i * pinSpacing + 8);
    }

    // Analog pins
    for (let i = 0; i < mc.pins.analog; i++) {
      const pinState = pins.analog[i];
      ctx.fillStyle = pinState ? '#00FF00' : '#666';
      ctx.fillRect(250, startY + i * pinSpacing, 10, 10);
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`A${i}`, 210, startY + i * pinSpacing + 8);
    }

    // Draw components
    components.forEach(component => {
      const compType = availableComponents.find(c => c.id === component.type);
      if (!compType) return;

      ctx.fillStyle = compType.color;
      ctx.beginPath();
      ctx.arc(component.x, component.y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw component label
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(compType.name, component.x, component.y + 30);
    });
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedComponent) {
      // Place component
      const newComponent = {
        id: `comp-${Date.now()}`,
        type: selectedComponent,
        x,
        y
      };
      setComponents([...components, newComponent]);
      setSelectedComponent(null);
    }
  };

  const simulateCode = () => {
    if (!code.trim()) return;
    
    setIsRunning(true);
    setOutput('Simulating code...\n');
    
    // Simple simulation logic
    try {
      // This is a placeholder for actual code simulation
      // In a real implementation, you would parse and execute the code
      const lines = code.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('digitalWrite')) {
          const pin = parseInt(line.match(/\d+/)[0]);
          const value = line.includes('HIGH') ? 1 : 0;
          setPins(prev => ({
            ...prev,
            digital: prev.digital.map((v, i) => i === pin ? value : v)
          }));
        }
        if (line.includes('analogRead')) {
          const pin = parseInt(line.match(/\d+/)[0]);
          const value = Math.floor(Math.random() * 1024);
          setPins(prev => ({
            ...prev,
            analog: prev.analog.map((v, i) => i === pin ? value : v)
          }));
        }
      });
      
      setOutput(prev => prev + 'Simulation completed successfully!\n');
    } catch (error) {
      setOutput(prev => prev + `Error: ${error.message}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawMicrocontroller(ctx, canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [selectedMicrocontroller, pins, components]);

  return (
    <div className="microcontroller-lab">
      <div className="lab-header">
        <h1>Microcontroller Lab</h1>
        <p>Program and simulate microcontrollers in a virtual environment</p>
      </div>

      <div className="lab-content">
        <div className="controls-panel">
          <div className="microcontroller-selection">
            <h3>Select Microcontroller</h3>
            <div className="microcontroller-buttons">
              {microcontrollers.map(mc => (
                <button
                  key={mc.id}
                  className={`microcontroller-button ${selectedMicrocontroller === mc.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMicrocontroller(mc.id)}
                >
                  <span className="microcontroller-name">{mc.name}</span>
                  <span className="microcontroller-description">{mc.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="components-panel">
            <h3>Components</h3>
            <div className="component-buttons">
              {availableComponents.map(component => (
                <button
                  key={component.id}
                  className={`component-button ${selectedComponent === component.id ? 'selected' : ''}`}
                  onClick={() => setSelectedComponent(component.id)}
                >
                  <span className="component-name">{component.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="code-editor">
            <h3>Code Editor</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
            />
            <div className="editor-controls">
              <button
                className="run-button"
                onClick={simulateCode}
                disabled={isRunning}
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                className="clear-button"
                onClick={() => {
                  setCode('');
                  setOutput('');
                  setPins({
                    digital: Array(14).fill(0),
                    analog: Array(6).fill(0),
                    pwm: Array(6).fill(0)
                  });
                }}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="output-panel">
            <h3>Output</h3>
            <pre className="output">{output}</pre>
          </div>
        </div>

        <div className="simulation-area">
          <canvas
            ref={canvasRef}
            className="simulation-canvas"
            onClick={handleCanvasClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MicrocontrollerLab; 