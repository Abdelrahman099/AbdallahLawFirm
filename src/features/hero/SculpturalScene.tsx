import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { MathUtils, PMREMGenerator } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { Sculptures } from "./Sculptures";
import type { ChapterId } from "./chapters";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);

function Studio({
  failure,
  ready,
}: {
  failure: () => void;
  ready: () => void;
}) {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = generator.fromScene(room, 0.04);
    scene.environment = environment.texture;
    const lost = (e: Event) => {
      e.preventDefault();
      failure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    ready();
    invalidate();
    return () => {
      gl.domElement.removeEventListener("webglcontextlost", lost);
      scene.environment = null;
      environment.dispose();
      room.dispose();
      generator.dispose();
    };
  }, [gl, scene, invalidate, ready, failure]);
  return null;
}
function Sculpture({
  chapter,
  pointer,
}: {
  chapter: ChapterId;
  pointer: { current: { x: number; y: number } };
}) {
  const group = useRef<Group>(null);
  const scrollRig = useRef<Group>(null);
  const { gl, invalidate } = useThree();
  useGSAP(
    () => {
      const trigger = gl.domElement.closest(".hero-direction");
      if (!trigger || !scrollRig.current) return;
      gsap.to(scrollRig.current.rotation, {
        y: 0.85,
        z: -0.08,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: () => invalidate(),
        },
      });
      gsap.to(scrollRig.current.position, {
        y: -0.35,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: () => invalidate(),
        },
      });
    },
    { dependencies: [gl, invalidate], revertOnUpdate: true },
  );
  useFrame((state, delta) => {
    if (!group.current) return;
    const y = pointer.current.x * 0.28,
      x = pointer.current.y * 0.1;
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      y,
      4,
      delta,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      x,
      4,
      delta,
    );
    if (
      Math.abs(group.current.rotation.y - y) +
        Math.abs(group.current.rotation.x - x) >
      0.0005
    )
      state.invalidate();
  });
  return (
    <group ref={scrollRig}>
      <group ref={group} rotation={[0, -0.15, 0]}>
        <Sculptures chapter={chapter} />
      </group>
    </group>
  );
}
export default function SculpturalScene({
  chapter,
  ready,
  failure,
}: {
  chapter: ChapterId;
  ready: () => void;
  failure: () => void;
}) {
  const pointer = useRef({ x: 0, y: 0 }),
    invalidate = useRef(() => {});
  return (
    <Canvas
      className="showcase-canvas"
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 5.8], fov: 38 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      onCreated={(s) => {
        invalidate.current = s.invalidate;
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((e.clientX - r.left) / r.width) * 2 - 1,
          y: ((e.clientY - r.top) / r.height) * 2 - 1,
        };
        invalidate.current();
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
        invalidate.current();
      }}
    >
      <Studio ready={ready} failure={failure} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[2, 4, 4]} intensity={2.4} />
      <Sculpture key={chapter} chapter={chapter} pointer={pointer} />
    </Canvas>
  );
}
