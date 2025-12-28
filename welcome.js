document.getElementById('generateBtn').addEventListener('click', () => {
  const randomValue = generateRandomValue(64);
  document.getElementById('randomValue').value = randomValue;
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const value = document.getElementById('randomValue').value;
  if (value) {
    chrome.storage.local.set({ randomValue: value }, () => {
      alert('Random value saved successfully!');
    });
  } else {
    alert('Please enter or generate a random value first.');
  }
});

function generateRandomValue(length) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}