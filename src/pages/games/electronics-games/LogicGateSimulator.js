import React, { useState, useEffect, useRef, useCallback } from 'react';
import './LogicGateSimulator.css';

const LogicGateSimulator = () => {
  const canvasRef = useRef(null);
  const [selectedGate, setSelectedGate] = useState('AND');
  const [inputs, setInputs] = useState([false, false]);
  const [output, setOutput] = useState(false);
  const [showTruthTable, setShowTruthTable] = useState(false);
  const [voltage, setVoltage] = useState(5);
  const [showCircuit, setShowCircuit] = useState(true);
  const [showWaveform, setShowWaveform] = useState(false);
  const [waveformData, setWaveformData] = useState([]);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const gates = {
    AND: {
      symbol: '&',
      operation: (a, b) => a && b,
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 0 },
        { inputs: [1, 0], output: 0 },
        { inputs: [1, 1], output: 1 }
      ],
      color: '#4D61FC',
      description: 'Outputs 1 only if both inputs are 1'
    },
    OR: {
      symbol: '≥1',
      operation: (a, b) => a || b,
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 1 }
      ],
      color: '#22C55E',
      description: 'Outputs 1 if any input is 1'
    },
    NOT: {
      symbol: '1',
      operation: (a) => !a,
      truthTable: [
        { inputs: [0], output: 1 },
        { inputs: [1], output: 0 }
      ],
      color: '#F59E0B',
      description: 'Inverts the input signal'
    },
    NAND: {
      symbol: '&',
      operation: (a, b) => !(a && b),
      truthTable: [
        { inputs: [0, 0], output: 1 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 0 }
      ],
      color: '#EF4444',
      description: 'AND gate followed by NOT gate'
    },
    NOR: {
      symbol: '≥1',
      operation: (a, b) => !(a || b),
      truthTable: [
        { inputs: [0, 0], output: 1 },
        { inputs: [0, 1], output: 0 },
        { inputs: [1, 0], output: 0 },
        { inputs: [1, 1], output: 0 }
      ],
      color: '#8B5CF6',
      description: 'OR gate followed by NOT gate'
    },
    XOR: {
      symbol: '=1',
      operation: (a, b) => a !== b,
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 0 }
      ],
      color: '#EC4899',
      description: 'Outputs 1 if inputs are different'
    }
  };

  const drawGate = useCallback((ctx, gateType) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const gate = gates[gateType];
    
    // Draw circuit background
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw power rails
    ctx.strokeStyle = '#4D61FC';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, canvasRef.current.height - 20);
    ctx.moveTo(canvasRef.current.width - 20, 20);
    ctx.lineTo(canvasRef.current.width - 20, canvasRef.current.height - 20);
    ctx.stroke();

    // Draw input wires
    const inputY1 = canvasRef.current.height * 0.3;
    const inputY2 = canvasRef.current.height * 0.7;
    ctx.beginPath();
    ctx.moveTo(20, inputY1);
    ctx.lineTo(150, inputY1);
    ctx.moveTo(20, inputY2);
    ctx.lineTo(150, inputY2);
    ctx.stroke();

    // Draw input values with voltage indicators
    ctx.fillStyle = inputs[0] ? '#4D61FC' : '#666';
    ctx.font = '14px Poppins';
    ctx.fillText(inputs[0] ? `${voltage}V` : '0V', 30, inputY1 + 5);
    ctx.fillStyle = inputs[1] ? '#4D61FC' : '#666';
    ctx.fillText(inputs[1] ? `${voltage}V` : '0V', 30, inputY2 + 5);

    // Draw gate with circuit-like appearance
    ctx.beginPath();
    if (selectedGate === 'NOT') {
      // Draw NOT gate with transistor-like appearance
      ctx.moveTo(150, canvasRef.current.height * 0.3);
      ctx.lineTo(200, canvasRef.current.height * 0.5);
      ctx.lineTo(150, canvasRef.current.height * 0.7);
      ctx.closePath();
      ctx.strokeStyle = gate.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw transistor-like symbol
      ctx.beginPath();
      ctx.arc(205, canvasRef.current.height * 0.5, 5, 0, Math.PI * 2);
      ctx.fillStyle = gate.color;
      ctx.fill();
    } else {
      // Draw other gates with IC-like appearance
      ctx.moveTo(150, canvasRef.current.height * 0.2);
      ctx.lineTo(150, canvasRef.current.height * 0.8);
      ctx.bezierCurveTo(
        200, canvasRef.current.height * 0.8,
        200, canvasRef.current.height * 0.2,
        150, canvasRef.current.height * 0.2
      );
      ctx.strokeStyle = gate.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw IC-like symbol
      ctx.fillStyle = gate.color;
      ctx.font = '16px Arial';
      ctx.fillText(gate.symbol, 165, canvasRef.current.height * 0.5 + 5);
    }

    // Draw output wire with voltage indicator
    ctx.beginPath();
    ctx.moveTo(selectedGate === 'NOT' ? 210 : 200, canvasRef.current.height * 0.5);
    ctx.lineTo(270, canvasRef.current.height * 0.5);
    ctx.stroke();

    // Draw output value with voltage
    ctx.fillStyle = output ? gate.color : '#666';
    ctx.font = '14px Poppins';
    ctx.fillText(output ? `${voltage}V` : '0V', 280, canvasRef.current.height * 0.5 + 5);
  }, [canvasRef, inputs, output, selectedGate, voltage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawGate(context, selectedGate);
  }, [selectedGate, drawGate]);

  const handleInputClick = (index) => {
    const newInputs = [...inputs];
    newInputs[index] = !newInputs[index];
    setInputs(newInputs);
    
    if (selectedGate === 'NOT') {
      setOutput(gates[selectedGate].operation(newInputs[0]));
    } else {
      setOutput(gates[selectedGate].operation(newInputs[0], newInputs[1]));
    }
  };

  const startSimulation = () => {
    setIsSimulating(true);
    const newWaveformData = [];
    for (let i = 0; i < 100; i++) {
      const inputA = Math.random() > 0.5;
      const inputB = selectedGate === 'NOT' ? null : Math.random() > 0.5;
      const output = selectedGate === 'NOT' 
        ? gates[selectedGate].operation(inputA)
        : gates[selectedGate].operation(inputA, inputB);
      newWaveformData.push({ inputA, inputB, output });
    }
    setWaveformData(newWaveformData);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
  };

  return (
    <div className="logic-gate-simulator">
      <div className="simulator-header">
        <h1>Logic Gate Simulator</h1>
        <p>Explore digital logic gates and their behavior</p>
      </div>

      <div className="simulator-content">
        <div className="controls-panel">
          <div className="gate-info">
            <h3>{selectedGate} Gate</h3>
            <p className="gate-description">{gates[selectedGate].description}</p>
          </div>

          <div className="voltage-control">
            <label>Supply Voltage:</label>
            <input
              type="range"
              min="1"
              max="12"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
            />
            <span>{voltage}V</span>
          </div>

          <div className="gate-selector">
            {Object.keys(gates).map((gate) => (
              <button
                key={gate}
                className={`gate-btn ${selectedGate === gate ? 'active' : ''}`}
                style={{ '--gate-color': gates[gate].color }}
                onClick={() => {
                  setSelectedGate(gate);
                  setInputs(gate === 'NOT' ? [false] : [false, false]);
                  setOutput(false);
                }}
              >
                {gate}
              </button>
            ))}
          </div>

          <div className="simulation-controls">
            <button
              className={`simulate-btn ${isSimulating ? 'active' : ''}`}
              onClick={isSimulating ? stopSimulation : startSimulation}
            >
              {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
            </button>
            <div className="speed-control">
              <label>Simulation Speed:</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(Number(e.target.value))}
              />
              <span>{simulationSpeed}x</span>
            </div>
          </div>
        </div>

        <div className="visualization-area">
          <div className="view-toggle">
            <button
              className={`view-btn ${showCircuit ? 'active' : ''}`}
              onClick={() => setShowCircuit(true)}
            >
              Circuit View
            </button>
            <button
              className={`view-btn ${showWaveform ? 'active' : ''}`}
              onClick={() => setShowWaveform(true)}
            >
              Waveform View
            </button>
          </div>

          {showCircuit && (
            <div className="circuit-container">
              <canvas
                ref={canvasRef}
                width="400"
                height="300"
                className="gate-canvas"
              />
              <div className="input-controls">
                <button
                  className={`input-btn ${inputs[0] ? 'active' : ''}`}
                  onClick={() => handleInputClick(0)}
                >
                  Input A
                </button>
                {selectedGate !== 'NOT' && (
                  <button
                    className={`input-btn ${inputs[1] ? 'active' : ''}`}
                    onClick={() => handleInputClick(1)}
                  >
                    Input B
                  </button>
                )}
              </div>
            </div>
          )}

          {showWaveform && (
            <div className="waveform-container">
              {/* Waveform visualization will be implemented here */}
              <p>Waveform visualization coming soon...</p>
            </div>
          )}
        </div>

        <div className="truth-table-panel">
          <button
            className="truth-table-btn"
            onClick={() => setShowTruthTable(!showTruthTable)}
          >
            {showTruthTable ? 'Hide' : 'Show'} Truth Table
          </button>

          {showTruthTable && (
            <div className="truth-table">
              <h3>{selectedGate} Gate Truth Table</h3>
              <table>
                <thead>
                  <tr>
                    <th>Input A</th>
                    {selectedGate !== 'NOT' && <th>Input B</th>}
                    <th>Output</th>
                  </tr>
                </thead>
                <tbody>
                  {gates[selectedGate].truthTable.map((row, index) => (
                    <tr key={index}>
                      <td>{row.inputs[0]}</td>
                      {selectedGate !== 'NOT' && <td>{row.inputs[1]}</td>}
                      <td>{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogicGateSimulator;
