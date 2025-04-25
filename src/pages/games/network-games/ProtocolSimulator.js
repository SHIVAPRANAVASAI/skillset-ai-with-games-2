import React, { useState, useRef, useEffect } from 'react';
import './ProtocolSimulator.css';

const ProtocolSimulator = () => {
  const canvasRef = useRef(null);
  const [selectedProtocol, setSelectedProtocol] = useState('tcp');
  const [isRunning, setIsRunning] = useState(false);
  const [packets, setPackets] = useState([]);
  const [parameters, setParameters] = useState({
    windowSize: 4,
    timeout: 2000,
    packetLoss: 0,
    delay: 500
  });

  const protocols = [
    {
      id: 'tcp',
      name: 'TCP',
      description: 'Transmission Control Protocol - Reliable, connection-oriented',
      color: '#4D61FC'
    },
    {
      id: 'udp',
      name: 'UDP',
      description: 'User Datagram Protocol - Fast, connectionless',
      color: '#00D4FF'
    },
    {
      id: 'http',
      name: 'HTTP',
      description: 'Hypertext Transfer Protocol - Web communication',
      color: '#FF6B9C'
    },
    {
      id: 'dns',
      name: 'DNS',
      description: 'Domain Name System - Name resolution',
      color: '#22C55E'
    }
  ];

  const drawProtocolVisualization = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw network nodes
    const nodeRadius = 30;
    const node1X = canvas.width * 0.2;
    const node2X = canvas.width * 0.8;
    const nodeY = canvas.height * 0.5;

    // Draw nodes
    ctx.beginPath();
    ctx.arc(node1X, nodeY, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#4D61FC';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(node2X, nodeY, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#4D61FC';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw node labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Sender', node1X, nodeY + nodeRadius + 20);
    ctx.fillText('Receiver', node2X, nodeY + nodeRadius + 20);

    // Draw packets
    packets.forEach((packet, index) => {
      const progress = (Date.now() - packet.startTime) / packet.duration;
      if (progress > 1) return;

      const x = node1X + (node2X - node1X) * progress;
      const y = nodeY + Math.sin(progress * Math.PI) * 50;

      // Draw packet
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = packet.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw packet label
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(packet.seq, x, y - 15);
    });
  };

  const simulateProtocol = () => {
    if (!isRunning) return;

    const newPackets = [];
    const colors = ['#4D61FC', '#00D4FF', '#FF6B9C', '#22C55E'];

    switch (selectedProtocol) {
      case 'tcp':
        // Simulate TCP three-way handshake
        newPackets.push(
          { seq: 'SYN', color: colors[0], startTime: Date.now(), duration: parameters.delay },
          { seq: 'SYN-ACK', color: colors[1], startTime: Date.now() + parameters.delay, duration: parameters.delay },
          { seq: 'ACK', color: colors[2], startTime: Date.now() + parameters.delay * 2, duration: parameters.delay }
        );
        break;
      case 'udp':
        // Simulate UDP datagrams
        for (let i = 0; i < 5; i++) {
          newPackets.push({
            seq: `UDP-${i}`,
            color: colors[i % colors.length],
            startTime: Date.now() + i * parameters.delay,
            duration: parameters.delay
          });
        }
        break;
      case 'http':
        // Simulate HTTP request/response
        newPackets.push(
          { seq: 'GET', color: colors[0], startTime: Date.now(), duration: parameters.delay },
          { seq: '200 OK', color: colors[1], startTime: Date.now() + parameters.delay, duration: parameters.delay }
        );
        break;
      case 'dns':
        // Simulate DNS query/response
        newPackets.push(
          { seq: 'DNS Query', color: colors[0], startTime: Date.now(), duration: parameters.delay },
          { seq: 'DNS Response', color: colors[1], startTime: Date.now() + parameters.delay, duration: parameters.delay }
        );
        break;
    }

    setPackets(newPackets);
  };

  // Initialize canvas and handle window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawProtocolVisualization(ctx, canvas);
    };

    // Initial setup
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrame;
    const animate = () => {
      drawProtocolVisualization(ctx, canvas);
      animationFrame = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animate();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRunning, packets]);

  // Protocol simulation
  useEffect(() => {
    let simulationInterval;
    if (isRunning) {
      simulationInterval = setInterval(simulateProtocol, parameters.delay * 3);
    }

    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [isRunning, selectedProtocol, parameters]);

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  return (
    <div className="protocol-simulator">
      <div className="simulator-header">
        <h1>Protocol Simulator</h1>
        <p>Visualize and understand network protocols</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="protocol-selection">
            <h3>Protocol Type</h3>
            <div className="protocol-buttons">
              {protocols.map(protocol => (
                <button
                  key={protocol.id}
                  className={`protocol-button ${selectedProtocol === protocol.id ? 'selected' : ''}`}
                  onClick={() => setSelectedProtocol(protocol.id)}
                >
                  <span className="protocol-name">{protocol.name}</span>
                  <span className="protocol-description">{protocol.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="parameters">
            <h3>Parameters</h3>
            <div className="parameter-group">
              <label>Window Size</label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={parameters.windowSize}
                onChange={(e) => handleParameterChange('windowSize', parseInt(e.target.value))}
              />
              <span className="parameter-value">{parameters.windowSize}</span>
            </div>
            <div className="parameter-group">
              <label>Packet Delay (ms)</label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={parameters.delay}
                onChange={(e) => handleParameterChange('delay', parseInt(e.target.value))}
              />
              <span className="parameter-value">{parameters.delay} ms</span>
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
          </div>

          <div className="simulation-controls">
            <button
              className={`start-button ${isRunning ? 'running' : ''}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <button className="reset-button" onClick={() => {
              setPackets([]);
              setParameters({
                windowSize: 4,
                timeout: 2000,
                packetLoss: 0,
                delay: 500
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
          />
        </div>
      </div>
    </div>
  );
};

export default ProtocolSimulator; 