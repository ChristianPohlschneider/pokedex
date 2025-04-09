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
    if (allPokemon == "") {
        showSpinner();
        let response = await loadData(TOTAL_PATH);
        for (let index = 0; index < 1025; index++) {
            allPokemon.push(
                {
                    id: index + 1,
                    name: response[index].name,
                    url: response[index].url
                }
            )
        }
        hideSpinner();
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
    let index = document.getElementById("pokeID").innerHTML.replace("#", "");
    let species = await loadAttributesData(BASE_URL + Evolution_Chain + Math.abs(Number(index)));
    let evolutionChain = await loadAttributesData(species.evolution_chain.url);
    establishFirstEvolutionChainData(evolutionChain);
}

async function establishFirstEvolutionChainData(evolutionChain) {
    document.getElementById("mainStats").innerHTML = renderEvolutionChainData(1);
    let attributeData = await loadAttributesData(allPokemon[findPokemonIndex(evolutionChain.chain.species.name)[0] - 1].url);
    document.getElementById("evolutionChainImg" + 1).src = attributeData.sprites.other.home.front_default;
    document.getElementById("evolutionChainDiv" + 1).innerHTML += attributeData.name;
    establishSecondEvolutionChainData(evolutionChain);
}

async function establishSecondEvolutionChainData(evolutionChain) {
    if (evolutionChain.chain.evolves_to.length != 0) {
        document.getElementById("mainStats").innerHTML += renderArrow();
        if (evolutionChain.chain.evolves_to.length == 1) {
            let attributeData = await loadAttributesData(allPokemon[findPokemonIndex(evolutionChain.chain.evolves_to[0].species.name)[0] - 1].url);
            document.getElementById("mainStats").innerHTML += renderEvolutionChainData(2);
            document.getElementById("evolutionChainImg" + 2).src = attributeData.sprites.other.home.front_default;
            document.getElementById("evolutionChainDiv" + 2).innerHTML += attributeData.name;
            establishThirdEvolutionChainData(evolutionChain);
        } else if (evolutionChain.chain.evolves_to.length > 1) {
            establishMultipleEvolutionChainData(evolutionChain);
        }
    }
}

async function establishThirdEvolutionChainData(evolutionChain) {
    if (evolutionChain.chain.evolves_to[0].evolves_to.length != 0) {
        document.getElementById("mainStats").innerHTML += renderArrow();
        let attributeData = await loadAttributesData(allPokemon[findPokemonIndex(evolutionChain.chain.evolves_to[0].evolves_to[0].species.name)[0] - 1].url);
        document.getElementById("mainStats").innerHTML += renderEvolutionChainData(3);
        document.getElementById("evolutionChainImg" + 3).src = attributeData.sprites.other.home.front_default;
        document.getElementById("evolutionChainDiv" + 3).innerHTML += attributeData.name;
    }
}

async function establishMultipleEvolutionChainData(evolutionChain) {
    for (let multipleIndex = 0; multipleIndex < evolutionChain.chain.evolves_to.length; multipleIndex++) {
        let attributeData = await loadAttributesData(allPokemon[findPokemonIndex(evolutionChain.chain.evolves_to[multipleIndex].species.name) - 1].url);
        document.getElementById("mainStats").innerHTML += renderEvolutionChainData(4 + multipleIndex);
        document.getElementById("evolutionChainImg" + Number(4 + multipleIndex)).src = attributeData.sprites.other.home.front_default;
        document.getElementById("evolutionChainDiv" + Number(4 + multipleIndex)).innerHTML += attributeData.name;
        if (multipleIndex == evolutionChain.chain.evolves_to.length -1) {
            return
        }
        document.getElementById("mainStats").innerHTML += renderArrow();
    }
}

async function renderFoundPokemon(matches) {
    for (let matchIndex = 0; matchIndex < matches.length; matchIndex++) {
        let attributes = await getAttributes(allPokemon, matches[matchIndex] - 1);
        matches[matchIndex] = matches[matchIndex] - 1;
        renderPokeCards(allPokemon, matches[matchIndex], attributes);
    }
}