import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const particlesRef = useRef(null);

  useEffect(() => {
    // Initialize scene
    sceneRef.current = new THREE.Scene();
    
    // Initialize camera
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.set(0, 0, 5);
    
    // Initialize renderer
    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current.setClearColor(0x000000);

    // Initialize controls
    controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;
    controlsRef.current.screenSpacePanning = false;
    controlsRef.current.minDistance = 3;
    controlsRef.current.maxDistance = 10;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    sceneRef.current.add(directionalLight);

    // Add particles
    addParticles();

    // Start animation
    animate();

    // Cleanup
    return () => {
      // Dispose of Three.js objects
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        particlesRef.current.material.dispose();
        sceneRef.current.remove(particlesRef.current);
      }
      
      rendererRef.current.dispose();
      controlsRef.current.dispose();
    };
  }, []);

  const addParticles = () => {
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    particlesRef.current = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneRef.current.add(particlesRef.current);
  };

  const animate = () => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

    requestAnimationFrame(animate);
    
    // Update controls
    if (controlsRef.current) {
      controlsRef.current.update();
    }

    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clockRef.current.getElapsedTime() * 0.05;
    }

    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      // Update camera
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();

      // Update renderer
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      {/* UI Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Add your React UI components here */}
      </div>
    </div>
  );
};

export default ThreeScene;