// Använder första regionens Pokémon, de första 151 originella.
const kantoRegion = 151;

// Utrymme för utökning av Pokémon.
const pokemonAmount = kantoRegion;
let allPokemon = [];

// Skapar en variabel som kommer fyllas med objekt. Objekten kommer innhålla samtliga Pokémontyper och antalet Pokémon som har typen. Dessa fördelas även till sina egna variabler senare i min kod.
let totalTypes = [];
let pokemonTypeNames = [];
let pokemonTypeAmount = [];

// Pokémon type color credit: https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3.
// La till dessa endast för att göra min chart lite trevligare.
const pokemonTypeColors = ['#7AC74C', '#A33EA1', '#EE8130', '#A98FF3', '#6390F0', '#A6B91A', '#A8A77A', '#F7D02C', '#E2BF65', '#D685AD', '#C22E28', '#F95587', '#B6A136', '#B7B7CE', '#96D9D6', '#735797', '#6F35FC'];

// Laddikon och min chart som kommer visa upp datan.
const load = document.querySelector('#load-roller');
const ctx = document.querySelector('#myChart');

// Fetchar samtliga Pokémon ifrån PokéAPI samt kör igång funktionen som fetchar mer info om varje Pokémon.
function fetchAllPokemon() {
  try {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonAmount}`)
      .then(response => response.json())
      .then(data => {
        allPokemon = data.results;
        fetchEachPokemon(allPokemon);
      });
  } catch (error) {
    console.error(`Following error occurred while fetching pokemonlist: ${error}`);
  };
};

// Funktion som genererar objekt till "totalTypes" med varje Pokémontyp och antal Pokémon som har typen.
function checkIfPokemonTypeAlreadyExistInTotalTypes(listOfPokemonTypes) {
  // Går igenom de typer som vald Pokémon har.
  listOfPokemonTypes.forEach(typeThePokemonHas => {
    let typeFound = false;
    // Jämför typerna med de objekt som finns i "totalTypes"-variabeln.
    totalTypes.forEach(objectTypeInArrayBeingChecked => {
      // Om typen redan finns som objekt i variabeln så ökar den bara antalet på typen.
      if (typeThePokemonHas === objectTypeInArrayBeingChecked.name) {
        objectTypeInArrayBeingChecked.amount += 1;
        typeFound = true;
        console.log(`Typen matchade. ${objectTypeInArrayBeingChecked.name} är nu ${objectTypeInArrayBeingChecked.amount}`);
      };
    });
    // Har inte typen matchat så kommer ett nytt objekt skapas och skickas till variabeln.
    if (typeFound === false) {
      let newPokemonType = {name: typeThePokemonHas, amount: 1};
      totalTypes.push(newPokemonType);
      console.log(`Typen matchade inte. Skapar ny typ: ${typeThePokemonHas}`);
    };
  });
};

// Funktion som sorterar typnamnen och typantal till sina egna arrays, så att jag kan använda dessa i min chart.
function sortPokemonTypesAndAmounts(objectListOfPokemonTypes) {
  for (let i = 0; i < objectListOfPokemonTypes.length; i++) {
    pokemonTypeNames.push(objectListOfPokemonTypes[i].name);
    pokemonTypeAmount.push(objectListOfPokemonTypes[i].amount);
  };
};

// Asynkron funktion som hämtar mer info om varje Pokémon och till sist skapar min chart.
async function fetchEachPokemon(listOfPokemons) {
  try {
    // For-loop kör igenom min array med Pokémonlistan och fetchar informationen om denna Pokémon. Den gör detta en efter en annan med hjälp av "await".
    for (i = 0; i < listOfPokemons.length; i++) {
      await fetch(listOfPokemons[i].url)
        .then(response => response.json())
        .then(pokemonData => {
          // Skapar en variabel som är en array.
          let thisPokemonsTypes = [];
          console.log(pokemonData.name);
          // Lägger in denna Pokémons typer i ovan variabel.
          pokemonData.types.forEach(pokemonType => {
            thisPokemonsTypes.push(pokemonType.type.name);
          });
          console.log(thisPokemonsTypes);
          // Skickar in typerna till funktionen som tillslut räknar dem.
          checkIfPokemonTypeAlreadyExistInTotalTypes(thisPokemonsTypes);
        });
    };
    console.log(totalTypes);
    // Sorteringsfunktionen körs.
    sortPokemonTypesAndAmounts(totalTypes);
    // Döljer laddikonen när processen är färdig.
    load.setAttribute('style', `display: none;`);
    // Skapar min chart. Open source chart and canvas from https://www.chartjs.org/.
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: pokemonTypeNames,
        datasets: [{
          label: '# of Pokémons',
          data: pokemonTypeAmount,
          borderWidth: 3,
          backgroundColor: pokemonTypeColors,
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          }
        }
      }
    });
  } catch (error) {
    console.error(`Following error occurred: ${error}`);
  };
};

// Startar hämtningen utav PokéAPI-datan.
fetchAllPokemon();
