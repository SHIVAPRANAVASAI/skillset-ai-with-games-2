import React, { useState, useEffect } from 'react';
import './CalculusExplorer.css';

const CalculusExplorer = () => {
  const [selectedTopic, setSelectedTopic] = useState('derivatives');
  const [inputFunction, setInputFunction] = useState('x^2');
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const topics = [
    { id: 'derivatives', name: 'Derivatives', icon: '📈' },
    { id: 'integrals', name: 'Integrals', icon: '📊' },
    { id: 'limits', name: 'Limits', icon: '🔍' }
  ];

  const generateGraphData = (func, topic) => {
    const data = [];
    for (let x = -10; x <= 10; x += 0.1) {
      let y;
      try {
        // Simple evaluation for demonstration
        if (topic === 'derivatives') {
          y = eval(func.replace('x', x)) * 2; // Simple derivative approximation
        } else if (topic === 'integrals') {
          y = eval(func.replace('x', x)) * x; // Simple integral approximation
        } else {
          y = eval(func.replace('x', x));
        }
        data.push({ x, y });
      } catch (e) {
        console.error('Error evaluating function:', e);
      }
    }
    return data;
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setGraphData(generateGraphData(inputFunction, selectedTopic));
      setIsLoading(false);
    }, 500);
  }, [inputFunction, selectedTopic]);

  return (
    <div className="calculus-explorer">
      <div className="explorer-header">
        <h1>Calculus Explorer</h1>
        <p>Visualize and understand calculus concepts interactively</p>
      </div>

      <div className="explorer-content">
        <div className="topics-panel">
          {topics.map(topic => (
            <button
              key={topic.id}
              className={`topic-button ${selectedTopic === topic.id ? 'active' : ''}`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <span className="topic-icon">{topic.icon}</span>
              {topic.name}
            </button>
          ))}
        </div>

        <div className="input-panel">
          <h3>Enter Function</h3>
          <input
            type="text"
            value={inputFunction}
            onChange={(e) => setInputFunction(e.target.value)}
            placeholder="e.g., x^2, sin(x), cos(x)"
          />
          <div className="function-preview">
            f(x) = {inputFunction}
          </div>
        </div>

        <div className="visualization-panel">
          {isLoading ? (
            <div className="loading">Generating visualization...</div>
          ) : (
            <div className="graph-container">
              {graphData.map((point, index) => (
                <div
                  key={index}
                  className="graph-point"
                  style={{
                    left: `${((point.x + 10) / 20) * 100}%`,
                    bottom: `${((point.y + 10) / 20) * 100}%`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="explanation-panel">
          <h3>Explanation</h3>
          {selectedTopic === 'derivatives' && (
            <p>
              The derivative represents the rate of change of a function. 
              Here you can see how the slope of the tangent line changes as x changes.
            </p>
          )}
          {selectedTopic === 'integrals' && (
            <p>
              The integral represents the area under the curve. 
              Here you can visualize how the area accumulates as x changes.
            </p>
          )}
          {selectedTopic === 'limits' && (
            <p>
              A limit describes the value that a function approaches as the input approaches some value.
              Here you can see how the function behaves near specific points.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculusExplorer; 