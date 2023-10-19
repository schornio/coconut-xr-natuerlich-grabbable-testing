import { Grabbable } from "@coconut-xr/natuerlich/defaults";
import { blueBoxPosition, redBoxPosition } from "../constants/appData";
import { Text } from "@react-three/drei";
import { useSceneStore } from "./useSceneStore";
import {
  INVISIBLE_POSITION,
  INVISIBLE_SCALE,
  VISIBLE_POSITION,
  VISIBLE_SCALE,
} from "./sceneConfig";

export function SceneOne({ visible }: { visible: boolean }) {
  const nextScene = useSceneStore((state) => state.nextScene);

  return (
    <group
      position={visible ? VISIBLE_POSITION : INVISIBLE_POSITION}
      visible={visible}
      scale={visible ? VISIBLE_SCALE : INVISIBLE_SCALE}
    >
      <Text fontSize={0.1} position={[0, 1.2, -2]}>
        SceneOne
      </Text>

      <group position={[0.1, -0.3, 0]}>
        <Grabbable>
          <mesh scale={0.1} position={[redBoxPosition.x, 0, 0]}>
            <boxGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
        </Grabbable>

        <Grabbable>
          <mesh scale={0.1} position={[blueBoxPosition.x, 0, 0]}>
            <boxGeometry />
            <meshBasicMaterial color="blue" />
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
