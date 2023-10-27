const initializePopup = () => {
  chrome.storage.local.get(['font', 'size', 'underline'], (result) => {
    const savedFont = result.font;
    const savedSize = result.size;
    const savedUnderline = result.underline;

    // Set the saved values to the select and input elements
    if (savedFont) {
      document.getElementById('fontSelect').value = savedFont;
    }
    if (savedSize) {
      document.getElementById('fontSizeInput').value = savedSize;
    }
    if (savedUnderline === 'underline') {
      document.getElementById('underlineToggle').checked = true;
    } else {
      document.getElementById('underlineToggle').checked = false;
    }
  });
};

document.getElementById('fontSelect').addEventListener('change', (event) => {
  const selectedFont = event.target.value;
  chrome.storage.local.set({ font: selectedFont });
});

document.getElementById('fontSizeInput').addEventListener('input', (event) => {
  const selectedSize = event.target.value;
  chrome.storage.local.set({ size: selectedSize });
});
document
  .getElementById('underlineToggle')
  .addEventListener('change', (event) => {
    const isUnderlined = event.target.checked;
    let decoration = 'none';
    if (isUnderlined) {
      decoration = 'underline';
    }
    chrome.storage.local.set({ underline: decoration });
  });

initializePopup();
