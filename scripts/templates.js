function renderPokeCard(initArray, index) {
    return `
    <div onclick="openCurrentPokemon(${initArray[index].id})" class="pokeCard">
        <div class="pokeCardHeader" id="pokeCardHeader">
            <p class="pokeID">#${Math.abs(Number(initArray[index].id) + 1)}</p>
            <p>${initArray[index].name}</p>
        </div>
        <img class="contentImg" id="contentImg${initArray[index].id}" src="" alt="pokemon">
        <div class="pokemonType" id="pokemonType${initArray[index].id}"></div>
    </div>
    `;
}

function renderSpecificPokeType(initArray, index, typeIndex){
    return `
    <img class="pokeTypeImg" id="typeImg${initArray[index].id + "#" + typeIndex}" src="" alt="type">
    `;
}

function renderCurrentPokemon(index) {
    return `
    <div class="currentPokeCard">
        <div class="pokeCardHeader" id="pokeCardHeader">
            <p class="pokeID">#${Number(allPokemon[index].id)}</p>
            <p>${allPokemon[index].name}</p>
        </div>
        <img class="currentContentImg" id="contentImg" src="" alt="pokemon">
        <div class="pokemonType" id="pokemonType"></div>
    </div>
    `;
}

function renderCurrentPokeType(allPokemon, index, typeIndex){
    return `
    <img class="pokeTypeImg" id="typeImg${allPokemon[index].id + "_" + typeIndex}" src="" alt="type">
    `;
}