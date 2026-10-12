import type { ChapterId } from "./chapters";
const metal = { color: "#C39B66", metalness: 0.86, roughness: 0.23 };

function BalanceSculpture() {
  return (
    <group rotation={[0, -0.35, 0]}>
      <mesh position={[0, -1.18, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.18, 64]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.05, 0.095, 2.1, 32]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0, 1.03, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 2.65, 32]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.12, 32, 24]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.02, 0, 0]}>
          {[-1, 1].map((z) => (
            <mesh
              key={z}
              position={[0, 0.54, z * 0.2]}
              rotation={[z * 0.36, 0, 0]}
            >
              <cylinderGeometry args={[0.012, 0.012, 1.1, 8]} />
              <meshStandardMaterial {...metal} />
            </mesh>
          ))}
          <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.03, 0]}>
            <sphereGeometry
              args={[0.52, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]}
            />
            <meshStandardMaterial {...metal} side={2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
            <torusGeometry args={[0.52, 0.018, 12, 64]} />
            <meshStandardMaterial {...metal} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
function ClaritySculpture() {
  return (
    <group rotation={[0.1, -0.42, 0.08]}>
      {[-1, 0, 1].map((x, i) => (
        <mesh key={x} position={[x * 0.69, (i - 1) * 0.16, 0]}>
          <boxGeometry args={[0.38, 2.1 + i * 0.18, 0.5]} />
          <meshPhysicalMaterial
            color={i === 1 ? "#D9DDD0" : "#B48753"}
            metalness={i === 1 ? 0.25 : 0.85}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>
      ))}
      <mesh rotation={[0, 0, 0.35]} position={[0, 0.05, 0.37]}>
        <torusGeometry args={[1.02, 0.055, 20, 100]} />
        <meshStandardMaterial {...metal} />
      </mesh>
    </group>
  );
}
function CareSculpture() {
  return (
    <group rotation={[0.4, 0.3, -0.35]}>
      <mesh position={[-0.42, 0, 0]} rotation={[0.2, 0.5, 0]}>
        <torusGeometry args={[0.85, 0.19, 32, 96]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0.45, 0, 0.12]} rotation={[1.15, -0.3, 0]}>
        <torusGeometry args={[0.85, 0.19, 32, 96]} />
        <meshStandardMaterial
          color="#E5E6D8"
          metalness={0.5}
          roughness={0.23}
        />
      </mesh>
    </group>
  );
}
export function Sculptures({ chapter }: { chapter: ChapterId }) {
  return chapter === "balance" ? (
    <BalanceSculpture />
  ) : chapter === "clarity" ? (
    <ClaritySculpture />
  ) : (
    <CareSculpture />
  );
}
