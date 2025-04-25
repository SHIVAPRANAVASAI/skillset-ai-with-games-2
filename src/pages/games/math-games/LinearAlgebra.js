import React, { useState } from 'react';
import './LinearAlgebra.css';

const LinearAlgebra = () => {
  const [selectedOperation, setSelectedOperation] = useState('matrix-multiplication');
  const [matrixA, setMatrixA] = useState([
    [1, 2],
    [3, 4]
  ]);
  const [matrixB, setMatrixB] = useState([
    [5, 6],
    [7, 8]
  ]);
  const [result, setResult] = useState(null);
  const [vectorA, setVectorA] = useState({ x: 1, y: 2 });
  const [vectorB, setVectorB] = useState({ x: 3, y: 1 });

  const operations = [
    { id: 'matrix-multiplication', name: 'Matrix Multiplication', icon: '×' },
    { id: 'vector-addition', name: 'Vector Addition', icon: '+' },
    { id: 'dot-product', name: 'Dot Product', icon: '•' }
  ];

  const multiplyMatrices = (a, b) => {
    const result = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < a[0].length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  };

  const addVectors = (a, b) => {
    return {
      x: a.x + b.x,
      y: a.y + b.y
    };
  };

  const calculateDotProduct = (a, b) => {
    return a.x * b.x + a.y * b.y;
  };

  const handleMatrixInput = (matrix, row, col, value) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = Number(value) || 0;
    return newMatrix;
  };

  const handleVectorInput = (vector, axis, value) => {
    return {
      ...vector,
      [axis]: Number(value) || 0
    };
  };

  const performOperation = () => {
    if (selectedOperation === 'matrix-multiplication') {
      setResult(multiplyMatrices(matrixA, matrixB));
    } else if (selectedOperation === 'vector-addition') {
      setResult(addVectors(vectorA, vectorB));
    } else if (selectedOperation === 'dot-product') {
      setResult(calculateDotProduct(vectorA, vectorB));
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (selectedOperation === 'matrix-multiplication' && Array.isArray(result)) {
      return (
        <div className="matrix-result">
          {result.map((row, i) => (
            <div key={i} className="matrix-row">
              {row.map((cell, j) => (
                <span key={j}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      );
    } else if (selectedOperation === 'vector-addition' && typeof result === 'object') {
      return (
        <div className="vector-result">
          <span>Resultant Vector: ({result.x}, {result.y})</span>
        </div>
      );
    } else if (selectedOperation === 'dot-product' && typeof result === 'number') {
      return (
        <div className="scalar-result">
          <span>Dot Product: {result}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="linear-algebra">
      <div className="game-header">
        <h1>Linear Algebra Explorer</h1>
        <p>Visualize and practice linear algebra concepts</p>
      </div>

      <div className="game-content">
        <div className="operations-panel">
          {operations.map(operation => (
            <button
              key={operation.id}
              className={`operation-button ${selectedOperation === operation.id ? 'active' : ''}`}
              onClick={() => setSelectedOperation(operation.id)}
            >
              <span className="operation-icon">{operation.icon}</span>
              {operation.name}
            </button>
          ))}
        </div>

        <div className="input-panel">
          {selectedOperation === 'matrix-multiplication' ? (
            <div className="matrix-input">
              <div className="matrix-container">
                <h3>Matrix A</h3>
                {matrixA.map((row, i) => (
                  <div key={i} className="matrix-row">
                    {row.map((cell, j) => (
                      <input
                        key={j}
                        type="number"
                        value={cell}
                        onChange={(e) => setMatrixA(handleMatrixInput(matrixA, i, j, e.target.value))}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="matrix-container">
                <h3>Matrix B</h3>
                {matrixB.map((row, i) => (
                  <div key={i} className="matrix-row">
                    {row.map((cell, j) => (
                      <input
                        key={j}
                        type="number"
                        value={cell}
                        onChange={(e) => setMatrixB(handleMatrixInput(matrixB, i, j, e.target.value))}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="vector-input">
              <div className="vector-container">
                <h3>Vector A</h3>
                <div className="vector-coordinates">
                  <input
                    type="number"
                    value={vectorA.x}
                    onChange={(e) => setVectorA(handleVectorInput(vectorA, 'x', e.target.value))}
                    placeholder="x"
                  />
                  <input
                    type="number"
                    value={vectorA.y}
                    onChange={(e) => setVectorA(handleVectorInput(vectorA, 'y', e.target.value))}
                    placeholder="y"
                  />
                </div>
              </div>
              <div className="vector-container">
                <h3>Vector B</h3>
                <div className="vector-coordinates">
                  <input
                    type="number"
                    value={vectorB.x}
                    onChange={(e) => setVectorB(handleVectorInput(vectorB, 'x', e.target.value))}
                    placeholder="x"
                  />
                  <input
                    type="number"
                    value={vectorB.y}
                    onChange={(e) => setVectorB(handleVectorInput(vectorB, 'y', e.target.value))}
                    placeholder="y"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="calculate-button" onClick={performOperation}>
          Calculate
        </button>

        <div className="result-panel">
          <h3>Result</h3>
          {renderResult()}
        </div>

        <div className="visualization-panel">
          {selectedOperation !== 'matrix-multiplication' && (
            <div className="vector-visualization">
              <div className="vector-a" style={{
                transform: `translate(${Number(vectorA.x) * 20}px, ${-Number(vectorA.y) * 20}px)`
              }}></div>
              <div className="vector-b" style={{
                transform: `translate(${Number(vectorB.x) * 20}px, ${-Number(vectorB.y) * 20}px)`
              }}></div>
              {result && selectedOperation === 'vector-addition' && (
                <div className="resultant-vector" style={{
                  transform: `translate(${Number(result.x) * 20}px, ${-Number(result.y) * 20}px)`
                }}></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinearAlgebra; 