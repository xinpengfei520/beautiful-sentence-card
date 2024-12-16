// 添加初始化标记
if (!window._cardGeneratorInitialized) {
  window._cardGeneratorInitialized = true;

  // 监听来自background的消息
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('content script收到消息:', request);
    if (request.type === "CREATE_CARD") {
      // 保存选中的文本
      chrome.storage.local.set({ selectedText: request.text }, () => {
        console.log('文本已保存到storage:', request.text);
        if (chrome.runtime.lastError) {
          console.error('保存文本错误:', chrome.runtime.lastError);
        }
        // 通知background打开编辑器
        chrome.runtime.sendMessage({ type: "OPEN_EDITOR" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('发送OPEN_EDITOR错误:', chrome.runtime.lastError);
          }
        });
      });
      // 发送响应
      sendResponse({ received: true });
      return true; // 保持消息通道开启
    }
  });

  // 处理快捷键
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'Y') {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        chrome.storage.local.set({ selectedText }, () => {
          chrome.runtime.sendMessage({ type: "OPEN_EDITOR" });
        });
      }
    }
  });
} 