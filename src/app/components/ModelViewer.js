"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Model({ path, rotationY }) {
  const { scene } = useGLTF(path);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = rotationY + 1.5;
    }
  }, [rotationY]);

  return <primitive ref={modelRef} object={scene} scale={2} />;
}

export default function ModelViewer() {
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the multiplier to control rotation speed
      const newRotation = window.scrollY * 0.003;
      setRotationY(newRotation);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[600px] lg:h-[600px]">
      <Canvas camera={{ position: [0, 3, 7] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 3, 2]} intensity={1} />
        <Model path="/scene.gltf" rotationY={rotationY} />
        <EffectComposer>
          <Bloom 
            intensity={3.5} 
            luminanceThreshold={0.5} 
   
            radius={10}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}