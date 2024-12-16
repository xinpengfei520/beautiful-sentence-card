import React from 'react';

export default function LayoutPanel() {
  return (
    <div className="layout-panel">
      {/* 内边距设置 */}
      <div className="mb-4">
        <label className="block mb-2">内边距</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">上</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">右</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">下</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">左</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
        </div>
      </div>

      {/* 对齐方式 */}
      <div className="mb-4">
        <label className="block mb-2">对齐方式</label>
        <div className="flex gap-2">
          <button className="flex-1 p-2 border rounded hover:bg-gray-100">
            左对齐
          </button>
          <button className="flex-1 p-2 border rounded hover:bg-gray-100">
            居中
          </button>
          <button className="flex-1 p-2 border rounded hover:bg-gray-100">
            右对齐
          </button>
        </div>
      </div>

      {/* 容器尺寸 */}
      <div className="mb-4">
        <label className="block mb-2">容器尺寸</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">宽度</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">高度</label>
            <input type="number" className="w-full p-2 border rounded" />
          </div>
        </div>
      </div>
    </div>
  );
} 