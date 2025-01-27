document.getElementById("saveLanguages").addEventListener("click", () => {
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;

  chrome.storage.sync.set({ sourceLang, targetLang }, () => {
    console.log("Languages saved:", sourceLang, targetLang);
    alert("Languages saved!");
  });
});
