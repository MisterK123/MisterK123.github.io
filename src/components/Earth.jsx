import React, { useRef, useState, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const Earth = forwardRef((props,ref) => {
    const localRef = useRef();
    const groupRef = ref || localRef;
    const { nodes, materials } = useGLTF("src/components/earthfinalwithnames.glb");
    const { camera, raycaster, scene, pointer } = useThree();
    const [previousIntersectedObject, setPreviousIntersectedObject] = useState(null);
    const originalMaterials = useRef(new Map());
    const oceanGeometry = nodes.Ocean.geometry;
    const highlightMaterial = new THREE.MeshStandardMaterial({
        color: "green",
        emissive: "#10661c",
        emissiveIntensity: 1,
        roughness: 0.5,
        metalness: 0.5,
    });
    const continentLinks = new Map([
        [nodes.SouthAmerica.geometry, "/south-america - about me"],
        [nodes.NorthAmerica.geometry, "/north-america - projects"],
        [nodes.Antarctica.geometry, "/antarctica - contact"],
        [nodes.Austrailia.geometry, "/australia - resources/tools"],
        [nodes.Africa.geometry, "/africa - references"],
        [nodes.Asia.geometry, "/asia - achievements"],
        [nodes.Europe.geometry, "/europe - work experience"],
    ]);
    // star stuff
    const {onHover} = props;


    //console.log(nodes);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
        }

        raycaster.ray.origin.copy(camera.position);
        raycaster.ray.direction.set(pointer.x, pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {

            const object = intersects[0].object;
            //console.log('Intersected object', object);

            if (object.geometry === oceanGeometry) {
                if (previousIntersectedObject) {
                    const originalMaterial = originalMaterials.current.get(previousIntersectedObject);
                    if (originalMaterial) {
                        previousIntersectedObject.material = originalMaterial;
                    }
                    originalMaterials.current.delete(previousIntersectedObject);
                    setPreviousIntersectedObject(null);
                    onHover(null);
                }
                return;
            }
            if (continentLinks.has(object.geometry)) {
                if (object !== previousIntersectedObject) {
                    // Restore the previous object's material
                    if (previousIntersectedObject) {
                        const originalMaterial = originalMaterials.current.get(previousIntersectedObject);
                        if (originalMaterial) {
                            previousIntersectedObject.material = originalMaterial;
                        }



                        originalMaterials.current.delete(previousIntersectedObject);


                    }

                    // Save the current object's material and apply the highlight material
                    originalMaterials.current.set(object, object.material);
                    object.material = highlightMaterial;

                    const link = continentLinks.get(object.geometry);
                    console.log("hovered over", link);
                    onHover(link);
                    // Update the state
                    setPreviousIntersectedObject(object);



                }
            }

        } else {
            onHover(null);

            // Reset the previous object's material if no intersection
            if (previousIntersectedObject) {
                const originalMaterial = originalMaterials.current.get(previousIntersectedObject);
                if (originalMaterial) {
                    previousIntersectedObject.material = originalMaterial;
                }
                originalMaterials.current.delete(previousIntersectedObject);
                setPreviousIntersectedObject(null);
            }


        }
    });

    const handleClick = () => {
        console.log("clicked");
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            const object = intersects[0].object;

            if(object.geometry == oceanGeometry){
                console.log("Ocean, returning");
                return;

            }

            console.log("Object geometry: ", object.geometry);

            if (continentLinks.has(object.geometry)) {
                const link = continentLinks.get(object.geometry);
                console.log(link);
                //window.location.href = link;
                return
            }
            console.log("No link found");
        }
    };

    return (
        <group ref={groupRef || ref} {...props} dispose={null} onClick={handleClick}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Ocean.geometry}
                material={materials['Material.001']}
                rotation={[-Math.PI, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.SouthAmerica.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.NorthAmerica.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Antarctica.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Austrailia.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Africa.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Asia.geometry}
                material={materials['Material.002']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Europe.geometry}
                material={materials['Material.002']}
            />
        </group>
    );
});
Earth.displayName = "Earth";
useGLTF.preload("src/components/earthfinalwithnames.glb");

export default Earth;
