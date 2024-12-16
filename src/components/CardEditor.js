import React, { useRef, useEffect, useState } from 'react';
import { useStyle } from '../context/StyleContext';
import ExportPanel from './ExportPanel';

// 检查是否在 Chrome 扩展环境中
const isExtension = typeof chrome !== 'undefined' && chrome.storage;

export default function CardEditor({ initialText }) {
  const { state } = useStyle();
  const cardRef = useRef(null);
  const previewRef = useRef(null);
  const [text, setText] = useState(initialText);

  // 监听初始文本变化
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

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
      preview.style.width = `${state.layout.width}px`;
      preview.style.height = `${state.layout.height}px`;
      preview.style.transition = 'all 0.3s ease';
    }
  };

  // 处理文本变化
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // 只在扩展环境中同步到 storage
    if (isExtension) {
      chrome.storage.local.set({ selectedText: newText });
    }
  };

  // 生成卡片样式对象
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
      <div className="editor-container p-4">
        {/* 原文编辑区域 */}
        <div className="edit-area mb-6">
          <label className="block mb-2 text-gray-700 font-medium">
            金句原文
          </label>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="输入或粘贴你想要生成卡片的金句..."
            className="w-full p-4 border rounded resize-none focus:border-blue-500 focus:outline-none"
            style={{
              fontFamily: '"Noto Sans SC", system-ui, -apple-system, sans-serif',
              fontSize: '16px',
              color: '#374151',
              minHeight: '80px',
              maxHeight: '120px',
              lineHeight: '1.6',
              backgroundColor: '#FAFAFA'
            }}
          />
        </div>

        {/* 卡片预览区域 */}
        <div className="preview-section">
          <label className="block mb-2 text-gray-700 font-medium">
            卡片预览
          </label>
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
      </div>

      <ExportPanel cardRef={cardRef} />
    </div>
  );
} 