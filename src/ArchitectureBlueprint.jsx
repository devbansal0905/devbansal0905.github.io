import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, ShieldCheck, Activity, Cpu } from 'lucide-react';
import './ArchitectureBlueprint.css';

export default function ArchitectureBlueprint() {
  return (
    <div className="blueprint-container">
      <div className="blueprint-header">
        <ShieldCheck size={24} color="#06b6d4" />
        <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)' }}>SYSTEM_ARCHITECTURE_v2.4</h3>
      </div>
      
      <div className="blueprint-grid">
        {/* Ingestion Layer */}
        <div className="bp-layer">
          <div className="bp-title">INGESTION_LAYER</div>
          <motion.div className="bp-node" whileHover={{ scale: 1.05 }}>
            <Zap size={20} color="#3b82f6" /> Kafka Streams
          </motion.div>
          <motion.div className="bp-node" whileHover={{ scale: 1.05 }}>
            <Activity size={20} color="#3b82f6" /> REST APIs
          </motion.div>
        </div>

        {/* Pipeline Arrows */}
        <div className="bp-connector">
          <svg className="flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="25" x2="100" y2="50" className="animated-line" />
            <line x1="0" y1="75" x2="100" y2="50" className="animated-line" />
          </svg>
        </div>

        {/* Delta Lake Layer */}
        <div className="bp-layer core-lake">
          <div className="bp-title" style={{ color: '#06b6d4' }}>DELTA_LAKEHOUSE</div>
          <div className="medallion-ring">
            <motion.div className="bp-node bronze" whileHover={{ scale: 1.05 }}>Bronze</motion.div>
            <motion.div className="bp-node silver" whileHover={{ scale: 1.05 }}>Silver</motion.div>
            <motion.div className="bp-node gold" whileHover={{ scale: 1.05 }}>Gold</motion.div>
          </div>
        </div>

        {/* Pipeline Arrows */}
        <div className="bp-connector">
          <svg className="flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="50" x2="100" y2="25" className="animated-line delay-1" />
            <line x1="0" y1="50" x2="100" y2="75" className="animated-line delay-2" />
          </svg>
        </div>

        {/* Serving Layer */}
        <div className="bp-layer">
          <div className="bp-title">SERVING_LAYER</div>
          <motion.div className="bp-node serving" whileHover={{ scale: 1.05 }}>
            <Database size={20} color="#10b981" /> Unity Catalog
          </motion.div>
          <motion.div className="bp-node serving" whileHover={{ scale: 1.05 }}>
            <Cpu size={20} color="#8b5cf6" /> ML Inference
          </motion.div>
        </div>
      </div>
      
      <div className="blueprint-overlay"></div>
    </div>
  );
}
