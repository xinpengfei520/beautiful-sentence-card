// 创建右键菜单
function createContextMenu() {
  // 先移除已存在的菜单（如果有）
  chrome.contextMenus.removeAll(() => {
    // 创建新菜单
    chrome.contextMenus.create({
      id: "create-card",
      title: "生成金句卡片",
      contexts: ["selection"]
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('创建菜单错误:', chrome.runtime.lastError);
      } else {
        console.log('右键菜单创建成功');
      }
    });
  });
}

// 在安装/更新时创建菜单
chrome.runtime.onInstalled.addListener(() => {
  console.log('扩展已安装/更新');
  createContextMenu();
});

// 在启动时也创建菜单
createContextMenu();

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('右键菜单被点击:', info.selectionText);
  if (info.menuItemId === "create-card") {
    try {
      // 先注入content script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['contentScript.js']
      });

      // 然后发送消息
      chrome.tabs.sendMessage(tab.id, {
        type: "CREATE_CARD",
        text: info.selectionText
      }, (response) => {
        console.log('发送消息响应:', response);
        if (chrome.runtime.lastError) {
          console.error('发送消息错误:', chrome.runtime.lastError);
        }
      });
    } catch (error) {
      console.error('注入脚本错误:', error);
    }
  }
});

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('background收到消息:', request);
  if (request.type === "OPEN_EDITOR") {
    chrome.action.openPopup();
  }
});

// 处理快捷键
chrome.commands.onCommand.addListener((command) => {
  if (command === "create-card") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "CREATE_CARD_SHORTCUT"
      });
    });
  }
}); 