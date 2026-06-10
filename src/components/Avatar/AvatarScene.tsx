import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float, Sparkles } from "@react-three/drei";
import { asset } from "../../assetUrl";

/**
 * The hero "avatar". A single 2D portrait cannot be turned into a rigged 3D
 * character of the reference's quality, so instead we give the real photo
 * genuine depth and life: it floats on a plane that idles and parallax-tilts
 * toward the cursor, wrapped in an ambient particle field for spatial depth.
 *
 * Parallax is driven from a window `mousemove` listener (not r3f's
 * `state.pointer`) because the canvas is `pointer-events: none` so it never
 * blocks the nav/text it sits in front of on desktop.
 */
const Portrait = () => {
  const texture = useTexture(asset("images/avatar.png"));
  texture.colorSpace = THREE.SRGBColorSpace;

  const img = texture.image as HTMLImageElement | undefined;
  const aspect = img && img.height ? img.width / img.height : 0.42;
  const height = 4.7;
  const width = height * aspect;

  return (
    <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.35}>
      <mesh position={[0, -0.15, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.04}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
};

const AvatarScene = () => {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    const { x, y } = mouse.current;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.2,
      0.045
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      y * 0.1,
      0.045
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      x * 0.18,
      0.045
    );
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 4, 5]} intensity={1.1} />
      <group ref={group}>
        <Portrait />
      </group>
      <Sparkles
        count={70}
        scale={[9, 9, 4]}
        size={2.4}
        speed={0.35}
        opacity={0.6}
        color="#5eead4"
      />
    </>
  );
};

export default AvatarScene;
