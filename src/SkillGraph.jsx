import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function SkillGraph() {
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    // Basic responsive handling
    const handleResize = () => {
      const container = document.getElementById('graph-container');
      if (container) {
        setDimensions({ width: container.clientWidth, height: 400 });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = {
    nodes: [
      { id: 'FastAPI', group: 1, val: 20 },
      { id: 'Python', group: 1, val: 15 },
      { id: 'PostgreSQL', group: 1, val: 10 },
      { id: 'RedisHuey', group: 1, val: 15 },
      
      { id: 'Databricks', group: 2, val: 30 },
      { id: 'PySpark', group: 2, val: 25 },
      { id: 'Delta Lake', group: 2, val: 20 },
      { id: 'Unity Catalog', group: 2, val: 15 },
      
      { id: 'Kafka', group: 3, val: 15 },
      { id: 'AWS Kinesis', group: 3, val: 10 },
      
      { id: 'Neo4j', group: 4, val: 15 },
      { id: 'Elasticsearch', group: 4, val: 10 },
      
      { id: 'LangChain', group: 5, val: 15 },
      { id: 'LangGraph', group: 5, val: 15 }
    ],
    links: [
      { source: 'Python', target: 'FastAPI' },
      { source: 'FastAPI', target: 'PostgreSQL' },
      { source: 'FastAPI', target: 'RedisHuey' },
      
      { source: 'Databricks', target: 'PySpark' },
      { source: 'Databricks', target: 'Delta Lake' },
      { source: 'Delta Lake', target: 'Unity Catalog' },
      { source: 'PySpark', target: 'Kafka' },
      
      { source: 'FastAPI', target: 'Databricks' }, // Integration
      
      { source: 'Kafka', target: 'AWS Kinesis' },
      { source: 'FastAPI', target: 'Neo4j' },
      { source: 'Neo4j', target: 'Elasticsearch' },
      
      { source: 'Python', target: 'LangChain' },
      { source: 'LangChain', target: 'LangGraph' }
    ]
  };

  useEffect(() => {
    // Add some nice physical bouncy forces
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-200);
      fgRef.current.d3Force('link').distance(70);
    }
  }, []);

  return (
    <div id="graph-container" className="glass-card" style={{ width: '100%', height: '500px', padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={500}
        graphData={data}
        nodeLabel=""
        nodeColor={node => {
          if (node.group === 1) return '#3b82f6'; // APIs
          if (node.group === 2) return '#10b981'; // Data Eng
          if (node.group === 3) return '#f59e0b'; // Streaming
          if (node.group === 4) return '#8b5cf6'; // Graph/Search
          return '#ec4899'; // AI
        }}
        linkColor={() => 'rgba(255,255,255,0.15)'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          if (typeof node.x !== 'number' || typeof node.y !== 'number') return;
          
          let color = '#ec4899';
          if (node.group === 1) color = '#3b82f6';
          if (node.group === 2) color = '#10b981';
          if (node.group === 3) color = '#f59e0b';
          if (node.group === 4) color = '#8b5cf6';
          
          const label = node.id;
          const fontSize = 12 / globalScale;
          const nodeRadius = 8; // Base circle radius

          // 1. Draw Glowing Halo (Radial Gradient)
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(node.x, node.y, nodeRadius * 0.1, node.x, node.y, nodeRadius * 3);
          gradient.addColorStop(0, color);
          gradient.addColorStop(0.3, color + '88'); // 53% opacity hex
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.arc(node.x, node.y, nodeRadius * 3, 0, 2 * Math.PI);
          ctx.fill();

          // 2. Draw Solid Cyberpunk Core
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI);
          ctx.fillStyle = '#0f172a'; // Deep slate core (matches theme bg)
          ctx.fill();
          ctx.lineWidth = 2 / globalScale;
          ctx.strokeStyle = color; // Bright neon border
          ctx.stroke();

          // 3. Draw Clean Text Below Node
          ctx.font = `600 ${fontSize}px "Inter", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          
          // Add soft text shadow for perfect readability over lines
          ctx.shadowColor = '#000000';
          ctx.shadowBlur = 4 / globalScale;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 1 / globalScale;
          
          ctx.fillStyle = '#f8fafc'; // Crisp white text
          ctx.fillText(label, node.x, node.y + nodeRadius + (4 / globalScale));
          
          // Reset shadow so it doesn't affect the next node's drawing
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // Save hit-box dimensions for interaction
          node.__bckgDimensions = nodeRadius;
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          if (typeof node.x !== 'number' || typeof node.y !== 'number') return;
          ctx.fillStyle = color;
          ctx.beginPath();
          const r = node.__bckgDimensions || 8;
          ctx.arc(node.x, node.y, r * 2, 0, 2 * Math.PI);
          ctx.fill();
        }}
      />
    </div>
  );
}
