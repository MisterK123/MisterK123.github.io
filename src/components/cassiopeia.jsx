import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Vector3, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Line } from "three";

const cassiopeia = () => {
    const starRefs = useRef([]);
    const defaultPositions = [
        { x: -4, y: 9, z: 0 },   // Star 1
        { x: -7, y: 7.5, z: 0 }, // Star 2
        { x: -8.5, y: 6.5, z: 0 }, // Star 3
        { x: -11, y: 5.75, z: 0 }, // Star 4
        { x: -15.5, y: 5, z: 0 }, // Star 5
        { x: -12, y: 4, z: 0 }, // Star 6
        { x: -14.5, y: 3.5, z: 0 }, // Star 7
    ];
    return (
        <group>

                {/* Render Stars */}
                {defaultPositions.map((pos, index) => (
                    <mesh
                        key={index}
                        ref={(el) => (starRefs.current[index] = el)}
                        position={[pos.x, pos.y, pos.z]}
                    >
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={1.5} />
                    </mesh>
                ))}
        </group>
    )
}
export default cassiopeia
