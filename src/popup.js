// 使用React构建UI界面
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CardEditor from './components/CardEditor';
import TemplateSelector from './components/TemplateSelector';
import StyleEditor from './components/StyleEditor';
import { StyleProvider, useStyle } from './context/StyleContext';

function App() {
  const [selectedText, setSelectedText] = useState('');
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const { state } = useStyle();

  useEffect(() => {
    // 获取选中的文本
    chrome.storage.local.get(['selectedText'], (result) => {
      if (result.selectedText) {
        setSelectedText(result.selectedText);
      }
    });
  }, []);

  useEffect(() => {
    console.log('当前应用状态:', state);
  }, [state]);

  return (
    <div className="app">
      <CardEditor 
        text={selectedText}
        template={currentTemplate}
      />
      <TemplateSelector 
        onSelect={setCurrentTemplate}
      />
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