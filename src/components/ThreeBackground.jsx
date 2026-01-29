import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import styles from './ThreeBackground.module.css';

const Particles = ({ count = 500 }) => {
    const mesh = useRef();
    const particlesData = useRef([]);

    useEffect(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        particlesData.current = temp;
    }, [count]);

    useFrame(() => {
        if (!particlesData.current.length || !mesh.current) return;

        particlesData.current.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            if (mesh.current.children[i]) {
                mesh.current.children[i].position.set(
                    (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                    (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                    (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
                );
                mesh.current.children[i].scale.set(s, s, s);
            }
        });
    });

    // Create dummy array for mapping, particlesData is for logic
    const dummy = new Array(count).fill(0);

    return (
        <group ref={mesh}>
            {dummy.map((_, i) => (
                <Sphere key={i} args={[0.05, 8, 8]}>
                    <meshStandardMaterial color="#cca43b" emissive="#cca43b" emissiveIntensity={0.5} roughness={0.5} />
                </Sphere>
            ))}
        </group>
    );
};

const ThreeBackground = () => {
    return (
        <div className={styles.container}>
            <Canvas camera={{ position: [0, 0, 100], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Particles count={200} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
