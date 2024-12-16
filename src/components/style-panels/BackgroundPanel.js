import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useStyle } from '../../context/StyleContext';

export default function BackgroundPanel() {
  const { state, updateBackground } = useStyle();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showGradientPicker, setShowGradientPicker] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  
  // 临时存储用户选择的颜色，但还未确认
  const [tempColor, setTempColor] = useState(state.background.color);
  const [tempGradient, setTempGradient] = useState(state.background.gradient);

  // 处理纯色变化
  const handleColorChange = (color) => {
    setTempColor(color.hex);
  };

  // 确认纯色更改
  const handleColorConfirm = () => {
    updateBackground({
      type: 'color',
      color: tempColor
    });
    setShowColorPicker(false);
  };

  // 处理渐变色变化
  const handleGradientChange = (index, color) => {
    const newColors = [...tempGradient.colors];
    newColors[index] = color.hex;
    setTempGradient({
      ...tempGradient,
      colors: newColors
    });
  };

  // 确认渐变色更改
  const handleGradientConfirm = () => {
    updateBackground({
      type: 'gradient',
      gradient: tempGradient
    });
    setShowGradientPicker(false);
  };

  // 处理背景类型变化
  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === 'color') {
      setShowColorPicker(true);
      setShowGradientPicker(false);
      setTempColor(state.background.color);
    } else if (type === 'gradient') {
      setShowColorPicker(false);
      setShowGradientPicker(true);
      setTempGradient(state.background.gradient);
    }
  };

  return (
    <div className="background-panel p-4">
      {/* 背景类型选择 */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-700 font-medium">背景类型</label>
        <select 
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:outline-none"
        >
          <option value="">请选择背景类型</option>
          <option value="color">纯色背景</option>
          <option value="gradient">渐变背景</option>
        </select>
      </div>

      {/* 纯色背景设置 */}
      {selectedType === 'color' && (
        <div className="color-picker-container">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="color-preview cursor-pointer"
              style={{ backgroundColor: tempColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <span className="text-sm text-gray-600 font-mono">{tempColor}</span>
          </div>

          {showColorPicker && (
            <div className="relative">
              <div className="absolute z-10">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setShowColorPicker(false)}
                />
                <div className="relative bg-white p-3 rounded-lg shadow-lg">
                  <SketchPicker 
                    color={tempColor}
                    onChange={handleColorChange}
                    className="mb-3"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowColorPicker(false)}
                      className="btn btn-secondary"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleColorConfirm}
                      className="btn btn-primary"
                    >
                      确认颜色
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 渐变背景设置 */}
      {selectedType === 'gradient' && (
        <div className="gradient-editor">
          <select 
            value={tempGradient.type}
            onChange={(e) => setTempGradient({...tempGradient, type: e.target.value})}
            className="mb-3 w-full p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:outline-none"
          >
            <option value="linear">线性渐变</option>
            <option value="radial">径向渐变</option>
          </select>
          
          {tempGradient.type === 'linear' && (
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">渐变方向</label>
              <input 
                type="range"
                min="0"
                max="360"
                value={parseInt(tempGradient.direction)}
                onChange={(e) => setTempGradient({
                  ...tempGradient,
                  direction: `${e.target.value}deg`
                })}
                className="w-full"
              />
              <div className="text-sm text-gray-500 text-center mt-1">
                {tempGradient.direction}
              </div>
            </div>
          )}

          {showGradientPicker && (
            <div className="gradient-colors space-y-4">
              {tempGradient.colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="color-preview cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                  <SketchPicker 
                    color={color}
                    onChange={(color) => handleGradientChange(index, color)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowGradientPicker(!showGradientPicker)}
              className="btn btn-secondary"
            >
              {showGradientPicker ? '取消' : '选择颜色'}
            </button>
            {showGradientPicker && (
              <button
                onClick={handleGradientConfirm}
                className="btn btn-primary"
              >
                确认渐变
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 