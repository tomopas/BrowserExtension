chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Show a notification or open a tab with welcome message
    chrome.tabs.create({ url: 'welcome.html' });
  }
});