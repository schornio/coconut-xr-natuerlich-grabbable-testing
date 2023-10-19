import { Grabbable } from "@coconut-xr/natuerlich/defaults";
import { blueBoxPosition, redBoxPosition } from "../constants/appData";
import { Text } from "@react-three/drei";
import { useSceneStore } from "./useSceneStore";

export function SceneThree() {
  const nextScene = useSceneStore((state) => state.nextScene);

  return (
    <group position={[0, 1, -0.5]}>
      <Text fontSize={0.1} position={[0, 1.2, -2]}>
        SceneThree
      </Text>

      <group position={[0.1, -0.3, 0]}>
        <Grabbable>
          <mesh scale={0.1} position={[redBoxPosition.x, 0, 0]}>
            <boxGeometry />
            <meshBasicMaterial color="orange" />
          </mesh>
        </Grabbable>

        <Grabbable>
          <mesh scale={0.1} position={[blueBoxPosition.x, 0, 0]}>
            <boxGeometry />
            <meshBasicMaterial color="gray" />
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
