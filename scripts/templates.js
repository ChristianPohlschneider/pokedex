function renderPokeCard(initArray, index) {
    return `
    <div class="pokeCard">
        <div class="pokeCardHeader" id="pokeCardHeader">
            <p class="pokeID">#${Math.abs(Number(initArray[index].id) + 1)}</p>
            <p>${initArray[index].name}</p>
        </div>
        <img class="contentImg" id="contentImg${index}" src="" alt="pokemon">
        <div class="pokemonType" id="pokemonType${index}"></div>
    </div>
    `;
}

function renderSpecificPokeType(initArray, index, typeIndex){
    return `
    <img class="pokeTypeImg" id="typeImg${index + "#" + typeIndex}" src="" alt="type">
    `;
}