let pageInfo = document.querySelector("#page-info");
let site = "https://rslang-aleksandr-sass.herokuapp.com/";
let pageData = [];
let pageURL = new URL("words?group=0&page=0", site);

fetch(pageURL)
  .then(response => response.json())
  .then(data => {
    pageData = data;
    pageInfo.innerHTML = getPageHTML(data);
    initializeAudio(data);
  });

function getPageHTML(data) {
  let content = '';
  for (let i = 0; i < data.length; i += 1) {
    let wordContent = getCardHTML(data[i]);
    content += `<div id="word-${i}">${wordContent}</div>`;
  };
  return content;
}

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

function initializeAudio(data) {
  for (let i = 0; i < data.length; i += 1) {
    let soundButton = pageInfo.querySelector(`#word-${i} img[name="soundButton"]`);
    soundButton.addEventListener("click", listenAudio);
  }
}

function listenAudio() {
  let soundButton = this;
  let soundId = getId(soundButton);
  soundButton.src = "../img/audioOn.png";
  let soundEffect = prepareAudio(pageData[soundId]);
  playAudio(soundEffect);
  soundEffect[2].addEventListener("ended", () => soundButton.src = "../img/audio.png");
}

function prepareAudio(data) {
  return [
    new Audio(new URL(data.audio, site)),
    new Audio(new URL(data.audioMeaning, site)),
    new Audio(new URL(data.audioExample, site))
  ];
}

function playAudio(soundEffect) {
  soundEffect[0].play();
  soundEffect[0].addEventListener("ended", () => soundEffect[1].play());
  soundEffect[1].addEventListener("ended", () => soundEffect[2].play());
}

function getId(element) {
  return element
    .parentNode
    .parentNode
    .id
    .split('-')[1];
}