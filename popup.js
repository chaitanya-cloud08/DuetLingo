document.getElementById('swapButton').addEventListener('click', function() {
    const fromLang = document.getElementById('fromLang').value;
    const toLang = document.getElementById('toLang').value;
    
    // Store selected languages in Chrome storage
    chrome.storage.sync.set({ fromLang, toLang }, function() {
      alert("Languages swapped!");
    });
  });