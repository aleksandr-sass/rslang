let wordInfo = document.querySelector("#word-info");
let site = "https://rslang-aleksandr-sass.herokuapp.com/";
let baseURL = new URL(site);
let wordURL = new URL(site);
let wordData = {};
wordURL.pathname="/words/5e9f5ee35eb9e72bc21af4a2";


fetch(wordURL.href)
  .then(response => response.json())
  .then(data => {
    wordData = data;
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
                          <p><img src="../img/audio.png" alt="audio" id="soundButton"></p>
                          <p>${wordTranslate}</p>
                          <p>${textMeaning}</p>
                          <p>${textMeaningTranslate}</p>
                          <p>${textExample}</p>
                          <p>${textExampleTranslate}</p>`;

    let soundButton = wordInfo.querySelector("#soundButton");
    soundButton.addEventListener("click", listenAudio);
  });


function listenAudio() {
  let soundButton = wordInfo.querySelector("#soundButton");
  soundButton.src = "../img/audioOn.png";
  
  let soundURL = new URL(site);

  soundURL.pathname = wordData.audio;
  let soundEffect1 = new Audio(soundURL.href);

  soundURL.pathname = wordData.audioMeaning;
  let soundEffect2 = new Audio(soundURL.href);

  soundURL.pathname = wordData.audioExample;
  let soundEffect3 = new Audio(soundURL.href);
  soundEffect1.play();
  soundEffect1.addEventListener("ended", () => soundEffect2.play());
  soundEffect2.addEventListener("ended", () => soundEffect3.play());
  soundEffect3.addEventListener("ended", () => soundButton.src = "../img/audio.png");
}