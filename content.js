document.addEventListener('DOMContentLoaded', async function() {
  chrome.storage.sync.get(['fromLang', 'toLang'], async function(data) {
    const fromLang = data.fromLang || 'en';  // Default source language is English
    const toLang = data.toLang || 'es';     // Default target language is Spanish

    console.log('From Lang:', fromLang);  // Debug log
    console.log('To Lang:', toLang);     // Debug log

    // Select elements that are likely to contain translatable text
    const elementsToTranslate = document.querySelectorAll('p, h1, h2, h3, span, div');

    for (let element of elementsToTranslate) {
      const text = element.textContent.trim();

      // Skip elements with empty text or already translated
      if (!text || element.hasAttribute('data-translated')) continue;

      // Translate the text using LibreTranslate API
      const translatedText = await fetchTranslation(text, fromLang, toLang);
      element.textContent = translatedText;  // Update the text content with translated text
      element.setAttribute('data-translated', 'true'); // Mark the element as translated
    }
  });
});

async function fetchTranslation(text, fromLang, toLang) {
  const url = 'https://libretranslate.de/translate';  // LibreTranslate API endpoint

  console.log('Translating text:', text);  // Debug log

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: fromLang,
        target: toLang,
      }),
    });

    const data = await response.json();
    console.log('Translation Data:', data);  // Debug log

    if (data && data.translatedText) {
      return data.translatedText;  // Return translated text
    } else {
      console.error('Error translating text:', data);
      return text;  // Return original text if translation fails
    }
  } catch (error) {
    console.error('Error translating text:', error);
    return text;  // Return original text if there's an error
  }
}
