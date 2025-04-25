import React, { useState, useRef, useEffect } from 'react';
import './PacketTracer.css';

const PacketTracer = () => {
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('router');
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [packets, setPackets] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState({
    packetSize: 1000,
    transmissionDelay: 100,
    packetLoss: 0,
    bandwidth: 1000
  });

  const deviceTypes = [
    { id: 'router', name: 'Router', color: '#4D61FC', ports: 4 },
    { id: 'switch', name: 'Switch', color: '#00D4FF', ports: 8 },
    { id: 'pc', name: 'PC', color: '#FF6B9C', ports: 1 },
    { id: 'server', name: 'Server', color: '#22C55E', ports: 1 }
  ];

  const drawNetwork = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    connections.forEach(connection => {
      const sourceDevice = devices.find(d => d.id === connection.sourceId);
      const targetDevice = devices.find(d => d.id === connection.targetId);
      
      if (sourceDevice && targetDevice) {
        ctx.beginPath();
        ctx.moveTo(sourceDevice.x, sourceDevice.y);
        ctx.lineTo(targetDevice.x, targetDevice.y);
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw packets on the connection
        packets.forEach(packet => {
          if (packet.connectionId === connection.id) {
            const progress = (Date.now() - packet.startTime) / packet.duration;
            if (progress > 1) return;

            const x = sourceDevice.x + (targetDevice.x - sourceDevice.x) * progress;
            const y = sourceDevice.y + (targetDevice.y - sourceDevice.y) * progress;

            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = packet.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }
    });

    // Draw devices
    devices.forEach(device => {
      const deviceType = deviceTypes.find(t => t.id === device.type);
      if (!deviceType) return;

      // Draw device
      ctx.beginPath();
      ctx.arc(device.x, device.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = deviceType.color;
      ctx.fill();
      ctx.strokeStyle = selectedDevice?.id === device.id ? '#fff' : '#666';
      ctx.lineWidth = selectedDevice?.id === device.id ? 3 : 2;
      ctx.stroke();

      // Draw device label
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(deviceType.name, device.x, device.y + 40);

      // Draw ports
      for (let i = 0; i < deviceType.ports; i++) {
        const angle = (i * 2 * Math.PI) / deviceType.ports;
        const portX = device.x + Math.cos(angle) * 30;
        const portY = device.y + Math.sin(angle) * 30;

        ctx.beginPath();
        ctx.arc(portX, portY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }
    });
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'delete') {
      // Delete device or connection
      const clickedDevice = devices.find(device => {
        const dx = device.x - x;
        const dy = device.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= 30;
      });

      if (clickedDevice) {
        setDevices(devices.filter(d => d.id !== clickedDevice.id));
        setConnections(connections.filter(c => 
          c.sourceId !== clickedDevice.id && c.targetId !== clickedDevice.id
        ));
      }
    } else if (selectedTool === 'connect') {
      // Handle connection creation
      const clickedDevice = devices.find(device => {
        const dx = device.x - x;
        const dy = device.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= 30;
      });

      if (clickedDevice) {
        if (!selectedDevice) {
          setSelectedDevice(clickedDevice);
        } else if (selectedDevice.id !== clickedDevice.id) {
          // Create new connection
          const newConnection = {
            id: `conn-${Date.now()}`,
            sourceId: selectedDevice.id,
            targetId: clickedDevice.id
          };
          setConnections([...connections, newConnection]);
          setSelectedDevice(null);
        }
      }
    } else {
      // Add new device
      const newDevice = {
        id: `dev-${Date.now()}`,
        type: selectedTool,
        x,
        y
      };
      setDevices([...devices, newDevice]);
    }
  };

  const simulatePacket = () => {
    if (!isRunning || devices.length < 2) return;

    const sourceDevice = devices[Math.floor(Math.random() * devices.length)];
    const targetDevice = devices[Math.floor(Math.random() * devices.length)];
    
    if (sourceDevice.id === targetDevice.id) return;

    const connection = connections.find(c => 
      (c.sourceId === sourceDevice.id && c.targetId === targetDevice.id) ||
      (c.sourceId === targetDevice.id && c.targetId === sourceDevice.id)
    );

    if (!connection) return;

    const newPacket = {
      id: `pkt-${Date.now()}`,
      connectionId: connection.id,
      startTime: Date.now(),
      duration: parameters.transmissionDelay,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    };

    setPackets([...packets, newPacket]);

    // Remove packet after transmission
    setTimeout(() => {
      setPackets(packets.filter(p => p.id !== newPacket.id));
    }, parameters.transmissionDelay);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawNetwork(ctx, canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [devices, connections, packets, selectedDevice]);

  useEffect(() => {
    let simulationInterval;
    if (isRunning) {
      simulationInterval = setInterval(simulatePacket, 1000);
    }

    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [isRunning, devices, connections, parameters]);

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  return (
    <div className="packet-tracer">
      <div className="simulator-header">
        <h1>Packet Tracer</h1>
        <p>Design and simulate network topologies</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="tool-selection">
            <h3>Tools</h3>
            <div className="tool-buttons">
              {deviceTypes.map(device => (
                <button
                  key={device.id}
                  className={`tool-button ${selectedTool === device.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTool(device.id)}
                >
                  <span className="tool-name">{device.name}</span>
                </button>
              ))}
              <button
                className={`tool-button ${selectedTool === 'connect' ? 'selected' : ''}`}
                onClick={() => setSelectedTool('connect')}
              >
                <span className="tool-name">Connect</span>
              </button>
              <button
                className={`tool-button ${selectedTool === 'delete' ? 'selected' : ''}`}
                onClick={() => setSelectedTool('delete')}
              >
                <span className="tool-name">Delete</span>
              </button>
            </div>
          </div>

          <div className="parameters">
            <h3>Simulation Parameters</h3>
            <div className="parameter-group">
              <label>Packet Size (bytes)</label>
              <input
                type="range"
                min="100"
                max="1500"
                step="100"
                value={parameters.packetSize}
                onChange={(e) => handleParameterChange('packetSize', parseInt(e.target.value))}
              />
              <span className="parameter-value">{parameters.packetSize} bytes</span>
            </div>
            <div className="parameter-group">
              <label>Transmission Delay (ms)</label>
              <input
                type="range"
                min="50"
                max="500"
                step="50"
                value={parameters.transmissionDelay}
                onChange={(e) => handleParameterChange('transmissionDelay', parseInt(e.target.value))}
              />
              <span className="parameter-value">{parameters.transmissionDelay} ms</span>
            </div>
            <div className="parameter-group">
              <label>Packet Loss (%)</label>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={parameters.packetLoss}
                onChange={(e) => handleParameterChange('packetLoss', parseInt(e.target.value))}
              />
              <span className="parameter-value">{parameters.packetLoss}%</span>
            </div>
            <div className="parameter-group">
              <label>Bandwidth (Mbps)</label>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={parameters.bandwidth}
                onChange={(e) => handleParameterChange('bandwidth', parseInt(e.target.value))}
              />
              <span className="parameter-value">{parameters.bandwidth} Mbps</span>
            </div>
          </div>

          <div className="simulation-controls">
            <button
              className={`start-button ${isRunning ? 'running' : ''}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <button className="reset-button" onClick={() => {
              setDevices([]);
              setConnections([]);
              setPackets([]);
              setParameters({
                packetSize: 1000,
                transmissionDelay: 100,
                packetLoss: 0,
                bandwidth: 1000
              });
            }}>
              Reset
            </button>
          </div>
        </div>

        <div className="canvas-container">
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

export default PacketTracer; 