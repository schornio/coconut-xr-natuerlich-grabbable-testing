import { Grabbable } from "@coconut-xr/natuerlich/defaults";
import { blueBoxPosition, redBoxPosition } from "../constants/appData";
import { Text } from "@react-three/drei";
import { useSceneStore } from "./useSceneStore";

export function SceneTwo() {
  const nextScene = useSceneStore((state) => state.nextScene);

  return (
    <group position={[0, 1, -0.5]}>
      <Text fontSize={0.1} position={[0, 1.2, -2]}>
        SceneTwo
      </Text>

      <group position={[0.1, -0.3, 0]}>
        <Grabbable>
          <mesh scale={0.1} position={[redBoxPosition.x, 0, 0]}>
            <boxGeometry />
            <meshBasicMaterial color="yellow" />
          </mesh>
        </Grabbable>

        <Grabbable>
          <mesh scale={0.1} position={[blueBoxPosition.x, 0, 0]}>
            <boxGeometry />
            <meshBasicMaterial color="purple" />
          </mesh>
        </Grabbable>
      </group>

      {/* Button */}
      <mesh onPointerEnter={() => nextScene()}>
        <boxGeometry args={[0.3, 0.1, 0.02]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <Text fontSize={0.03} position={[0, 0, 0.02]}>
        Next Scene
      </Text>
    </group>
  );
}
