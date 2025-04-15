let TOTAL_PATH = "pokemon?limit=100000&offset=0";
let displayedPokemon = [];
let limit = 20;
let offset = 0;

function setEventListener() {
    const searchInput = document.querySelector("#pokemonSearch");
    searchInput.addEventListener("search", function (event) {
        reloadAfterSearch();
    });
    const searchInputResp = document.querySelector("#pokemonSearchResp");
    searchInputResp.addEventListener("search", function (event) {
        reloadAfterSearch();
    });
}

function getPromise() {
    document.getElementById("moreButton").style.display = "flex";
    showSpinner();
    loadFromAPI();
    getPromiseReturn();
}

function getPromiseReturn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (displayedPokemon.length == 0) {
                reject(console.error("Could not fetch data"));
                hideSpinner();
            } else {
                resolve(hideSpinner());
            }
        }, 800);
    });
}

function renderPokeCards(displayedPokemon, index, attributes) {
    document.getElementById("content").innerHTML += renderPokeCard(displayedPokemon, index);
    document.getElementById("contentImg" + displayedPokemon[index].id).src = attributes.sprites.other.home.front_default;
    document.getElementById("contentImg" + displayedPokemon[index].id).classList.add(attributes.types[0].type.name);
    renderPokeType(displayedPokemon, index, attributes);
}

function renderPokeType(displayedPokemon, index, attributes) {
    for (let typeIndex = 0; typeIndex < attributes.types.length; typeIndex++) {
        document.getElementById("pokemonType" + displayedPokemon[index].id).innerHTML += renderSpecificPokeType(displayedPokemon, index, typeIndex);
        document.getElementById("typeImg" + displayedPokemon[index].id + "#" + typeIndex).src = "./assets/icons/" + attributes.types[typeIndex].type.name + ".png";
    }
}

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('respMenuClosed');
}

function openCurrentPokemon(index, event) {
    document.getElementById("currentContent").innerHTML = "";
    document.getElementById("currentContent").innerHTML += renderCurrentPokemon(index);
    loadCurrentPokemonData(displayedPokemon, index);
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

function establishCurrentPokeType(displayedPokemon, index, data) {
    document.getElementById("currentContentImg").src = data.sprites.other.home.front_default;
    document.getElementById("currentContentImgDiv").classList.add(data.types[0].type.name);
    for (let typeIndex = 0; typeIndex < data.types.length; typeIndex++) {
        document.getElementById("pokemonType").innerHTML += renderCurrentPokeType(displayedPokemon, index, typeIndex);
        document.getElementById("typeImg" + displayedPokemon[index].id + "_" + typeIndex).src = "./assets/icons/" + data.types[typeIndex].type.name + ".png";
    }
    loadMainAttributesData()
}

function getAttributeData(folder) {
    switchButton(folder);
    if (folder == 1) {
        showSpinner();
        loadMainAttributesData();
    } else if (folder == 2) {
        showSpinner();
        loadStatsAttributesData()
    } else {
        showSpinner();
        loadEvolutionChainData()
    }
    hideSpinner();
}

function findPokemonIndex(pokemonName) {
    let searchArray = [];
    for (let findIndex = 0; findIndex < allPokemon.length; findIndex++) {
        let testName = allPokemon[findIndex].name;
        let pattern = new RegExp(pokemonName);
        if (pattern.test(testName) === true) {
            searchArray.push(allPokemon[findIndex].id);
        }
    }
    return searchArray;
}

function searchPokemon(id) {
    let searchCharacterLength = document.getElementById(id).value.length;
    document.getElementById('warning').innerHTML = "";
    if (document.getElementById(id).value.length == 0) {
        reloadAfterSearch()
    } else if (searchCharacterLength < 3 || searchCharacterLength > 20) {
        setWarning()
        return;
    } else {
        showSpinner();
        showSearchedPokemon(document.getElementById('warning'), id);
        hideSpinner();
    }}

function setWarning() {
    document.getElementById('content').innerHTML = "";
    document.getElementById('moreButton').style.display = "none";
    document.getElementById('warning').style.flex = "1";
    document.getElementById('warning').innerHTML = 'Min 3 letters!';
}

function showSearchedPokemon(warningRef, id) {
    document.getElementById("moreButton").style.display = "none";
    document.getElementById('warning').style.flex = "0";
    document.getElementById("content").innerHTML = "";
    let matches = "";
    let inputElement = document.getElementById(id).value;
    let searchProperty = (inputElement.toLowerCase());
    matches = findPokemonIndex(searchProperty);
    if (matches.length == 0) {
        document.getElementById('warning').style.flex = "1";
        warningRef.innerHTML = 'No pokemon found...';
    }
    renderFoundPokemon(matches);
}

function showSpinner() {
    document.getElementById("spinnerDiv").style.display = "flex";
    document.getElementById("spinner").style.display = "flex";
}

function hideSpinner() {
    document.getElementById("spinnerDiv").style.display = "none";
    document.getElementById("spinner").style.display = "none";
}

function switchPokemon(operator, index, event) {
    if (operator == 1) {
        if (index == 0) {
            index = displayedPokemon.length - 1;
        } else {
            index--;
        } openCurrentPokemon(index, event);
    } else if (operator == 2) {
        if (index == displayedPokemon.length - 1) {
            index = 0;
        } else {
            index++;
        } openCurrentPokemon(index, event);
    }}

function switchButton(folder) {
    let activeButtonArray = document.getElementsByClassName("attributeButton");
    for (let index = 0; index < activeButtonArray.length; index++) {
        activeButtonArray[index].classList.remove("activeAttributeButton");
    }
    document.getElementById("attributeButton" + folder).classList.add("activeAttributeButton");
}



