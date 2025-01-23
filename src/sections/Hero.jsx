import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera, OrbitControls,Text} from "@react-three/drei";
import Earth from "../components/Earth.jsx";
import Canvasloader from "../components/canvasloader.jsx";
import {Suspense, useRef, useState} from "react";
import {useMediaQuery} from "react-responsive";
import BigDipper from "../components/BigDipper.jsx";
import {Leva, useControls} from "leva";
import Stars from "../components/Stars.jsx";

const boundingBoxPositions = [
    { x: 7, y: 9, z: 0 },
    { x: 15, y: 9, z: 0 },
    { x: 7, y: 3, z: 0 },
    { x: 15, y: 3, z: 0 },
    { x: 11, y: 3, z: 0 },
    { x: 7, y: 6.5, z: 0 },
    { x: 15, y: 6.5, z: 0 },
];
const pointLightPositions = [
    [-5.75, -5, 1],
    [-8, -8, 1],
    [-10.5, -7, 1],
    [-13, -9.5, 1],
    [-15.5, -6.75, 1],

    [14,-9.5,1],
    [11,-8,1],
    [11.5,-4,1],
    [9.5,-1.5,1],
    [13,-1,1],
    [11.5,-4,1],
    [14,-5,1],
    [14,-9.5,1],

    [-9.5,2,1],
    [-11,7,1],
    [-12.5,9.5,1],
    [-15,9,1],
    [-14,7.25,1],
    [-11,7,1],
];

const navigationInfo = [
    ["/south-america - about me", "About Me", "About Me section info"],
    ["/north-america - projects", "Projects", "Projects section info"],
    ["/antarctica - contact", "Contact", "Contact section info"],
    ["/australia - resources/tools", "Resources", "Resources section info"],
    ["/africa - references", "References", "References section info"],
    ["/asia - achievements", "Achievements", "Achievements section info"],
    ["/europe - work experience", "Work Experience", "Work Experience section info"],
];

const Hero = () => {
    /*
    const controls = useControls("BigDipper", {
        positionX: {
            value: 0,
            min: -30,
            max: 30,
            step: 0.1
        },
        positionY: {
            value: 0,
            min: -30,
            max: 30,
            step: 0.1
        },
        positionZ: {
            value: 0,
            min: -30,
            max: 30,
            step: 0.1
        },
        scaleX:{
            value: 1,
            min: 0,
            max: 10,
            step: 0.1
        },
        scaleY:{
            value: 1,
            min: 0,
            max: 10,
            step: 0.1
        },
        scaleZ:{
            value: 1,
            min: 0,
            max: 10,
            step: 0.1
        },
        rotationX: {
            value: 0,
            min: -10,
            max: 10,
            step: 0.1
        },
        rotationY: {
            value: 0,
            min: -10,
            max: 10,
            step: 0.1
        },
        rotationZ: {
            value: 0,
            min: -10,
            max: 10,
            step: 0.1
        },
    })
    */

    const isMobile = useMediaQuery({query: "(max-width: 768px)"})
    // stars stuff
    const [targetPositions, setTargetPositions] = useState(null);
    const [sectionTitle, setSectionTitle] = useState("");  // State for section title
    const [sectionInfo, setSectionInfo] = useState("");    // State for section info
    const handleHover = (continent) => {
        if (continent) {
            setTargetPositions(boundingBoxPositions);
            console.log("hero:", continent);

            // Find the continent in navigationInfo
            const matchingInfo = navigationInfo.find(info => info[0] === continent);

            if (matchingInfo) {
                const [_, title, info] = matchingInfo;
                setSectionTitle(title);  // Update section title
                setSectionInfo(info);    // Update section info
                console.log("Section Title:", title);
                console.log("Section Info:", info);
            } else {
                setSectionTitle("");  // Reset if no matching continent
                setSectionInfo("");
                console.log("No matching continent found");
            }
        } else {
            setTargetPositions(null); // Reset to default when not hovering
            setSectionTitle("");      // Reset section title
            setSectionInfo("");
        }
    };

    //earth mouse rotation
    const groupRef = useRef();
    const isDragging = useRef(false);
    const previousPointerPosition = useRef({ x: 0, y: 0 });
    const handlePointerDown = (event) => {
        isDragging.current = true;
        console.log("Pointer down");
        console.log("Group children", groupRef.current.children);
        previousPointerPosition.current = { x: event.clientX, y: event.clientY };
    };

    const handlePointerUp = () => {
        isDragging.current = false;
        console.log("Pointer up");
    };

    const handlePointerMove = (event) => {
        if (!isDragging.current) return;
        console.log("Pointer move");
        const deltaX = (event.clientX - previousPointerPosition.current.x) * 0.005;
        const deltaY = (event.clientY - previousPointerPosition.current.y) * 0.005;

        if (groupRef.current) {
            groupRef.current.rotation.y += deltaX;
            groupRef.current.rotation.x += deltaY;
            groupRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, groupRef.current.rotation.x));
        }

        previousPointerPosition.current = { x: event.clientX, y: event.clientY };
    };
    const handleMouseLeave = (event) => {
        if (isDragging.current) {
            // Simulate pointer down on leave
            console.log("Pointer left canvas; simulating pointer down.");
            previousPointerPosition.current = { x: event.clientX, y: event.clientY };
            isDragging.current = false;
        }
    };
    return (
        <section className="min-h-screen w-full flex flex-col relative"
                 onMouseDown={handlePointerDown} onMouseUp={handlePointerUp} onMouseMove={handlePointerMove}
                 onMouseLeave={handleMouseLeave}>
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className="sm:text-2xl text-xl font-medium text-white text-center font-generalsans">Hi, I&#39;m
                    Kirin</p>
                <p className="sm:text-2xl text-xl font-medium text-white text-center font-generalsans"></p>
            </div>
            <div className="w-full h-full absolute inset-0">

                <Canvas className="w-full h-full">
                    <Suspense fallback={<Canvasloader/>}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]}/>

                        <Earth scale={isMobile ? 2 : 5} position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
                               ref={groupRef} onHover={handleHover}/>
                        <ambientLight intensity={0.2}/>
                        <directionalLight position={[40, 30, -5]} intensity={2}/>
                        {pointLightPositions.map((position, index) => (
                            <pointLight key={index} position={position} intensity={1}/>
                        ))}
                        <BigDipper

                            targetPositions={targetPositions}
                            duration={0.1}
                        />
                        <Text
                            position={[11, 8, 0]} // Position of the title in 3D space
                            fontSize={1}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {sectionTitle}
                        </Text>

                        {/* Render the Section Info as 3D text */}
                        <Text
                            position={[11, 6, 0]} // Position of the info in 3D space
                            fontSize={0.5}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {sectionInfo}
                        </Text>
                        <Stars/>
                    </Suspense>
                </Canvas>

            </div>

        </section>

    )
}
export default Hero
