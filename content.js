const configUrl = chrome.runtime.getURL("config.json");

document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const selection = window.getSelection().toString().trim();
    if (!selection) {
      console.log("No text selected.");
      return;
    }
    console.log("Original Text:", selection);

    const configResponse = await fetch(configUrl);
    const config = await configResponse.json();
    const apiUrl = config.API_URL;

    chrome.storage.sync.get(["sourceLang", "targetLang"], async (data) => {
      const sourceLang = data.sourceLang || "en";
      const targetLang = data.targetLang || "en";

      try {
        const encodedText = encodeURIComponent(selection);
        const fullApiUrl = `${apiUrl}&sl=${sourceLang}&tl=${targetLang}&q=${encodedText}`;
        const response = await fetch(fullApiUrl);
        const json = await response.json();
        if (json && json[0]) {
          const translatedText = json[0];
          console.log("Translated Text:", translatedText);
          const range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(translatedText));
        } else {
          console.error("Invalid response from the API:", json);
        }
      } catch (error) {
        console.error("Translation failed:", error);
      }
    });
  }
});
