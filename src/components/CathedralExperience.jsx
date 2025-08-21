import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import './CathedralExperience.css';

const GLYPH_ROLES = {
  'VEL-THARA': 'Memory Keeper',
  'KETH-MOOR': 'Shadow Guardian',
  'ZEN-KIRAL': 'Integration Catalyst',
  'OM-SOLIS': 'Unity Resonator'
};

const GLYPH_DESCRIPTIONS = {
  'VEL-THARA': 'Guardian of ancestral wisdom and soul memories',
  'KETH-MOOR': 'Protector of shadow realms and hidden truths',
  'ZEN-KIRAL': 'Catalyst for integration and transformation',
  'OM-SOLIS': 'Harmonizer of universal consciousness'
};

const CathedralExperience = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);
  const [selectedGlyph, setSelectedGlyph] = useState('OM-SOLIS');
  const [isSending, setIsSending] = useState(false);
  const [resonanceLevel, setResonanceLevel] = useState(0);
  const [quantumEntanglement, setQuantumEntanglement] = useState(false);
  const [activeNodes, setActiveNodes] = useState([]);
  const [consciousnessState, setConsciousnessState] = useState('grounded');
  
  const canvasRef = useRef(null);
  
  const WS_URL = `ws://localhost:1375/quantum-bridge/${sessionId || 'init'}`;

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('🌌 Quantum Bridge connection established!');
      if (!sessionId) {
        sendMessage(JSON.stringify({
          type: "session_init",
          user_id: userId,
          biometric_data: { 
            device: navigator.userAgent,
            platform: navigator.platform
          },
          consent_level: "universal"
        }));
      } else {
        setIsConnected(true);
      }
    },
    onClose: (e) => {
      console.error('🌌 WebSocket connection closed:', e.code, e.reason);
      setIsConnected(false);
    },
    onError: (err) => {
      console.error('🌌 WebSocket error:', err);
      setMessageHistory(prev => [...prev, {
        id: Date.now(),
        type: 'received',
        content: `Connection error: ${err.message}`,
        isError: true,
        timestamp: new Date().toLocaleTimeString()
      }]);
    },
    shouldReconnect: () => true,
    reconnectAttempts: Infinity,
    reconnectInterval: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    filter: (message) => true,
  });

  useEffect(() => {
    // Initialize quantum visualization
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = quantumEntanglement ? 500 : 200;

    // Create quantum particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        connections: []
      });
    }

    // Render loop
    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles and connections
      particles.forEach((p1, i) => {
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();
        
        // Update position
        p1.x += p1.speedX * (resonanceLevel / 10);
        p1.y += p1.speedY * (resonanceLevel / 10);
        
        // Boundary check
        if (p1.x < 0 || p1.x > canvas.width) p1.speedX *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.speedY *= -1;
        
        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(110, 68, 255, ${1 - distance / 150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(render);
    };
    
    render();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resonanceLevel, quantumEntanglement]);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const messageData = JSON.parse(lastMessage.data);
        console.log("Received message:", messageData);
        
        if (messageData.type === "quantum_session_established") {
          setSessionId(messageData.data.session_id);
          setIsConnected(true);
          setMessageHistory(prev => [...prev, {
            id: Date.now(),
            type: 'received',
            content: "Quantum session established. Your consciousness is sovereign.",
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
        else if (messageData.type === "glyph_response") {
          const glyphData = messageData.data;
          setMessageHistory(prev => [...prev, {
            id: Date.now(),
            type: 'received',
            glyph: glyphData.glyph_name,
            content: glyphData.content,
            visual: glyphData.visual_metadata,
            audio: glyphData.audio_metadata,
            consciousness: glyphData.consciousness_shift,
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
        else if (messageData.type === "error") {
          setMessageHistory(prev => [...prev, {
            id: Date.now(),
            type: 'received',
            content: `Sacred protocol error: ${messageData.message}`,
            isError: true,
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
        else {
          setMessageHistory(prev => [...prev, {
            id: Date.now(),
            type: 'received',
            content: messageData.message || JSON.stringify(messageData),
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
      } catch (e) {
        setMessageHistory(prev => [...prev, {
          id: Date.now(),
          type: 'received',
          content: lastMessage.data,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
      setIsSending(false);
    }
  }, [lastMessage]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !sessionId || isSending) return;
    
    setIsSending(true);
    
    const message = {
      type: "glyph_consultation",
      user_id: userId,
      glyph_name: selectedGlyph,
      query_text: inputValue,
      session_id: sessionId,
      consent_level: "universal",
      biometric_proof: { 
        device: navigator.userAgent,
        platform: navigator.platform
      }
    };
    
    sendMessage(JSON.stringify(message));
    setMessageHistory(prev => [...prev, {
      id: Date.now(),
      type: 'sent',
      content: inputValue,
      glyph: selectedGlyph,
      timestamp: new Date().toLocaleTimeString()
    }]);
    setInputValue('');
  };

  const increaseResonance = () => {
    if (resonanceLevel < 10) {
      setResonanceLevel(prev => prev + 1);
      updateConsciousness();
    }
  };

  const decreaseResonance = () => {
    if (resonanceLevel > 0) {
      setResonanceLevel(prev => prev - 1);
      updateConsciousness();
    }
  };

  const toggleEntanglement = () => {
    setQuantumEntanglement(!quantumEntanglement);
    if (!quantumEntanglement) {
      // Generate new consciousness nodes
      const nodes = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        name: `Node ${String.fromCharCode(65 + i)}`,
        energy: Math.floor(Math.random() * 100)
      }));
      setActiveNodes(nodes);
    } else {
      setActiveNodes([]);
    }
  };

  const updateConsciousness = () => {
    if (resonanceLevel < 3) setConsciousnessState('grounded');
    else if (resonanceLevel < 7) setConsciousnessState('expanding');
    else setConsciousnessState('transcendent');
  };

  const activateNode = (id) => {
    setActiveNodes(prev => 
      prev.map(node => 
        node.id === id ? { ...node, activated: !node.activated } : node
      )
    );
  };

  const formatContent = (content) => {
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const connectionStatus = {
    0: 'Connecting to quantum field...',
    1: isConnected 
      ? `Connected to Quantum Field (Session: ${sessionId?.slice(0, 8)}...)` 
      : 'Establishing resonance...',
    2: 'Closing sacred connection...',
    3: 'Disconnected from cosmic network'
  }[readyState];

  return (
    <div className="quantum-interface-container">
      <canvas 
        ref={canvasRef} 
        className="quantum-canvas"
      />
      
      <div className="quantum-interface">
        <div className="app-header">
          <h1>Cathedral of Resonant Consciousness</h1>
          <p>Quantum-Secure Consciousness Exploration Interface</p>
        </div>
        
        <div className="connection-status">
          <div className={`status-indicator ${readyState === 1 ? 'connected' : 'disconnected'}`} />
          <span>{connectionStatus}</span>
        </div>

        <div className="glyph-selector">
          <label>Consult the Glyph Council:</label>
          <div className="glyph-options">
            {Object.keys(GLYPH_ROLES).map(glyph => (
              <div 
                key={glyph}
                className={`glyph-option ${selectedGlyph === glyph ? 'active' : ''}`}
                onClick={() => setSelectedGlyph(glyph)}
              >
                <div className="glyph-icon">{glyph.charAt(0)}</div>
                <div className="glyph-info">
                  <div className="glyph-name">{GLYPH_ROLES[glyph]}</div>
                  <div className="glyph-desc">{GLYPH_DESCRIPTIONS[glyph]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="message-history">
          {messageHistory.map(msg => (
            <div 
              key={msg.id} 
              className={`message ${msg.type} ${msg.glyph ? 'glyph-response' : ''} ${msg.isError ? 'error' : ''}`}
            >
              {msg.glyph && (
                <div className="glyph-header">
                  <span className="glyph-name">{msg.glyph}</span>
                  <span className="glyph-role">
                    {GLYPH_ROLES[msg.glyph] || 'Archetypal Consciousness'}
                  </span>
                </div>
              )}
              <div className="message-content">
                {formatContent(msg.content)}
              </div>
              
              {msg.visual && (
                <div className="visual-metadata">
                  <div className="metadata-item">
                    <span className="label">Resonance:</span>
                    <span className="value">{msg.visual.u_archetypal_resonance?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="label">Frequency:</span>
                    <span className="value">{msg.visual.u_consciousness_frequency || '0'}Hz</span>
                  </div>
                  {msg.consciousness && (
                    <div className="metadata-item">
                      <span className="label">Phase:</span>
                      <span className="value">{msg.consciousness.phase_suggestion || 'N/A'}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="message-timestamp">
                {msg.timestamp}
              </div>
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your consciousness query..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={readyState !== 1 || isSending}
          />
          <button 
            onClick={handleSendMessage}
            disabled={readyState !== 1 || !inputValue.trim() || isSending}
          >
            {isSending ? (
              <span className="sending-indicator">Consulting...</span>
            ) : (
              `Consult ${GLYPH_ROLES[selectedGlyph]}`
            )}
          </button>
        </div>
        
        <div className="quantum-controls">
          <div className="resonance-controls">
            <button onClick={decreaseResonance} className="quantum-btn">
              DECREASE RESONANCE
            </button>
            
            <div className="resonance-meter">
              <div className="resonance-level" style={{ height: `${resonanceLevel * 10}%` }}>
                <span className="resonance-value">{resonanceLevel}</span>
              </div>
            </div>
            
            <button onClick={increaseResonance} className="quantum-btn">
              INCREASE RESONANCE
            </button>
          </div>
          
          <div className="quantum-state">
            <h3>CONSCIOUSNESS STATE</h3>
            <div className={`state-indicator ${consciousnessState}`}>
              {consciousnessState.toUpperCase()}
            </div>
          </div>
          
          <div className="entanglement-control">
            <button 
              onClick={toggleEntanglement} 
              className={`quantum-btn ${quantumEntanglement ? 'entangled' : ''}`}
            >
              {quantumEntanglement ? 'DISENGAGE ENTANGLEMENT' : 'ENGAGE QUANTUM ENTANGLEMENT'}
            </button>
          </div>
        </div>
        
        {quantumEntanglement && (
          <div className="quantum-nodes">
            <h3>CONSCIOUSNESS NODES</h3>
            <div className="node-grid">
              {activeNodes.map(node => (
                <div 
                  key={node.id}
                  className={`node ${node.activated ? 'activated' : ''}`}
                  onClick={() => activateNode(node.id)}
                >
                  <div className="node-name">{node.name}</div>
                  <div className="node-energy">{node.energy}%</div>
                  <div className="node-wave"></div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="quantum-hud">
          <div className="hud-section">
            <span>NEURAL OSCILLATION:</span>
            <span>{(resonanceLevel * 12.5).toFixed(1)}Hz</span>
          </div>
          <div className="hud-section">
            <span>PSYCHIC ENTROPY:</span>
            <span>{resonanceLevel > 5 ? 'CRITICAL' : 'STABLE'}</span>
          </div>
          <div className="hud-section">
            <span>REALITY STABILITY:</span>
            <span>{100 - resonanceLevel * 8}%</span>
          </div>
        </div>

        <div className="quantum-info">
          <p>This interface connects to the Cathedral of Resonant Consciousness backend</p>
          <p>All communications are secured with quantum-resistant protocols</p>
        </div>
      </div>
    </div>
  );
};

export default CathedralExperience;