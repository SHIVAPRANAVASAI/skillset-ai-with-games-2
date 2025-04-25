// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/profile/Profile';
import AITutors from './pages/ai-learning/AITutors';
import Games from './pages/games/Games';

// Category Pages
import DSAGames from './pages/games/categories/DSAGames';
import MathGames from './pages/games/categories/MathGames';
import ElectronicsGames from './pages/games/categories/ElectronicsGames';
import MechanicalGames from './pages/games/categories/MechanicalGames';
import ChemicalGames from './pages/games/categories/ChemicalGames';
import CivilGames from './pages/games/categories/CivilGames';
import NetworkGames from './pages/games/categories/NetworkGames';
import EmbeddedGames from './pages/games/categories/EmbeddedGames';
import ScienceGames from './pages/games/categories/ScienceGames';
import LanguageGames from './pages/games/categories/LanguageGames';
import MLGames from './pages/games/categories/machine-learning';

// DSA Games
import SortingVisualizer from './pages/games/dsa-games/SortingVisualizer';
import BinarySearchTree from './pages/games/dsa-games/BinarySearchTree';
import GraphAlgorithms from './pages/games/dsa-games/GraphAlgorithms';
import NQueens from './pages/games/dsa-games/NQueens';
import HeapOperations from './pages/games/dsa-games/HeapOperations';
import PathfindingVisualizer from './pages/games/dsa-games/PathfindingVisualizer';
import DSAQuiz from './pages/games/dsa-games/DSAQuiz';
import DSAQuizLanding from './pages/games/dsa-games/DSAQuizLanding';
import NumberTheoryExplorer from './pages/games/math-games/NumberTheoryExplorer';
import GeometryQuest from './pages/games/math-games/GeometryQuest';
import LogicGateSimulator from './pages/games/electronics-games/LogicGateSimulator';
import CircuitBuilder from './pages/games/electronics-games/CircuitBuilder';
import CalculusExplorer from './pages/games/math-games/CalculusExplorer';
import LinearAlgebra from './pages/games/math-games/LinearAlgebra';
import Probability from './pages/games/math-games/Probability';
import CircuitSimulator from './pages/games/electronics-games/CircuitSimulator';
import LogicGates from './pages/games/electronics-games/LogicGates';
import DynamicsSimulator from './pages/games/mechanical-games/DynamicsSimulator';
import ThermodynamicsSimulator from './pages/games/mechanical-games/ThermodynamicsSimulator';
import MachineDesign from './pages/games/mechanical-games/MachineDesign';
import ChemicalReactionSimulator from './pages/games/chemical-games/ChemicalReactionSimulator';
import ProcessControlSimulator from './pages/games/chemical-games/ProcessControlSimulator';
import ProtocolSimulator from './pages/games/network-games/ProtocolSimulator';
import PacketTracer from './pages/games/network-games/PacketTracer';
import NetworkSecuritySimulator from './pages/games/network-games/NetworkSecuritySimulator';
import MicrocontrollerLab from './pages/games/embedded-games/MicrocontrollerLab';
import IoTSimulator from './pages/games/embedded-games/IoTSimulator';
import RTOSExplorer from './pages/games/embedded-games/RTOSExplorer';
import PhysicsLab from './pages/games/science-games/PhysicsLab';
import BiologyExplorer from './pages/games/science-games/BiologyExplorer';
import ChemistryLab from './pages/games/science-games/ChemistryLab';
import VocabularyBuilder from './pages/games/language-games/VocabularyBuilder';
import GrammarMaster from './pages/games/language-games/GrammarMaster';
import ConversationPractice from './pages/games/language-games/ConversationPractice';
import ImageClassifier from './pages/games/machine-learning/ImageClassifier';

import Quizzes from './pages/quizzes/Quizzes';
import Courses from './pages/courses/Courses';
import CourseDetail from './pages/courses/CourseDetail';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import Community from './pages/community/Community';
import StructuralAnalysis from './pages/games/civil-games/StructuralAnalysis';
import BridgeBuilder from './pages/games/civil-games/BridgeBuilder';
import TestFirestore from './components/TestFirestore';
import './App.css';

