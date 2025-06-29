import { create } from 'zustand';
import * as THREE from 'three';

interface SceneState {
  objects: Array<{
    id: string;
    object: THREE.Object3D;
    name: string;
    visible: boolean;
  }>;
  selectedObject: THREE.Object3D | null;
  transformMode: 'translate' | 'rotate' | 'scale';
  addObject: (object: THREE.Object3D, name: string) => void;
  removeObject: (id: string) => void;
  setSelectedObject: (object: THREE.Object3D | null) => void;
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
  toggleVisibility: (id: string) => void;
  updateObjectName: (id: string, name: string) => void;
  updateObjectColor: (color: string) => void;
  updateObjectOpacity: (opacity: number) => void;
  updateObjectPosition: (axis: 'x' | 'y' | 'z', value: number) => void;
  updateObjectRotation: (axis: 'x' | 'y' | 'z', value: number) => void;
  updateObjectScale: (axis: 'x' | 'y' | 'z', value: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  objects: [],
  selectedObject: null,
  transformMode: 'translate',
  addObject: (object, name) =>
    set((state) => ({
      objects: [...state.objects, { id: crypto.randomUUID(), object, name, visible: true }],
    })),
  removeObject: (id) =>
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedObject: state.objects.find((obj) => obj.id === id)?.object === state.selectedObject
        ? null
        : state.selectedObject,
    })),
  setSelectedObject: (object) => set({ selectedObject: object }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  toggleVisibility: (id) =>
    set((state) => {
      const updatedObjects = state.objects.map((obj) =>
        obj.id === id ? { ...obj, visible: !obj.visible } : obj
      );
      
      const toggledObject = updatedObjects.find((obj) => obj.id === id);
      
      const newSelectedObject = (toggledObject && !toggledObject.visible && toggledObject.object === state.selectedObject)
        ? null
        : state.selectedObject;

      return {
        objects: updatedObjects,
        selectedObject: newSelectedObject,
      };
    }),
  updateObjectName: (id, name) =>
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, name } : obj
      ),
    })),
  updateObjectColor: (color) =>
    set((state) => {
      if (state.selectedObject && state.selectedObject instanceof THREE.Mesh) {
        const material = state.selectedObject.material as THREE.MeshStandardMaterial;
        material.color.setStyle(color);
      }
      return state;
    }),
  updateObjectOpacity: (opacity) =>
    set((state) => {
      if (state.selectedObject && state.selectedObject instanceof THREE.Mesh) {
        const material = state.selectedObject.material as THREE.MeshStandardMaterial;
        material.transparent = opacity < 1;
        material.opacity = opacity;
      }
      return state;
    }),
  updateObjectPosition: (axis, value) =>
    set((state) => {
      if (state.selectedObject) {
        state.selectedObject.position[axis] = value;
      }
      return state;
    }),
  updateObjectRotation: (axis, value) =>
    set((state) => {
      if (state.selectedObject) {
        state.selectedObject.rotation[axis] = THREE.MathUtils.degToRad(value);
      }
      return state;
    }),
  updateObjectScale: (axis, value) =>
    set((state) => {
      if (state.selectedObject) {
        state.selectedObject.scale[axis] = value;
      }
      return state;
    }),
}));