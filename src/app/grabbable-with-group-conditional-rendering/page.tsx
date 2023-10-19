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
import { INFOS, blueBoxPosition, redBoxPosition } from "../constants/appData";
import { Text } from "@react-three/drei";
import { LogDisplay } from "../LogDisplay";
import { useSceneStore } from "./useSceneStore";
import { SceneOne } from "./SceneOne";
import { SceneTwo } from "./SceneTwo";
import { SceneThree } from "./SceneThree";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"],
};

export default function Page() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);

  const currentScene = useSceneStore((state) => state.currentScene);

  return (
    <div>
      <div className="page-header">
        <h2>{INFOS[0].title}</h2>
        <p>{INFOS[0].description}</p>
        <a href="/" className="a-link">
          Home
        </a>

        <button onClick={enterAR} className="a-link">
          Enter AR
        </button>
      </div>

      <XRCanvas>
        <NonImmersiveCamera />
        <ImmersiveSessionOrigin>
          <LogDisplay />

          {currentScene === "sceneOne" && <SceneOne />}
          {currentScene === "sceneTwo" && <SceneTwo />}
          {currentScene === "sceneThree" && <SceneThree />}

          <Hands type="grab" />
          <Controllers type="grab" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}
