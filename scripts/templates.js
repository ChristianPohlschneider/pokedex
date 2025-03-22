function renderPokeCard(initArray, index) {
    return `
    <div class="pokeCard">${JSON.stringify(initArray[index].name)}
    <img id="contentImg${index}" src="" alt="pokemon">
    </div>
    `;
}