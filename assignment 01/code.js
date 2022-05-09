const poke_container = document.getElementById("poke_container");
const searchButton = document.getElementById("search-btn");
const pokemonClicked = document.getElementById("pokemonClicked");
const result = document.getElementById("#result");

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

const fetchPokemonByRegion = async () => {
  var region1 = document.getElementById("region");
  var region = region1.value;
  if (region === "kanto") {
    for (let i = 1; i <= 151; i++) {
      await getPokemon(i);
    }
  } else if (region === "johto") {
    for (let i = 152; i <= 251; i++) {
      await getPokemon(i);
    }
  } else if (region === "hoenn") {
    for (let i = 252; i <= 386; i++) {
      await getPokemon(i);
    }
  } else if (region === "sinnoh") {
    for (let i = 387; i <= 493; i++) {
      await getPokemon(i);
    }
  } else if (region === "unova") {
    for (let i = 494; i <= 649; i++) {
      await getPokemon(i);
    }
  } else if (region === "kalos") {
    for (let i = 650; i <= 721; i++) {
      await getPokemon(i);
    }
  } else if (region === "alola") {
    for (let i = 722; i <= 807; i++) {
      await getPokemon(i);
    }
  }
};

const getPokemon = async (query) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
  const response = await fetch(url);
  const pokemon = await response.json();
  console.log(pokemon);
  createPokemonCard(pokemon);
};

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
<a href="/profile/${pokemon.name}" target="_blank" id="pokemonClicked">
  <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></a>
</div>
<div class="poke-card-info">
  <h2>${pokemon.name}</h3>
  <h3>type: ${pokemon.types[0].type.name}</h3>
</div>
    `;
  poke_card.innerHTML = poke_cardHTML;
  poke_container.appendChild(poke_card);
}

function createPokemonProfile(pokemon) {}

function searchPokemon() {
  document
    .getElementById("search-btn")
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("search-btn").click();
      }
    });
}

function buttonPressed() {
  //clear the container
  poke_container.innerHTML = "";
  // if the
  // if the search bar is not empty then i = contents of the search bar
  if (document.getElementById("search").value !== "") {
    const i = document.getElementById("search").value;
    console.log(i);
    getPokemon(i);
  } else {
    // if the type is all then run the fetchPokemonByRegion function
    if (document.getElementById("poke_type").value === "all") {
      fetchPokemonByRegion();
    } else {
      // if the type is not all then run the fetchPokemonByTypeandRegion function
      if (document.getElementById("poke_type").value != "all") {
        fetchPokemonByTypeandRegion();
      }
    }
  }
}
