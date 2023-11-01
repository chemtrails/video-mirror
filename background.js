chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    await chrome.tabs.sendMessage(tab.id, {id: info.menuItemId});
});

chrome.runtime.onInstalled.addListener( function() {
    chrome.contextMenus.create({
        title: 'Mirror',
        contexts: ['all'],
        id: 'mirror'
    });
});