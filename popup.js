let randomValue = '';

chrome.storage.local.get('randomValue', (result) => {
  randomValue = result.randomValue || '';
  document.getElementById('randomValueDisplay').value = randomValue;
});

document.getElementById('showRandomBtn').addEventListener('click', () => {
  document.getElementById('randomValueSection').classList.toggle('hidden');
});

document.getElementById('editBtn').addEventListener('click', () => {
  const input = document.getElementById('randomValueDisplay');
  input.readOnly = false;
  input.focus();
  input.addEventListener('blur', () => {
    input.readOnly = true;
    randomValue = input.value;
    chrome.storage.local.set({ randomValue });
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      input.blur();
    }
  });
});

document.getElementById('generateNewBtn').addEventListener('click', async () => {
  if (confirm('Are you sure? This will replace your current random value and you may lose access to previously generated passwords.')) {
    randomValue = await generateRandomValue(64);
    document.getElementById('randomValueDisplay').value = randomValue;
    chrome.storage.local.set({ randomValue });
  }
});

document.getElementById('exportBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: 'export.html' });
});

document.getElementById('autofillSwitch').addEventListener('change', (e) => {
  const isAutofill = e.target.checked;
  document.getElementById('generateBtn').classList.toggle('hidden', isAutofill);
  document.getElementById('autofillBtn').classList.toggle('hidden', !isAutofill);
  document.getElementById('generatedPassword').classList.add('hidden');
});

document.getElementById('generateBtn').addEventListener('click', async () => {
  const master = document.getElementById('masterSecret').value;
  const website = document.getElementById('websiteSecret').value;
  if (master && website && randomValue) {
    const hash = await generateHash(master + website + randomValue);
    document.getElementById('passwordText').textContent = hash;
    document.getElementById('generatedPassword').classList.remove('hidden');
  } else {
    alert('Please fill all fields and ensure random value is set.');
  }
});

document.getElementById('autofillBtn').addEventListener('click', async () => {
  const master = document.getElementById('masterSecret').value;
  const website = document.getElementById('websiteSecret').value;
  if (master && website && randomValue) {
    const hash = await generateHash(master + website + randomValue);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'autofillPassword', password: hash });
    });
  } else {
    alert('Please fill all fields and ensure random value is set.');
  }
});

async function generateHash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateRandomValue(length) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}