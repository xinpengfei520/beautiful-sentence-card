import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useStyle } from '../../context/StyleContext';

export default function FontPanel() {
  const { state, updateFont } = useStyle();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState(state.font.color);

  // 处理颜色变化
  const handleColorChange = (color) => {
    setTempColor(color.hex);
  };

  // 确认颜色更改
  const handleColorConfirm = () => {
    updateFont({
      ...state.font,
      color: tempColor
    });
    setShowColorPicker(false);
  };

  return (
    <div className="font-panel p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4">文字设置</h3>

      {/* 文字颜色设置 */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">文字颜色</label>
        <div className="color-picker-container">
          <div className="flex items-center gap-3">
            <div 
              className="color-preview cursor-pointer"
              style={{ backgroundColor: state.font.color }}
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="点击选择颜色"
            />
            <span className="text-sm text-gray-600 font-mono">
              {state.font.color}
            </span>
          </div>

          {showColorPicker && (
            <div className="color-picker-popup mt-2">
              <div 
                className="fixed inset-0" 
                onClick={() => setShowColorPicker(false)}
              />
              <div className="relative">
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
          )}
        </div>
      </div>

      {/* 字体大小设置 */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">字体大小</label>
        <input
          type="range"
          min="12"
          max="72"
          value={state.font.size}
          onChange={(e) => updateFont({ ...state.font, size: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="text-sm text-gray-500 text-center mt-1">
          {state.font.size}px
        </div>
      </div>

      {/* 字体选择 */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-medium">字体</label>
        <select
          value={state.font.family}
          onChange={(e) => updateFont({ ...state.font, family: e.target.value })}
          className="w-full p-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:outline-none"
        >
          <option value='"Noto Serif SC", serif'>思源宋体</option>
          <option value='"Noto Sans SC", sans-serif'>思源黑体</option>
          <option value="KaiTi, serif">楷体</option>
          <option value="XingKai SC, cursive">行楷</option>
        </select>
      </div>
    </div>
  );
} 