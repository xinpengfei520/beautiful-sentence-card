import React, { useState } from 'react';
import CardEditor from './CardEditor';
import TemplateSelector from './TemplateSelector';
import StyleEditor from './StyleEditor';

export default function WebApp() {
  const [text, setText] = useState('');

  return (
    <div className="web-app min-h-screen">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">金句卡片生成器</h1>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧编辑器 */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow">
              <CardEditor initialText={text} />
            </div>
          </div>

          {/* 右侧样式面板 */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow">
                <TemplateSelector />
              </div>
              <div className="bg-white rounded-lg shadow">
                <StyleEditor />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 金句卡片生成器 - 网页版
          </p>
        </div>
      </footer>
    </div>
  );
} 