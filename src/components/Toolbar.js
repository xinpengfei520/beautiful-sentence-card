import React from 'react';

const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];
const fontFamilies = ['Arial', 'Times New Roman', 'Georgia', 'Verdana'];
const alignments = ['left', 'center', 'right'];

export default function Toolbar({ 
  onFontSizeChange, 
  onFontFamilyChange, 
  onAlignChange 
}) {
  return (
    <div className="toolbar flex gap-4 p-2 border-b">
      {/* 字号选择 */}
      <select 
        onChange={(e) => onFontSizeChange(Number(e.target.value))}
        className="toolbar-select"
      >
        {fontSizes.map(size => (
          <option key={size} value={size}>{size}px</option>
        ))}
      </select>

      {/* 字体选择 */}
      <select
        onChange={(e) => onFontFamilyChange(e.target.value)}
        className="toolbar-select"
      >
        {fontFamilies.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>

      {/* 对齐方式 */}
      <div className="flex gap-2">
        {alignments.map(align => (
          <button
            key={align}
            onClick={() => onAlignChange(align)}
            className="toolbar-button"
          >
            <i className={`fas fa-align-${align}`}></i>
          </button>
        ))}
      </div>
    </div>
  );
} 