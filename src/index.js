let wordInfo = document.querySelector("#word-info");
let site = "https://rslang-aleksandr-sass.herokuapp.com/";
let wordData = {};
let wordURL = new URL("words/5e9f5ee35eb9e72bc21af4a2", site);

fetch(wordURL)
  .then(response => response.json())
  .then(data => {
    wordData = data;
    wordInfo.innerHTML = getCardHTML(data);
    let soundButton = wordInfo.querySelector("img[name='soundButton']");
    soundButton.addEventListener("click", listenAudio);
  });

function getCardHTML(data) {
  return `<img src="${(new URL(data.image, site)).href}" alt="${data.word}" class="round">
    <p>${data.word} ${data.transcription}</p>
    <p><img src="../img/audio.png" alt="audio" name="soundButton"></p>
    <p>${data.wordTranslate}</p>
    <p>${data.textMeaning}</p>
    <p>${data.textMeaningTranslate}</p>
    <p>${data.textExample}</p>
    <p>${data.textExampleTranslate}</p>`;
}

function listenAudio() {
  let soundButton = wordInfo.querySelector("img[name='soundButton']");
  soundButton.src = "../img/audioOn.png";
  let soundEffect = prepareAudio(wordData);
  playAudio(soundEffect);
}

function prepareAudio(wordData) {
  return [
    new Audio(new URL(wordData.audio, site)),
    new Audio(new URL(wordData.audioMeaning, site)),
    new Audio(new URL(wordData.audioExample, site))
  ];
}

function playAudio(soundEffect) {
  soundEffect[0].play();
  soundEffect[0].addEventListener("ended", () => soundEffect[1].play());
  soundEffect[1].addEventListener("ended", () => soundEffect[2].play());
  soundEffect[2].addEventListener("ended", () => soundButton.src = "../img/audio.png");
  return 0;
}