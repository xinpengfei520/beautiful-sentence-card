import React from 'react';

export default function EffectsPanel() {
  return (
    <div className="effects-panel">
      {/* 阴影效果 */}
      <div className="mb-4">
        <label className="block mb-2">阴影</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">模糊</label>
            <input type="range" min="0" max="50" className="w-full" />
          </div>
          <div>
            <label className="block text-sm">扩散</label>
            <input type="range" min="0" max="50" className="w-full" />
          </div>
          <div>
            <label className="block text-sm">X偏移</label>
            <input type="range" min="-50" max="50" className="w-full" />
          </div>
          <div>
            <label className="block text-sm">Y偏移</label>
            <input type="range" min="-50" max="50" className="w-full" />
          </div>
        </div>
      </div>

      {/* 边框样式 */}
      <div className="mb-4">
        <label className="block mb-2">边框</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">宽度</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">样式</label>
            <select className="w-full p-2 border rounded">
              <option value="solid">实线</option>
              <option value="dashed">虚线</option>
              <option value="dotted">点线</option>
            </select>
          </div>
        </div>
      </div>

      {/* 透明度 */}
      <div className="mb-4">
        <label className="block mb-2">透明度</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          className="w-full"
        />
      </div>
    </div>
  );
} 