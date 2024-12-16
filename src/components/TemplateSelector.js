import React from 'react';
import { useStyle } from '../context/StyleContext';

// 预设模板配置
const PRESET_TEMPLATES = [
  {
    id: 'simple',
    name: '简约白',
    styles: {
      background: {
        type: 'color',
        color: '#FFFFFF'
      },
      font: {
        color: '#2C3E50'
      }
    },
    preview: {
      backgroundColor: '#FFFFFF',
      color: '#2C3E50',
      border: '1px solid #E5E7EB'
    }
  },
  {
    id: 'dark',
    name: '暗夜模式',
    styles: {
      background: {
        type: 'color',
        color: '#1A202C'
      },
      font: {
        color: '#F7FAFC'
      }
    },
    preview: {
      backgroundColor: '#1A202C',
      color: '#F7FAFC',
      border: '1px solid #2D3748'
    }
  },
  {
    id: 'gradient',
    name: '渐变粉',
    styles: {
      background: {
        type: 'gradient',
        gradient: {
          type: 'linear',
          direction: '135deg',
          colors: ['#FED7E2', '#FEB2B2']
        }
      },
      font: {
        color: '#702459'
      }
    },
    preview: {
      background: 'linear-gradient(135deg, #FED7E2, #FEB2B2)',
      color: '#702459'
    }
  },
  {
    id: 'vintage',
    name: '复古风',
    styles: {
      background: {
        type: 'color',
        color: '#F7F2E9'
      },
      font: {
        color: '#5C4B3C'
      }
    },
    preview: {
      backgroundColor: '#F7F2E9',
      color: '#5C4B3C',
      border: '1px solid #D3CDC4'
    }
  }
];

export default function TemplateSelector() {
  const { state, updateBackground, updateFont } = useStyle();
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);

  // 应用模板样式
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    
    // 更新背景
    updateBackground(template.styles.background);
    
    // 更新字体颜色
    updateFont({
      color: template.styles.font.color
    });
  };

  return (
    <div className="template-selector p-4 border-t">
      <h3 className="text-lg font-medium text-gray-700 mb-4">卡片模板</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {PRESET_TEMPLATES.map(template => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
            className={`
              template-preview p-4 rounded-lg cursor-pointer
              transition-all duration-200 transform hover:scale-105
              ${selectedTemplate === template.id 
                ? 'ring-2 ring-blue-500 ring-offset-2' 
                : 'hover:shadow-lg'
              }
            `}
            style={{
              ...template.preview,
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span className="font-medium">{template.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 