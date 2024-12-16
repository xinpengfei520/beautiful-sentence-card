import React, { useState, useEffect } from 'react';
import { defaultTemplates } from '../constants/templates';

export default function TemplateSelector({ onSelect }) {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [selectedId, setSelectedId] = useState(null);

  // 选择模板
  const handleSelect = (template) => {
    setSelectedId(template.id);
    onSelect(template);
  };

  // 导入模板
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        const imported = JSON.parse(text);
        setTemplates(prev => [...prev, ...imported]);
      } catch (err) {
        console.error('导入模板失败:', err);
      }
    }
  };

  // 导出模板
  const handleExport = () => {
    const data = JSON.stringify(templates);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'card-templates.json';
    a.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <div className="template-selector">
      <div className="templates-header flex justify-between p-2">
        <h3>卡片模板</h3>
        <div className="flex gap-2">
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            id="import-template"
          />
          <label 
            htmlFor="import-template"
            className="btn btn-secondary"
          >
            导入
          </label>
          <button 
            onClick={handleExport}
            className="btn btn-secondary"
          >
            导出
          </button>
        </div>
      </div>

      <div className="templates-grid grid grid-cols-3 gap-4 p-4">
        {templates.map(template => (
          <div
            key={template.id}
            className={`template-item cursor-pointer p-2 border rounded
              ${selectedId === template.id ? 'border-blue-500' : ''}
            `}
            onClick={() => handleSelect(template)}
          >
            <div 
              className="template-preview h-24"
              style={template.style}
            >
              {template.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 