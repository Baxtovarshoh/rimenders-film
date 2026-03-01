const gridContainer = document.querySelector(".grid-cont");
const startTablo = document.querySelector(".startTablo");
const gameTablo = document.querySelector(".gameTablo");
const finishTablo = document.querySelector(".finishTablo");
const scor = document.querySelector(".score");
const clock = document.querySelector(".clock");

const video = document.querySelector("video");
const pics = ["kelly", "ali", "ahmad", "sitora", "omina"];
const dubl = [...pics, ...pics];

let videoParent = video.parentElement;
let selectedCards = [];
let lock = false;
let score = 0;
let time = 20;
let timeInterval;

const shuffle = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};
const shuffleArray = shuffle(dubl);

function playAgain() {
  clearInterval(timeInterval);
  const cards = document.querySelectorAll(".card");
  generateCards();

  cards.forEach((card) => {
    card.classList.remove("flip");
    card.classList.remove("matched");
  });

  selectedCards = [];
  lock = false;
  score = 0;
  time = 20;

  scor.textContent = score;
  clock.textContent = time;

  finishTablo.classList.add("hidden");
  gameTablo.classList.remove("hidden");

  timeInterval = setInterval(() => {
    if (time > 0) {
      time--;
      clock.textContent = time;
    } else {
      clearInterval(timeInterval);
      finishFunct();
      lock = true;
    }
  }, 1000);
}
function generateCards() {
  gridContainer.innerHTML = "";

  const shuffleArray = shuffle(dubl);

  shuffleArray.forEach((card) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.dataset.card = card;

    div.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="assets/side.png" />
        </div>
        <div class="card-back">
          <img src="assets/${card}.png" />
        </div>
      </div>
    `;

    div.addEventListener("click", () => {
      if (lock) return;
      if (div.classList.contains("matched")) return;
      if (div.classList.contains("flip")) return;

      div.classList.add("flip");
      selectedCards.push(div);

      if (selectedCards.length === 2) {
        lock = true;
        checkMatch();
      }
    });

    gridContainer.appendChild(div);
  });
}

scor.textContent = score;
function checkMatch() {
  let [card1, card2] = selectedCards;
  if (card1.dataset.card === card2.dataset.card) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    score++;
    scor.textContent = score;
    if (score === 5) finishFunct();
    reset();
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      reset();
    }, 700);
  }
}
function reset() {
  selectedCards = [];
  lock = false;
}
function finishFunct() {
  gameTablo.classList.add("hidden");
  finishTablo.classList.remove("hidden");
}
clock.textContent = time;
function timerFunct() {
  generateCards();
  startTablo.classList.add("hidden");
  gameTablo.classList.remove("hidden");

  timeInterval = setInterval(() => {
    if (time > 0) {
      time--;
      clock.textContent = time;
      console.log(4);
    } else {
      clearInterval(timeInterval);
      finishFunct();
      lock = true;
    }
  }, 1000);
}

function startVideo() {
  finishTablo.classList.add("hidden");
  videoParent.classList.remove("hidden");
  video.play();
}

function closeVideo() {
  finishTablo.classList.remove("hidden");
  videoParent.classList.add("hidden");
  video.pause();
  video.currentTime = 0;
}
