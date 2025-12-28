chrome.storage.local.get('randomValue', (result) => {
  const value = result.randomValue || 'Not set';
  document.getElementById('randomValueText').value = value;
  if (typeof QRCode !== 'undefined') {
    QRCode.toCanvas(document.getElementById('qrcode'), value, { width: 256 }, (error) => {
      if (error) console.error(error);
    });
  } else {
    document.getElementById('qrcode').textContent = 'QR Code library not loaded.';
  }
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const textarea = document.getElementById('randomValueText');
  textarea.select();
  document.execCommand('copy');
  alert('Copied to clipboard!');
});