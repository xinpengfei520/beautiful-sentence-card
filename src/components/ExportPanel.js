import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const EXPORT_FORMATS = [
  { id: 'png', name: 'PNG', mimeType: 'image/png' },
  { id: 'jpeg', name: 'JPEG', mimeType: 'image/jpeg' },
  { id: 'webp', name: 'WEBP', mimeType: 'image/webp' }
];

const QUALITY_OPTIONS = [
  { value: 0.6, label: '普通' },
  { value: 0.8, label: '高质量' },
  { value: 1, label: '最佳' }
];

export default function ExportPanel({ cardRef }) {
  const [format, setFormat] = useState(EXPORT_FORMATS[0]);
  const [quality, setQuality] = useState(QUALITY_OPTIONS[1].value);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [exporting, setExporting] = useState(false);

  // 导出图片
  const handleExport = async () => {
    if (!cardRef.current || exporting) return;

    setExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // 提高导出质量
        useCORS: true, // 允许跨域图片
        backgroundColor: null, // 保持透明背景
        width: size.width,
        height: size.height
      });

      // 转换为blob
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `card.${format.id}`;
          a.click();
          URL.revokeObjectURL(url);
        },
        format.mimeType,
        quality
      );
    } catch (err) {
      console.error('导出失败:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="export-panel p-4">
      {/* 格式选择 */}
      <div className="mb-4">
        <label className="block mb-2">导出格式</label>
        <select
          value={format.id}
          onChange={(e) => {
            const selected = EXPORT_FORMATS.find(f => f.id === e.target.value);
            setFormat(selected);
          }}
          className="w-full p-2 border rounded"
        >
          {EXPORT_FORMATS.map(format => (
            <option key={format.id} value={format.id}>
              {format.name}
            </option>
          ))}
        </select>
      </div>

      {/* 质量选择 */}
      <div className="mb-4">
        <label className="block mb-2">导出质量</label>
        <select
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full p-2 border rounded"
        >
          {QUALITY_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 尺寸设置 */}
      <div className="mb-4">
        <label className="block mb-2">导出尺寸</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">宽度</label>
            <input
              type="number"
              value={size.width}
              onChange={(e) => setSize({ ...size, width: Number(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm">高度</label>
            <input
              type="number"
              value={size.height}
              onChange={(e) => setSize({ ...size, height: Number(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* 导出按钮 */}
      <button
        onClick={handleExport}
        disabled={exporting}
        className={`w-full p-2 rounded text-white
          ${exporting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}
        `}
      >
        {exporting ? '��出中...' : '导出图片'}
      </button>
    </div>
  );
} 