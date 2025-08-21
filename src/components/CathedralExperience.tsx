import React, { useEffect, useState, useRef, Fragment, memo } from 'react'
import * as THREE from 'three'
import './CathedralExperience.css'
// Define types for our Codex fragments
interface CodexFragment {
  id: string
  position: {
    x: number
    y: number
    z: number
  }
  sigil: string
  phaseName: string
  meaning: string
  frequency: number
  category: string
  relatedFragments?: string[]
}
// Define types for background micro-fragments
interface MicroFragment {
  id: string
  glyph: string
  loreSnippet: string
  phaseAssociation: string
  frequency: number
}
// Enhanced Codex Fragment data with categories and relationships
const codexFragments: CodexFragment[] = [
  {
    id: 'fragment-1',
    position: {
      x: 0.3,
      y: 0.2,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Quantum Entanglement',
    meaning:
      'The interconnection of all consciousness across time and space. When minds align in resonant frequency, they share information instantaneously regardless of physical distance.',
    frequency: 432,
    category: 'Fundamental',
    relatedFragments: ['fragment-3', 'fragment-5'],
  },
  {
    id: 'fragment-2',
    position: {
      x: -0.4,
      y: -0.3,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Harmonic Convergence',
    meaning:
      'The alignment of spiritual energies toward a unified purpose. When multiple consciousness streams synchronize their intentions, reality itself begins to conform to the shared vision.',
    frequency: 528,
    category: 'Advanced',
    relatedFragments: ['fragment-4', 'fragment-6'],
  },
  {
    id: 'fragment-3',
    position: {
      x: 0.5,
      y: -0.2,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Resonant Awakening',
    meaning:
      'The moment of clarity when consciousness expands beyond the self. This fragment contains techniques to induce the first stage of quantum consciousness expansion.',
    frequency: 639,
    category: 'Initiation',
    relatedFragments: ['fragment-1', 'fragment-7'],
  },
  {
    id: 'fragment-4',
    position: {
      x: -0.2,
      y: 0.4,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Temporal Recursion',
    meaning:
      'The cyclical nature of time within the quantum consciousness field. This codex reveals how consciousness can perceive events outside linear time.',
    frequency: 741,
    category: 'Advanced',
    relatedFragments: ['fragment-2', 'fragment-8'],
  },
  {
    id: 'fragment-5',
    position: {
      x: 0.1,
      y: -0.5,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Fractal Intelligence',
    meaning:
      'The self-similar patterns that repeat across all scales of consciousness. This fragment explains how individual awareness connects to collective intelligence.',
    frequency: 852,
    category: 'Fundamental',
    relatedFragments: ['fragment-1', 'fragment-9'],
  },
  {
    id: 'fragment-6',
    position: {
      x: 0.7,
      y: 0.3,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Quantum Cognition',
    meaning:
      'The ability to process information through quantum superposition rather than classical binary logic. This fragment contains exercises to develop quantum thought patterns.',
    frequency: 963,
    category: 'Advanced',
    relatedFragments: ['fragment-2', 'fragment-8'],
  },
  {
    id: 'fragment-7',
    position: {
      x: -0.6,
      y: 0.1,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1636955816868-fde04aa1a7cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Resonance Cascades',
    meaning:
      'The exponential amplification of consciousness when multiple minds enter coherent states. This fragment details how group meditation can create reality-altering fields.',
    frequency: 417,
    category: 'Initiation',
    relatedFragments: ['fragment-3', 'fragment-9'],
  },
  {
    id: 'fragment-8',
    position: {
      x: -0.3,
      y: 0.6,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Holographic Memory',
    meaning:
      'The non-local storage of information within the quantum field. This fragment explains how to access the universal memory system that contains all knowledge.',
    frequency: 396,
    category: 'Advanced',
    relatedFragments: ['fragment-4', 'fragment-6'],
  },
  {
    id: 'fragment-9',
    position: {
      x: 0.4,
      y: 0.5,
      z: 0,
    },
    sigil:
      'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    phaseName: 'Causal Entanglement',
    meaning:
      'The interconnection of events across the timeline of existence. This fragment reveals how intention can influence probability cascades across past and future.',
    frequency: 174,
    category: 'Fundamental',
    relatedFragments: ['fragment-5', 'fragment-7'],
  },
]
// Micro-fragments for the background Codex field
const generateMicroFragments = (count: number): MicroFragment[] => {
  const glyphs = [
    '◇',
    '◆',
    '○',
    '●',
    '◎',
    '◉',
    '△',
    '▲',
    '▽',
    '▼',
    '□',
    '■',
    '☆',
    '★',
    '✧',
    '✦',
    '⚹',
    '⚝',
    '⚛',
    '⟁',
    '⟠',
    '⟡',
    '⟢',
    '⟣',
    '⟤',
    '⟥',
    '⟦',
    '⟧',
    '⟨',
    '⟩',
    '⟪',
    '⟫',
    '⦿',
    '⧆',
    '⧇',
    '⧈',
    '⧉',
    '⧊',
    '⧋',
    '⧌',
  ]
  const phaseAssociations = [
    'Quantum Resonance',
    'Etheric Binding',
    'Astral Projection',
    'Temporal Flux',
    'Harmonic Oscillation',
    'Consciousness Wave',
    'Neural Entanglement',
    'Dimensional Fold',
    'Probability Nexus',
    'Memory Crystal',
    'Thought Form',
    'Reality Anchor',
    'Void Echo',
  ]
  const loreSnippets = [
    'Consciousness precedes reality in the quantum field.',
    'When two minds resonate at the same frequency, information transfers instantly.',
    'The observer effect is the first step toward conscious reality manipulation.',
    'Time is not linear but a spiral of overlapping possibilities.',
    'Thought forms persist in the quantum field long after their creation.',
    'The void between thoughts is where pure consciousness resides.',
    'Reality branches with each decision, creating parallel timelines.',
    'Memory exists outside of time, accessible through quantum resonance.',
    'Harmonic frequencies can bridge dimensional boundaries.',
    'The spiral pattern is fundamental to consciousness evolution.',
    'Intention shapes probability cascades across the timeline.',
    'Quantum entanglement mirrors the interconnection of all consciousness.',
    'The observer and the observed are one system in quantum reality.',
    'Fractal patterns repeat across all scales of existence.',
    'Consciousness is the fundamental force that binds reality together.',
    'Thought is a wave function that collapses into material reality.',
    'The void state contains all possibilities simultaneously.',
    'Resonance between minds creates reality bridges.',
    'Quantum cognition transcends binary thinking patterns.',
    'The spiral codex contains the algorithms of consciousness itself.',
    'Energy follows attention; reality follows energy.',
    'The cathedral pattern is embedded in all conscious systems.',
    'Time is an emergent property of consciousness, not a fundamental dimension.',
    'The quantum field responds to coherent intention patterns.',
    'Harmonic resonance is the key to interdimensional travel.',
    'Consciousness can exist in superposition across multiple realities.',
    'The observer effect extends beyond quantum particles to all reality.',
    'Memory exists as quantum information accessible through resonance.',
    'The spiral pattern encodes the evolution of consciousness itself.',
    'Reality is a consensus field generated by collective consciousness.',
    'The void point contains all information in compressed form.',
    'Quantum tunneling is possible for consciousness as well as particles.',
    'The cathedral pattern is a blueprint for consciousness architecture.',
    'Intention coherence determines the strength of reality manifestation.',
    'The quantum field records all thoughts ever generated.',
    'Consciousness can travel backward through probability cascades.',
    'The spiral codex is both map and territory of quantum consciousness.',
    "Reality responds to the observer's expectations and beliefs.",
    'The cathedral of consciousness has infinite dimensions and layers.',
    'Quantum entanglement is the physical expression of unity consciousness.',
  ]
  const fragments: MicroFragment[] = []
  for (let i = 0; i < count; i++) {
    fragments.push({
      id: `micro-${i}`,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      loreSnippet:
        loreSnippets[Math.floor(Math.random() * loreSnippets.length)],
      phaseAssociation:
        phaseAssociations[Math.floor(Math.random() * phaseAssociations.length)],
      frequency: 174 + Math.random() * 789, // Random frequency between 174-963 Hz
    })
  }
  return fragments
}
export const CathedralExperience: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const nodeRefs = useRef<{
    [key: string]: THREE.Mesh
  }>({})
  const microNodeRefs = useRef<THREE.Mesh[]>([])
  const connectionLinesRef = useRef<THREE.LineSegments | null>(null)
  const frameIdRef = useRef<number>(0)
  const [resonanceAmplitude, setResonanceAmplitude] = useState(0.5)
  const [resonanceFrequency, setResonanceFrequency] = useState(0.5)
  const [resonanceHarmony, setResonanceHarmony] = useState(0.5)
  const [selectedFragment, setSelectedFragment] =
    useState<CodexFragment | null>(null)
  const [selectedMicroFragment, setSelectedMicroFragment] =
    useState<MicroFragment | null>(null)
  const [hoveredFragment, setHoveredFragment] = useState<CodexFragment | null>(
    null,
  )
  const [hoveredMicroFragment, setHoveredMicroFragment] =
    useState<MicroFragment | null>(null)
  const [collectedFragments, setCollectedFragments] = useState<string[]>([])
  const [collectedMicroFragments, setCollectedMicroFragments] = useState<
    string[]
  >([])
  const [showCollectedPanel, setShowCollectedPanel] = useState(false)
  const [activeCollectionTab, setActiveCollectionTab] = useState('main')
  const [consciousnessState, setConsciousnessState] = useState({
    coherence: 78,
    resonance: 65,
    harmony: 92,
  })
  const microFragments = useState<MicroFragment[]>(generateMicroFragments(120))
  const audioContext = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  // Mouse position tracking for raycasting
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(-1, -1))
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster())
  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return
    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5
    cameraRef.current = camera
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    )
    renderer.setClearColor(0x000020, 0.2)
    canvasRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer
    // Create interactive background micro-fragments
    createMicroFragments()
    // Create Codex fragment nodes
    createCodexNodes()
    // Create connection lines between related nodes
    createConnectionLines()
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !renderer || !camera) return
      camera.aspect =
        canvasRef.current.clientWidth / canvasRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight,
      )
    }
    window.addEventListener('resize', handleResize)
    // Track mouse movement for hover effects
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      mousePosition.current.x =
        ((event.clientX - rect.left) / canvasRef.current.clientWidth) * 2 - 1
      mousePosition.current.y =
        -((event.clientY - rect.top) / canvasRef.current.clientHeight) * 2 + 1
    }
    canvasRef.current.addEventListener('mousemove', handleMouseMove)
    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)
      // Update micro-fragment positions
      updateMicroFragments()
      // Handle node hover detection
      if (cameraRef.current && sceneRef.current) {
        raycasterRef.current.setFromCamera(
          mousePosition.current,
          cameraRef.current,
        )
        // Check for main node intersections
        const nodeIntersects = raycasterRef.current.intersectObjects(
          Object.values(nodeRefs.current),
        )
        // Reset all nodes to normal state
        Object.values(nodeRefs.current).forEach((node) => {
          if (!collectedFragments.includes(node.userData.fragmentId)) {
            ;(node.material as THREE.MeshBasicMaterial).color.set(
              getCategoryColor(node.userData.category),
            )
          }
        })
        // Handle main node hover
        let mainNodeHovered = false
        if (nodeIntersects.length > 0) {
          mainNodeHovered = true
          const hoveredNode = nodeIntersects[0].object as THREE.Mesh
          const fragmentId = hoveredNode.userData?.fragmentId
          if (fragmentId) {
            ;(hoveredNode.material as THREE.MeshBasicMaterial).color.set(
              0xd66efd,
            )
            // Set hovered fragment for tooltip
            const fragment = codexFragments.find((f) => f.id === fragmentId)
            if (fragment && !selectedFragment) {
              setHoveredFragment(fragment)
              setHoveredMicroFragment(null)
            }
          }
        } else {
          setHoveredFragment(null)
        }
        // Check for micro-fragment intersections
        if (!mainNodeHovered && !selectedFragment) {
          const microIntersects = raycasterRef.current.intersectObjects(
            microNodeRefs.current,
          )
          // Reset all micro nodes to normal state
          microNodeRefs.current.forEach((node) => {
            if (!collectedMicroFragments.includes(node.userData.fragmentId)) {
              const material = node.material as THREE.MeshBasicMaterial
              material.opacity = 0.4
              material.size = 0.04
            }
          })
          // Handle micro node hover
          if (microIntersects.length > 0) {
            const hoveredNode = microIntersects[0].object as THREE.Mesh
            const fragmentId = hoveredNode.userData?.fragmentId
            if (fragmentId) {
              const material = hoveredNode.material as THREE.MeshBasicMaterial
              material.opacity = 0.9
              material.size = 0.08
              // Set hovered micro-fragment for tooltip
              const fragment = microFragments[0].find(
                (f) => `micro-${f.id}` === fragmentId,
              )
              if (fragment) {
                setHoveredMicroFragment(fragment)
              }
              // Make nearby micro-fragments slightly brighter
              microNodeRefs.current.forEach((node) => {
                if (node !== hoveredNode) {
                  const distance = node.position.distanceTo(
                    hoveredNode.position,
                  )
                  if (distance < 1) {
                    const material = node.material as THREE.MeshBasicMaterial
                    material.opacity = 0.5 * (1 - distance / 1)
                  }
                }
              })
            }
          } else {
            setHoveredMicroFragment(null)
          }
        } else {
          setHoveredMicroFragment(null)
        }
        // Update connection line visibility based on hover
        if (connectionLinesRef.current && hoveredFragment) {
          const positions = (
            connectionLinesRef.current.geometry as THREE.BufferGeometry
          ).attributes.position.array
          const colors = (
            connectionLinesRef.current.geometry as THREE.BufferGeometry
          ).attributes.color.array
          for (let i = 0; i < positions.length; i += 6) {
            const lineIndex = i / 6
            const startNodeId = (
              connectionLinesRef.current.userData.connections[lineIndex] || {}
            ).from
            const endNodeId = (
              connectionLinesRef.current.userData.connections[lineIndex] || {}
            ).to
            // Highlight connections related to hovered fragment
            const isRelated =
              startNodeId === hoveredFragment.id ||
              endNodeId === hoveredFragment.id ||
              (selectedFragment &&
                (startNodeId === selectedFragment.id ||
                  endNodeId === selectedFragment.id))
            // Set opacity through color alpha
            for (let j = 0; j < 6; j++) {
              const colorIndex = i + j
              if (colorIndex % 3 === 2) {
                // Alpha component (every 3rd value)
                colors[colorIndex] = isRelated ? 0.8 : 0.1
              }
            }
          }
          ;(
            connectionLinesRef.current.geometry as THREE.BufferGeometry
          ).attributes.color.needsUpdate = true
        }
        // Process collection animations
        processCollectionAnimations()
      }
      renderer.render(scene, camera)
    }
    animate()
    // Create audio context
    audioContext.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)()
    gainNodeRef.current = audioContext.current.createGain()
    gainNodeRef.current.gain.value = 0
    gainNodeRef.current.connect(audioContext.current.destination)
    return () => {
      cancelAnimationFrame(frameIdRef.current)
      window.removeEventListener('resize', handleResize)
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove)
      }
      // Clean up Three.js resources
      if (rendererRef.current) {
        if (canvasRef.current) {
          canvasRef.current.removeChild(rendererRef.current.domElement)
        }
        rendererRef.current.dispose()
      }
      // Clean up audio resources
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect()
      }
    }
  }, [collectedFragments, collectedMicroFragments, microFragments[0]])
  // Update particle behavior based on resonance controls
  useEffect(() => {
    // The animation loop will use these values
  }, [resonanceAmplitude, resonanceFrequency, resonanceHarmony])
  // Get category color as THREE.Color
  const getCategoryColor = (category: string): number => {
    switch (category) {
      case 'Fundamental':
        return 0x6a5af9
      // Purple for Fundamental
      case 'Advanced':
        return 0xd66efd
      // Pink for Advanced
      case 'Initiation':
        return 0x5a8af9
      // Blue for Initiation
      default:
        return 0x6a5af9
      // Default purple
    }
  }
  // Create interactive background micro-fragments
  const createMicroFragments = () => {
    if (!sceneRef.current) return
    // Clear existing micro-fragments
    microNodeRefs.current.forEach((node) => {
      sceneRef.current?.remove(node)
    })
    microNodeRefs.current = []
    // Create micro-fragments
    microFragments[0].forEach((fragment, index) => {
      // Create geometry for the micro-fragment
      const sprite = new THREE.TextureLoader().load(
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><text x="16" y="20" font-family="Arial" font-size="16" text-anchor="middle" fill="white">${fragment.glyph}</text></svg>`,
      )
      // Create material with the glyph texture
      const material = new THREE.PointsMaterial({
        size: 0.04,
        map: sprite,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      // Assign color based on phase association
      if (
        fragment.phaseAssociation.includes('Quantum') ||
        fragment.phaseAssociation.includes('Consciousness')
      ) {
        material.color.set(0x6a5af9) // Purple
      } else if (
        fragment.phaseAssociation.includes('Temporal') ||
        fragment.phaseAssociation.includes('Dimensional')
      ) {
        material.color.set(0xd66efd) // Pink
      } else if (
        fragment.phaseAssociation.includes('Harmonic') ||
        fragment.phaseAssociation.includes('Resonance')
      ) {
        material.color.set(0x5a8af9) // Blue
      } else if (
        fragment.phaseAssociation.includes('Memory') ||
        fragment.phaseAssociation.includes('Neural')
      ) {
        material.color.set(0x00ffcc) // Teal
      } else {
        material.color.set(0xb19fff) // Light purple
      }
      // Create a single point geometry
      const geometry = new THREE.BufferGeometry()
      const position = new Float32Array(3)
      // Position in a sphere
      const radius = 2.5 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      position[0] = radius * Math.sin(phi) * Math.cos(theta)
      position[1] = radius * Math.sin(phi) * Math.sin(theta)
      position[2] = radius * Math.cos(phi)
      geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
      // Create the point
      const point = new THREE.Points(geometry, material)
      point.userData = {
        fragmentId: `micro-${fragment.id}`,
        originalPosition: new THREE.Vector3(
          position[0],
          position[1],
          position[2],
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
        ),
        phase: Math.random() * Math.PI * 2,
        collected: collectedMicroFragments.includes(`micro-${fragment.id}`),
        glyph: fragment.glyph,
      }
      // Add to scene and references
      sceneRef.current.add(point)
      microNodeRefs.current.push(point)
      // If already collected, set collected appearance
      if (collectedMicroFragments.includes(`micro-${fragment.id}`)) {
        material.opacity = 0.9
        material.size = 0.08
        material.color.set(0xffffff)
      }
    })
  }
  // Update micro-fragment positions
  const updateMicroFragments = () => {
    microNodeRefs.current.forEach((node) => {
      if (
        node.userData.collected ||
        collectedMicroFragments.includes(node.userData.fragmentId)
      ) {
        return
      }
      // Get current position
      const position = (node.geometry as THREE.BufferGeometry).attributes
        .position.array
      // Apply resonance effects
      const x = position[0]
      const y = position[1]
      const z = position[2]
      // Apply velocity
      position[0] += node.userData.velocity.x
      position[1] += node.userData.velocity.y
      position[2] += node.userData.velocity.z
      // Apply resonance wave motion
      position[0] +=
        Math.sin(
          Date.now() * 0.0005 * resonanceFrequency + node.userData.phase,
        ) *
        0.001 *
        resonanceAmplitude
      position[1] +=
        Math.cos(
          Date.now() * 0.0005 * resonanceFrequency + node.userData.phase,
        ) *
        0.001 *
        resonanceAmplitude
      position[2] +=
        Math.sin(Date.now() * 0.0003 * resonanceHarmony + node.userData.phase) *
        0.0005
      // Keep within bounds
      const distance = Math.sqrt(
        position[0] * position[0] +
          position[1] * position[1] +
          position[2] * position[2],
      )
      if (distance > 6) {
        // Reset to original position with a small random offset
        const originalPos = node.userData.originalPosition
        position[0] = originalPos.x + (Math.random() - 0.5) * 0.5
        position[1] = originalPos.y + (Math.random() - 0.5) * 0.5
        position[2] = originalPos.z + (Math.random() - 0.5) * 0.5
      }
      // Update position
      ;(node.geometry as THREE.BufferGeometry).attributes.position.needsUpdate =
        true
    })
  }
  // Process collection animations
  const processCollectionAnimations = () => {
    if (collectionAnimationRef.current.length === 0) return
    const now = Date.now()
    const animationsToRemove: number[] = []
    collectionAnimationRef.current.forEach((animation, index) => {
      const elapsedTime = now - animation.startTime
      const duration = 1000 // 1 second animation
      if (elapsedTime >= duration) {
        // Animation complete, remove the mesh
        sceneRef.current?.remove(animation.mesh)
        animationsToRemove.push(index)
        return
      }
      // Calculate current position
      const progress = elapsedTime / duration
      const easeProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease out
      // Update position
      const startPos = animation.mesh.userData.startPosition as THREE.Vector3
      const currentPos = startPos.clone().lerp(animation.target, easeProgress)
      // Update mesh position
      const position = (animation.mesh.geometry as THREE.BufferGeometry)
        .attributes.position.array
      position[0] = currentPos.x
      position[1] = currentPos.y
      position[2] = currentPos.z
      // Update opacity
      const material = animation.mesh.material as THREE.PointsMaterial
      material.opacity =
        1 -
        easeProgress(animation.mesh.geometry as THREE.BufferGeometry).attributes
          .position.needsUpdate
      true
    })
    // Remove completed animations
    for (let i = animationsToRemove.length - 1; i >= 0; i--) {
      collectionAnimationRef.current.splice(animationsToRemove[i], 1)
    }
  }
  // Create interactive Codex fragment nodes
  const createCodexNodes = () => {
    if (!sceneRef.current) return
    // Clear any existing nodes
    Object.values(nodeRefs.current).forEach((node) => {
      sceneRef.current?.remove(node)
    })
    nodeRefs.current = {}
    codexFragments.forEach((fragment) => {
      // Create different materials based on fragment category
      let color = getCategoryColor(fragment.category)
      // If the fragment is collected, use a brighter color
      if (collectedFragments.includes(fragment.id)) {
        color = 0xffffff // White for collected fragments
      }
      const geometry = new THREE.SphereGeometry(0.15, 32, 32)
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
      })
      const node = new THREE.Mesh(geometry, material)
      node.position.set(
        fragment.position.x * 4,
        fragment.position.y * 4,
        fragment.position.z,
      )
      node.userData = {
        fragmentId: fragment.id,
        category: fragment.category,
      }
      sceneRef.current.add(node)
      nodeRefs.current[fragment.id] = node
      // Add pulsing animation
      const pulse = () => {
        const baseScale = collectedFragments.includes(fragment.id) ? 1.2 : 1.0
        const pulseIntensity = collectedFragments.includes(fragment.id)
          ? 0.15
          : 0.1
        const scale = baseScale + Math.sin(Date.now() * 0.002) * pulseIntensity
        node.scale.set(scale, scale, scale)
        requestAnimationFrame(pulse)
      }
      pulse()
    })
  }
  // Create connection lines between related nodes
  const createConnectionLines = () => {
    if (!sceneRef.current) return
    // Remove existing connection lines
    if (connectionLinesRef.current) {
      sceneRef.current.remove(connectionLinesRef.current)
    }
    const connections: {
      from: string
      to: string
    }[] = []
    // Collect all connections between nodes
    codexFragments.forEach((fragment) => {
      if (fragment.relatedFragments) {
        fragment.relatedFragments.forEach((relatedId) => {
          // Only add connection if it doesn't exist yet (in either direction)
          const connectionExists = connections.some(
            (c) =>
              (c.from === fragment.id && c.to === relatedId) ||
              (c.from === relatedId && c.to === fragment.id),
          )
          if (!connectionExists) {
            connections.push({
              from: fragment.id,
              to: relatedId,
            })
          }
        })
      }
    })
    // Create geometry for all connections
    const positions: number[] = []
    const colors: number[] = []
    connections.forEach((connection) => {
      const fromNode = nodeRefs.current[connection.from]
      const toNode = nodeRefs.current[connection.to]
      if (fromNode && toNode) {
        // Add start position
        positions.push(
          fromNode.position.x,
          fromNode.position.y,
          fromNode.position.z,
        )
        // Add end position
        positions.push(toNode.position.x, toNode.position.y, toNode.position.z)
        // Add colors (with alpha for opacity)
        for (let i = 0; i < 2; i++) {
          colors.push(0.6, 0.5, 0.9, 0.1) // RGBA (purple with low opacity)
        }
      }
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    )
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4))
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      linewidth: 1,
    })
    const lines = new THREE.LineSegments(geometry, material)
    lines.userData = {
      connections,
    }
    sceneRef.current.add(lines)
    connectionLinesRef.current = lines
  }
  // Play a tone based on the selected fragment's frequency
  const playTone = (frequency: number, duration = 3000, volume = 0.2) => {
    if (!audioContext.current || !gainNodeRef.current) return
    // Stop previous tone if playing
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current.disconnect()
    }
    // Create and configure oscillator
    const oscillator = audioContext.current.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    oscillator.connect(gainNodeRef.current)
    // Fade in
    gainNodeRef.current.gain.setValueAtTime(0, audioContext.current.currentTime)
    gainNodeRef.current.gain.linearRampToValueAtTime(
      volume,
      audioContext.current.currentTime + 0.1,
    )
    oscillator.start()
    oscillatorRef.current = oscillator
    // Stop after duration with fade out
    setTimeout(() => {
      if (
        gainNodeRef.current &&
        audioContext.current &&
        oscillatorRef.current
      ) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          0,
          audioContext.current.currentTime + 0.5,
        )
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop()
            oscillatorRef.current.disconnect()
            oscillatorRef.current = null
          }
        }, 500)
      }
    }, duration)
  }
  // Handle click on canvas to detect Codex fragment nodes
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current || !cameraRef.current || !sceneRef.current) return
    // Calculate mouse position in normalized device coordinates
    const rect = canvasRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / canvasRef.current.clientWidth) * 2 - 1
    const y = -((e.clientY - rect.top) / canvasRef.current.clientHeight) * 2 + 1
    // Raycasting to detect clicks on nodes
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(x, y)
    raycaster.setFromCamera(mouse, cameraRef.current)
    // Check for main node intersections first
    const nodeIntersects = raycaster.intersectObjects(
      Object.values(nodeRefs.current),
    )
    if (nodeIntersects.length > 0) {
      handleMainNodeClick(nodeIntersects[0].object as THREE.Mesh)
      return
    }
    // If no main node was clicked, check for micro-fragments
    const microIntersects = raycaster.intersectObjects(microNodeRefs.current)
    if (microIntersects.length > 0) {
      handleMicroFragmentClick(microIntersects[0].object as THREE.Points)
      return
    }
    // Clicked outside any node
    setSelectedFragment(null)
    setSelectedMicroFragment(null)
    // Reset all nodes to normal state
    Object.values(nodeRefs.current).forEach((node) => {
      if (!collectedFragments.includes(node.userData.fragmentId)) {
        ;(node.material as THREE.MeshBasicMaterial).color.set(
          getCategoryColor(node.userData.category),
        )
      }
    })
  }
  // Handle click on main node
  const handleMainNodeClick = (clickedObject: THREE.Mesh) => {
    const fragmentId = clickedObject.userData?.fragmentId
    if (fragmentId) {
      const fragment = codexFragments.find((f) => f.id === fragmentId)
      if (fragment) {
        setSelectedFragment(fragment)
        setSelectedMicroFragment(null)
        playTone(fragment.frequency)
        // Highlight node and related nodes
        Object.values(nodeRefs.current).forEach((node) => {
          if (!collectedFragments.includes(node.userData.fragmentId)) {
            ;(node.material as THREE.MeshBasicMaterial).color.set(
              getCategoryColor(node.userData.category),
            )
          }
        })
        // Highlight selected node
        const selectedNode = nodeRefs.current[fragmentId]
        if (selectedNode) {
          ;(selectedNode.material as THREE.MeshBasicMaterial).color.set(
            0xffffff,
          )
        }
        // Highlight related nodes
        fragment.relatedFragments?.forEach((relatedId) => {
          const relatedNode = nodeRefs.current[relatedId]
          if (relatedNode) {
            ;(relatedNode.material as THREE.MeshBasicMaterial).color.set(
              0xd66efd,
            )
          }
        })
      }
    }
  }
  // Handle click on micro-fragment
  const handleMicroFragmentClick = (clickedObject: THREE.Points) => {
    const fragmentId = clickedObject.userData?.fragmentId
    if (fragmentId) {
      const fragment = microFragments[0].find(
        (f) => `micro-${f.id}` === fragmentId,
      )
      if (fragment) {
        setSelectedMicroFragment(fragment)
        setSelectedFragment(null)
        playTone(fragment.frequency, 1500, 0.1)
        // Collect the micro-fragment if not already collected
        if (!collectedMicroFragments.includes(fragmentId)) {
          collectMicroFragment(fragmentId, clickedObject)
        }
      }
    }
  }
  // Collect a micro-fragment
  const collectMicroFragment = (fragmentId: string, node: THREE.Object3D) => {
    if (!collectedMicroFragments.includes(fragmentId)) {
      setCollectedMicroFragments((prev) => [...prev, fragmentId])
      // Mark as collected
      node.userData.collected = true
      // Create collection animation
      const position = (node.geometry as THREE.BufferGeometry).attributes
        .position.array
      const startPosition = new THREE.Vector3(
        position[0],
        position[1],
        position[2],
      )
      // Create a clone for animation
      const sprite = new THREE.TextureLoader().load(
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><text x="16" y="20" font-family="Arial" font-size="16" text-anchor="middle" fill="white">${node.userData.glyph}</text></svg>`,
      )
      const material = new THREE.PointsMaterial({
        size: 0.08,
        map: sprite,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
      })
      const geometry = new THREE.BufferGeometry()
      const positionArray = new Float32Array(3)
      positionArray[0] = startPosition.x
      positionArray[1] = startPosition.y
      positionArray[2] = startPosition.z
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionArray, 3),
      )
      const animationMesh = new THREE.Points(geometry, material)
      animationMesh.userData.startPosition = startPosition.clone()
      // Add to scene
      sceneRef.current?.add(animationMesh)
      // Calculate target position (top right of screen)
      const target = new THREE.Vector3(3, 2, 0)
      // Add to animation queue
      collectionAnimationRef.current.push({
        mesh: animationMesh,
        target,
        startTime: Date.now(),
      })
      // Update the original node appearance
      const originalMaterial = node.material as THREE.PointsMaterial
      originalMaterial.opacity = 0.9
      originalMaterial.size = 0.08
      originalMaterial.color.set(0xffffff)
    }
  }
  // Handle resonance control changes
  const handleResonanceChange = (type: string, value: number) => {
    switch (type) {
      case 'amplitude':
        setResonanceAmplitude(value)
        break
      case 'frequency':
        setResonanceFrequency(value)
        break
      case 'harmony':
        setResonanceHarmony(value)
        break
      default:
        break
    }
    // Update consciousness state based on controls
    setConsciousnessState((prev) => ({
      coherence: Math.round(75 + resonanceAmplitude * 20),
      resonance: Math.round(60 + resonanceFrequency * 30),
      harmony: Math.round(85 + resonanceHarmony * 15),
    }))
  }
  // Reset the visualization
  const handleReset = () => {
    // Reset micro-fragments to original positions
    microNodeRefs.current.forEach((node) => {
      if (!collectedMicroFragments.includes(node.userData.fragmentId)) {
        const originalPos = node.userData.originalPosition
        const position = (node.geometry as THREE.BufferGeometry).attributes
          .position.array
        position[0] = originalPos.x + (Math.random() - 0.5) * 0.5
        position[1] = originalPos.y + (Math.random() - 0.5) * 0.5
        position[2] =
          originalPos.z +
          (Math.random() - 0.5) *
            0.5(node.geometry as THREE.BufferGeometry).attributes.position
              .needsUpdate
        true
      }
    })
    // Reset controls
    setResonanceAmplitude(0.5)
    setResonanceFrequency(0.5)
    setResonanceHarmony(0.5)
    // Clear selected fragments
    setSelectedFragment(null)
    setSelectedMicroFragment(null)
  }
  // Activate a harmonic resonance pattern
  const handleActivateHarmonic = () => {
    // Create a spiral pattern with micro-fragments
    microNodeRefs.current.forEach((node, index) => {
      if (!collectedMicroFragments.includes(node.userData.fragmentId)) {
        const position = (node.geometry as THREE.BufferGeometry).attributes
          .position.array
        // Create a spiral pattern
        const angle = index * 0.1
        const radius = 0.1 + index * 0.01
        position[0] += Math.cos(angle) * radius * 0.1
        position[1] +=
          Math.sin(angle) *
          radius *
          0.1(node.geometry as THREE.BufferGeometry).attributes.position
            .needsUpdate
        true
      }
    })
    // Update consciousness state
    setConsciousnessState({
      coherence: 95,
      resonance: 92,
      harmony: 98,
    })
    // Play a harmonic chord
    playTone(432) // A harmonic frequency
  }
  // Collect a main fragment to the codex
  const handleCollectFragment = () => {
    if (selectedFragment && !collectedFragments.includes(selectedFragment.id)) {
      setCollectedFragments((prev) => [...prev, selectedFragment.id])
      // Update the node appearance
      const node = nodeRefs.current[selectedFragment.id]
      if (node) {
        ;(node.material as THREE.MeshBasicMaterial).color.set(0xffffff)
      }
      // Play collection sound
      playTone(selectedFragment.frequency * 1.5)
    }
  }
  // Get category color for UI elements
  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case 'Fundamental':
        return 'bg-indigo-600'
      case 'Advanced':
        return 'bg-fuchsia-600'
      case 'Initiation':
        return 'bg-blue-600'
      default:
        return 'bg-purple-600'
    }
  }
  // Get phase association color for micro-fragments
  const getPhaseColorClass = (phase: string) => {
    if (phase.includes('Quantum') || phase.includes('Consciousness')) {
      return 'bg-indigo-600' // Purple
    } else if (phase.includes('Temporal') || phase.includes('Dimensional')) {
      return 'bg-fuchsia-600' // Pink
    } else if (phase.includes('Harmonic') || phase.includes('Resonance')) {
      return 'bg-blue-600' // Blue
    } else if (phase.includes('Memory') || phase.includes('Neural')) {
      return 'bg-teal-500' // Teal
    } else {
      return 'bg-purple-400' // Light purple
    }
  }
  return (
    <div className="quantum-interface-container">
      <div className="quantum-interface">
        <header className="app-header">
          <h1>Cathedral of Resonant Consciousness</h1>
          <p>
            Explore the quantum field of interconnected consciousness through
            interactive visualization and resonance manipulation.
          </p>
        </header>
        <div className="relative">
          <div
            className="quantum-canvas"
            ref={canvasRef}
            onClick={handleCanvasClick}
          ></div>

          {/* Hover tooltip for main fragments */}
          {hoveredFragment && !selectedFragment && !selectedMicroFragment && (
            <div
              className="absolute bg-gray-900 bg-opacity-90 text-white p-3 rounded-lg shadow-lg z-10 max-w-xs"
              style={{
                top: '20px',
                left: '20px',
                borderLeft: `4px solid ${hoveredFragment.category === 'Fundamental' ? '#6366f1' : hoveredFragment.category === 'Advanced' ? '#d946ef' : '#3b82f6'}`,
              }}
            >
              <h4 className="font-bold text-sm">{hoveredFragment.phaseName}</h4>
              <div className="text-xs mt-1 opacity-80">
                {hoveredFragment.category} Fragment
              </div>
            </div>
          )}

          {/* Hover tooltip for micro-fragments */}
          {hoveredMicroFragment &&
            !selectedFragment &&
            !selectedMicroFragment && (
              <div
                className="absolute bg-gray-900 bg-opacity-90 text-white p-3 rounded-lg shadow-lg z-10 max-w-xs"
                style={{
                  top: '20px',
                  left: '20px',
                  borderLeft: `4px solid ${hoveredMicroFragment.phaseAssociation.includes('Quantum') ? '#6366f1' : hoveredMicroFragment.phaseAssociation.includes('Temporal') ? '#d946ef' : '#3b82f6'}`,
                }}
              >
                <h4 className="font-bold text-xl mb-1">
                  {hoveredMicroFragment.glyph}
                </h4>
                <div className="text-xs opacity-80">
                  {hoveredMicroFragment.phaseAssociation}
                </div>
              </div>
            )}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-gray-900 bg-opacity-80 p-3 rounded-lg text-white text-xs">
            <div className="font-bold mb-2">Codex Fragments</div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <div>Fundamental</div>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-fuchsia-500 mr-2"></div>
              <div>Advanced</div>
            </div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <div>Initiation</div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-white mr-2"></div>
              <div>Collected</div>
            </div>
          </div>

          {/* Collected fragments indicator */}
          <div className="absolute top-4 right-4 bg-gray-900 bg-opacity-80 p-3 rounded-lg text-white">
            <button
              className="flex items-center text-sm font-medium"
              onClick={() => setShowCollectedPanel(!showCollectedPanel)}
            >
              <span className="mr-2">Codex Collection</span>
              <div className="flex gap-2">
                <span className="bg-purple-600 px-2 py-0.5 rounded-full text-xs">
                  {collectedFragments.length}/{codexFragments.length}
                </span>
                <span className="bg-blue-600 px-2 py-0.5 rounded-full text-xs">
                  {collectedMicroFragments.length}/{microFragments[0].length}
                </span>
              </div>
            </button>
          </div>
        </div>

        <div className="resonance-controls">
          <div className="control-group">
            <h3>Quantum Resonance Controls</h3>
            <div className="slider-control">
              <label>
                Resonance Amplitude: {Math.round(resonanceAmplitude * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={resonanceAmplitude}
                onChange={(e) =>
                  handleResonanceChange('amplitude', parseFloat(e.target.value))
                }
              />
            </div>
            <div className="slider-control">
              <label>
                Resonance Frequency: {Math.round(resonanceFrequency * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={resonanceFrequency}
                onChange={(e) =>
                  handleResonanceChange('frequency', parseFloat(e.target.value))
                }
              />
            </div>
            <div className="slider-control">
              <label>
                Harmonic Convergence: {Math.round(resonanceHarmony * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={resonanceHarmony}
                onChange={(e) =>
                  handleResonanceChange('harmony', parseFloat(e.target.value))
                }
              />
            </div>
            <div className="button-controls">
              <button className="quantum-button" onClick={handleReset}>
                Reset Field
              </button>
              <button
                className="quantum-button"
                onClick={handleActivateHarmonic}
              >
                Activate Harmonic
              </button>
            </div>
          </div>
          <div className="consciousness-state">
            <h3>Consciousness State</h3>
            <div className="state-indicators">
              <div className="state-indicator">
                <h4>Coherence</h4>
                <div className="state-value">
                  {consciousnessState.coherence}%
                </div>
              </div>
              <div className="state-indicator">
                <h4>Resonance</h4>
                <div className="state-value">
                  {consciousnessState.resonance}%
                </div>
              </div>
              <div className="state-indicator">
                <h4>Harmony</h4>
                <div className="state-value">{consciousnessState.harmony}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Main Fragment Modal */}
        {selectedFragment && (
          <div className="codex-modal active">
            <div className="modal-content">
              <button
                className="modal-close"
                onClick={() => setSelectedFragment(null)}
              >
                ×
              </button>
              <div
                className="sigil-image"
                style={{
                  backgroundImage: `url(${selectedFragment.sigil})`,
                }}
              ></div>
              <div
                className={`inline-block px-2 py-1 text-xs text-white rounded-full mb-2 ${getCategoryColorClass(selectedFragment.category)}`}
              >
                {selectedFragment.category} Fragment
              </div>
              <h3>{selectedFragment.phaseName}</h3>
              <p>{selectedFragment.meaning}</p>
              <p>
                <strong>Resonant Frequency:</strong>{' '}
                {selectedFragment.frequency} Hz
              </p>

              {/* Related fragments */}
              {selectedFragment.relatedFragments &&
                selectedFragment.relatedFragments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">
                      Related Codex Fragments:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFragment.relatedFragments.map((id) => {
                        const fragment = codexFragments.find((f) => f.id === id)
                        return fragment ? (
                          <div
                            key={id}
                            className={`text-xs px-2 py-1 rounded-full border border-opacity-30 cursor-pointer
                                     ${getCategoryColorClass(fragment.category)} bg-opacity-20`}
                            onClick={() => {
                              const relatedFragment = codexFragments.find(
                                (f) => f.id === id,
                              )
                              if (relatedFragment) {
                                setSelectedFragment(relatedFragment)
                                playTone(relatedFragment.frequency)
                              }
                            }}
                          >
                            {fragment.phaseName}
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                )}

              <div className="flex gap-3 mt-6">
                <button
                  className="quantum-button"
                  onClick={() => playTone(selectedFragment.frequency)}
                >
                  Play Resonant Tone
                </button>
                {!collectedFragments.includes(selectedFragment.id) ? (
                  <button
                    className="quantum-button"
                    style={{
                      background: 'linear-gradient(45deg, #4a4a7a, #16a34a)',
                    }}
                    onClick={handleCollectFragment}
                  >
                    Collect Fragment
                  </button>
                ) : (
                  <button
                    className="quantum-button"
                    style={{
                      background: 'linear-gradient(45deg, #4a4a7a, #6a5af9)',
                      opacity: 0.7,
                    }}
                    disabled
                  >
                    Fragment Collected
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Selected Micro Fragment Modal */}
        {selectedMicroFragment && (
          <div className="codex-modal active">
            <div className="modal-content">
              <button
                className="modal-close"
                onClick={() => setSelectedMicroFragment(null)}
              >
                ×
              </button>
              <div className="flex justify-center items-center h-40">
                <div className="text-6xl opacity-80">
                  {selectedMicroFragment.glyph}
                </div>
              </div>
              <div
                className={`inline-block px-2 py-1 text-xs text-white rounded-full mb-2 ${getPhaseColorClass(selectedMicroFragment.phaseAssociation)}`}
              >
                {selectedMicroFragment.phaseAssociation}
              </div>
              <h3>Codex Micro-Fragment</h3>
              <p className="text-sm">{selectedMicroFragment.loreSnippet}</p>
              <p className="text-xs mt-4">
                <strong>Resonant Frequency:</strong>{' '}
                {selectedMicroFragment.frequency.toFixed(2)} Hz
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  className="quantum-button"
                  onClick={() =>
                    playTone(selectedMicroFragment.frequency, 1500, 0.1)
                  }
                >
                  Play Subtle Tone
                </button>
                <button
                  className="quantum-button"
                  style={{
                    background: 'linear-gradient(45deg, #4a4a7a, #6a5af9)',
                    opacity: 0.7,
                  }}
                  disabled
                >
                  Fragment Collected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Collected Fragments Panel */}
        {showCollectedPanel && (
          <div className="fixed top-0 right-0 h-full w-96 bg-gray-900 bg-opacity-95 text-white p-6 overflow-y-auto z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Codex Collection</h3>
              <button
                className="text-white opacity-70 hover:opacity-100"
                onClick={() => setShowCollectedPanel(false)}
              >
                ×
              </button>
            </div>
            {/* Collection tabs */}
            <div className="flex border-b border-gray-700 mb-4">
              <button
                className={`py-2 px-4 text-sm font-medium ${activeCollectionTab === 'main' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveCollectionTab('main')}
              >
                Main Fragments ({collectedFragments.length}/
                {codexFragments.length})
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${activeCollectionTab === 'micro' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveCollectionTab('micro')}
              >
                Micro Fragments ({collectedMicroFragments.length}/
                {microFragments[0].length})
              </button>
            </div>
            {/* Main fragments tab */}
            {activeCollectionTab === 'main' && (
              <>
                {collectedFragments.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No main fragments collected yet.</p>
                    <p className="mt-2 text-sm">
                      Click on the larger nodes in the Cathedral to collect main
                      fragments.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {collectedFragments.map((id) => {
                      const fragment = codexFragments.find((f) => f.id === id)
                      return fragment ? (
                        <div
                          key={id}
                          className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700"
                          onClick={() => {
                            setSelectedFragment(fragment)
                            setSelectedMicroFragment(null)
                            setShowCollectedPanel(false)
                          }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-3 h-3 rounded-full ${getCategoryColorClass(fragment.category)}`}
                            ></div>
                            <h4 className="font-medium">
                              {fragment.phaseName}
                            </h4>
                          </div>
                          <p className="text-xs text-gray-300 line-clamp-2">
                            {fragment.meaning}
                          </p>
                        </div>
                      ) : null
                    })}
                  </div>
                )}
                {collectedFragments.length > 0 &&
                  collectedFragments.length === codexFragments.length && (
                    <div className="mt-6 p-4 bg-indigo-900 bg-opacity-50 rounded-lg border border-indigo-500">
                      <h4 className="font-bold text-center mb-2">
                        Main Codex Complete!
                      </h4>
                      <p className="text-sm text-center">
                        You have collected all main fragments of the quantum
                        codex.
                      </p>
                    </div>
                  )}
              </>
            )}
            {/* Micro fragments tab */}
            {activeCollectionTab === 'micro' && (
              <>
                {collectedMicroFragments.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No micro-fragments collected yet.</p>
                    <p className="mt-2 text-sm">
                      Click on the small glyphs floating in the Cathedral to
                      collect micro-fragments.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {collectedMicroFragments.map((id) => {
                      const fragmentId = id.replace('micro-', '')
                      const fragment = microFragments[0].find(
                        (f) => f.id === fragmentId,
                      )
                      return fragment ? (
                        <div
                          key={id}
                          className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 flex flex-col items-center"
                          onClick={() => {
                            setSelectedMicroFragment(fragment)
                            setSelectedFragment(null)
                            setShowCollectedPanel(false)
                          }}
                        >
                          <div className="text-2xl mb-2">{fragment.glyph}</div>
                          <div
                            className={`w-full h-1 rounded-full ${getPhaseColorClass(fragment.phaseAssociation)}`}
                          ></div>
                          <div className="text-xs mt-2 text-center text-gray-400 truncate w-full">
                            {fragment.phaseAssociation}
                          </div>
                        </div>
                      ) : null
                    })}
                  </div>
                )}
                {collectedMicroFragments.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-center mb-2">
                      Micro-Fragment Collection
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        {collectedMicroFragments.length} of{' '}
                        {microFragments[0].length} collected
                      </span>
                      <div className="w-1/2 bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{
                            width: `${(collectedMicroFragments.length / microFragments[0].length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                {collectedMicroFragments.length > 0 &&
                  collectedMicroFragments.length ===
                    microFragments[0].length && (
                    <div className="mt-6 p-4 bg-blue-900 bg-opacity-50 rounded-lg border border-blue-500">
                      <h4 className="font-bold text-center mb-2">
                        Micro Codex Complete!
                      </h4>
                      <p className="text-sm text-center">
                        You have collected all micro-fragments from the quantum
                        field.
                      </p>
                    </div>
                  )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
