const BASE_URL = "https://pokeapi.co/api/v2/";
const Evolution_Chain = "pokemon-species/";
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
        initArray[index].id = attributes.id;
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

async function loadCurrentPokemonData(allPokemon, index) {
    let data = await getAttributes(allPokemon, index);
    establishCurrentPokeType(allPokemon, index, data);
}

async function loadMainAttributesData() {
    document.getElementById("mainStats").innerHTML = "";
    let index = document.getElementById("pokeID").innerHTML.replace("#", "") - 1;
    let data = await getAttributes(allPokemon, index);
    let abilities = "";
    for (let abilitieIndex = 0; abilitieIndex < data.abilities.length; abilitieIndex++) {
        abilities += data.abilities[abilitieIndex].ability.name + ", ";
    }
    document.getElementById("mainStats").innerHTML = renderMainAttributesData(abilities, data);
}

async function loadStatsAttributesData() {
    document.getElementById("mainStats").innerHTML = "";
    document.getElementById("mainStats").innerHTML = renderStatsAttributesDataDiv();
    let index = document.getElementById("pokeID").innerHTML.replace("#", "") - 1;
    let data = await getAttributes(allPokemon, index);
    for (let statIndex = 0; statIndex < data.stats.length; statIndex++) {
        document.getElementById("statsAttribute").innerHTML += renderStatsAttributesData(data, statIndex);
    }
}

async function loadEvolutionChainData() {
    document.getElementById("mainStats").innerHTML = "";
    let index = document.getElementById("pokeID").innerHTML.replace("#", "") - 1;
    let species = await loadAttributesData(BASE_URL + Evolution_Chain + Math.abs(Number(index) + 1));
    let evolutionChain = await loadAttributesData(species.evolution_chain.url);
    document.getElementById("mainStats").innerHTML = renderEvolutionChainData(1);
    let attributeData = await loadAttributesData(allPokemon[findPokemonIndex(evolutionChain.chain.species.name)].url);
    document.getElementById("evolutionChainImg" + 1).src = attributeData.sprites.other.home.front_default;
    establishEvolutionChainData(evolutionChain);
}

async function establishEvolutionChainData(evolutionChain) {
    if (evolutionChain.chain.evolves_to.length != 0) {
        document.getElementById("mainStats").innerHTML += renderArrow();
        let attributeData = await loadAttributesData(allPokemon[findPokemonIndex(evolutionChain.chain.evolves_to[0].species.name)].url);
        document.getElementById("mainStats").innerHTML += renderEvolutionChainData(2);
        document.getElementById("evolutionChainImg" + 2).src = attributeData.sprites.other.home.front_default;
    }
    if (evolutionChain.chain.evolves_to[0].evolves_to.length != 0) {
        document.getElementById("mainStats").innerHTML += renderArrow();
        let attributeData = await loadAttributesData(allPokemon[findPokemonIndex(evolutionChain.chain.evolves_to[0].evolves_to[0].species.name)].url);
        document.getElementById("mainStats").innerHTML += renderEvolutionChainData(3);
        document.getElementById("evolutionChainImg" + 3).src = attributeData.sprites.other.home.front_default;
    }
}