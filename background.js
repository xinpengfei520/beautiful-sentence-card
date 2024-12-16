// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "create-card",
    title: "生成金句卡片",
    contexts: ["selection"]
  });
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "create-card") {
    chrome.tabs.sendMessage(tab.id, {
      type: "CREATE_CARD",
      text: info.selectionText
    });
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