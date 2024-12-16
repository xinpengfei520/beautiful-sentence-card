import React from 'react';

const FONT_FAMILIES = [
  { name: '默认', value: 'system-ui' },
  { name: '宋体', value: 'SimSun' },
  { name: '黑体', value: 'SimHei' },
  { name: '微软雅黑', value: 'Microsoft YaHei' },
  { name: '楷体', value: 'KaiTi' }
];

export default function FontPanel() {
  return (
    <div className="font-panel">
      {/* 字体选择 */}
      <div className="mb-4">
        <label className="block mb-2">字体</label>
        <select className="w-full p-2 border rounded">
          {FONT_FAMILIES.map(font => (
            <option key={font.value} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* 字号设置 */}
      <div className="mb-4">
        <label className="block mb-2">字号</label>
        <div className="flex items-center">
          <input
            type="range"
            min="12"
            max="72"
            className="flex-1 mr-4"
          />
          <input
            type="number"
            min="12"
            max="72"
            className="w-20 p-2 border rounded"
          />
        </div>
      </div>

      {/* 字间距 */}
      <div className="mb-4">
        <label className="block mb-2">字间距</label>
        <input
          type="range"
          min="-2"
          max="10"
          step="0.1"
          className="w-full"
        />
      </div>

      {/* 行高 */}
      <div className="mb-4">
        <label className="block mb-2">行高</label>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          className="w-full"
        />
      </div>

      {/* 字体粗细 */}
      <div className="mb-4">
        <label className="block mb-2">字重</label>
        <select className="w-full p-2 border rounded">
          <option value="normal">正常</option>
          <option value="bold">粗体</option>
          <option value="lighter">细体</option>
        </select>
      </div>
    </div>
  );
} 