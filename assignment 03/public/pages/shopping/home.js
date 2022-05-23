const poke_container = document.getElementById("poke_container");
const searchButton = document.getElementById("search-btn");
const pokemonClicked = document.getElementById("pokemonClicked");
const result = document.getElementById("#result");
var pokemon = {};

var now = new Date(Date.now());
var formatted =
  now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const main_types = Object.keys(colors);
// generate 9 random numbers between 1 and 801
function randomNumber() {
  let randomNumber = [];
  for (let i = 0; i < 9; i++) {
    randomNumber[i] = Math.floor(Math.random() * 801) + 1;
  }
  return randomNumber;
}

const fetchPokemon = async () => {
  let randomNumbers = randomNumber();
  for (let i = 0; i < 9; i++) {
    await getPokemon(randomNumbers[i]);
  }
};

const getPokemon = async (query) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  const pokemon = await response.json();
  console.log(pokemon);
  createPokemonCard(pokemon);
};

fetchPokemon();

function createPokemonCard(pokemon) {
  const poke_card = document.createElement("div");
  poke_card.classList.add("pokemon");
  const pokeType = `${pokemon.types[0].type.name}`;
  const color = colors[pokeType];

  poke_card.style.backgroundColor = color;
  const poke_cardHTML = `
    <div class="poke-card-img">
    <h2>
  #${pokemon.id}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
  </div></a>
  <div class="poke-card-info">
    <h2>${pokemon.name}</h3>
    <h3>type: ${pokemon.types[0].type.name}</h3>
    <h3>Price $${pokemon.id}
  </div>
  <div class="addToCart"><button onclick="" id="pokemonClicked">Add to Cart</button></div>
      `;
  // if the button is clicked, the pokemon will be added to the cart
  poke_card.addEventListener("click", function () {
    console.log("button clicked");
    getPokemonOnClick(pokemon.id);
  });
  poke_card.innerHTML = poke_cardHTML;
  poke_container.appendChild(poke_card);
}

const getPokemonOnClick = async (query) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
  const response = await fetch(url);
  const pokemon = await response.json();
  console.log(pokemon);
  console.log(pokemon.name);
  // create an array in local storage and add pokemon id to it
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null) {
    cart = [];
  }
  cart.push(pokemon.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
};

function buttonPressed() {
  //clear the container
  poke_container.innerHTML = "";
  document
    .getElementById("poke_container")
    .setAttribute("class", "poke_container");
  // if the search bar is not empty then i = contents of the search bar
  if (document.getElementById("search").value !== "") {
    const i = document.getElementById("search").value;
    console.log(i);
    getPokemon(i);
  }
}
