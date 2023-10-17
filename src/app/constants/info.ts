type Info = {
  path: string;
  title: string;
  description?: string;
};

export const INFOS: Info[] = [
  {
    path: "/pointer",
    title: "Pointer",
    description: "Description",
  },
  {
    path: "/pointer-with-group",
    title: "Pointer with group",
    description: "Description",
  },
  {
    path: "/grabbable",
    title: "Grabbable",
    description: "Description",
  },
  {
    path: "/grabbable-with-group",
    title: "Grabbable with group",
    description: "Description",
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
