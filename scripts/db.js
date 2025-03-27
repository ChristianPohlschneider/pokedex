const BASE_URL = "https://pokeapi.co/api/v2/";
let attributesArray = [];

async function loadFromAPI() {
    getAllPokemon();
    let response = await loadData(INIT_PATH);
    for (let index = 0; index < response.length; index++) {
        initArray.push(
            {
                id: 0,
                name: response[index].name,
                url: response[index].url
            }
        )
        let attributes = await getAttributes(initArray, index);
        initArray[index].id = attributes.id - 1;
        renderPokeCards(initArray, index, attributes);
    }
}

async function getAllPokemon() {
    let response = await loadData(TOTAL_PATH);
    for (let index = 0; index < response.length; index++) {
        allPokemon.push(
            {
                id: index + 1,
                name: response[index].name,
                url: response[index].url
            }
        )
    }
}

async function getAttributes(Array, index) {
    let attributeData = await loadAttributesData(Array[index].url);
    return attributeData;
}

async function loadData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json");
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        let responseToJson = await response.json();
        return responseToJson.results;
    } catch (error) {
        console.error(error);
    }
}

async function loadAttributesData(url = "") {
    try {
        let pokeData = await fetch(url);
        if (!pokeData.ok) {
            throw new Error("Could not fetch resource");
        }
        let pokeDataToJson = await pokeData.json();
        return pokeDataToJson;
    } catch (error) {
        console.error(error);
    }
}

async function loadCurrentPokemonData (allPokemon, index) {
    let data = await getAttributes(allPokemon, index);
    establishCurrentPokeType(allPokemon, index, data);
}

async function loadMainAttributesData () {
    let index = document.getElementById("pokeID").innerHTML.replace("#", "") - 1;
    let data = await getAttributes(allPokemon, index);
    let abilities = "";
    for (let abilitieIndex = 0; abilitieIndex < data.abilities.length; abilitieIndex++) {
        abilities += data.abilities[abilitieIndex].ability.name + ", ";
    }
    document.getElementById("mainStats").innerHTML = renderMainAttributesData(abilities, data);
}