chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'autofillPassword') {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    if (passwordInputs.length > 0) {
      passwordInputs[0].value = request.password;
    }
  }
});