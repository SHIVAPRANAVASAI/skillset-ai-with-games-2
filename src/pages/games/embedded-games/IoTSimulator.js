import React, { useState, useRef, useEffect } from 'react';
import './IoTSimulator.css';

const IoTSimulator = () => {
  const canvasRef = useRef(null);
  const [selectedDevice, setSelectedDevice] = useState('sensor');
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [drawingConnection, setDrawingConnection] = useState(null);

  const deviceTypes = [
    {
      id: 'sensor',
      name: 'Sensor',
      description: 'Environmental sensor (temperature, humidity, etc.)',
      color: '#4ECDC4',
      inputs: 0,
      outputs: 1
    },
    {
      id: 'actuator',
      name: 'Actuator',
      description: 'Output device (LED, motor, etc.)',
      color: '#FF6B6B',
      inputs: 1,
      outputs: 0
    },
    {
      id: 'gateway',
      name: 'Gateway',
      description: 'IoT gateway for data processing',
      color: '#45B7D1',
      inputs: 2,
      outputs: 2
    },
    {
      id: 'display',
      name: 'Display',
      description: 'Output display device',
      color: '#96CEB4',
      inputs: 1,
      outputs: 0
    },
    {
      id: 'controller',
      name: 'Controller',
      description: 'Control unit for IoT devices',
      color: '#FFD700',
      inputs: 2,
      outputs: 2
    }
  ];

  const drawDevices = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections first
    connections.forEach(connection => {
      const sourceDevice = devices.find(d => d.id === connection.sourceId);
      const targetDevice = devices.find(d => d.id === connection.targetId);
      
      if (sourceDevice && targetDevice) {
        ctx.beginPath();
        ctx.moveTo(sourceDevice.x + 50, sourceDevice.y + 25);
        ctx.lineTo(targetDevice.x, targetDevice.y + 25);
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Draw devices
    devices.forEach(device => {
      const deviceType = deviceTypes.find(d => d.id === device.type);
      if (!deviceType) return;

      // Draw device body
      ctx.fillStyle = deviceType.color;
      ctx.fillRect(device.x, device.y, 50, 50);
      
      // Draw device label
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(deviceType.name, device.x + 25, device.y + 65);

      // Draw input/output ports
      for (let i = 0; i < deviceType.inputs; i++) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(device.x - 5, device.y + 15 + (i * 20), 5, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < deviceType.outputs; i++) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(device.x + 55, device.y + 15 + (i * 20), 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw connection being drawn
    if (drawingConnection) {
      const sourceDevice = devices.find(d => d.id === drawingConnection.sourceId);
      if (sourceDevice) {
        ctx.beginPath();
        ctx.moveTo(sourceDevice.x + 50, sourceDevice.y + 25);
        ctx.lineTo(drawingConnection.x, drawingConnection.y);
        ctx.strokeStyle = '#00979D';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedComponent) {
      // Place device
      const newDevice = {
        id: `device-${Date.now()}`,
        type: selectedComponent,
        x,
        y
      };
      setDevices([...devices, newDevice]);
      setSelectedComponent(null);
    } else {
      // Check if clicked on a device's output port
      const clickedDevice = devices.find(device => {
        const deviceType = deviceTypes.find(d => d.id === device.type);
        if (!deviceType) return false;
        
        for (let i = 0; i < deviceType.outputs; i++) {
          const portX = device.x + 55;
          const portY = device.y + 15 + (i * 20);
          const distance = Math.sqrt(Math.pow(x - portX, 2) + Math.pow(y - portY, 2));
          if (distance <= 5) {
            return true;
          }
        }
        return false;
      });

      if (clickedDevice) {
        setDrawingConnection({
          sourceId: clickedDevice.id,
          x,
          y
        });
      }
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (drawingConnection) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setDrawingConnection({
        ...drawingConnection,
        x,
        y
      });
    }
  };

  const handleCanvasMouseUp = (e) => {
    if (drawingConnection) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find if we're hovering over an input port
      const targetDevice = devices.find(device => {
        const deviceType = deviceTypes.find(d => d.id === device.type);
        if (!deviceType) return false;
        
        for (let i = 0; i < deviceType.inputs; i++) {
          const portX = device.x - 5;
          const portY = device.y + 15 + (i * 20);
          const distance = Math.sqrt(Math.pow(x - portX, 2) + Math.pow(y - portY, 2));
          if (distance <= 5) {
            return true;
          }
        }
        return false;
      });

      if (targetDevice) {
        setConnections([...connections, {
          id: `conn-${Date.now()}`,
          sourceId: drawingConnection.sourceId,
          targetId: targetDevice.id
        }]);
      }

      setDrawingConnection(null);
    }
  };

  const simulateIoT = () => {
    setIsRunning(true);
    setOutput('Simulating IoT network...\n');
    
    // Simple simulation logic
    try {
      devices.forEach(device => {
        const deviceType = deviceTypes.find(d => d.id === device.type);
        if (deviceType) {
          if (device.type === 'sensor') {
            const value = Math.floor(Math.random() * 100);
            setOutput(prev => prev + `${deviceType.name} reading: ${value}\n`);
          } else if (device.type === 'actuator') {
            setOutput(prev => prev + `${deviceType.name} activated\n`);
          }
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
      drawDevices(ctx, canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [devices, connections, drawingConnection]);

  return (
    <div className="iot-simulator">
      <div className="simulator-header">
        <h1>IoT Simulator</h1>
        <p>Design and simulate IoT networks with various devices</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="device-selection">
            <h3>Select Device</h3>
            <div className="device-buttons">
              {deviceTypes.map(device => (
                <button
                  key={device.id}
                  className={`device-button ${selectedComponent === device.id ? 'selected' : ''}`}
                  onClick={() => setSelectedComponent(device.id)}
                >
                  <span className="device-name">{device.name}</span>
                  <span className="device-description">{device.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="simulation-controls">
            <h3>Simulation Controls</h3>
            <div className="control-buttons">
              <button
                className="run-button"
                onClick={simulateIoT}
                disabled={isRunning}
              >
                {isRunning ? 'Running...' : 'Run Simulation'}
              </button>
              <button
                className="clear-button"
                onClick={() => {
                  setDevices([]);
                  setConnections([]);
                  setOutput('');
                }}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="output-panel">
            <h3>Output</h3>
            <div className="output">
              {output || 'No output yet...'}
            </div>
          </div>
        </div>

        <div className="simulation-area">
          <canvas
            ref={canvasRef}
            className="simulation-canvas"
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          />
        </div>
      </div>
    </div>
  );
};

export default IoTSimulator; 