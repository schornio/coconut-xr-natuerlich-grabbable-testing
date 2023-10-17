import { isXIntersection } from "@coconut-xr/xinteraction";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useMemo, useCallback } from "react";
import { Vector3, Quaternion } from "three";

const pointOffsetPosition = new Vector3();
const deltaRotation = new Quaternion();
const initialInputDeviceOffset = new Vector3();
const currentInputDeviceOffset = new Vector3();

export function CustomGrabbable({ children, ...props }) {
  const ref = useRef(null);

  const state = useMemo(
    () => ({
      intersections: new Map(),
      objectPosition: new Vector3(),
      objectRotation: new Quaternion(),
      objectScale: new Vector3(),
    }),
    []
  );

  useFrame(() => {
    if (ref.current == null) {
      return;
    }
    switch (state.intersections.size) {
      case 1: {
        const [
          { currentPosition, currentRotation, startPosition, startRotation },
        ] = state.intersections.values();

        pointOffsetPosition.copy(state.objectPosition).sub(startPosition);
        deltaRotation.copy(startRotation).invert().premultiply(currentRotation);
        ref.current.position
          .copy(pointOffsetPosition)
          .applyQuaternion(deltaRotation)
          .add(currentPosition);

        ref.current.quaternion
          .copy(deltaRotation)
          .multiply(state.objectRotation);
        ref.current.scale.copy(state.objectScale);
        break;
      }
      case 2: {
        const [i1, i2] = state.intersections.values();

        initialInputDeviceOffset.copy(i2.startPosition).sub(i1.startPosition);
        currentInputDeviceOffset
          .copy(i2.currentPosition)
          .sub(i1.currentPosition);

        const initialLength = initialInputDeviceOffset.length();
        const currentLength = currentInputDeviceOffset.length();
        const deltaScale = currentLength / initialLength;

        initialInputDeviceOffset.divideScalar(initialLength);
        currentInputDeviceOffset.divideScalar(currentLength);

        deltaRotation.setFromUnitVectors(
          initialInputDeviceOffset,
          currentInputDeviceOffset
        );
        ref.current.position
          .copy(state.objectPosition)
          .sub(i1.startPosition)
          .multiplyScalar(deltaScale)
          .applyQuaternion(deltaRotation)
          .add(i1.currentPosition);
        ref.current.quaternion
          .copy(deltaRotation)
          .multiply(state.objectRotation);
        ref.current.scale.copy(state.objectScale).multiplyScalar(deltaScale);
        break;
      }
    }
  });
  const updateObjectMatrix = useCallback(() => {
    if (ref.current == null) {
      return;
    }
    state.objectPosition.copy(ref.current.position);
    state.objectRotation.copy(ref.current.quaternion);
    state.objectScale.copy(ref.current.scale);
    for (const intersection of state.intersections.values()) {
      intersection.startPosition = intersection.currentPosition;
      intersection.startRotation = intersection.currentRotation;
    }
  }, []);
  return React.createElement(
    "group",
    {
      onPointerDown: (e) => {
        if (!isXIntersection(e)) {
          return;
        }
        e.stopPropagation();
        e.target.setPointerCapture(e.pointerId);
        updateObjectMatrix();
        state.intersections.set(e.pointerId, {
          startPosition: e.point,
          currentPosition: e.point,
          startRotation: e.inputDeviceRotation,
          currentRotation: e.inputDeviceRotation,
        });
      },
      onPointerEnter: (e) => {
        e.stopPropagation();
      },
      onPointerUp: (e) => {
        state.intersections.delete(e.pointerId);
        updateObjectMatrix();
      },
      onPointerLeave: (e) => {
        e.stopPropagation();
        state.intersections.delete(e.pointerId);
        updateObjectMatrix();
      },
      onPointerMove: (e) => {
        if (!isXIntersection(e)) {
          return;
        }
        const intersection = state.intersections.get(e.pointerId);
        if (intersection == null) {
          return;
        }
        intersection.currentPosition = e.point;
        intersection.currentRotation = e.inputDeviceRotation;
      },
      ref: ref,
      ...props,
    },
    children
  );
}
