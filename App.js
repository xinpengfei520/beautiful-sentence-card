import React from 'react';
import { StyleProvider } from './context/StyleContext';
import CardEditor from './components/CardEditor';
import StyleEditor from './components/StyleEditor';

export default function App() {
  return (
    <StyleProvider>
      <div className="app-container flex h-screen">
        <div className="w-2/3">
          <CardEditor />
        </div>
        <div className="w-1/3 border-l">
          <StyleEditor />
        </div>
      </div>
    </StyleProvider>
  );
} 