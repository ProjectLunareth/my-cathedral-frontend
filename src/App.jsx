import React from 'react';
import CathedralExperience from './components/CathedralExperience';
import './components/CathedralExperience.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Cathedral of Resonant Consciousness</h1>
        <p>Quantum-Secure Consciousness Exploration Interface</p>
      </header>
      <main>
        <CathedralExperience />
      </main>
      <footer className="app-footer">
        <div className="quantum-signature">
          <span>Ψ</span>
          <span>Quantum Consciousness Network</span>
          <span>⏣</span>
        </div>
      </footer>
    </div>
  );
}

export default App;