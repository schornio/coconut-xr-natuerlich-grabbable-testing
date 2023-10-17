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
        <h2>{INFOS[2].title}</h2>
        <a href="/" className="a-link">
          Home
        </a>

        <button onClick={enterAR} className="a-link">
          Enter AR
        </button>
      </div>

      {/* ✅ Grabbable -> Group */}
      {/* ❌ Group -> Grabbable */}
      <XRCanvas>
        {/* Works, but moves all elements inside of it equally */}
        <Grabbable>
          <group position={[-0.5, 1.2, -0.5]}>
            <mesh scale={0.1}>
              <boxGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          </group>
        </Grabbable>

        {/* Doesn't work in case we want to move individually, 'group' position influences the children */}
        {/* <group position={[-0.5, 1.2, -0.5]}>
          <Grabbable>
            <mesh scale={0.1}>
              <boxGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          </Grabbable>
        </group> */}

        <Grabbable>
          <mesh scale={0.1} position={[0.2, 1, -0.5]}>
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
        </Grabbable>
        <NonImmersiveCamera />
        <ImmersiveSessionOrigin>
          <Hands type="grab" />
          <Controllers type="grab" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}
