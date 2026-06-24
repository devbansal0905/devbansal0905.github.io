import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Zap, Sparkles } from 'lucide-react';
import './DataGravityOrb.css';

export default function DataGravityOrb() {
  const [facts, setFacts] = useState([
    { title: "DATABRICKS", subtitle: "Fetching insight...", icon: <Database size={16}/> },
    { title: "PYSPARK", subtitle: "Fetching insight...", icon: <Zap size={16}/> },
    { title: "UNITY CATALOG", subtitle: "Fetching insight...", icon: <Shield size={16}/> },
    { title: "LAKEFLOW", subtitle: "Fetching insight...", icon: <Sparkles size={16}/> }
  ]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchLiveFacts = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const prompt = `Give me exactly 4 very short, completely random advanced technical facts about Databricks, PySpark, Unity Catalog, or Data Engineering. Return ONLY a raw JSON array of 4 objects with 'title' (max 2 words) and 'subtitle' (max 6 words).`;
      
      const API_URL = import.meta.env.VITE_LLM_API_URL || "https://devbot-gemini-proxy.devbansal0905.workers.dev";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, history: [] })
      });
      const data = await response.json();
      let rawText = data.response.replace(/```json/g, '').replace(/```/g, '').trim();
      const newFacts = JSON.parse(rawText);
      if(newFacts && newFacts.length === 4) {
        setFacts(prev => prev.map((p, i) => ({ ...p, title: newFacts[i].title, subtitle: newFacts[i].subtitle })));
      }
    } catch (e) {
      console.error("Failed to fetch live facts:", e);
      setFacts([
        { title: "DATABRICKS", subtitle: "Auto Liquid Clustering GA", icon: <Database size={16}/> },
        { title: "PYSPARK", subtitle: "Native df.mergeInto() API", icon: <Zap size={16}/> },
        { title: "UNITY CATALOG", subtitle: "Attribute-Based Access Control", icon: <Shield size={16}/> },
        { title: "LAKEFLOW", subtitle: "Declarative Sub-second Streaming", icon: <Sparkles size={16}/> }
      ]);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <motion.div 
      className="orb-container"
      onViewportEnter={fetchLiveFacts}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="orb-system">
        
        {/* Central Core */}
        <div className="core-sphere">
          <div className="core-glow"></div>
          <div className="core-inner"></div>
        </div>

        {/* Orbital Rings */}
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>

        {/* Satellites */}
        {facts.map((fact, index) => (
          <div className={`satellite-wrapper sat-${index + 1}`} key={index}>
            <div className="satellite-content">
              <div className="sat-icon">{fact.icon}</div>
              <div className="sat-text">
                <div className="sat-title">{fact.title}</div>
                <div className="sat-subtitle">{fact.subtitle}</div>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </motion.div>
  );
}
