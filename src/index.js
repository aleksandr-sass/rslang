let pageInfo = document.querySelector("#page-info");
let wordBookNav = document.querySelector("#wordBookNav");
let site = "https://rslang-aleksandr-sass.herokuapp.com/";
let pageData = [];
let pageURL = new URL("words?group=0&page=0", site);

/* div#"page-info" JS-code */

fetchURL(pageURL);

function fetchURL(pageURL) {
  fetch(pageURL)
    .then(response => response.json())
    .then(data => {
      pageData = data;
      pageInfo.innerHTML = getPageHTML(data);
      initializeAudio(data);
      showElement(wordBookNav);
    });
}

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

function showElement(element) {
  element.classList.remove("hidden");
}

/* div#"wordBookNav" JS-code */

wordBookNav.innerHTML = `<p>Next Page</p>
  <p><img src="../img/arrowRight.png" alt="Next Page" name="nextPage"></p>
  <p>Previous Page</p>
  <p><img src="../img/arrowLeft.png" alt="Previous Page" name="previousPage"></p>`;

let nextPage = wordBookNav.querySelector("img[name='nextPage']");
let previousPage = wordBookNav.querySelector("img[name='previousPage']");
nextPage.addEventListener("click", showNextPage);
previousPage.addEventListener("click", showPreviousPage);

function showNextPage() {
  transition(1);
}

function showPreviousPage() {
  transition(-1);
}

function transition(int) {
  let group = +(pageURL.searchParams.get("group"));
  let page = +(pageURL.searchParams.get("page"));
  let globPage = (180 + group * 30 + page + int) % 180;
  page = globPage % 30;
  group = (globPage - page) / 30;
  pageURL.searchParams.set("group", `${group}`);
  pageURL.searchParams.set("page", `${page}`);
  fetchURL(pageURL);
  pageInfo.scrollIntoView();
}