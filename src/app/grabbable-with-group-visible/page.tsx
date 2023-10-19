"use client";
import { XRCanvas, Hands, Controllers } from "@coconut-xr/natuerlich/defaults";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
} from "@coconut-xr/natuerlich/react";
import { INFOS } from "../constants/appData";
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

  console.log("currentScene", currentScene);

  return (
    <div>
      <div className="page-header">
        <h2>{INFOS[1].title}</h2>
        <p>{INFOS[1].description}</p>
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

          <SceneOne visible={currentScene === "sceneOne"} />
          <SceneTwo visible={currentScene === "sceneTwo"} />
          <SceneThree visible={currentScene === "sceneThree"} />

          <Hands type="grab" />
          <Controllers type="grab" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}
