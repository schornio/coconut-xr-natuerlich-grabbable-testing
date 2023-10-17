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

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

export default function Page() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);

  // It works well
  return (
    <div>
      <div className="page-header">
        <h2>Grabbable</h2>
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
        <Grabbable>
          <group position={[-0.5, 1.2, -0.5]}>
            <mesh scale={0.1}>
              <boxGeometry />
              <meshBasicMaterial color="red" />
            </mesh>
          </group>
        </Grabbable>

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
