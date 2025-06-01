import React from 'react';
import { Settings } from 'lucide-react';
import { useSceneStore } from '../store/sceneStore';
import * as THREE from 'three';

const PropertiesPanel: React.FC = () => {
  const { selectedObject, updateObjectColor, updateObjectOpacity } = useSceneStore();

  if (!selectedObject || !(selectedObject instanceof THREE.Mesh)) {
    return null;
  }

  const material = selectedObject.material as THREE.MeshStandardMaterial;
  const currentColor = `#${material.color.getHexString()}`;
  const currentOpacity = material.opacity;

  return (
    <div className="absolute right-4 bottom-4 bg-white rounded-lg shadow-lg p-4 w-64">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Properties</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => updateObjectColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-600 uppercase">{currentColor}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opacity
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={currentOpacity}
              onChange={(e) => updateObjectOpacity(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-600 w-8">
              {Math.round(currentOpacity * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;