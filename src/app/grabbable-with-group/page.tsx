"use client";
import {
  XRCanvas,
  Hands,
  Controllers,
  Grabbable,
} from "@coconut-xr/natuerlich/defaults";
import { useRef } from "react";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
} from "@coconut-xr/natuerlich/react";
import { Mesh, Vector3 } from "three";
import { CustomGrabbable } from "../CustomGrabbable";
import { Text } from "@react-three/drei";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

export default function Page() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);

  return (
    <div>
      <div className="page-header">
        <h2>Grababble with group</h2>
        <a href="/" className="a-link">
          Home
        </a>

        <button onClick={enterAR} className="a-link">
          Enter AR
        </button>
      </div>

      <XRCanvas>
        {/* Applied position to parent  */}
        {/* Conflict child and parent positions */}
        <group position={[0, 1, -0.4]}>
          {/* Mock values to test Hierarchical positioning */}
          <group position={[0.1, -0.3, 0.2]}>
            <Grabbable>
              <mesh scale={0.1} position={[-0.2, 0, -0.5]}>
                <boxGeometry />
                <meshBasicMaterial color="red" />
              </mesh>
              <Text fontSize={0.02} position={[0, 0, 0.06]}>
                Custom
              </Text>
            </Grabbable>

            <Grabbable>
              <mesh scale={0.1} position={[0.2, 0, -0.5]}>
                <boxGeometry />
                <meshBasicMaterial color="blue" />
              </mesh>
            </Grabbable>
          </group>
        </group>
        <NonImmersiveCamera />
        <ImmersiveSessionOrigin>
          <Hands type="grab" />
          <Controllers type="grab" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}
