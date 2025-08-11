/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Points as ThreePoints } from 'three';

function Stars() {
  const ref = useRef<ThreePoints>(null);

  // Generate sphere positions manually without external random library
  const sphere = useMemo(() => {
    const generateSafePositions = (): Float32Array => {
      const count = 5000;
      const positions = new Float32Array(count);
      const radius = 1.5;
      
      for (let i = 0; i < count; i += 3) {
        // Generate points on a sphere using spherical coordinates
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u; // azimuthal angle
        const phi = Math.acos(2 * v - 1); // polar angle
        
        // Convert to Cartesian coordinates
        const r = Math.pow(Math.random(), 1/3) * radius; // cubic root for uniform distribution
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        // Ensure no NaN values (add fallback just in case)
        positions[i] = isFinite(x) ? x : (Math.random() - 0.5) * 2;
        positions[i + 1] = isFinite(y) ? y : (Math.random() - 0.5) * 2;
        positions[i + 2] = isFinite(z) ? z : (Math.random() - 0.5) * 2;
      }
      
      return positions;
    };

    return generateSafePositions();
  }, []);

  // Additional safety check - don't render if positions are invalid
  const isValidPositions = sphere.length > 0 && sphere.every(val => isFinite(val));
  
  if (!isValidPositions) {
    console.warn('Invalid positions detected in Stars component:', {
      length: sphere.length,
      firstFew: Array.from(sphere.slice(0, 9)),
      hasNaN: sphere.some(val => isNaN(val)),
      hasInfinite: sphere.some(val => !isFinite(val))
    });
    return null;
  }

  useFrame((_, delta) => {
    if (ref.current && isFinite(delta) && delta > 0) {
      const rotationDelta = Math.min(Math.abs(delta), 0.1); // Cap and ensure positive
      ref.current.rotation.x -= rotationDelta / 10;
      ref.current.rotation.y -= rotationDelta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere} 
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 bg-background">
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <Canvas 
          camera={{ position: [0, 0, 1] }}
          onError={(error) => {
            console.warn('Three.js Canvas error:', error);
          }}
        >
          <Stars />
        </Canvas>
      </Suspense>
    </div>
  );
}
