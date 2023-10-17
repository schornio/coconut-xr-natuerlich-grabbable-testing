"use client";
import { XRCanvas, Hands, Controllers } from "@coconut-xr/natuerlich/defaults";
import { MutableRefObject, RefObject, useRef } from "react";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
} from "@coconut-xr/natuerlich/react";
import { isXIntersection } from "@coconut-xr/xinteraction";
import { Mesh, Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { LogDisplay } from "../LogDisplay";
import { INFOS, blueBoxPosition, redBoxPosition } from "../constants/appData";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

type DownStateType = {
  pointerId: number;
  pointToObjectOffset: Vector3;
};

export default function Page() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);

  const ref1 = useRef<Mesh>(null);
  const ref2 = useRef<Mesh>(null);

  const downState1 = useRef<DownStateType | null>(null);

  const downState2 = useRef<DownStateType | null>(null);

  const handlePointerDown = (
    e: ThreeEvent<PointerEvent>,
    ref: RefObject<Mesh>,
    downState: MutableRefObject<DownStateType | null>
  ) => {
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
  };

  const handlePointerUp = (
    e: ThreeEvent<PointerEvent>,
    downState: MutableRefObject<DownStateType | null>
  ) => {
    if (downState.current?.pointerId != e.pointerId) {
      return;
    }
    downState.current = null;
  };

  const handlePointerMove = (
    e: ThreeEvent<PointerEvent>,
    ref: RefObject<Mesh>,
    downState: MutableRefObject<DownStateType | null>
  ) => {
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
  };

  return (
    <div>
      <div className="page-header">
        <h2>{INFOS[1].title}</h2>
        <a href="/" className="a-link">
          Home
        </a>

        <button onClick={enterAR} className="a-link">
          Enter AR
        </button>
      </div>

      <XRCanvas>
        <LogDisplay />
        {/* Applied position to parent  */}
        <group position={[0, 0.2, -0.1]}>
          {/* Mock values to test Hierarchical positioning */}
          <group position={[0.1, -0.3, 0.2]}>
            <mesh
              scale={0.1}
              onPointerDown={(e) => handlePointerDown(e, ref1, downState1)}
              onPointerUp={(e) => handlePointerUp(e, downState1)}
              onPointerMove={(e) => handlePointerMove(e, ref1, downState1)}
              ref={ref1}
              position={[redBoxPosition.x, redBoxPosition.y, redBoxPosition.z]}
            >
              <boxGeometry />
              <meshBasicMaterial color="red" />
            </mesh>

            <mesh
              scale={0.1}
              onPointerDown={(e) => handlePointerDown(e, ref2, downState2)}
              onPointerUp={(e) => handlePointerUp(e, downState2)}
              onPointerMove={(e) => handlePointerMove(e, ref2, downState2)}
              ref={ref2}
              position={[
                blueBoxPosition.x,
                blueBoxPosition.y,
                blueBoxPosition.z,
              ]}
            >
              <boxGeometry />
              <meshBasicMaterial color="blue" />
            </mesh>
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
