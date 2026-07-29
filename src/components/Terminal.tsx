import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/terminal.css';

interface TerminalLine {
  cmd: string;
  res: string;
}

const commands: TerminalLine[] = [
  { cmd: '> whoami', res: 'Saideepthi Kummari' },
  { cmd: '> cat skills.txt', res: 'Full Stack Dev | AI/ML | Cybersecurity' },
  { cmd: '> echo $STATUS', res: 'Looking for internship opportunities! 🚀' }
];

const Terminal = () => {
  const [lines, setLines] = useState<{ cmd: string; res: string; isComplete: boolean; currentText: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= commands.length) return;

    const currentCmd = commands[currentLineIndex].cmd;
    let charIndex = 0;

    // Initialize the line if it doesn't exist
    if (!lines[currentLineIndex]) {
      setLines((prev) => [
        ...prev,
        { cmd: currentCmd, res: commands[currentLineIndex].res, isComplete: false, currentText: '' }
      ]);
    }

    const typeInterval = setInterval(() => {
      if (charIndex <= currentCmd.length) {
        setLines((prev) => {
          const newLines = [...prev];
          if (newLines[currentLineIndex]) {
            newLines[currentLineIndex].currentText = currentCmd.substring(0, charIndex);
          }
          return newLines;
        });
        charIndex++;
      } else {
        clearInterval(typeInterval);
        
        // Command typed, now show response and move to next line
        setTimeout(() => {
          setLines((prev) => {
            const newLines = [...prev];
            if (newLines[currentLineIndex]) {
              newLines[currentLineIndex].isComplete = true;
            }
            return newLines;
          });
          setCurrentLineIndex((prev) => prev + 1);
        }, 500); // Wait before showing next line
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentLineIndex]);

  return (
    <motion.div 
      className="terminal-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <div className="terminal-title">saideepthi@portfolio ~ %</div>
      </div>
      <div className="terminal-body">
        {lines.map((line, index) => (
          <div key={index} className="terminal-line">
            <div className="terminal-command">
              {line.currentText}
              {index === currentLineIndex && !line.isComplete && <span className="terminal-cursor"></span>}
            </div>
            {line.isComplete && (
              <div className="terminal-response">{line.res}</div>
            )}
          </div>
        ))}
        {currentLineIndex >= commands.length && (
          <div className="terminal-command">
            {'> '}<span className="terminal-cursor"></span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;