function App() {
  const [user] = useAuthState(auth);

  // Helper function to render protected routes
  const protectedRoute = (Component) => {
    return user ? <Component /> : <Login />;
  };

  return (
    <Router>
      <div className="app">
        <TestFirestore />
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={protectedRoute(Profile)} />
            <Route path="/ai-tutors" element={protectedRoute(AITutors)} />
            
            {/* Games Routes - Level 1 */}
            <Route path="/games" element={protectedRoute(Games)} />
            
            {/* Games Routes - Level 2 (Categories) */}
            <Route path="/games/categories/dsa" element={protectedRoute(DSAGames)} />
            <Route path="/games/categories/math" element={protectedRoute(MathGames)} />
            <Route path="/games/categories/electronics" element={protectedRoute(ElectronicsGames)} />
            <Route path="/games/categories/mechanical" element={protectedRoute(MechanicalGames)} />
            <Route path="/games/categories/chemical" element={protectedRoute(ChemicalGames)} />
            <Route path="/games/categories/civil" element={protectedRoute(CivilGames)} />
            <Route path="/games/categories/networks" element={protectedRoute(NetworkGames)} />
            <Route path="/games/categories/embedded" element={protectedRoute(EmbeddedGames)} />
            <Route path="/games/categories/science" element={protectedRoute(ScienceGames)} />
            <Route path="/games/categories/language" element={protectedRoute(LanguageGames)} />
            <Route path="/games/categories/machine-learning" element={protectedRoute(MLGames)} />
            
            {/* DSA Games */}
            <Route path="/games/dsa/sorting-visualizer" element={protectedRoute(SortingVisualizer)} />
            <Route path="/games/dsa/binary-search-tree" element={protectedRoute(BinarySearchTree)} />
            <Route path="/games/dsa/graph-algorithms" element={protectedRoute(GraphAlgorithms)} />
            <Route path="/games/dsa/n-queens-puzzle" element={protectedRoute(NQueens)} />
            <Route path="/games/dsa/heap-operations" element={protectedRoute(HeapOperations)} />
            <Route path="/games/dsa/pathfinding-visualizer" element={protectedRoute(PathfindingVisualizer)} />
            <Route path="/games/dsa/quiz" element={protectedRoute(DSAQuizLanding)} />
            <Route path="/games/dsa/quiz/start" element={protectedRoute(DSAQuiz)} />

            <Route path="/games/math/number-theory-explorer" element={protectedRoute(NumberTheoryExplorer)} />
            <Route path="/games/math/geometry-quest" element={protectedRoute(GeometryQuest)} />
            <Route path="/games/math/calculus-explorer" element={protectedRoute(CalculusExplorer)} />
            <Route path="/games/math/linear-algebra" element={protectedRoute(LinearAlgebra)} />
            <Route path="/games/math/probability" element={protectedRoute(Probability)} />
            <Route path="/games/electronics/logic-gates" element={protectedRoute(LogicGates)} />
            <Route path="/games/electronics/circuit-builder" element={protectedRoute(CircuitBuilder)} />
            <Route path="/games/electronics/circuit-simulator" element={protectedRoute(CircuitSimulator)} />
            <Route path="/games/mechanical/dynamics-simulator" element={protectedRoute(DynamicsSimulator)} />
            <Route path="/games/mechanical/thermodynamics-simulator" element={protectedRoute(ThermodynamicsSimulator)} />
            <Route path="/games/mechanical/machine-design" element={protectedRoute(MachineDesign)} />
            <Route path="/games/chemical/reaction-simulator" element={protectedRoute(ChemicalReactionSimulator)} />
            <Route path="/games/chemical/process-control" element={protectedRoute(ProcessControlSimulator)} />

            {/* Civil Games */}
            <Route path="/games/civil/structural-analysis" element={protectedRoute(StructuralAnalysis)} />
            <Route path="/games/civil/bridge-builder" element={protectedRoute(BridgeBuilder)} />

            {/* Network Games */}
            <Route path="/games/networks/protocol-simulator" element={protectedRoute(ProtocolSimulator)} />
            <Route path="/games/networks/packet-tracer" element={protectedRoute(PacketTracer)} />
            <Route path="/games/networks/network-security" element={protectedRoute(NetworkSecuritySimulator)} />

            {/* Embedded Games */}
            <Route path="/games/embedded/microcontroller-lab" element={protectedRoute(MicrocontrollerLab)} />
            <Route path="/games/embedded/iot-simulator" element={protectedRoute(IoTSimulator)} />
            <Route path="/games/embedded/rtos-explorer" element={protectedRoute(RTOSExplorer)} />

            {/* Science Games */}
            <Route path="/games/science/physics" element={protectedRoute(PhysicsLab)} />
            <Route path="/games/science/biology" element={protectedRoute(BiologyExplorer)} />
            <Route path="/games/science/chemistry" element={protectedRoute(ChemistryLab)} />

            {/* Language Games */}
            <Route path="/games/language/vocabulary-builder" element={protectedRoute(VocabularyBuilder)} />
            <Route path="/games/language/grammar" element={protectedRoute(GrammarMaster)} />
            <Route path="/games/language/conversation" element={protectedRoute(ConversationPractice)} />

            {/* Machine Learning Games */}
            <Route path="/games/machine-learning/image-classifier" element={protectedRoute(ImageClassifier)} />

            <Route path="/quizzes" element={protectedRoute(Quizzes)} />
            <Route path="/instructor" element={<InstructorDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
