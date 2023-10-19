import { create } from "zustand";

const ORDER_OF_SCENES = ["sceneOne", "sceneTwo", "sceneThree"] as const;

export type SceneIDs = (typeof ORDER_OF_SCENES)[number];

const TIME_BEFORE_NEXT_SCENE = 2000;

type SceneState = {
  currentScene: SceneIDs;
  nextScene: () => void;
  lastChanged: number;
};

export const useSceneStore = create<SceneState>((set) => ({
  currentScene: "sceneOne",
  lastChanged: 0,

  nextScene: () => {
    set((currentState) => {
      const now = Date.now();

      if (now - currentState.lastChanged < TIME_BEFORE_NEXT_SCENE) {
        return currentState;
      }

      const currentIndex = ORDER_OF_SCENES.indexOf(currentState.currentScene);
      const nextIndex = (currentIndex + 1) % ORDER_OF_SCENES.length;

      return {
        currentScene: ORDER_OF_SCENES[nextIndex],
        lastChanged: now,
      };
    });
  },
}));
