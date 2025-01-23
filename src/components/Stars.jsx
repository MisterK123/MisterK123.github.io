import React from "react";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import {Line} from "@react-three/drei";

const Stars = () => {
    const cassiopeiaPositions = [
        [-5.75, -5, 0],
        [-8, -8, 0],
        [-10.5, -7, 0],
        [-13, -9.5, 0],
        [-15.5, -6.75, 0],
    ];
    const lyraPositions = [
        [14,-9.5,0],
        [11,-8,0],
        [11.5,-4,0],
        [9.5,-1.5,0],
        [13,-1,0],
        [11.5,-4,0],
        [14,-5,0],
        [14,-9.5,0],
    ];
    const delphinusPositions = [
        [-9.5,2,0],
        [-11,7,0],
        [-12.5,9.5,0],
        [-15,9,0],
        [-14,7.25,0],
        [-11,7,0],
    ];

    return (
        <>
            {cassiopeiaPositions.map((position, index) => (
                <mesh key={`star-${index}`} position={position}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial
                        emissive="white"
                        emissiveIntensity={0.1}
                        color="white"
                    />
                </mesh>
            ))}

            {cassiopeiaPositions.slice(0, -1).map((start, index) => {
                const end = cassiopeiaPositions[index + 1];
                return (
                    <Line
                        key={`line-${index}`}
                        points={[start, end]}
                        color="white"
                        lineWidth={2}
                        transparent
                        opacity={0.2}
                    />
                );
            })}
            {lyraPositions.map((position, index) => (
                <mesh key={`star-${index}`} position={position}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial
                        emissive="white"
                        emissiveIntensity={0.1}
                        color="white"
                    />
                </mesh>
            ))}

            {lyraPositions.slice(0, -1).map((start, index) => {
                const end = lyraPositions[index + 1];
                return (
                    <Line
                        key={`line-${index}`}
                        points={[start, end]}
                        color="white"
                        lineWidth={2}
                        transparent
                        opacity={0.2}
                    />
                );
            })}
            {delphinusPositions.map((position, index) => (
                <mesh key={`star-${index}`} position={position}>
                    <sphereGeometry args={[0.1,16, 16]} />
                    <meshStandardMaterial
                        emissive="white"
                        emissiveIntensity={0.5}
                        color="white"
                    />
                </mesh>
            ))}

            {delphinusPositions.slice(0, -1).map((start, index) => {
                const end = delphinusPositions[index + 1];
                return (
                    <Line
                        key={`line-${index}`}
                        points={[start, end]}
                        color="white"
                        lineWidth={2}
                        transparent
                        opacity={0.2}
                    />
                );
            })}
        </>
    );
};

export default Stars;
