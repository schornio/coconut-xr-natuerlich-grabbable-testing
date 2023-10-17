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
        <group position={[0, 0.2, -0.4]}>
          {/* Moch values to test Hierarchical positioning */}
          <group position={[0.1, -0.3, 0.2]}>
            <Grabbable>
              <mesh scale={0.1} position={[0, 1, -0.5]}>
                <boxGeometry />
                <meshBasicMaterial color="red" />
              </mesh>
            </Grabbable>

            <Grabbable>
              <mesh scale={0.1} position={[0.2, 1, -0.5]}>
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