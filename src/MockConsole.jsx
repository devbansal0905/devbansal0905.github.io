import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MockConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'res', text: "Databricks PySpark Mock Console (v9.1 LTS)" },
    { type: 'res', text: "Type 'help' for a list of available commands." }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on ~ or ` key
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = '';

      if (cmd === 'help') {
        response = "Available commands:\n  SELECT * FROM cdp_metrics;\n  whoami\n  status\n  deploy\n  analyze\n  clear";
      } else if (cmd === 'whoami') {
        response = "Dev Bansal - Databricks Certified Data Engineer\nClearance Level: OMEGA";
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'status') {
        response = "[SYSTEM HEALTH]\nCluster: 12/12 Active Nodes\nMemory Utilized: 84%\nDelta Live Tables: Streaming (2.1M Rows/s)\nUnity Catalog: Synced";
      } else if (cmd.startsWith('sudo')) {
        response = "<span style='color: #ef4444'>[!] ACCESS DENIED. INCIDENT LOGGED.</span>";
      } else if (cmd === 'deploy') {
        response = "Initializing CI/CD Pipeline...\nBuilding artifacts [██████████] 100%\nPushing to Databricks Workspace...\nStarting Job Cluster...\n[SUCCESS] Pipeline deployed to PROD.";
      } else if (cmd === 'analyze') {
        response = "Initializing Splink ML Engine...\nEpoch 1: Loss 0.45\nEpoch 2: Loss 0.21\nEpoch 3: Loss 0.08\n[DONE] Model converged. Golden records survived: 4,501,230";
      } else if (cmd === 'select * from cdp_metrics;' || cmd === 'select * from cdp_metrics') {
        response = `
+--------------------+----------------+------------------+
| metric_name        | value          | status           |
+--------------------+----------------+------------------+
| Total_Records      | 12,450,000,000 | HEALTHY          |
| Ingestion_Rows_Sec | 2,100,000      | SCALING          |
| Splink_Runtime_Cut | 80%            | OPTIMIZED        |
| API_Dropped_Reqs   | 0              | EXP_BACKOFF_ACTV |
+--------------------+----------------+------------------+
`;
      } else if (cmd !== '') {
        response = `Command not found: ${input}. Type 'help' for available commands.`;
      }

      // Allow HTML in terminal output for colors like red
      setHistory(prev => [...prev, {type: 'cmd', text: `> ${input}`}, {type: 'res', text: response}].filter(item => item.text));
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '50vh',
            backgroundColor: 'rgba(0, 10, 20, 0.95)', borderBottom: '2px solid #00ffcc',
            color: '#00ffcc', fontFamily: 'monospace', padding: '1rem', zIndex: 10000,
            overflowY: 'auto', display: 'flex', flexDirection: 'column'
          }}
        >
          <div style={{ flex: 1 }}>
            {history.map((line, i) => (
              <pre 
                key={i} 
                style={{ margin: '0.2rem 0', whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: typeof line === 'string' ? line : line.text }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', marginTop: '0.5rem' }}>
            <span style={{ marginRight: '0.5rem' }}>&gt;</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleCommand}
              style={{
                flex: 1, background: 'transparent', border: 'none', color: '#00ffcc',
                outline: 'none', fontFamily: 'monospace', fontSize: '1rem'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
