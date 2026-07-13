"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

const points: [number, number, number][] = [
  [-3.4, 0.15, 0], [-1.7, 0.9, -0.25], [0, 0.05, 0.1], [1.7, -0.8, -0.2], [3.4, 0.2, 0],
];
const colors = ["#f7d0e9", "#d9f154", "#4876ff", "#ff7347", "#fffdf9"];

function Rig() {
  const group = useRef<Group>(null);
  const pointer = useThree((state) => state.pointer);
  useFrame((_, delta) => {
    if (!group.current) return;
    const damping = 1 - Math.exp(-delta * 3);
    group.current.rotation.y += (pointer.x * 0.12 - group.current.rotation.y) * damping;
    group.current.rotation.x += (-pointer.y * 0.08 - group.current.rotation.x) * damping;
  });

  return (
    <group ref={group}>
      <Line points={points} color="#7f7f87" lineWidth={1.5} transparent opacity={0.7} />
      {points.map((position, index) => (
        <RoundedBox key={index} args={[1.05, 1.05, 0.42]} radius={0.12} smoothness={3} position={position}>
          <meshStandardMaterial color={colors[index]} roughness={0.58} metalness={index === 2 ? 0.3 : 0.05} />
        </RoundedBox>
      ))}
    </group>
  );
}

export function SystemMap() {
  return (
    <div className="system-map">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 5, 5]} intensity={4} />
        <directionalLight position={[-4, -2, 3]} color="#4876ff" intensity={2} />
        <Rig />
      </Canvas>
      <div className="system-labels" aria-hidden="true">
        <span>INPUT</span><span>AGENT</span><span>QUEUE</span><span>RENDER</span><span>OUTPUT</span>
      </div>
    </div>
  );
}

