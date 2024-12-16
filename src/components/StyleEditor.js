import React, { useState } from 'react';
import BackgroundPanel from './style-panels/BackgroundPanel';
import FontPanel from './style-panels/FontPanel';
import LayoutPanel from './style-panels/LayoutPanel';
import EffectsPanel from './style-panels/EffectsPanel';

const PANELS = {
  BACKGROUND: 'background',
  FONT: 'font',
  LAYOUT: 'layout',
  EFFECTS: 'effects'
};

export default function StyleEditor() {
  const [activePanel, setActivePanel] = useState(PANELS.BACKGROUND);

  return (
    <div className="style-editor">
      {/* 面板选择器 */}
      <div className="panel-tabs flex border-b">
        {Object.entries(PANELS).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setActivePanel(value)}
            className={`tab-button px-4 py-2
              ${activePanel === value ? 'active' : ''}
            `}
          >
            {key}
          </button>
        ))}
      </div>

      {/* 样式面板 */}
      <div className="panel-content p-4">
        {activePanel === PANELS.BACKGROUND && <BackgroundPanel />}
        {activePanel === PANELS.FONT && <FontPanel />}
        {activePanel === PANELS.LAYOUT && <LayoutPanel />}
        {activePanel === PANELS.EFFECTS && <EffectsPanel />}
      </div>
    </div>
  );
} 