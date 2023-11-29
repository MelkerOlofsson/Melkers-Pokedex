// Binder punkter i min HTML till variabler.
const fetchButton = document.querySelector("#fetchbutton");
const cityList = document.querySelector(".cities-list");
const createNameInput = document.querySelector("#create-city-name");
const createPopulationInput = document.querySelector("#create-city-population");
const createSendButton = document.querySelector("#create-sendbutton");
const createRegretButton = document.querySelector("#create-regretbutton");

// Funktion för att fetcha (och till slut visa) samtliga städer.
function fetchAllCities() {
fetch("https://avancera.app/cities/")
    .then(response => response.json())
    .then(fetchresult => {
      let cities = fetchresult;
      console.log(cities);
      displayListitems(cities);
    });
};

// Eventlistener för knappen "Fetch", detta kommer visa samtliga städer på webbsidan.
fetchButton.addEventListener("click", () => {
  fetchAllCities();
});

// Funktionen som skapar och visar upp samtliga städer på webbsidan.
function displayListitems(listOfCities) {
  // Rensar först tidigare resultat om något sådant finns.
  cityList.innerHTML = "";
  // Kör igenom en loop som skapar varje li-element för varje stad.
  listOfCities.forEach(city => {
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "cityitem");
    listItem.innerHTML = `
    <h2>Stad:</h2>
    <h3 class="city-name"><u>${city.name}</u></h3>
    <input
      type="text"
      value="${city.name}"
      class="city-name-textinput"
    />
    <h2>Population:</h2>
    <h3 class="city-population"><u>${city.population}</u></h3>
    <input
      type="text"
      value="${city.population}"
      class="city-population-textinput"
    />
    <input
      type="button"
      value="Redigera"
      name="editbutton"
      class="editbutton"
    />
    <input
      type="button"
      value="Radera"
      name="deletebutton"
      class="deletebutton"
    />
    <input
      type="button"
      value="Bekräfta"
      name="confirmbutton"
      class="confirmbutton"
    />
    <input
      type="button"
      value="Ångra"
      name="regretbutton"
      class="regretbutton"
    />
    <h4>ID:</h4>
    <h5><u>${city.id}</u></h5>`;
    cityList.appendChild(listItem);

    // Binder punkter i mina li-element till variabler.
    const cityName = listItem.querySelector(".city-name");
    const cityNameTextInput = listItem.querySelector(".city-name-textinput");
    const cityPopulation = listItem.querySelector(".city-population");
    const cityPopulationTextInput = listItem.querySelector(".city-population-textinput");
    const editButton = listItem.querySelector(".editbutton");
    const deleteButton = listItem.querySelector(".deletebutton");
    const confirmButton = listItem.querySelector(".confirmbutton");
    const regretButton = listItem.querySelector(".regretbutton");

    // Bestämmer vad som ska visas efter att mitt listitem har skapats.
    cityName.setAttribute("style", "display: inline-block");
    cityNameTextInput.setAttribute("style", "display: none");
    cityPopulation.setAttribute("style", "display: inline-block");
    cityPopulationTextInput.setAttribute("style", "display: none");
    editButton.setAttribute("style", "display: inline-block");
    deleteButton.setAttribute("style", "display: inline-block");
    confirmButton.setAttribute("style", "display: none");
    regretButton.setAttribute("style", "display: none");

    // Funktioner för att skifta knapparna när användaren klickar på dem. Note To Self: Skapa CSS-klasser i framtiden för att minska kod och klotter.
    function editButtonOnClick() {
      cityName.setAttribute("style", "display: none");
      cityNameTextInput.setAttribute("style", "display: inline-block");
      cityPopulation.setAttribute("style", "display: none");
      cityPopulationTextInput.setAttribute("style", "display: inline-block");
      editButton.setAttribute("style", "display: none");
      deleteButton.setAttribute("style", "display: none");
      confirmButton.setAttribute("style", "display: inline-block");
      regretButton.setAttribute("style", "display: inline-block");
    };
    function confirmAndRegretButtonOnClick() {
      cityName.setAttribute("style", "display: inline-block");
      cityNameTextInput.setAttribute("style", "display: none");
      cityPopulation.setAttribute("style", "display: inline-block");
      cityPopulationTextInput.setAttribute("style", "display: none");
      editButton.setAttribute("style", "display: inline-block");
      deleteButton.setAttribute("style", "display: inline-block");
      confirmButton.setAttribute("style", "display: none");
      regretButton.setAttribute("style", "display: none");
    };

    // Asynkron funktion för att ta bort städer.
    async function removeCity(city) {
      // Om användaren bekräftar i "confirm"-rutan så tas staden bort.
      if (confirm(`Vill du verkligen ta bort ${city.name}`) === true) {
        await fetch(`https://avancera.app/cities/${city.id}`, {method: 'DELETE'});
        console.log("Borttaget " + city.name);
        fetchAllCities();
      };
    };

    // Asynkron funktion för att redigera en stad med "Put"-metoden.
    async function editCity(city) {
      console.log(`Redigerar ${city.id} till Namn: ${cityNameTextInput.value} och Population: ${cityPopulationTextInput.value}`);
      await fetch(`https://avancera.app/cities/${city.id}`, {body: `{ "id": "${city.id}", "name": "${cityNameTextInput.value}", "population": ${parseInt(cityPopulationTextInput.value)} }`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'});
      fetchAllCities();
    };

    // Eventlisteners som lyssnar efter knapptrycken och utför sina funktioner.
    editButton.addEventListener("click", () => {
      editButtonOnClick();
    });
    deleteButton.addEventListener("click", () => {
      removeCity(city);
    });
    confirmButton.addEventListener("click", () => {
      editCity(city);
      confirmAndRegretButtonOnClick();
    });
    regretButton.addEventListener("click", () => {
      confirmAndRegretButtonOnClick();
      cityNameTextInput.value = city.name;
      cityPopulationTextInput.value = city.population;
    });
  });
};

// Asynkron funktion som skapar en ny stad om värderna i inputfälten inte är tomma eller "NaN".
async function createCity() {
  if (createNameInput.value !== "" && !isNaN(parseInt(createPopulationInput.value))) {
    await fetch(`https://avancera.app/cities/`, {body: `{ "name": "${createNameInput.value}", "population": ${parseInt(createPopulationInput.value)} }`,
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'}
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
      });
    createNameInput.value = "";
    createPopulationInput.value = "";
    fetchAllCities();
  } else {
    alert("Ogiltiga värden");
  };
};

// Eventlistener som lyssnar efter ett knapptryck och skickar därefter ett "POST"-anrop.
createSendButton.addEventListener("click", () => {
  createCity();
});

// Eventlistener som rensar textfälten om användaren ångrar skapandet av stad.
createRegretButton.addEventListener("click", () => {
  createNameInput.value = "";
  createPopulationInput.value = "";
});
