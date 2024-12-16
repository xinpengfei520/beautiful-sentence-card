import React, { useRef } from 'react';
import { useStyle } from '../context/StyleContext';
import Toolbar from './Toolbar';
import ExportPanel from './ExportPanel';

export default function CardEditor({ text }) {
  const { state } = useStyle();
  const cardRef = useRef(null);

  // 生成样式对象
  const cardStyle = {
    // 背景样式
    ...(state.background.type === 'color' && {
      backgroundColor: state.background.color
    }),
    ...(state.background.type === 'gradient' && {
      background: `${state.background.gradient.type}-gradient(
        ${state.background.gradient.direction},
        ${state.background.gradient.colors.join(', ')}
      )`
    }),
    ...(state.background.type === 'image' && {
      backgroundImage: `url(${state.background.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }),
    // 字体样式
    fontFamily: state.font.family,
    fontSize: `${state.font.size}px`,
    fontWeight: state.font.weight,
    letterSpacing: `${state.font.letterSpacing}px`,
    lineHeight: state.font.lineHeight,
    // 布局样式
    padding: `${state.layout.padding.top}px ${state.layout.padding.right}px ${state.layout.padding.bottom}px ${state.layout.padding.left}px`,
    textAlign: state.layout.align,
    width: `${state.layout.width}px`,
    height: `${state.layout.height}px`,
    // 特效样式
    boxShadow: `${state.effects.shadow.x}px ${state.effects.shadow.y}px ${state.effects.shadow.blur}px ${state.effects.shadow.spread}px ${state.effects.shadow.color}`,
    border: `${state.effects.border.width}px ${state.effects.border.style} ${state.effects.border.color}`,
    opacity: state.effects.opacity / 100
  };

  return (
    <div className="card-editor">
      <Toolbar />
      
      <div className="editor-container">
        {/* 编辑区域 */}
        <div className="edit-area">
          <textarea
            value={text}
            className="w-full h-32 p-2 border rounded"
            style={{
              fontFamily: state.font.family,
              fontSize: `${state.font.size}px`
            }}
          />
        </div>

        {/* 预览区域 */}
        <div className="preview-area">
          <div 
            ref={cardRef}
            className="card-preview"
            style={cardStyle}
          >
            {text}
          </div>
        </div>
      </div>

      <ExportPanel cardRef={cardRef} />
    </div>
  );
} 