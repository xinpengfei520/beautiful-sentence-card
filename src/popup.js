// 使用React构建UI界面
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CardEditor from './components/CardEditor';
import TemplateSelector from './components/TemplateSelector';
import StyleEditor from './components/StyleEditor';
import { StyleProvider } from './context/StyleContext';

function App() {
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    // 获取选中的文本
    chrome.storage.local.get(['selectedText'], (result) => {
      if (result.selectedText) {
        setSelectedText(result.selectedText);
      }
    });
  }, []);

  return (
    <div className="app max-w-2xl mx-auto">
      <CardEditor initialText={selectedText} />
      <TemplateSelector />
      <StyleEditor />
    </div>
  );
}

ReactDOM.render(
  <StyleProvider>
    <App />
  </StyleProvider>,
  document.getElementById('app')
); 