import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import {
    Vector3,
    BufferGeometry,
    Float32BufferAttribute,
    LineBasicMaterial,
    Line,
} from "three";

const BigDipper = ({ targetPositions, duration = 1 }) => {
    const starRefs = useRef([]);
    const targetLineRefs = useRef([]);
    const defaultLineRefs = useRef([]);
    const [linesVisible, setLinesVisible] = useState(false);
    const [defaultLinesVisible, setDefaultLinesVisible] = useState(true);

    const defaultPositions = [
        { x: 4, y: 9, z: 0 }, // Star 1
        { x: 7, y: 7.5, z: 0 }, // Star 2
        { x: 8.5, y: 6.5, z: 0 }, // Star 3
        { x: 11, y: 5.75, z: 0 }, // Star 4
        { x: 15.5, y: 5, z: 0 }, // Star 5
        { x: 12, y: 4, z: 0 }, // Star 6
        { x: 14.5, y: 3.5, z: 0 }, // Star 7
    ];

    const connections = [
        [0, 1],
        [0, 2],
        [3, 1],
        [3, 2],
        [5, 6],
    ];

    const defaultConnections = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [3, 5],
        [5, 6],
        [4, 6],
    ];

    const createLineGeometry = (start, end) => {
        const geometry = new BufferGeometry();
        const vertices = new Float32BufferAttribute(
            [start.x, start.y, start.z, end.x, end.y, end.z],
            3
        );
        geometry.setAttribute("position", vertices);
        return geometry;
    };

    const isAtTargetPosition = (currentPosition, targetPosition) => {
        const tolerance = 0.1;
        return (
            Math.abs(currentPosition.x - targetPosition.x) < tolerance &&
            Math.abs(currentPosition.y - targetPosition.y) < tolerance &&
            Math.abs(currentPosition.z - targetPosition.z) < tolerance
        );
    };

    const isNotAtDefaultPosition = (currentPosition, defaultPosition) => {
        const tolerance = 0.1;
        return (
            Math.abs(currentPosition.x - defaultPosition.x) > tolerance ||
            Math.abs(currentPosition.y - defaultPosition.y) > tolerance ||
            Math.abs(currentPosition.z - defaultPosition.z) > tolerance
        );
    };

    useFrame((_, delta) => {
        const positions = targetPositions || defaultPositions;
        let allStarsAtTarget = true;
        let anyStarMoved = false;

        starRefs.current.forEach((ref, index) => {
            if (ref && positions[index]) {
                ref.position.lerp(
                    new Vector3(
                        positions[index].x,
                        positions[index].y,
                        positions[index].z
                    ),
                    delta / duration
                );

                if (!isAtTargetPosition(ref.position, positions[index])) {
                    allStarsAtTarget = false;
                }

                if (isNotAtDefaultPosition(ref.position, defaultPositions[index])) {
                    anyStarMoved = true;
                }
            }
        });

        if (anyStarMoved) {
            setDefaultLinesVisible(false);
            setLinesVisible(allStarsAtTarget);
        } else {
            setDefaultLinesVisible(true);
            setLinesVisible(false);
        }

        const updateLinePositions = (lineRefs, connections) => {
            lineRefs.current.forEach((line, index) => {
                if (line) {
                    const [startIndex, endIndex] = connections[index];
                    const start = starRefs.current[startIndex]?.position;
                    const end = starRefs.current[endIndex]?.position;

                    if (start && end) {
                        const positionsArray = line.geometry.attributes.position.array;
                        positionsArray[0] = start.x;
                        positionsArray[1] = start.y;
                        positionsArray[2] = start.z;
                        positionsArray[3] = end.x;
                        positionsArray[4] = end.y;
                        positionsArray[5] = end.z;

                        line.geometry.attributes.position.needsUpdate = true;
                    }
                }
            });
        };

        updateLinePositions(defaultLineRefs, defaultConnections);
        updateLinePositions(targetLineRefs, connections);
    });

    return (
        <group>
            {/* Render Stars */}
            {defaultPositions.map((pos, index) => (
                <mesh
                    key={index}
                    ref={(el) => (starRefs.current[index] = el)}
                    position={[pos.x, pos.y, pos.z]}
                >
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial emissive="#ffffff" emissiveIntensity={1.5} />
                </mesh>
            ))}

            {/* Render Default Lines */}
            {defaultLinesVisible &&
                defaultConnections.map(([startIdx, endIdx], index) => {
                    const start = defaultPositions[startIdx];
                    const end = defaultPositions[endIdx];
                    return (
                        <line
                            key={index}
                            ref={(el) => (defaultLineRefs.current[index] = el)}
                            geometry={createLineGeometry(start, end)}
                            material={
                                new LineBasicMaterial({
                                    color: "#ffffff", // Bright white color
                                    opacity: 0.2,    // Simulates emissive intensity
                                    transparent: true // Ensures opacity works
                                })
                            }

                        />
                    );
                })}

            {/* Render Target Lines */}
            {linesVisible &&
                connections.map(([startIdx, endIdx], index) => {
                    const start = defaultPositions[startIdx];
                    const end = defaultPositions[endIdx];
                    return (
                        <line
                            key={index}
                            ref={(el) => (targetLineRefs.current[index] = el)}
                            geometry={createLineGeometry(start, end)}
                            material={new LineBasicMaterial({ color: "#ffffff" })}
                            opacity={0.2}
                        />
                    );
                })}
        </group>
    );
};

export default BigDipper;
