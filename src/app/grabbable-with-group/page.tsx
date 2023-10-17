"use client";
import {
  XRCanvas,
  Hands,
  Controllers,
  Grabbable,
} from "@coconut-xr/natuerlich/defaults";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
} from "@coconut-xr/natuerlich/react";
import { INFOS } from "../constants/info";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

export default function Page() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);

  return (
    <div>
      <div className="page-header">
        <h2>{INFOS[3].title}</h2>
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
