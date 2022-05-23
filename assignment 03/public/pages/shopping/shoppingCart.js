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

const getPokemon = async (query) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  const pokemon = await response.json();
  createPokemonCard(pokemon);
};
// get how many items are in cart in local storage
const getCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  // for each item in the cart array, print the pokemon id, name, and price
  if (cart != null) {
    for (let i = 0; i < cart.length; i++) {
      getPokemon(cart[i]);
    }
  }
};
getCart();

function createPokemonCard(pokemon) {
  console.log(pokemon.name);
  // get div cart and append data
  const poke_card = document.createElement("div");
  poke_card.classList.add("pokemon");
  const pokeType = `${pokemon.types[0].type.name}`;
  const color = colors[pokeType];

  poke_card.style.backgroundColor = color;
  const poke_cardHTML = `
    <div class="poke-card-img">
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    </div></a>
    <div class="poke-card-info">
    <h2>${pokemon.name}</h3>
    <h3>type: ${pokemon.types[0].type.name}</h3>
    <h3>Price $${pokemon.id}
    </div>
    <button class="remove-button" onclick="removeFromCart(${pokemon.id})">Remove</button>
`;
  poke_card.innerHTML = poke_cardHTML;
  poke_container.appendChild(poke_card);
}

function removeFromCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const index = cart.indexOf(id);
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// calculate sum of prices where prices are the base stats of the pokemon
function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i];
  }
  console.log(total);
  // using jquery add the total to a div
  $("#total").html("<h1>" + "Amount due in full = $" + total + "</h1>");
}
calculateTotal();
