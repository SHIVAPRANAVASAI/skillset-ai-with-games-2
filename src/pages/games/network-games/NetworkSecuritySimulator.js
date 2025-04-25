import React, { useState, useRef, useEffect } from 'react';
import './NetworkSecuritySimulator.css';

const NetworkSecuritySimulator = () => {
  console.log('NetworkSecuritySimulator component rendering');
  
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('firewall');
  const [devices, setDevices] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [attacks, setAttacks] = useState([]);
  const [defenses, setDefenses] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState({
    attackFrequency: 1,
    defenseStrength: 50,
    encryptionLevel: 128,
    firewallRules: 'strict'
  });

  const deviceTypes = [
    { id: 'firewall', name: 'Firewall', color: '#4D61FC', ports: 2 },
    { id: 'ids', name: 'IDS', color: '#00D4FF', ports: 2 },
    { id: 'ips', name: 'IPS', color: '#FF6B9C', ports: 2 },
    { id: 'server', name: 'Server', color: '#22C55E', ports: 1 },
    { id: 'client', name: 'Client', color: '#FFB800', ports: 1 },
    { id: 'attacker', name: 'Attacker', color: '#FF0000', ports: 1 }
  ];

  const attackTypes = [
    { id: 'dos', name: 'DoS Attack', color: '#FF0000' },
    { id: 'mitm', name: 'MITM Attack', color: '#FF6B6B' },
    { id: 'sql', name: 'SQL Injection', color: '#FF9F43' },
    { id: 'xss', name: 'XSS Attack', color: '#FFC107' }
  ];

  const drawNetwork = (ctx, canvas) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    connections.forEach(connection => {
      const sourceDevice = devices.find(d => d.id === connection.sourceId);
      const targetDevice = devices.find(d => d.id === connection.targetId);
      
      if (sourceDevice && targetDevice) {
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(sourceDevice.x, sourceDevice.y);
        ctx.lineTo(targetDevice.x, targetDevice.y);
        ctx.strokeStyle = connection.encrypted ? '#4D61FC' : '#666';
        ctx.lineWidth = connection.encrypted ? 3 : 2;
        ctx.stroke();

        // Draw attacks on the connection
        attacks.forEach(attack => {
          if (attack.connectionId === connection.id) {
            const progress = (Date.now() - attack.startTime) / attack.duration;
            if (progress > 1) return;

            const x = sourceDevice.x + (targetDevice.x - sourceDevice.x) * progress;
            const y = sourceDevice.y + (targetDevice.y - sourceDevice.y) * progress;

            // Draw attack indicator
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = attack.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw attack type label
            ctx.fillStyle = '#fff';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(attack.type, x, y - 15);
          }
        });

        // Draw defenses
        defenses.forEach(defense => {
          if (defense.connectionId === connection.id) {
            const x = (sourceDevice.x + targetDevice.x) / 2;
            const y = (sourceDevice.y + targetDevice.y) / 2;

            // Draw shield
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fillStyle = '#4D61FC';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw defense type
            ctx.fillStyle = '#fff';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(defense.type, x, y + 5);
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
            targetId: clickedDevice.id,
            encrypted: false
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

  const simulateAttack = () => {
    if (!isRunning || devices.length < 2) return;

    const attacker = devices.find(d => d.type === 'attacker');
    if (!attacker) return;

    const target = devices.find(d => d.type === 'server');
    if (!target) return;

    const connection = connections.find(c => 
      (c.sourceId === attacker.id && c.targetId === target.id) ||
      (c.sourceId === target.id && c.targetId === attacker.id)
    );

    if (!connection) return;

    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    const newAttack = {
      id: `atk-${Date.now()}`,
      connectionId: connection.id,
      type: attackType.name,
      startTime: Date.now(),
      duration: 2000,
      color: attackType.color
    };

    setAttacks([...attacks, newAttack]);

    // Remove attack after duration
    setTimeout(() => {
      setAttacks(attacks.filter(a => a.id !== newAttack.id));
    }, newAttack.duration);
  };

  const simulateDefense = () => {
    if (!isRunning || attacks.length === 0) return;

    const activeAttack = attacks[0];
    const connection = connections.find(c => c.id === activeAttack.connectionId);
    
    if (!connection) return;

    // Check if defense already exists
    const existingDefense = defenses.find(d => d.connectionId === connection.id);
    if (existingDefense) return;

    const defenseType = connection.encrypted ? 'Encryption' : 'Firewall';
    const newDefense = {
      id: `def-${Date.now()}`,
      connectionId: connection.id,
      type: defenseType,
      startTime: Date.now(),
      duration: 3000
    };

    setDefenses([...defenses, newDefense]);

    // Remove defense after duration
    setTimeout(() => {
      setDefenses(defenses.filter(d => d.id !== newDefense.id));
    }, newDefense.duration);
  };

  useEffect(() => {
    console.log('Initializing canvas...');
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element not found in the DOM');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context from canvas');
      return;
    }

    const resizeCanvas = () => {
      console.log('Resizing canvas...');
      const container = canvas.parentElement;
      if (!container) {
        console.error('Canvas container element not found');
        return;
      }
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      console.log('Container dimensions:', { width, height });
      
      if (width === 0 || height === 0) {
        console.error('Container has zero dimensions');
        return;
      }

      canvas.width = width;
      canvas.height = height;
      console.log('Canvas dimensions set to:', { width: canvas.width, height: canvas.height });
      
      // Clear and redraw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawNetwork(ctx, canvas);
    };

    // Initial resize
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Add effect to redraw when devices or connections change
  useEffect(() => {
    console.log('Devices or connections changed, redrawing...');
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawNetwork(ctx, canvas);
  }, [devices, connections, attacks, defenses, selectedDevice]);

  useEffect(() => {
    let attackInterval;
    let defenseInterval;

    if (isRunning) {
      attackInterval = setInterval(simulateAttack, 1000 / parameters.attackFrequency);
      defenseInterval = setInterval(simulateDefense, 1000);
    }

    return () => {
      if (attackInterval) clearInterval(attackInterval);
      if (defenseInterval) clearInterval(defenseInterval);
    };
  }, [isRunning, devices, connections, parameters]);

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const toggleEncryption = (connectionId) => {
    setConnections(connections.map(conn => 
      conn.id === connectionId 
        ? { ...conn, encrypted: !conn.encrypted }
        : conn
    ));
  };

  return (
    <div className="network-security-simulator" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="simulator-header">
        <h1>Network Security Simulator</h1>
        <p>Visualize and understand network security concepts</p>
      </div>

      <div className="simulator-content" style={{ flex: 1, display: 'flex', minHeight: 0 }}>
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
              <label>Attack Frequency (per second)</label>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={parameters.attackFrequency}
                onChange={(e) => handleParameterChange('attackFrequency', parseFloat(e.target.value))}
              />
              <span className="parameter-value">{parameters.attackFrequency}/s</span>
            </div>
            <div className="parameter-group">
              <label>Defense Strength (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={parameters.defenseStrength}
                onChange={(e) => handleParameterChange('defenseStrength', parseInt(e.target.value))}
              />
              <span className="parameter-value">{parameters.defenseStrength}%</span>
            </div>
            <div className="parameter-group">
              <label>Encryption Level (bits)</label>
              <input
                type="range"
                min="64"
                max="256"
                step="64"
                value={parameters.encryptionLevel}
                onChange={(e) => handleParameterChange('encryptionLevel', parseInt(e.target.value))}
              />
              <span className="parameter-value">{parameters.encryptionLevel} bits</span>
            </div>
            <div className="parameter-group">
              <label>Firewall Rules</label>
              <select
                value={parameters.firewallRules}
                onChange={(e) => handleParameterChange('firewallRules', e.target.value)}
              >
                <option value="strict">Strict</option>
                <option value="moderate">Moderate</option>
                <option value="permissive">Permissive</option>
              </select>
            </div>
          </div>

          <div className="connections-list">
            <h3>Connections</h3>
            {connections.map(connection => {
              const sourceDevice = devices.find(d => d.id === connection.sourceId);
              const targetDevice = devices.find(d => d.id === connection.targetId);
              return (
                <div key={connection.id} className="connection-item">
                  <span>
                    {sourceDevice?.type} → {targetDevice?.type}
                  </span>
                  <button
                    className={`encryption-button ${connection.encrypted ? 'active' : ''}`}
                    onClick={() => toggleEncryption(connection.id)}
                  >
                    {connection.encrypted ? 'Encrypted' : 'Unencrypted'}
                  </button>
                </div>
              );
            })}
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
              setAttacks([]);
              setDefenses([]);
              setParameters({
                attackFrequency: 1,
                defenseStrength: 50,
                encryptionLevel: 128,
                firewallRules: 'strict'
              });
            }}>
              Reset
            </button>
          </div>
        </div>

        <div className="canvas-container" style={{ flex: 1, position: 'relative', minHeight: '400px' }}>
          <canvas
            ref={canvasRef}
            className="simulation-canvas"
            onClick={handleCanvasClick}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkSecuritySimulator; 