import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useStyle } from '../../context/StyleContext';

export default function BackgroundPanel() {
  const { state, updateBackground } = useStyle();
  const [showColorPicker, setShowColorPicker] = useState(false);
  
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
  };

  // 处理背景类型变化
  const handleTypeChange = (type) => {
    updateBackground({ type });
  };

  return (
    <div className="background-panel p-4">
      {/* 背景类型选择 */}
      <div className="mb-4">
        <label className="block mb-2">背景类型</label>
        <select 
          value={state.background.type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="color">纯色背景</option>
          <option value="gradient">渐变背景</option>
          <option value="image">图片背景</option>
        </select>
      </div>

      {/* 纯色背景设置 */}
      {state.background.type === 'color' && (
        <div className="color-picker-container">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="color-preview cursor-pointer"
              style={{ backgroundColor: tempColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <span className="text-sm text-gray-600">{tempColor}</span>
          </div>

          {showColorPicker && (
            <div className="relative">
              <div className="absolute z-10">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setShowColorPicker(false)}
                />
                <div className="relative">
                  <SketchPicker 
                    color={tempColor}
                    onChange={handleColorChange}
                  />
                  <div className="mt-2 flex justify-end">
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
      {state.background.type === 'gradient' && (
        <div className="gradient-editor">
          <select 
            value={tempGradient.type}
            onChange={(e) => setTempGradient({...tempGradient, type: e.target.value})}
            className="mb-2 w-full p-2 border rounded"
          >
            <option value="linear">线性渐变</option>
            <option value="radial">径向渐变</option>
          </select>
          
          {tempGradient.type === 'linear' && (
            <div className="mb-4">
              <label className="block mb-2">渐变方向</label>
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
              <div className="text-sm text-gray-500 text-center">
                {tempGradient.direction}
              </div>
            </div>
          )}

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

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleGradientConfirm}
              className="btn btn-primary"
            >
              确认渐变
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 