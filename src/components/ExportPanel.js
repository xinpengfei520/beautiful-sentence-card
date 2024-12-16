import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { useStyle } from '../context/StyleContext';

export default function ExportPanel({ cardRef }) {
  const { state } = useStyle();
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);

  const exportCard = async () => {
    if (!cardRef.current) return;
    
    try {
      setExporting(true);
      setError(null);

      // 配置导出选项
      const options = {
        scale: 2, // 提高导出质量
        useCORS: true, // 允许加载跨域图片
        backgroundColor: null, // 保持背景透明
        logging: false,
        width: state.layout.width,
        height: state.layout.height
      };

      // 生成图片
      const canvas = await html2canvas(cardRef.current, options);
      
      // 转换为图片并下载
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = '金句卡片.png';
      link.href = image;
      link.click();

      setExporting(false);
    } catch (err) {
      console.error('导出错误:', err);
      setError('导出失败，请重试');
      setExporting(false);
    }
  };

  return (
    <div className="export-panel p-4 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={exportCard}
            disabled={exporting}
            className={`
              px-6 py-2 rounded-lg text-white font-medium
              ${exporting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}
              transition duration-200
            `}
          >
            {exporting ? '导出中...' : '导出图片'}
          </button>
          
          {error && (
            <span className="text-red-500 text-sm">
              {error}
            </span>
          )}
        </div>

        <div className="text-sm text-gray-500">
          导出尺寸: {state.layout.width} x {state.layout.height}
        </div>
      </div>
    </div>
  );
} 