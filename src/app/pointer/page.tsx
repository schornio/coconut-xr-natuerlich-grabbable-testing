"use client";
import { XRCanvas, Hands, Controllers } from "@coconut-xr/natuerlich/defaults";
import { useRef } from "react";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
} from "@coconut-xr/natuerlich/react";
import { isXIntersection } from "@coconut-xr/xinteraction";
import { Mesh, Vector3 } from "three";
import { INFOS, redBoxPosition } from "../constants/info";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

export default function Page() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);

  const ref = useRef<Mesh>(null);
  const downState = useRef<{
    pointerId: number;
    pointToObjectOffset: Vector3;
  }>();

  return (
    <div>
      <div className="page-header">
        <h2>{INFOS[0].title}</h2>
        <a href="/" className="a-link">
          Home
        </a>

        <button onClick={enterAR} className="a-link">
          Enter AR
        </button>
      </div>

      <XRCanvas>
        <mesh
          scale={0.1}
          onPointerDown={(e) => {
            if (
              ref.current != null &&
              downState.current == null &&
              isXIntersection(e)
            ) {
              e.stopPropagation();
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              downState.current = {
                pointerId: e.pointerId,
                pointToObjectOffset: ref.current.position.clone().sub(e.point),
              };
            }
          }}
          onPointerUp={(e) => {
            if (downState.current?.pointerId != e.pointerId) {
              return;
            }
            downState.current = undefined;
          }}
          onPointerMove={(e) => {
            if (
              ref.current == null ||
              downState.current == null ||
              e.pointerId != downState.current.pointerId ||
              !isXIntersection(e)
            ) {
              return;
            }
            ref.current.position
              .copy(downState.current.pointToObjectOffset)
              .add(e.point);
          }}
          ref={ref}
          position={[redBoxPosition.x, redBoxPosition.y, redBoxPosition.z]}
        >
          <boxGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
        <NonImmersiveCamera />
        <ImmersiveSessionOrigin>
          <Hands type="grab" />
          <Controllers type="grab" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}
