let INIT_PATH = "pokemon?limit=20&offset=0";
let TOTAL_PATH = "pokemon?limit=100000&offset=0";
let allPokemon = [];
let initArray = [];
let limit = 20;
let endValue = 0;

function getPromise() {
    loadFromAPI()
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (initArray.length == 0) {
                reject(console.error("Daten konnten nicht abgerufen werden"));
            } else {
                resolve(console.log("Daten konnten abgerufen werden"))
            }
        }, 1000);
    });
}

function renderPokeCards(initArray, index, attributes) {
    document.getElementById("content").innerHTML += renderPokeCard(initArray, index);
    document.getElementById("contentImg" + initArray[index].id).src = attributes.sprites.other.home.front_default;
    document.getElementById("contentImg" + initArray[index].id).classList.add(attributes.types[0].type.name);
    renderPokeType(initArray, index, attributes);
}

function renderPokeType(initArray, index, attributes) {
    for (let typeIndex = 0; typeIndex < attributes.types.length; typeIndex++) {
        document.getElementById("pokemonType" + initArray[index].id).innerHTML += renderSpecificPokeType(initArray, index, typeIndex);
        document.getElementById("typeImg" + initArray[index].id + "#" + typeIndex).src = "./assets/icons/" + attributes.types[typeIndex].type.name + ".png";
    }
}

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('respMenuClosed');
}

function morePokemon() {
    endValue = endValue + limit;
    INIT_PATH = "pokemon?limit=" + limit + "&offset=" + endValue;
    initArray = [];
    getPromise();
}

function openCurrentPokemon(index, event) {
    document.getElementById("currentContent").innerHTML = "";
    document.getElementById("currentContent").innerHTML += renderCurrentPokemon(index);
    loadCurrentPokemonData (allPokemon, index);
    event.stopPropagation();
    document.body.classList.add("stopScrolling");
}

function closeCurrentPokemon(e, event) {
    if (e == 0) {
        event.stopPropagation();
        return
      } else if (e == 1) {
        document.getElementById("currentContent").innerHTML = "";
        document.body.classList.remove("stopScrolling"); 
      } else {
        return
      }
    }

function establishCurrentPokeType(allPokemon, index, data) {
    document.getElementById("currentContentImg").src = data.sprites.other.home.front_default;
    document.getElementById("currentContentImgDiv").classList.add(data.types[0].type.name);
    for (let typeIndex = 0; typeIndex < data.types.length; typeIndex++) {
        document.getElementById("pokemonType").innerHTML += renderCurrentPokeType(allPokemon, index, typeIndex);
        document.getElementById("typeImg" + allPokemon[index].id + "_" + typeIndex).src = "./assets/icons/" + data.types[typeIndex].type.name + ".png";
    }
    loadMainAttributesData()
}

function getAttributeData(folder) {
    if (folder == 1) {
        loadMainAttributesData();
    } else if (folder == 2) {
        loadStatsAttributesData()
    } else {
        loadEvolutionChainData()
    }
}