import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import './Terminal.css';
import FileExplorer from './FileExplorer';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileExplorer = FileExplorer();
  const terminalRef = useRef(null);

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleStop = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const executeCommand = (command) => {
    const [cmd, ...args] = command.trim().split(' ');
    switch (cmd) {
      case 'ls':
        return fileExplorer.ls();
      case 'pwd':
        return fileExplorer.currentDirectory;
      case 'cat':
        return fileExplorer.readFile(args[0]);
      case 'cd':
        return fileExplorer.changeDirectory(args[0]);
      default:
        return `Command not found: ${cmd}`;
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      setOutput([...output, { type: 'input', value: command }]);
      const commandOutput = executeCommand(command);
      setOutput([...output, { type: 'output', value: `user@stefanswebsite ~ % ${command}` }, { type: 'output', value: commandOutput }]);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <Draggable
      handle=".terminal-header"
      onStart={handleStart}
      onStop={handleStop}
      defaultClassName={isDragging ? 'terminal-dragging' : ''}
    >
      <div className="terminal" ref={terminalRef}>
        <div className="terminal-header">
          <div className="traffic-light-container">
            <div className="traffic-light red"></div>
            <div className="traffic-light yellow"></div>
            <div className="traffic-light green"></div>
          </div>
          user@stefanswebsite - zsh
        </div>
        {output.map((item, index) => (
          <div key={index} className={item.type}>
            {item.value}
          </div>
        ))}
        <div className="input">
          <span>user@stefanswebsite ~ %</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleEnterPress}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default Terminal;
