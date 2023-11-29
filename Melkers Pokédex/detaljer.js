// Ta fram ID-numret genom att plocka det ifrån slutet av URL:en.
let pokemonID = parseInt(window.location.href.split("=")[1]);

// Binder punkter i min HTML till variabler.
const pokemonContainer = document.querySelector(".pokemon-hero-container");
const pokemonWeight = document.querySelector("#weight");
const pokemonTypes = document.querySelector("#types");
const pokemonHeight = document.querySelector("#height");
const pokemonBio = document.querySelector(".pokemon-bio");

// Funktion som fetchar infon och visar den pokemon som tryckts på.
async function fetchSpecificPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then (response => response.json())
    .then (async specificPokemonData => {
      console.log("Du är nu inne på detaljsidan för " + specificPokemonData.name.toUpperCase());
      let pokemonColor = "";
      // Hämtar mer information om Pokémonens art för att sedan spara ner färgen.
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(response => response.json())
        .then(specificPokemonSpeciesData => {
          pokemonColor = specificPokemonSpeciesData.color.name;
          // Letar fram den engelska "flavor"-texten som är vald Pokémons beskrivning och infogar den på webbsidan.
          for (let i = 0; i < specificPokemonSpeciesData.flavor_text_entries.length; i++) {
            if (specificPokemonSpeciesData.flavor_text_entries[i].language.name === "en") {
              pokemonBio.innerHTML = specificPokemonSpeciesData.flavor_text_entries[i].flavor_text;
              break;
            };
          };
        });

      // Visar valda Pokémons vikt och höjd.
      pokemonWeight.innerHTML = (specificPokemonData.weight / 10) + "kg";
      pokemonHeight.innerHTML = (specificPokemonData.height / 10) + "m";

      // Funktion som kollar och visar upp vald Pokémons typ/typer.
      getPokemonTypes(specificPokemonData);

      // Visar upp vald Pokémon.
      pokemonContainer.setAttribute("style", `background: linear-gradient(${pokemonColor}, #E5E7E6 90%);`);
      pokemonContainer.innerHTML = `
      <div class="pokemon-hero-information-container">
        <div class="pokemon-hero-information">
          <h2 class="pokemon-name">${specificPokemonData.name.toUpperCase()}</h2>
          <h2 class="pokemon-id">#${specificPokemonData.id}</h2>
        </div>
      </div>
      <img class="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${specificPokemonData.id}.png" alt="Image of ${specificPokemonData.name}">`;
    });
};

// Funktion som hämtar och till slut visar vald Pokémons typ.
function getPokemonTypes(pokemon) {
  pokemonTypes.innerHTML = "";
  pokemon.types.forEach(pokemonType => {
    type = document.createElement("h3");
    type.setAttribute("class", "pokemon-type");
    type.setAttribute("id", `${pokemonType.type.name}-type`);
    type.textContent = pokemonType.type.name.toUpperCase();
    pokemonTypes.appendChild(type);
  });
};

// Kör igång funktionen som till slut visar vald Pokémon.
fetchSpecificPokemon(pokemonID.toString());

// En Eventlistener som lyssnar efter tangentbordstryck för att bläddra Pokemon, i detta fallet pil vänster och pil höger.
addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight" && pokemonID !== 151) {
    pokemonID += 1;
    fetchSpecificPokemon(pokemonID.toString());
  } else if (event.key === "ArrowLeft" && pokemonID !== 1) {
    pokemonID -= 1;
    fetchSpecificPokemon(pokemonID.toString());
  };
});
