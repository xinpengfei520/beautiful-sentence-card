import React, { useRef, useEffect } from 'react';
import { useStyle } from '../context/StyleContext';
import Toolbar from './Toolbar';
import ExportPanel from './ExportPanel';

export default function CardEditor({ text }) {
  const { state } = useStyle();
  const cardRef = useRef(null);
  const previewRef = useRef(null);

  // 监听样式变化，更新预览
  useEffect(() => {
    if (previewRef.current) {
      updatePreview();
    }
  }, [state, text]);

  // 更新预览
  const updatePreview = () => {
    const preview = previewRef.current;
    const card = cardRef.current;
    
    if (preview && card) {
      // 确保预览区域大小合适
      preview.style.width = `${state.layout.width}px`;
      preview.style.height = `${state.layout.height}px`;
      
      // 添加平滑过渡
      preview.style.transition = 'all 0.3s ease';
    }
  };

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
    color: state.font.color,
    // 布局样式
    padding: `${state.layout.padding.top}px ${state.layout.padding.right}px ${state.layout.padding.bottom}px ${state.layout.padding.left}px`,
    textAlign: state.layout.align,
    width: '100%',
    height: '100%',
    // 特效样式
    boxShadow: `${state.effects.shadow.x}px ${state.effects.shadow.y}px ${state.effects.shadow.blur}px ${state.effects.shadow.spread}px ${state.effects.shadow.color}`,
    border: `${state.effects.border.width}px ${state.effects.border.style} ${state.effects.border.color}`,
    opacity: state.effects.opacity / 100,
    // 其他样式
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="card-editor">
      <Toolbar />
      
      <div className="editor-container p-4">
        {/* 编辑区域 */}
        <div className="edit-area mb-4">
          <textarea
            value={text}
            readOnly
            className="w-full p-4 border rounded"
            style={{
              fontFamily: state.font.family,
              fontSize: `${state.font.size}px`,
              color: state.font.color,
              minHeight: '100px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* 预览区域 */}
        <div 
          ref={previewRef}
          className="preview-area mx-auto overflow-hidden"
          style={{
            maxWidth: '100%',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '12px'
          }}
        >
          <div 
            ref={cardRef}
            className="card-preview"
            style={cardStyle}
          >
            <div className="card-content">
              {text}
            </div>
          </div>
        </div>
      </div>

      <ExportPanel cardRef={cardRef} />
    </div>
  );
} 