chrome.runtime.onInstalled.addListener(function() {
    // Default language pair on installation
    chrome.storage.sync.set({ fromLang: "en", toLang: "es" });
  });