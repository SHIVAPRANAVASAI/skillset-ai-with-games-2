import React, { useState, useRef, useEffect } from 'react';
import './ChemistryLab.css';

const ChemistryLab = () => {
  const canvasRef = useRef(null);
  const [selectedExperiment, setSelectedExperiment] = useState('reaction');
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState({
    reaction: {
      temperature: 25,
      concentration: 50,
      catalyst: 0,
      pressure: 1,
      time: 0
    },
    titration: {
      acidVolume: 25,
      baseVolume: 0,
      acidConcentration: 0.1,
      baseConcentration: 0.1,
      pH: 7
    },
    electrochemistry: {
      voltage: 0,
      current: 0,
      resistance: 100,
      electrolyteConcentration: 1,
      electrodeDistance: 1
    },
    gasLaws: {
      pressure: 1,
      volume: 1,
      temperature: 273,
      moles: 1,
      constant: 0.0821
    }
  });

  const experiments = [
    {
      id: 'reaction',
      name: 'Chemical Reaction',
      description: 'Simulate chemical reactions and observe kinetics',
      color: '#FF6B6B'
    },
    {
      id: 'titration',
      name: 'Acid-Base Titration',
      description: 'Perform acid-base titrations and pH analysis',
      color: '#4D61FC'
    },
    {
      id: 'electrochemistry',
      name: 'Electrochemistry',
      description: 'Explore electrochemical cells and reactions',
      color: '#22C55E'
    },
    {
      id: 'gasLaws',
      name: 'Gas Laws',
      description: 'Investigate gas behavior and properties',
      color: '#00D4FF'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    const drawReaction = (t) => {
      const { temperature, concentration, catalyst, pressure } = parameters.reaction;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw reaction vessel
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const vesselWidth = canvas.width * 0.4;
      const vesselHeight = canvas.height * 0.4;
      
      ctx.beginPath();
      ctx.rect(centerX - vesselWidth/2, centerY - vesselHeight/2, vesselWidth, vesselHeight);
      ctx.strokeStyle = '#FF6B6B';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw molecules
      const moleculeCount = Math.floor(concentration / 10);
      for (let i = 0; i < moleculeCount; i++) {
        const x = centerX - vesselWidth/2 + Math.random() * vesselWidth;
        const y = centerY - vesselHeight/2 + Math.random() * vesselHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 107, 107, ${0.5 + Math.sin(t + i) * 0.5})`;
        ctx.fill();
      }
      
      // Draw catalyst particles
      for (let i = 0; i < catalyst; i++) {
        const x = centerX - vesselWidth/2 + Math.random() * vesselWidth;
        const y = centerY - vesselHeight/2 + Math.random() * vesselHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF6B6B';
        ctx.fill();
      }

      // Draw statistics
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`Temperature: ${temperature}°C`, 20, 30);
      ctx.fillText(`Concentration: ${concentration}%`, 20, 50);
      ctx.fillText(`Catalyst: ${catalyst}`, 20, 70);
      ctx.fillText(`Pressure: ${pressure} atm`, 20, 90);
    };

    const drawTitration = (t) => {
      const { acidVolume, baseVolume, acidConcentration, baseConcentration, pH } = parameters.titration;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw burette
      const buretteWidth = canvas.width * 0.1;
      const buretteHeight = canvas.height * 0.6;
      const buretteX = canvas.width * 0.2;
      const buretteY = canvas.height * 0.2;
      
      ctx.beginPath();
      ctx.rect(buretteX, buretteY, buretteWidth, buretteHeight);
      ctx.strokeStyle = '#4D61FC';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw base solution
      const baseHeight = (baseVolume / 50) * buretteHeight;
      ctx.fillStyle = 'rgba(77, 97, 252, 0.5)';
      ctx.fillRect(buretteX, buretteY + buretteHeight - baseHeight, buretteWidth, baseHeight);
      
      // Draw flask
      const flaskWidth = canvas.width * 0.3;
      const flaskHeight = canvas.height * 0.4;
      const flaskX = canvas.width * 0.5;
      const flaskY = canvas.height * 0.4;
      
      ctx.beginPath();
      ctx.ellipse(flaskX, flaskY, flaskWidth/2, flaskHeight/2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#4D61FC';
      ctx.stroke();
      
      // Draw acid solution
      const acidHeight = (acidVolume / 50) * flaskHeight;
      ctx.fillStyle = `rgba(255, 107, 107, ${0.5 + Math.sin(t) * 0.5})`;
      ctx.fillRect(flaskX - flaskWidth/2, flaskY - acidHeight/2, flaskWidth, acidHeight);

      // Draw pH indicator
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`pH: ${pH.toFixed(2)}`, 20, 30);
      ctx.fillText(`Base Volume: ${baseVolume} mL`, 20, 50);
      ctx.fillText(`Acid Volume: ${acidVolume} mL`, 20, 70);
      ctx.fillText(`Base Conc: ${baseConcentration}M`, 20, 90);
      ctx.fillText(`Acid Conc: ${acidConcentration}M`, 20, 110);
    };

    const drawElectrochemistry = (t) => {
      const { voltage, current, resistance, electrolyteConcentration, electrodeDistance } = parameters.electrochemistry;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw cell
      const cellWidth = canvas.width * 0.6;
      const cellHeight = canvas.height * 0.4;
      const cellX = canvas.width * 0.2;
      const cellY = canvas.height * 0.3;
      
      ctx.beginPath();
      ctx.rect(cellX, cellY, cellWidth, cellHeight);
      ctx.strokeStyle = '#22C55E';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw electrodes
      const electrodeWidth = 10;
      const electrodeHeight = cellHeight * 0.8;
      
      // Anode
      ctx.fillStyle = '#22C55E';
      ctx.fillRect(cellX + 20, cellY + (cellHeight - electrodeHeight)/2, electrodeWidth, electrodeHeight);
      
      // Cathode
      ctx.fillRect(cellX + cellWidth - 30, cellY + (cellHeight - electrodeHeight)/2, electrodeWidth, electrodeHeight);
      
      // Draw electrolyte
      ctx.fillStyle = `rgba(34, 197, 94, ${electrolyteConcentration / 2})`;
      ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
      
      // Draw electrons
      const electronCount = Math.floor(current * 10);
      for (let i = 0; i < electronCount; i++) {
        const x = cellX + 30 + Math.random() * (cellWidth - 60);
        const y = cellY + Math.random() * cellHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }

      // Draw statistics
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`Voltage: ${voltage}V`, 20, 30);
      ctx.fillText(`Current: ${current}A`, 20, 50);
      ctx.fillText(`Resistance: ${resistance}Ω`, 20, 70);
      ctx.fillText(`Electrolyte: ${electrolyteConcentration}M`, 20, 90);
      ctx.fillText(`Distance: ${electrodeDistance}cm`, 20, 110);
    };

    const drawGasLaws = (t) => {
      const { pressure, volume, temperature, moles, constant } = parameters.gasLaws;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw container
      const containerWidth = volume * (canvas.width * 0.4);
      const containerHeight = canvas.height * 0.4;
      const containerX = (canvas.width - containerWidth) / 2;
      const containerY = canvas.height * 0.3;
      
      ctx.beginPath();
      ctx.rect(containerX, containerY, containerWidth, containerHeight);
      ctx.strokeStyle = '#00D4FF';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw gas particles
      const particleCount = Math.floor(moles * 10);
      for (let i = 0; i < particleCount; i++) {
        const x = containerX + Math.random() * containerWidth;
        const y = containerY + Math.random() * containerHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.5 + Math.sin(t + i) * 0.5})`;
        ctx.fill();
      }
      
      // Draw pressure indicator
      const pressureHeight = pressure * (containerHeight / 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
      ctx.fillRect(containerX, containerY + containerHeight - pressureHeight, containerWidth, pressureHeight);

      // Draw statistics
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`Pressure: ${pressure} atm`, 20, 30);
      ctx.fillText(`Volume: ${volume} L`, 20, 50);
      ctx.fillText(`Temperature: ${temperature}K`, 20, 70);
      ctx.fillText(`Moles: ${moles}`, 20, 90);
      ctx.fillText(`R: ${constant} L·atm/K·mol`, 20, 110);
    };

    const animate = () => {
      if (!isRunning) return;
      
      switch (selectedExperiment) {
        case 'reaction':
          drawReaction(time);
          break;
        case 'titration':
          drawTitration(time);
          break;
        case 'electrochemistry':
          drawElectrochemistry(time);
          break;
        case 'gasLaws':
          drawGasLaws(time);
          break;
        default:
          break;
      }
      
      time += 0.016; // Approximately 60 FPS
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedExperiment, isRunning, parameters]);

  const handleParameterChange = (experiment, parameter, value) => {
    setParameters(prev => ({
      ...prev,
      [experiment]: {
        ...prev[experiment],
        [parameter]: parseFloat(value)
      }
    }));
  };

  const renderParameters = () => {
    const currentParams = parameters[selectedExperiment];
    return Object.entries(currentParams).map(([key, value]) => (
      <div key={key} className="parameter-control">
        <label htmlFor={key}>
          {key.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + 
           key.split(/(?=[A-Z])/).join(' ').slice(1)}:
        </label>
        <input
          type="range"
          id={key}
          min={key.includes('Volume') ? 0 : key.includes('Concentration') ? 0 : key.includes('pH') ? 0 : 0}
          max={key.includes('Volume') ? 50 : key.includes('Concentration') ? 2 : key.includes('pH') ? 14 : 100}
          step={key.includes('Volume') ? 1 : key.includes('Concentration') ? 0.1 : key.includes('pH') ? 0.1 : 1}
          value={value}
          onChange={(e) => handleParameterChange(selectedExperiment, key, e.target.value)}
        />
        <span>{value}{key.includes('Temperature') ? '°C' : key.includes('Volume') ? ' mL' : key.includes('Concentration') ? 'M' : key.includes('pH') ? '' : key.includes('Pressure') ? ' atm' : key.includes('Resistance') ? 'Ω' : key.includes('Voltage') ? 'V' : key.includes('Current') ? 'A' : key.includes('Distance') ? 'cm' : ''}</span>
      </div>
    ));
  };

  return (
    <div className="chemistry-lab">
      <div className="lab-header">
        <h1>Chemistry Lab</h1>
        <p>Interactive chemistry experiments and simulations</p>
      </div>

      <div className="lab-content">
        <div className="experiments-panel">
          <h3>Experiments</h3>
          <div className="experiment-buttons">
            {experiments.map(experiment => (
              <button
                key={experiment.id}
                className={`experiment-button ${selectedExperiment === experiment.id ? 'selected' : ''}`}
                onClick={() => setSelectedExperiment(experiment.id)}
                style={{ '--experiment-color': experiment.color }}
              >
                <span className="experiment-name">{experiment.name}</span>
                <span className="experiment-description">{experiment.description}</span>
              </button>
            ))}
          </div>

          <div className="parameters-panel">
            <h3>Parameters</h3>
            {renderParameters()}
          </div>

          <div className="control-buttons">
            <button
              className={`control-button ${isRunning ? 'stop' : 'start'}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? 'Stop' : 'Start'} Experiment
            </button>
            <button
              className="control-button reset"
              onClick={() => {
                setIsRunning(false);
                setParameters(prev => ({...prev}));
              }}
            >
              Reset Parameters
            </button>
          </div>
        </div>

        <div className="experiment-area">
          <canvas ref={canvasRef} className="experiment-canvas" />
        </div>
      </div>
    </div>
  );
};

export default ChemistryLab; 