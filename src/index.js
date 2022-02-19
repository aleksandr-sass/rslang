let wordInfo = document.querySelector("#word-info");
let baseURL = new URL("https://rslang-aleksandr-sass.herokuapp.com/");
let wordURL = baseURL;
wordURL.pathname="/words/5e9f5ee35eb9e72bc21af4a2";


fetch(wordURL.href)
  .then(response => response.json())
  .then(data => {
    let imageURL = baseURL;
    imageURL.pathname = data.image;
    let word = data.word;
    let transcription = data.transcription;
    let wordTranslate = data.wordTranslate;
    let textMeaning = data.textMeaning;
    let textMeaningTranslate = data.textMeaningTranslate;
    let textExample = data.textExample;
    let textExampleTranslate = data.textExampleTranslate;
    wordInfo.innerHTML = `<img src="${imageURL.href}" alt="${word}" class="round">
                          <p>${word} ${transcription}</p>
                          <p>${wordTranslate}</p>
                          <p>${textMeaning}</p>
                          <p>${textMeaningTranslate}</p>
                          <p>${textExample}</p>
                          <p>${textExampleTranslate}</p>`;
  });