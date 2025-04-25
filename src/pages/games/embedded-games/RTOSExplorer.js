import React, { useState, useRef, useEffect } from 'react';
import './RTOSExplorer.css';

const RTOSExplorer = () => {
  const canvasRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [schedulerType, setSchedulerType] = useState('round-robin');
  const [timeSlice, setTimeSlice] = useState(100);
  const [taskCount, setTaskCount] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const schedulerTypes = [
    {
      id: 'round-robin',
      name: 'Round Robin',
      description: 'Each task gets equal time slice'
    },
    {
      id: 'priority',
      name: 'Priority Based',
      description: 'Tasks run based on priority levels'
    },
    {
      id: 'preemptive',
      name: 'Preemptive',
      description: 'Higher priority tasks can preempt lower ones'
    }
  ];

  const createTask = (priority = 1) => {
    const newTask = {
      id: `task-${taskCount}`,
      name: `Task ${taskCount}`,
      priority,
      state: 'ready',
      executionTime: Math.floor(Math.random() * 500) + 100,
      remainingTime: 0,
      x: Math.random() * (canvasSize.width - 150) + 50,
      y: Math.random() * (canvasSize.height - 100) + 50,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    };
    setTasks([...tasks, newTask]);
    setTaskCount(taskCount + 1);
  };

  const drawTasks = (ctx, canvas) => {
    if (!ctx || !canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Draw tasks
    tasks.forEach(task => {
      // Draw task body
      ctx.fillStyle = task.state === 'running' ? '#00FF00' : task.color;
      ctx.fillRect(task.x, task.y, 100, 60);
      
      // Draw task border
      ctx.strokeStyle = selectedTask === task.id ? '#00979D' : '#666';
      ctx.lineWidth = 2;
      ctx.strokeRect(task.x, task.y, 100, 60);
      
      // Draw task name
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(task.name, task.x + 50, task.y + 20);
      
      // Draw task state
      ctx.font = '10px Arial';
      ctx.fillText(`State: ${task.state}`, task.x + 50, task.y + 35);
      
      // Draw task priority
      ctx.fillText(`Priority: ${task.priority}`, task.x + 50, task.y + 50);
    });
  };

  const simulateRTOS = () => {
    setIsRunning(true);
    setOutput('Starting RTOS simulation...\n');
    
    let currentTime = 0;
    const simulationInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(simulationInterval);
        return;
      }

      currentTime += 10;
      
      // Update task states based on scheduler type
      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks];
        
        if (schedulerType === 'round-robin') {
          // Round-robin scheduling
          const activeTaskIndex = updatedTasks.findIndex(t => t.state === 'running');
          if (activeTaskIndex === -1 || currentTime % timeSlice === 0) {
            // Switch to next task
            const nextTaskIndex = (activeTaskIndex + 1) % updatedTasks.length;
            if (activeTaskIndex !== -1) {
              updatedTasks[activeTaskIndex].state = 'ready';
            }
            updatedTasks[nextTaskIndex].state = 'running';
            setOutput(prev => prev + `Task switch: ${updatedTasks[nextTaskIndex].name}\n`);
          }
        } else if (schedulerType === 'priority') {
          // Priority-based scheduling
          const highestPriorityTask = updatedTasks.reduce((highest, current) => {
            if (current.priority > (highest?.priority || 0)) {
              return current;
            }
            return highest;
          }, null);
          
          updatedTasks.forEach(task => {
            task.state = task.id === highestPriorityTask.id ? 'running' : 'ready';
          });
        } else if (schedulerType === 'preemptive') {
          // Preemptive scheduling
          const highestPriorityTask = updatedTasks.reduce((highest, current) => {
            if (current.priority > (highest?.priority || 0)) {
              return current;
            }
            return highest;
          }, null);
          
          updatedTasks.forEach(task => {
            if (task.state === 'running' && task.id !== highestPriorityTask.id) {
              task.state = 'ready';
              setOutput(prev => prev + `Task preempted: ${task.name}\n`);
            }
          });
          
          highestPriorityTask.state = 'running';
        }

        return updatedTasks;
      });

      if (currentTime >= 1000) {
        clearInterval(simulationInterval);
        setIsRunning(false);
        setOutput(prev => prev + 'Simulation completed\n');
      }
    }, 100);
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a task
    const clickedTask = tasks.find(task => 
      x >= task.x && x <= task.x + 100 &&
      y >= task.y && y <= task.y + 60
    );

    if (clickedTask) {
      setSelectedTask(clickedTask.id);
    } else {
      setSelectedTask(null);
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
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });
      
      drawTasks(ctx, canvas);
    };

    // Initial resize
    resizeCanvas();
    
    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Redraw when tasks or selected task changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawTasks(ctx, canvas);
  }, [tasks, selectedTask]);

  return (
    <div className="rtos-explorer">
      <div className="explorer-header">
        <h1>RTOS Explorer</h1>
        <p>Explore real-time operating system concepts and scheduling algorithms</p>
      </div>

      <div className="explorer-content">
        <div className="controls-panel">
          <div className="scheduler-selection">
            <h3>Select Scheduler</h3>
            <div className="scheduler-buttons">
              {schedulerTypes.map(scheduler => (
                <button
                  key={scheduler.id}
                  className={`scheduler-button ${schedulerType === scheduler.id ? 'selected' : ''}`}
                  onClick={() => setSchedulerType(scheduler.id)}
                >
                  <span className="scheduler-name">{scheduler.name}</span>
                  <span className="scheduler-description">{scheduler.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="task-controls">
            <h3>Task Controls</h3>
            <div className="control-buttons">
              <button
                className="add-button"
                onClick={() => createTask(Math.floor(Math.random() * 5) + 1)}
              >
                Add Task
              </button>
              <button
                className="clear-button"
                onClick={() => {
                  setTasks([]);
                  setTaskCount(0);
                  setOutput('');
                }}
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="simulation-controls">
            <h3>Simulation Controls</h3>
            <div className="time-slice-control">
              <label>Time Slice (ms):</label>
              <input
                type="number"
                value={timeSlice}
                onChange={(e) => setTimeSlice(parseInt(e.target.value))}
                min="10"
                max="1000"
                step="10"
              />
            </div>
            <div className="control-buttons">
              <button
                className="run-button"
                onClick={simulateRTOS}
                disabled={isRunning || tasks.length === 0}
              >
                {isRunning ? 'Running...' : 'Run Simulation'}
              </button>
              <button
                className="stop-button"
                onClick={() => setIsRunning(false)}
                disabled={!isRunning}
              >
                Stop
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
          />
        </div>
      </div>
    </div>
  );
};

export default RTOSExplorer; 