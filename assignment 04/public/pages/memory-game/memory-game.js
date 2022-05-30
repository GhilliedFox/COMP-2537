"use strict";
const cards = document.querySelectorAll(".memory-card");
//game js
let hasFlippedCard = false;
let lockTheBoard = false;
let firstCard, secondCard;

let match = 0;

//stopwatch timer

function flipCard() {
  if (lockTheBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //second click
    secondCard = this;

    //check if the cards match
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      //first card and second card match
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      console.log($(".memory-card").length);
      console.log("its a match");
      console.log(match);

      match++;

      gameOver();
      flipAgain();
    } else {
      lockTheBoard = true;

      //first and second dont match
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        flipAgain();
      }, 1000);
    }
  }
}
//count total number of cards
function countCards() {
  let totalCards = cards.length;
  return totalCards;
}

//if match is == to gridSize, then game is over
function gameOver() {
  if (match == $(".memory-card").length / 2) {
    console.log("YOU WIN");
    alert("YOU WIN");
  }
}

function flipAgain() {
  [hasFlippedCard, lockTheBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

const getPokemon = async (query) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  const pokemon = await response.json();
  console.log(pokemon);
  addContent(pokemon);
};

function addContent(pokemon) {
  const img = pokemon.sprites.front_default;
  const card = document.createElement("div");
  card.classList.add("memory-card");
  card.dataset.framework = pokemon.id;
  card.innerHTML = `<img class="front-face" src="${img}">`;
  card.innerHTML += `<img class="back-face" src="/images/back-face.jpg">`;
  document.querySelector(".memory-game").appendChild(card);
  card.addEventListener("click", flipCard);
}

//recursively call getPokemon() to get all pokemon
const getAllPokemon = async () => {
  let x = document.querySelector("#pokemonNumber").value;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${x}`);
  const data = await response.json();
  console.log(data);
  for (let i = 0; i < data.results.length; i++) {
    getPokemon(data.results[i].name);
  }
};

//make x pairs of cards
function makeCards() {
  let n = document.querySelector("#gridSize").value;
  for (let i = 0; i < n; i++) {
    getAllPokemon();
    startTimer();
    //update matches to match the number of pairs
  }
}

// make a timer counting down from x seconds
function startTimer() {
  if (document.querySelector("#setTimer").value == "") {
    document.querySelector(".timer").style.display = "hidden";
  } else {
    let time = document.querySelector("#setTimer").value;
    let timer = setInterval(() => {
      time--;
      document.querySelector("#timer").innerHTML = time;
      if (time === 0) {
        clearInterval(timer);
        alert("GAME OVER");
        window.location.reload();
      }
    }, 1000);
  }
}
