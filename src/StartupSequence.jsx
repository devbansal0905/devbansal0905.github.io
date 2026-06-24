import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StartupSequence({ onComplete }) {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const fullScript = `#!/usr/bin/env python3
import databricks_api
from cdp.architecture import DeltaLake, RedisHuey, LangGraph
from core.ingestion import ExponentialBackoff

def initialize_portfolio(candidate="Dev Bansal"):
    """
    Building massive distributed systems.
    """
    scale = "12 Billion+ Records"
    
    DeltaLake.enable_optimistic_concurrency(strategy="jitter")
    Kafka.start_dlt_streaming(rows_per_sec="Millions")
    LangGraph.deploy_multi_agent_scraper(healing=True)
    
    return True

if __name__ == "__main__":
    initialize_portfolio()
    print("SUCCESS: Portfolio Loaded.")
`;

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setText(fullScript.slice(0, i));
      i++;
      if (i > fullScript.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(onComplete, 1200); // Wait a moment, then complete
      }
    }, 15); // Fast typing speed

    return () => clearInterval(typingInterval);
  }, [fullScript, onComplete]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, boxSizing: 'border-box',
      backgroundColor: '#000', color: '#00ff00', fontFamily: 'monospace',
      padding: '1rem', zIndex: 9999, display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-start', alignItems: 'flex-start', overflow: 'hidden'
    }}>
      <pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 'clamp(0.7rem, 2.5vw, 1.2rem)' }}>
        {text}
        {isTyping && <span className="cursor-blink">_</span>}
      </pre>
    </div>
  );
}
