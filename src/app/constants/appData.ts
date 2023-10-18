type Info = {
  path: string;
  title: string;
  description?: string;
};

export const INFOS: Info[] = [
  {
    path: "/pointer",
    title: "Pointer",
    description:
      "Using onPointerUp, Down, and Move without transformations. Works as expected.",
  },
  {
    path: "/pointer-with-group",
    title: "Pointer with group",
    description:
      "Using onPointerUp, Down, and Move with transformations. Works as expected even in transformed group.",
  },
  {
    path: "/grabbable",
    title: "Grabbable",
    description:
      "Using Grabbable wrapping the Child. If Grabbable is in the outermost layer or it's not suffering transformations, it works as expected.",
  },
  {
    path: "/grabbable-with-group",
    title: "Grabbable with group",
    description:
      "Grabbable wrapper shows distortion of grabbing position in case the group is suffering transformations, such as position.",
  },
];

export const redBoxPosition = {
  x: -0.2,
  y: 1,
  z: -0.5,
};

export const blueBoxPosition = {
  x: 0.2,
  y: 1,
  z: -0.5,
};
