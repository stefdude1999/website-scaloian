import React from 'react';
import Terminal from './components/Terminal';
import Footer from "./components/Footer";
import Header from "./components/Header"
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div class="container">
        <div className="terminal-container">
          <Terminal />
        </div>
        
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
