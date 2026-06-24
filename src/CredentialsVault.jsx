import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, CheckCircle } from 'lucide-react';
import './CredentialsVault.css';

const credentials = [
  { title: "Databricks Certified", subtitle: "Data Engineer Associate", id: "DBX-DE-ASSOC", status: "VERIFIED" },
  { title: "Apache Spark", subtitle: "Programming with Databricks", id: "DBX-SPARK-PRG", status: "VERIFIED" },
  { title: "Scalable ML", subtitle: "with Apache Spark (V2)", id: "DBX-ML-V2", status: "VERIFIED" }
];

export default function CredentialsVault() {
  return (
    <div className="vault-container">
      <h3 className="vault-header"><Lock size={18}/> SECURITY_CLEARANCE // CREDENTIALS</h3>
      <div className="vault-grid">
        {credentials.map((cred, i) => (
          <motion.div 
            className="cred-card"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
            style={{ perspective: 1000 }}
          >
            <div className="cred-hologram"></div>
            <div className="cred-top">
              <Award size={32} color="#06b6d4" />
              <div className="cred-status"><CheckCircle size={12}/> {cred.status}</div>
            </div>
            <div className="cred-body">
              <div className="cred-title">{cred.title}</div>
              <div className="cred-subtitle">{cred.subtitle}</div>
            </div>
            <div className="cred-footer">
              <span className="cred-id">{cred.id}</span>
              <span className="cred-date">EXP: NEVER</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
