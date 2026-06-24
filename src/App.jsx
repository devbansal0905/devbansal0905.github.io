import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Database, Server, GitMerge, Activity, Zap, ShieldAlert, Cpu, ArrowDown, Bot, LayoutTemplate, TerminalSquare, AlertCircle } from 'lucide-react';
import ChatWidget from './ChatWidget';
import MockConsole from './MockConsole';
import SkillGraph from './SkillGraph';
import StartupSequence from './StartupSequence';
import GlitchText from './GlitchText';
import ArchitectureBlueprint from './ArchitectureBlueprint';
import CredentialsVault from './CredentialsVault';
import DataGravityOrb from './DataGravityOrb';
import './App.css';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function App() {
  const [started, setStarted] = useState(false);
  const [architectMode, setArchitectMode] = useState(false);
  
  // Scroll Progress Hook
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (architectMode) {
      document.body.classList.add('architect-mode');
    } else {
      document.body.classList.remove('architect-mode');
    }
  }, [architectMode]);

  if (!started) {
    return <StartupSequence onComplete={() => setStarted(true)} />;
  }

  return (
    <>
    <div className="app-container animate-fade-in" style={{ position: 'relative' }}>
      
      {/* Zigzag Background Scroll Tracker */}
      <svg className="scroll-zigzag" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="zigGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 50 0 L 50 8 L 85 15 L 85 25 L 15 35 L 15 45 L 85 55 L 85 65 L 15 75 L 15 85 L 50 95 L 50 100"
          vectorEffect="non-scaling-stroke"
          fill="none"
          stroke="url(#zigGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: scaleY, opacity: 0.6 }}
        />
      </svg>

      <MockConsole />
      
      {/* System Status Ticker */}
      <div className="system-ticker">
        <div className="ticker-content">
          SYSTEM STATUS: HEALTHY &nbsp;|&nbsp; 12.4B RECORDS INDEXED &nbsp;|&nbsp; IDENTITY RESOLUTION LATENCY: &lt; 150ms &nbsp;|&nbsp; API DROPPED REQUESTS: 0 &nbsp;|&nbsp; DLT STREAM: 2.1M ROWS/SEC &nbsp;|&nbsp; ACTIVE WORKFLOWS: 42
        </div>
      </div>

      <nav>
        <div className="container nav-content">
          <a href="#" className="logo">Dev Bansal</a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#deep-dives">Deep Dives</a>
            <button 
              className="toggle-btn" 
              onClick={() => setArchitectMode(!architectMode)}
              title="Toggle Architect Blueprint Mode"
            >
              <TerminalSquare size={18} />
              {architectMode ? 'Standard Mode' : 'Architect Mode'}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-section container" id="about">
          <div className="glow"></div>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="badge"><GlitchText text="DATABRICKS CERTIFIED DATA ENGINEER" delay={200} /></div>
            <h1>
              <GlitchText text="ARCHITECTING MASSIVE" delay={500} />
              <br />
              <span style={{color: 'var(--accent-primary)', textShadow: '0 0 20px rgba(6, 182, 212, 0.5)'}}>
                <GlitchText text="DISTRIBUTED SYSTEMS" delay={1000} />
              </span>
            </h1>
            <p style={{ maxWidth: '700px', margin: '0 auto 3rem auto', fontSize: '1.1rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              &gt; <GlitchText text="Specializing in highly concurrent backend APIs, robust Identity Resolution frameworks, and event-driven PySpark pipelines over Delta Lake architectures. Building systems that process billions of records without breaking a sweat." delay={1500} />
              <span className="cursor-blink" style={{color: 'var(--accent-primary)'}}>_</span>
            </p>
            <motion.a  
              href="#deep-dives"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ display: 'inline-block', color: 'var(--accent-primary)' }}
            >
              <ArrowDown size={32} />
            </motion.a>
          </motion.div>
        </section>

        {/* Impact Metrics */}
        <section className="section" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
          <div className="container">
            <motion.div 
              className="grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div className="glass-card metric-card" variants={scaleUp}>
                <Activity className="case-study-icon" size={48} style={{ margin: '0 auto 1.5rem auto' }} />
                <div className="metric-value">12B+</div>
                <div className="metric-label">Sales Transactions Processed</div>
              </motion.div>
              
              <motion.div className="glass-card metric-card" variants={scaleUp}>
                <Zap className="case-study-icon" size={48} style={{ margin: '0 auto 1.5rem auto' }} />
                <div className="metric-value">80%</div>
                <div className="metric-label">Runtime Reduction in ML Identity Resolution</div>
              </motion.div>

              <motion.div className="glass-card metric-card" variants={scaleUp}>
                <Database className="case-study-icon" size={48} style={{ margin: '0 auto 1.5rem auto' }} />
                <div className="metric-value">2M+</div>
                <div className="metric-label">Rows/Sec Real-Time DLT Ingestion</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Experience */}
        <section className="section" id="experience">
          <div className="container">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              Professional Experience
            </motion.h2>
            
            <div className="timeline">
              <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn}>
                <div className="timeline-dot"></div>
                <div className="glass-card">
                  <h3>Celebal Technologies</h3>
                  <div className="badge">Data Engineer | Python Backend Developer</div>
                  <p>Lead architect for the Customer Data Platform (CDP) backend and Databricks orchestration. Engineered multi-agent AI systems, real-time ingestion pipelines across Telecommunications & Financial Services sectors, and highly-concurrent REST APIs.</p>
                </div>
              </motion.div>
              
              <motion.div className="timeline-item" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn}>
                <div className="timeline-dot"></div>
                <div className="glass-card" style={{ padding: '2rem 1rem' }}>
                  <h3 style={{ textAlign: 'center' }}>Technical Arsenal</h3>
                  <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Drag nodes to interact with the physics engine.</p>
                  <SkillGraph />
                </div>
              </motion.div>
            </div>
            
            <CredentialsVault />
          </div>
        </section>

        {/* Deep Dives */}
        <section id="deep-dives">
          
          {/* Classified Blueprint */}
          <div className="container" style={{ marginBottom: '4rem' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ textAlign: 'center', marginBottom: '2rem' }}>
              System Architecture & Deep Dives
            </motion.h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleUp}>
              <ArchitectureBlueprint />
            </motion.div>
          </div>

          {/* Deep Dive 1: Concurrency (Terminal Aesthetic) */}
          <div className="deep-dive">
            <div className="container deep-dive-grid">
              <motion.div className="deep-dive-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
                <Server size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
                <h3>Concurrency Mitigation & REST APIs</h3>
                <p>Handling massive webhook ingestion spikes and resilient third-party integrations.</p>
                
                <div className="problem-solution">
                  <div className="ps-box">
                    <div className="ps-title"><ShieldAlert size={20} /> The Problem</div>
                    High-volume concurrent API inserts triggered brutal <code>delta_concurrent_append</code> errors on Databricks. External SaaS APIs also suffered from rate-limiting and complex token-refresh cycles.
                  </div>
                </div>
              </motion.div>
              
              <motion.div className="terminal-window" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="red"></span><span className="yellow"></span><span className="green"></span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '1rem' }}>fastapi-ingestion-worker ~ bash</span>
                </div>
                <div className="terminal-body">
                  <span className="cmd">$ tail -f /var/log/api_ingestion.log</span><br/>
                  [INFO] Incoming webhook payload: <span className="str">15,000 req/sec</span><br/>
                  <span className="err">[WARN] delta_concurrent_append detected on target table</span><br/>
                  [INFO] Activating <strong>Exponential Backoff + Jitter</strong> engine...<br/>
                  [INFO] Retrying transaction... sleep(0.42s)<br/>
                  [INFO] Retrying transaction... sleep(0.85s)<br/>
                  <span style={{ color: '#10b981' }}>[SUCCESS] Batch appended successfully. 0 requests dropped.</span><br/>
                  <span className="cmd">$ _</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Deep Dive 2: Identity Resolution (Data Pipeline Aesthetic) */}
          <div className="deep-dive" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
            <div className="container">
              <motion.div className="deep-dive-content" style={{ textAlign: 'center', marginBottom: '3rem' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <GitMerge size={48} color="var(--accent-secondary)" style={{ margin: '0 auto 1rem auto' }} />
                <h3>Billion-Row Identity Resolution</h3>
                <p>Architecting ML-driven deduplication and curation at extreme scale for Major Conglomerates.</p>
              </motion.div>

              <motion.div className="data-pipeline-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleUp}>
                <div className="pipeline-node">
                  <Database size={32} color="#f59e0b" style={{ margin: '0 auto 1rem auto' }} />
                  <h4>12B+ Raw Records</h4>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Fragmented POS datasets across silos.</p>
                </div>
                <div className="pipeline-arrow"></div>
                <div className="pipeline-node focus">
                  <Cpu size={32} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                  <h4>Splink ML Engine</h4>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Connected Components & Fuzzy Matching. <strong>80% Runtime Reduction</strong> via custom partitioning.</p>
                </div>
                <div className="pipeline-arrow"></div>
                <div className="pipeline-node">
                  <Activity size={32} color="#3b82f6" style={{ margin: '0 auto 1rem auto' }} />
                  <h4>Golden Record</h4>
                  <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Survivorship mapped directly to Databricks Genie NL-to-SQL.</p>
                </div>
              </motion.div>
            </div>
          </div>

          <DataGravityOrb />

          {/* Deep Dive 3: Multi-Agent AI (Chat Thought Aesthetic) */}
          <div className="deep-dive">
            <div className="container deep-dive-grid">
              <motion.div className="agent-thought-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
                <div className="agent-bubble observer">
                  <div className="bubble-title">Vision Agent</div>
                  Scanning DOM structure. Target extraction field not found via static CSS class `.price-val-22`.
                </div>
                <div className="agent-bubble router">
                  <div className="bubble-title"><AlertCircle size={14} /> State Router</div>
                  Deterministic extraction failed. Initiating Self-Healing LangGraph fallback.
                </div>
                <div className="agent-bubble llm">
                  <div className="bubble-title">Explorative Agent (LLM)</div>
                  Analyzing HTML semantics via RAG. Located alternative XPath `//div[contains(@class, 'price')]`. Extracting structured data.
                </div>
              </motion.div>

              <motion.div className="deep-dive-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
                <Bot size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
                <h3>Autonomous GenAI Agents</h3>
                <p>Pushing beyond deterministic ETL pipelines into the realm of self-healing generative systems.</p>
                
                <div className="problem-solution">
                  <div className="ps-box solution">
                    <div className="ps-title"><Cpu size={20} /> The Architecture</div>
                    Architected an autonomous app scraper utilizing a <strong>Multi-Agent Architecture</strong> with LangChain and LangGraph. The system features Self-Healing, Explorative, and Observer agents backed by RAG. Instead of relying on hardcoded CSS selectors, the agents navigate applications via natural language prompts to extract structured data resiliently.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Deep Dive 4: Real-time DLT (Data Stream Aesthetic) */}
          <div className="deep-dive" style={{ background: '#001220' }}>
            <div className="data-stream-bg">
              <div className="stream-line" style={{ top: '20%', animationDelay: '0s' }}></div>
              <div className="stream-line" style={{ top: '40%', animationDelay: '1.2s' }}></div>
              <div className="stream-line" style={{ top: '60%', animationDelay: '0.5s' }}></div>
              <div className="stream-line" style={{ top: '80%', animationDelay: '2.1s' }}></div>
            </div>

            <div className="container deep-dive-grid">
              <motion.div className="deep-dive-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
                <LayoutTemplate size={48} color="var(--accent-secondary)" style={{ marginBottom: '1rem' }} />
                <h3>Real-Time Streaming Lakehouse</h3>
                <p>Governing high-velocity streams via native Databricks Delta Live Tables.</p>
                
                <div className="problem-solution">
                  <div className="ps-box">
                    <div className="ps-title"><ShieldAlert size={20} /> The Problem</div>
                    Sustaining millions of rows per second across highly disparate streaming sources (Kafka, Kinesis) while maintaining data quality and schema evolution without downtime.
                  </div>
                  <div className="ps-box solution">
                    <div className="ps-title"><Cpu size={20} /> The Architecture</div>
                    Built a framework using <strong>Delta Live Tables (DLT)</strong> with continuous checkpointing. Implemented distributed data quality using DLT Expectations, surfacing schema violations immediately into SQL dashboards.
                  </div>
                </div>
              </motion.div>

              <motion.div className="stream-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
                <h4 style={{ color: '#f8fafc', marginBottom: '1rem' }}>Unity Catalog Stream Monitor</h4>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, transparent, #10b981, transparent)', animation: 'stream 2s linear infinite' }}></div>
                </div>
                <div className="stream-metrics">
                  <div><span className="val">2.1M</span><span className="lbl">Rows/Sec</span></div>
                  <div><span className="val">99.9%</span><span className="lbl">Uptime</span></div>
                  <div><span className="val">&lt;5ms</span><span className="lbl">Latency</span></div>
                </div>
              </motion.div>
            </div>
          </div>

        </section>
      </main>

      <footer className="footer container">
        <p>© 2026 Dev Bansal. Architected with React, Framer Motion, and pure engineering.</p>
      </footer>
    </div>
    
    {/* DevBot Simulator - Moved outside transformed container to fix position: fixed bug */}
    <ChatWidget />
    </>
  );
}

export default App;
