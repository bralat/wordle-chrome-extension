chrome.commands.onCommand.addListener(async (command) => {
  // reload extension
  await chrome.runtime.reload();
  // refresh page
  await chrome.tabs.reload();
});
