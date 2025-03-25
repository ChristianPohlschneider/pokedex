function renderPokeCard(initArray, index) {
    return `
    <div class="pokeCard">
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