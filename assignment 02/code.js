const poke_container = document.getElementById("poke_container");
const searchButton = document.getElementById("search-btn");
const pokemonClicked = document.getElementById("pokemonClicked");
const result = document.getElementById("#result");
var pokemon = {};

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

const getPokemonByType = async (query) => {
  const url = `https://pokeapi.co/api/v2/type/${query}`;
  const response = await fetch(url);
  const pokemon = await response.json();
  console.log(pokemon);
  createPokemonCardByType(pokemon);
};

function createPokemonCardByType(pokemon) {
  for (let i = 0; i < pokemon.pokemon.length; i++) {
    const poke_card = document.createElement("div");
    poke_card.classList.add("pokemon");
    const poke_cardHTML = `
    <a onclick='' id="pokemonClicked">
    <div class="poke-card-info">
    <h3>${pokemon.pokemon[i].pokemon.name}</h3></a>
    </div>
    `;
    // if the a tag is clicked, the pokemon profile will be displayed
    poke_card.addEventListener("click", function () {
      getPokemonOnClick(pokemon.pokemon[i].pokemon.name);
    });
    poke_card.innerHTML = poke_cardHTML;
    poke_container.appendChild(poke_card);
  }
}

const getPokemonOnClick = async (query) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
  const response = await fetch(url);
  const pokemon = await response.json();
  console.log(pokemon);
  createPokemonProfile(pokemon);
};

function createPokemonProfile(pokemon) {
  poke_container.innerHTML = "";
  document
    .getElementById("poke_container")
    .setAttribute("class", "poke_profile");
  const poke_card = document.createElement("div");
  poke_card.classList.add("pokemon");
  const pokeType = `${pokemon.types[0].type.name}`;
  const color = colors[pokeType];
  const hp_max = (pokemon.stats[0].base_stat / 255) * 100;
  const attk_max = (pokemon.stats[1].base_stat / 150) * 100;
  const def_max = (pokemon.stats[2].base_stat / 150) * 100;
  const speed_max = (pokemon.stats[3].base_stat / 150) * 100;
  poke_card.style.backgroundColor = color;
  const poke_cardHTML = `
    <div class="poke-profile-img">
    <h1>${pokemon.name}</h1>
    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
  </div>
  <div class="poke-stat-container">
  <div class="poke-profile-info">
    <h2>ID: ${pokemon.id}</h2>
    <h2>Type: ${pokemon.types[0].type.name}</h2>
    <h2>Height: ${pokemon.height}</h2>
    <h2>Weight: ${pokemon.weight}</h2>
    <h2>Abilities: ${pokemon.abilities[0].ability.name}</h2>
  </div>
  <div class="poke-profile-stats">
    <h2>HP: ${pokemon.stats[0].base_stat}</h2>  <div class="meter">
    <span style="width: ${hp_max}%"></span>
  </div>
    <h2>Attack: ${pokemon.stats[1].base_stat}</h2><div class="meter red">
    <span style="width: ${attk_max}%"></span>
  </div>
    <h2>Defense: ${pokemon.stats[2].base_stat}</h2><div class="meter orange">
    <span style="width: ${def_max}%"></span>
  </div>
    <h2>Speed: ${pokemon.stats[5].base_stat}</h2><div class="meter orange">
    <span style="width: ${speed_max}%"></span>
  </div>
    </div>
    </div>
      `;
  poke_card.innerHTML = poke_cardHTML;
  poke_container.appendChild(poke_card);
}

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
<a onclick='' id="pokemonClicked">
  <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></a>
</div>
<div class="poke-card-info">
  <h2>${pokemon.name}</h2>
  <h3>type: ${pokemon.types[0].type.name}</h3>
</div>
    `;
  // if the a tag is clicked, the pokemon profile will be displayed
  poke_card.addEventListener("click", function () {
    getPokemonOnClick(pokemon.id);
  });
  poke_card.innerHTML = poke_cardHTML;
  poke_container.appendChild(poke_card);
}

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
  document
    .getElementById("poke_container")
    .setAttribute("class", "poke_container");
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
      // if the type is not all then run the fetchPokemonByType function
      if (document.getElementById("poke_type").value != "all") {
        const i = document.getElementById("poke_type").value;
        console.log(i);
        getPokemonByType(i);
      }
    }
  }
}
function insertSearchEventToTheTimeLine(poke_type) {
  var now = new Date(Date.now());
  var formatted =
    now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  $.ajax({
    url: "http://localhost:5000/timeline/insert",
    type: "put",
    data: {
      text: ` Client has searched for ${poke_type}`,
      time: "at time"`${now}`,
      hits: 1,
    },
    success: function (r) {
      console.log(r);
    },
  });
}

async function setup() {
  await init_menu();
  insertSearchEventToTheTimeLine(poke_type);
}

const data = { now, poke_type };
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
};
fetch("/timeline2", options);

$(document).ready(setup);
