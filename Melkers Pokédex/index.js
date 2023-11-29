// Använder första regionens Pokémon, de första 151 originella.
const kantoRegion = 151;

// Utrymme för utökning av Pokémon.
let pokemonAmount = kantoRegion;
let allPokemon = [];

// Binder fält på hemsidan till variabler för framtida användning i min kod.
const searchField = document.querySelector("#searchfield");
const searchButton = document.querySelector("#searchbutton");
const resetButton = document.querySelector("#resetbutton");
const nameFilter = document.querySelector("#filter-name");
const idFilter = document.querySelector("#filter-id");
const pokemonList = document.querySelector(".pokemon-list");

// Localstarage för att återställa sökfältet till det som senast söktes.
searchField.value = localStorage.getItem("searchItem");

// Funktion hämtar alla FirstGen-Pokémon och lägger dessa i en variabel. Denna funktion startar nästkommande funktion.
function fetchAllPokemon() {
  // Gör så att det inte är möjligt att söka under tiden en ny fetch görs.
  searchButton.disabled = true;
  try {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonAmount}`)
      .then(response => response.json())
      .then(data => {
        allPokemon = data.results;
        fetchEachPokemon(allPokemon);
      });
  } catch (error) {
    console.error("Following error occurred while fetching pokemonlist: " + error);
  };
};

// Asynkron funktion som hämtar data om varje Pokémon i listan som matas in.
async function fetchEachPokemon(listOfPokemons) {
  // Rensar tidigare hämtning ifrån mitt "ul" element om en sådan har gjorts.
  pokemonList.innerHTML = "";
  resetButton.disabled = true;
  try {
    // For-loop kör igenom min array med Pokémonlistan och fetchar informationen om denna Pokémon. Den gör detta en efter en annan med hjälp av "await".
    for (i = 0; i < listOfPokemons.length; i++) {
      await fetch(listOfPokemons[i].url)
        .then(response => response.json())
        .then(async pokemonData => {
          console.log(pokemonData.id);
          let pokemonColor = "";
          // Hämtar även "Species"-datan.
          await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`)
            .then(response => response.json())
            .then(pokemonSpeciesData => {
              pokemonColor = pokemonSpeciesData.color.name;
            });

          // Skapar ett "li" element på hemsidan för varje Pokémon.
          const pokemonListItem = document.createElement("li");
          pokemonListItem.setAttribute('class', "pokemonListItem");
          pokemonListItem.setAttribute('style', `background: linear-gradient(${pokemonColor}, #E5E7E6 70%);`);
          pokemonList.appendChild(pokemonListItem);
          pokemonListItem.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png" alt="${pokemonData.name}" style="width: 100%; height: 100%;">
            <h2>${pokemonData.name.toUpperCase()}</h2>`;

            // Eventlistener som triggas när användaren klickar på en Pokémon och laddar in detalj-sidan för vald Pokémon.
            pokemonListItem.addEventListener("click", () => {
              window.location.href = `detaljer.html?id=${pokemonData.id}`;
            });
        });
    };
  } catch (error) {
    console.error("Following error occurred while fetching specific Pokemon: " + error);
  };
  // Aktiverar knapparna i sökfältet.
  searchButton.disabled = false;
  resetButton.disabled = false;
};

// Kör igång funktionen som kommer hämta och visa samtliga Pokemon på webbsidan när den laddas in.
fetchAllPokemon();

// Funktion för sökfilter som fetchar de pokemon som matchar användarens sökkriterier.
function searchFunction(searchValue) {
  let myFilteredPokemons = allPokemon.filter((pokemon) => {
    if (nameFilter.checked === true) {
      return pokemon.name.startsWith(searchValue);
    } else if (idFilter.checked === true) {
      if (searchValue === pokemon.url.split("/")[6]) {
      return pokemon.url.startsWith(`https://pokeapi.co/api/v2/pokemon/${searchValue}`);
      };
    };
  });
  fetchEachPokemon(myFilteredPokemons);
};

// Eventlistener som lyssnar efter när jag klickar på "Enter" och startar en sökning. Sökvärdet sparas i en LocalStorage.
searchField.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && searchField.value !== "") {
    localStorage.setItem('searchItem', searchField.value);
    searchFunction(searchField.value.toLowerCase());
  };
});

// Eventlistener som lyssnar efter när jag klickar på sökknappen och startar en sökning. Sökvärdet sparas i en LocalStorage.
searchButton.addEventListener("click", () => {
  if (searchField.value !== "") {
    localStorage.setItem('searchItem', searchField.value);
    searchFunction(searchField.value.toLowerCase());
  };
});

// Eventlistener som lyssnar efter när jag klickar på återställningsknappen.
resetButton.addEventListener("click", () => {
  searchField.value = "";
  fetchEachPokemon(allPokemon);
});
