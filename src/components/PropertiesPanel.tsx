import React from 'react';
import { Settings } from 'lucide-react';
import { useSceneStore } from '../store/sceneStore';
import * as THREE from 'three';

const TransformInput: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
}> = ({ label, value, onChange, step = 0.1, min = undefined }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-600 w-6">{label}</span>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      step={step}
      min={min}
      className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const PropertiesPanel: React.FC = () => {
  const {
    selectedObject,
    updateObjectColor,
    updateObjectOpacity,
    updateObjectPosition,
    updateObjectRotation,
    updateObjectScale,
  } = useSceneStore();

  if (!selectedObject || !(selectedObject instanceof THREE.Mesh)) {
    return null;
  }

  const material = selectedObject.material as THREE.MeshStandardMaterial;
  const currentColor = `#${material.color.getHexString()}`;
  const currentOpacity = material.opacity;

  const position = selectedObject.position;
  const rotation = selectedObject.rotation;
  const scale = selectedObject.scale;

  return (
    <div className="absolute right-4 bottom-4 bg-white rounded-lg shadow-lg p-4 w-80">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Properties</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Transform</h3>
          
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Position</div>
            <TransformInput
              label="X"
              value={position.x}
              onChange={(value) => updateObjectPosition('x', value)}
            />
            <TransformInput
              label="Y"
              value={position.y}
              onChange={(value) => updateObjectPosition('y', value)}
            />
            <TransformInput
              label="Z"
              value={position.z}
              onChange={(value) => updateObjectPosition('z', value)}
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Rotation (degrees)</div>
            <TransformInput
              label="X"
              value={THREE.MathUtils.radToDeg(rotation.x)}
              onChange={(value) => updateObjectRotation('x', value)}
            />
            <TransformInput
              label="Y"
              value={THREE.MathUtils.radToDeg(rotation.y)}
              onChange={(value) => updateObjectRotation('y', value)}
            />
            <TransformInput
              label="Z"
              value={THREE.MathUtils.radToDeg(rotation.z)}
              onChange={(value) => updateObjectRotation('z', value)}
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">Scale</div>
            <TransformInput
              label="X"
              value={scale.x}
              onChange={(value) => updateObjectScale('x', value)}
              step={0.1}
              min={0.1}
            />
            <TransformInput
              label="Y"
              value={scale.y}
              onChange={(value) => updateObjectScale('y', value)}
              step={0.1}
              min={0.1}
            />
            <TransformInput
              label="Z"
              value={scale.z}
              onChange={(value) => updateObjectScale('z', value)}
              step={0.1}
              min={0.1}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Appearance</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
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
            <label className="block text-sm font-medium text-gray-600 mb-1">
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
    </div>
  );
};

export default PropertiesPanel;