// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages
console.log('love');

chrome.commands.onCommand.addListener(async (command) => {
  let { font, size, underline } = await chrome.storage.local.get([
    'font',
    'size',
    'underline',
  ]);
  const selectedFont = font || 'Arial';
  const selectedSize = (size * 4) / 3 || '14';
  console.log(selectedFont, selectedSize, underline);

  let [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const title = currentTab.title.replace(/-.*|\|.*$/, '').trim();

  const url = currentTab.url;
  const htmlToCopy = `<a href="${url}" style="font-family: ${selectedFont}; font-size: ${selectedSize}px; text-decoration: ${underline} ;">${title}</a>`;
  chrome.tabs.sendMessage(currentTab.id, {
    action: 'copyToClipboard',
    htmlToCopy: htmlToCopy,
  });
});
