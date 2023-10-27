// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'copyToClipboard') {
//     const tempElem = document.createElement('div');
//     tempElem.style.position = 'absolute';
//     tempElem.style.left = '-9999px';
//     tempElem.innerHTML = message.htmlToCopy;
//     document.body.appendChild(tempElem);

//     const range = document.createRange();
//     range.selectNodeContents(tempElem);
//     const selection = window.getSelection();
//     selection.removeAllRanges();
//     selection.addRange(range);

//     document.execCommand('copy');
//     document.body.removeChild(tempElem);
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'copyToClipboard') {
    const tempElem = document.createElement('div');
    tempElem.style.position = 'absolute';
    tempElem.style.left = '-9999px';
    tempElem.innerHTML = message.htmlToCopy;
    document.body.appendChild(tempElem);
    const clipboardItems = new ClipboardItem({
      'text/plain': new Blob([tempElem.innerText], { type: 'text/plain' }),
      'text/html': new Blob([tempElem.innerHTML], { type: 'text/html' }),
    });
    navigator.clipboard.write([clipboardItems]);

    document.body.removeChild(tempElem);
  }
});
