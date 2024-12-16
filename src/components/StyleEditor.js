import React from 'react';
import BackgroundPanel from './style-panels/BackgroundPanel';
import FontPanel from './style-panels/FontPanel';

export default function StyleEditor() {
  return (
    <div className="style-editor">
      <BackgroundPanel />
      <FontPanel />
    </div>
  );
} 