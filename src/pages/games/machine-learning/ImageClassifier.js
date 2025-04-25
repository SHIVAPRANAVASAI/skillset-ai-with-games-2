import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import './ImageClassifier.css';

const ImageClassifier = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, completed
  const [currentImage, setCurrentImage] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [debugInfo, setDebugInfo] = useState({ modelStatus: 'Not loaded', lastError: null });
  const canvasRef = useRef(null);

  // Load MobileNet model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setDebugInfo(prev => ({ ...prev, modelStatus: 'Loading model...' }));
        
        // First ensure TensorFlow.js is initialized
        await tf.ready();
        setDebugInfo(prev => ({ ...prev, modelStatus: 'TensorFlow.js ready, loading MobileNet...' }));
        
        const mobilenet = await tf.loadLayersModel(
          'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json'
        );
        
        setModel(mobilenet);
        setIsLoading(false);
        setDebugInfo(prev => ({ ...prev, modelStatus: 'Model loaded successfully' }));
      } catch (error) {
        console.error('Error loading model:', error);
        setDebugInfo(prev => ({ 
          ...prev, 
          modelStatus: 'Error loading model',
          lastError: error.message 
        }));
        setFeedback('Error loading ML model. Please try again.');
      }
    };
    loadModel();
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setDebugInfo(prev => ({ ...prev, gameState: 'playing' }));
    generateNewImage();
  };

  const generateNewImage = () => {
    // Using smaller, faster-loading images for testing
    const images = [
      { 
        url: 'https://i.imgur.com/2jYF11q.jpg', // Small cat image
        label: 'cat' 
      },
      { 
        url: 'https://i.imgur.com/dHM0Fh2.jpg', // Small dog image
        label: 'dog' 
      },
      { 
        url: 'https://i.imgur.com/7syHAcb.jpg', // Small bird image
        label: 'bird' 
      }
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImage);
    setDebugInfo(prev => ({ 
      ...prev, 
      currentImage: randomImage.label,
      imageLoading: true 
    }));
  };

  const classifyImage = async (imageElement) => {
    if (!model) {
      setDebugInfo(prev => ({ ...prev, lastError: 'Model not loaded' }));
      return;
    }

    try {
      setDebugInfo(prev => ({ ...prev, classification: 'Processing image...' }));
      
      const tfImg = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
      
      const prediction = await model.predict(tfImg).data();
      const top3 = Array.from(prediction)
        .map((p, i) => ({ probability: p, className: IMAGENET_CLASSES[i] }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3);

      setDebugInfo(prev => ({ 
        ...prev, 
        classification: 'Complete',
        predictions: top3.map(p => `${p.className}: ${(p.probability * 100).toFixed(1)}%`).join(', ')
      }));

      return top3;
    } catch (error) {
      console.error('Error classifying image:', error);
      setDebugInfo(prev => ({ 
        ...prev, 
        classification: 'Error',
        lastError: error.message 
      }));
      return null;
    }
  };

  const handleImageLoad = async (event) => {
    setDebugInfo(prev => ({ ...prev, imageLoading: false }));
    const predictions = await classifyImage(event.target);
    setPrediction(predictions);
  };

  const handleImageError = (error) => {
    setDebugInfo(prev => ({ 
      ...prev, 
      imageLoading: false,
      lastError: 'Failed to load image' 
    }));
    console.error('Image loading error:', error);
  };

  const handleGuess = async (userGuess) => {
    if (!currentImage || !prediction) return;

    const isCorrect = prediction.some(p => 
      p.className.toLowerCase().includes(currentImage.label.toLowerCase())
    );

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback('Correct! +10 points');
    } else {
      setFeedback('Incorrect. Try again!');
    }

    // Generate new image after short delay
    setTimeout(() => {
      if (score >= 50) {
        setGameState('completed');
      } else {
        generateNewImage();
      }
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="image-classifier loading">
        <h2>Loading ML Model...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="image-classifier">
      <div className="game-header">
        <h1>Image Classifier</h1>
        <p>Train your eye to spot patterns like a machine learning model!</p>
      </div>

      {/* Debug Panel */}
      <div className="debug-panel">
        <h3>Debug Information</h3>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>

      {gameState === 'waiting' && (
        <div className="start-screen">
          <h2>Ready to Play?</h2>
          <p>Classify images and compare your answers with our ML model.</p>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="game-content">
          <div className="score-display">
            Score: {score}
          </div>

          {currentImage && (
            <div className="image-container">
              <img
                src={currentImage.url}
                alt="Classify this"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          )}

          <div className="prediction-panel">
            {prediction && prediction.map((pred, index) => (
              <button
                key={index}
                className="prediction-button"
                onClick={() => handleGuess(pred.className)}
              >
                {pred.className} ({(pred.probability * 100).toFixed(1)}%)
              </button>
            ))}
          </div>

          {feedback && (
            <div className="feedback-message">
              {feedback}
            </div>
          )}
        </div>
      )}

      {gameState === 'completed' && (
        <div className="completion-screen">
          <h2>Game Complete! 🎉</h2>
          <p>Final Score: {score}</p>
          <button className="play-again-button" onClick={startGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

// ImageNet class names (abbreviated list)
const IMAGENET_CLASSES = [
  'cat', 'dog', 'bird', 'fish', 'horse',
  'elephant', 'bear', 'zebra', 'giraffe', 'penguin',
  'car', 'truck', 'bicycle', 'motorcycle', 'airplane',
  'boat', 'train', 'bus', 'traffic light', 'stop sign',
  // Add more classes as needed
];

export default ImageClassifier; 