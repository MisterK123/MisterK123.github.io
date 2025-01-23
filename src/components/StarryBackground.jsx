import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const StarryBackground = () => {
    const { scene } = useThree();
    const textureLoader = new THREE.TextureLoader();
    const starTexture = textureLoader.load('src/components/startexture.jpg'); // Replace with your star texture

    useEffect(() => {
        // Create a large sphere to map the star texture onto
        const geometry = new THREE.SphereGeometry(500, 60, 60);
        geometry.scale(1, 1, -1); // Inverts the sphere so the texture is on the inside
        const material = new THREE.MeshBasicMaterial({
            map: starTexture,
            side: THREE.BackSide,
            opacity: 1, // Make it subtle
            transparent: true,
        });
        const starSphere = new THREE.Mesh(geometry, material);
        scene.add(starSphere);

        return () => {
            scene.remove(starSphere);
        };
    }, [scene]);

    return null;
};

export default StarryBackground;
