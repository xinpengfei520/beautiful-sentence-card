import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function BackgroundPanel() {
  const [bgType, setBgType] = useState('color'); // color, gradient, image
  const [color, setColor] = useState('#ffffff');
  const [gradient, setGradient] = useState({
    type: 'linear',
    direction: '180deg',
    colors: ['#ffffff', '#000000']
  });
  const [image, setImage] = useState(null);

  // 处理纯色背景
  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  // 处理渐变背景
  const handleGradientChange = (index, color) => {
    const newColors = [...gradient.colors];
    newColors[index] = color.hex;
    setGradient({ ...gradient, colors: newColors });
  };

  // 处理图片上传
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="background-panel">
      {/* 背景类型选择 */}
      <div className="bg-type-selector mb-4">
        <select 
          value={bgType}
          onChange={(e) => setBgType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="color">纯色背景</option>
          <option value="gradient">渐变背景</option>
          <option value="image">图片背景</option>
        </select>
      </div>

      {/* 纯色背景设置 */}
      {bgType === 'color' && (
        <div className="color-picker">
          <SketchPicker 
            color={color}
            onChange={handleColorChange}
          />
        </div>
      )}

      {/* 渐变背景设置 */}
      {bgType === 'gradient' && (
        <div className="gradient-editor">
          <select 
            value={gradient.type}
            onChange={(e) => setGradient({...gradient, type: e.target.value})}
            className="mb-2 w-full p-2 border rounded"
          >
            <option value="linear">线性渐变</option>
            <option value="radial">径向渐变</option>
          </select>
          
          {gradient.type === 'linear' && (
            <input 
              type="range"
              min="0"
              max="360"
              value={parseInt(gradient.direction)}
              onChange={(e) => setGradient({...gradient, direction: `${e.target.value}deg`})}
              className="w-full mb-4"
            />
          )}

          <div className="gradient-colors">
            {gradient.colors.map((color, index) => (
              <div key={index} className="mb-2">
                <SketchPicker 
                  color={color}
                  onChange={(color) => handleGradientChange(index, color)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 图片背景设置 */}
      {bgType === 'image' && (
        <div className="image-uploader">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          {image && (
            <div className="image-preview">
              <img src={image} alt="背景预览" className="w-full rounded" />
            </div>
          )}
        </div>
      )}
    </div>
  );
} 