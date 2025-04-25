import React, { useState, useRef, useEffect } from 'react';
import './BiologyExplorer.css';

const BiologyExplorer = () => {
  const canvasRef = useRef(null);
  const [selectedSimulation, setSelectedSimulation] = useState('cell');
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState({
    cell: {
      temperature: 37,
      pH: 7,
      glucoseLevel: 50,
      oxygenLevel: 80,
      atp: 100
    },
    genetics: {
      mutationRate: 0.1,
      populationSize: 50,
      generationTime: 10,
      selectionPressure: 0.5,
      crossoverRate: 0.7
    },
    ecosystem: {
      preyPopulation: 100,
      predatorPopulation: 20,
      resourceLevel: 1000,
      birthRate: 0.3,
      deathRate: 0.1
    },
    photosynthesis: {
      lightIntensity: 100,
      co2Level: 400,
      temperature: 25,
      waterLevel: 80,
      chlorophyllLevel: 100
    }
  });

  const simulations = [
    {
      id: 'cell',
      name: 'Cell Biology',
      description: 'Explore cellular processes and organelle functions',
      color: '#FF6B9C'
    },
    {
      id: 'genetics',
      name: 'Genetics Lab',
      description: 'Study DNA, inheritance, and evolution',
      color: '#4D61FC'
    },
    {
      id: 'ecosystem',
      name: 'Ecosystem Dynamics',
      description: 'Simulate predator-prey relationships and population dynamics',
      color: '#22C55E'
    },
    {
      id: 'photosynthesis',
      name: 'Photosynthesis',
      description: 'Visualize the process of photosynthesis and factors affecting it',
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

    const drawCell = (t) => {
      const { temperature, pH, glucoseLevel, oxygenLevel, atp } = parameters.cell;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw cell membrane
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#FF6B9C';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw nucleus
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = '#FF6B9C44';
      ctx.fill();
      ctx.strokeStyle = '#FF6B9C';
      ctx.stroke();
      
      // Draw mitochondria
      for (let i = 0; i < 5; i++) {
        const angle = (t + i) * 0.5;
        const x = centerX + Math.cos(angle) * radius * 0.6;
        const y = centerY + Math.sin(angle) * radius * 0.6;
        
        ctx.beginPath();
        ctx.ellipse(x, y, 15, 8, angle, 0, 2 * Math.PI);
        ctx.fillStyle = '#FF6B9C33';
        ctx.fill();
        ctx.strokeStyle = '#FF6B9C';
        ctx.stroke();
      }

      // Draw ATP level indicator
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`ATP: ${atp}%`, 20, 30);
      ctx.fillText(`O₂: ${oxygenLevel}%`, 20, 50);
      ctx.fillText(`Glucose: ${glucoseLevel}%`, 20, 70);
      ctx.fillText(`pH: ${pH}`, 20, 90);
      ctx.fillText(`Temp: ${temperature}°C`, 20, 110);
    };

    const drawGenetics = (t) => {
      const { mutationRate, populationSize, generationTime, selectionPressure } = parameters.genetics;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw DNA double helix
      const startX = canvas.width * 0.2;
      const endX = canvas.width * 0.8;
      const centerY = canvas.height / 2;
      const amplitude = 50;
      const frequency = 0.02;
      
      ctx.beginPath();
      ctx.moveTo(startX, centerY);
      for (let x = startX; x <= endX; x++) {
        const y1 = centerY + Math.sin((x + t * 50) * frequency) * amplitude;
        ctx.lineTo(x, y1);
      }
      ctx.strokeStyle = '#4D61FC';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(startX, centerY);
      for (let x = startX; x <= endX; x++) {
        const y2 = centerY + Math.sin((x + t * 50) * frequency + Math.PI) * amplitude;
        ctx.lineTo(x, y2);
      }
      ctx.stroke();
      
      // Draw base pairs
      for (let x = startX; x <= endX; x += 30) {
        const y1 = centerY + Math.sin((x + t * 50) * frequency) * amplitude;
        const y2 = centerY + Math.sin((x + t * 50) * frequency + Math.PI) * amplitude;
        
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.strokeStyle = '#4D61FC44';
        ctx.stroke();
      }

      // Draw statistics
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`Population: ${populationSize}`, 20, 30);
      ctx.fillText(`Mutation Rate: ${mutationRate}`, 20, 50);
      ctx.fillText(`Generation: ${Math.floor(t)}`, 20, 70);
      ctx.fillText(`Selection Pressure: ${selectionPressure}`, 20, 90);
    };

    const drawEcosystem = (t) => {
      const { preyPopulation, predatorPopulation, resourceLevel, birthRate, deathRate } = parameters.ecosystem;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background (terrain)
      ctx.fillStyle = '#22C55E22';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw resources (plants)
      for (let i = 0; i < resourceLevel / 50; i++) {
        const x = Math.sin(i * 0.1 + t) * canvas.width * 0.4 + canvas.width * 0.5;
        const y = Math.cos(i * 0.1 + t) * canvas.height * 0.4 + canvas.height * 0.5;
        
        ctx.beginPath();
        ctx.moveTo(x, y + 15);
        ctx.lineTo(x - 5, y);
        ctx.lineTo(x + 5, y);
        ctx.closePath();
        ctx.fillStyle = '#22C55E';
        ctx.fill();
      }
      
      // Draw prey (circles)
      for (let i = 0; i < preyPopulation; i++) {
        const x = Math.sin(i * 0.5 + t) * canvas.width * 0.3 + canvas.width * 0.5;
        const y = Math.cos(i * 0.5 + t) * canvas.height * 0.3 + canvas.height * 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#4D61FC';
        ctx.fill();
      }
      
      // Draw predators (triangles)
      for (let i = 0; i < predatorPopulation; i++) {
        const x = Math.sin(i * 1.5 + t) * canvas.width * 0.2 + canvas.width * 0.5;
        const y = Math.cos(i * 1.5 + t) * canvas.height * 0.2 + canvas.height * 0.5;
        
        ctx.beginPath();
        ctx.moveTo(x, y - 8);
        ctx.lineTo(x - 8, y + 8);
        ctx.lineTo(x + 8, y + 8);
        ctx.closePath();
        ctx.fillStyle = '#FF6B9C';
        ctx.fill();
      }

      // Draw statistics
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`Prey: ${preyPopulation}`, 20, 30);
      ctx.fillText(`Predators: ${predatorPopulation}`, 20, 50);
      ctx.fillText(`Resources: ${resourceLevel}`, 20, 70);
      ctx.fillText(`Birth Rate: ${birthRate}`, 20, 90);
      ctx.fillText(`Death Rate: ${deathRate}`, 20, 110);
    };

    const drawPhotosynthesis = (t) => {
      const { lightIntensity, co2Level, temperature, waterLevel, chlorophyllLevel } = parameters.photosynthesis;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw leaf cross-section
      const leafWidth = canvas.width * 0.6;
      const leafHeight = canvas.height * 0.4;
      const startX = (canvas.width - leafWidth) / 2;
      const startY = (canvas.height - leafHeight) / 2;
      
      // Draw upper epidermis
      ctx.fillStyle = '#22C55E';
      ctx.fillRect(startX, startY, leafWidth, 20);
      
      // Draw lower epidermis
      ctx.fillStyle = '#22C55E';
      ctx.fillRect(startX, startY + leafHeight - 20, leafWidth, 20);
      
      // Draw mesophyll cells
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 3; j++) {
          const x = startX + i * (leafWidth / 8) + 10;
          const y = startY + j * 50 + 40;
          
          ctx.beginPath();
          ctx.ellipse(x, y, 30, 20, 0, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(34, 197, 94, ${chlorophyllLevel / 100})`;
          ctx.fill();
          ctx.strokeStyle = '#22C55E';
          ctx.stroke();
          
          // Draw chloroplasts
          for (let k = 0; k < 5; k++) {
            const angle = t + k * (Math.PI * 2 / 5);
            const cx = x + Math.cos(angle) * 10;
            const cy = y + Math.sin(angle) * 5;
            
            ctx.beginPath();
            ctx.ellipse(cx, cy, 4, 2, angle, 0, 2 * Math.PI);
            ctx.fillStyle = '#00D4FF';
            ctx.fill();
          }
        }
      }
      
      // Draw light rays
      ctx.strokeStyle = `rgba(255, 255, 0, ${lightIntensity / 100})`;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 30, startY);
        ctx.stroke();
      }
      
      // Draw CO2 and H2O molecules
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      for (let i = 0; i < co2Level / 50; i++) {
        const x = startX + Math.random() * leafWidth;
        const y = startY + Math.random() * leafHeight;
        ctx.fillText('CO₂', x, y);
      }
      
      for (let i = 0; i < waterLevel / 50; i++) {
        const x = startX + Math.random() * leafWidth;
        const y = startY + Math.random() * leafHeight;
        ctx.fillText('H₂O', x, y);
      }

      // Draw statistics
      ctx.fillStyle = '#fff';
      ctx.font = '16px Arial';
      ctx.fillText(`Light: ${lightIntensity}%`, 20, 30);
      ctx.fillText(`CO₂: ${co2Level} ppm`, 20, 50);
      ctx.fillText(`Temperature: ${temperature}°C`, 20, 70);
      ctx.fillText(`Water: ${waterLevel}%`, 20, 90);
      ctx.fillText(`Chlorophyll: ${chlorophyllLevel}%`, 20, 110);
    };

    const animate = () => {
      if (!isRunning) return;
      
      switch (selectedSimulation) {
        case 'cell':
          drawCell(time);
          break;
        case 'genetics':
          drawGenetics(time);
          break;
        case 'ecosystem':
          drawEcosystem(time);
          break;
        case 'photosynthesis':
          drawPhotosynthesis(time);
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
  }, [selectedSimulation, isRunning, parameters]);

  const handleParameterChange = (simulation, parameter, value) => {
    setParameters(prev => ({
      ...prev,
      [simulation]: {
        ...prev[simulation],
        [parameter]: parseFloat(value)
      }
    }));
  };

  const renderParameters = () => {
    const currentParams = parameters[selectedSimulation];
    return Object.entries(currentParams).map(([key, value]) => (
      <div key={key} className="parameter-control">
        <label htmlFor={key}>
          {key.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() + 
           key.split(/(?=[A-Z])/).join(' ').slice(1)}:
        </label>
        <input
          type="range"
          id={key}
          min={key.includes('Rate') ? 0 : key.includes('pH') ? 0 : key.includes('co2') ? 0 : 0}
          max={key.includes('Rate') ? 1 : key.includes('pH') ? 14 : key.includes('co2') ? 1000 : 100}
          step={key.includes('Rate') ? 0.1 : key.includes('pH') ? 0.1 : 1}
          value={value}
          onChange={(e) => handleParameterChange(selectedSimulation, key, e.target.value)}
        />
        <span>{value}{key.includes('Temperature') ? '°C' : key.includes('co2') ? ' ppm' : ''}</span>
      </div>
    ));
  };

  return (
    <div className="biology-explorer">
      <div className="explorer-header">
        <h1>Biology Explorer</h1>
        <p>Interactive biological systems and processes</p>
      </div>

      <div className="explorer-content">
        <div className="simulations-panel">
          <h3>Simulations</h3>
          <div className="simulation-buttons">
            {simulations.map(simulation => (
              <button
                key={simulation.id}
                className={`simulation-button ${selectedSimulation === simulation.id ? 'selected' : ''}`}
                onClick={() => setSelectedSimulation(simulation.id)}
                style={{ '--simulation-color': simulation.color }}
              >
                <span className="simulation-name">{simulation.name}</span>
                <span className="simulation-description">{simulation.description}</span>
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
              {isRunning ? 'Stop' : 'Start'} Simulation
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

        <div className="simulation-area">
          <canvas ref={canvasRef} className="simulation-canvas" />
        </div>
      </div>
    </div>
  );
};

export default BiologyExplorer; 