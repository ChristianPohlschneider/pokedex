function renderPokeCard(displayedPokemon, index) {
    return `
    <div onclick="openCurrentPokemon(${Math.abs(Number(displayedPokemon[index].id - 1))}, event)" class="pokeCard">
    <p class="pokeCardID">#${Number(displayedPokemon[index].id)}</p>
        <div class="pokeCardHeader" id="pokeCardHeader">
            
            <p>${displayedPokemon[index].name}</p>
        </div>
        <img class="contentImg" id="contentImg${displayedPokemon[index].id}" src="" alt="pokemon">
        <div class="pokemonType" id="pokemonType${displayedPokemon[index].id}"></div>
    </div>
    `;
}

function renderSpecificPokeType(displayedPokemon, index, typeIndex) {
    return `
    <img class="pokeTypeImg" id="typeImg${displayedPokemon[index].id + "#" + typeIndex}" src="" alt="type">
    `;
}

function renderCurrentPokemon(index) {
    return `
    <div class="currentPokeCard" onclick="closeCurrentPokemon(0, event)">
        <div class="currentPokeCardHeader" id="pokeCardHeader">
            <p class="pokeID"  id="pokeID">#${Number(displayedPokemon[index].id)}</p>
            <p class="pokemonName">${displayedPokemon[index].name}</p>
            <span class="close" onclick="closeCurrentPokemon(1, event)">&times;</span>
        </div>
        <div class="currentContentImgDiv" id="currentContentImgDiv">
            <img class="currentContentImg" id="currentContentImg" src="" alt="pokemon">
        </div>
        <div class="pokemonType" id="pokemonType"></div>
            <div class="attributeDiv" id="attributeDiv">
                <div class="attributeButtonDiv" id="attributeButtonDiv" onclick="closeCurrentPokemon(2, event)">
                        <button onclick="getAttributeData(1)" class="activeAttributeButton attributeButton" id="attributeButton1">main</button>
                        <button onclick="getAttributeData(2)" class="attributeButton" id="attributeButton2">stats</button>
                        <button onclick="getAttributeData(3)" class="attributeButton" id="attributeButton3">evo chain</button>
                </div>
                <div class="mainStats" id="mainStats">
                </div>
                    <div class="switchPokemon" id="switchPokemon">
                        <img class="switchImgLeft" onclick="switchPokemon(1, ${index}, event)" src="./assets/img/arrow_evolution.png" alt="arrow left">
                        <img class="switchImgRight" onclick="switchPokemon(2, ${index}, event)" src="./assets/img/arrow_evolution.png" alt="arrow right">
                    </div>
            </div>
    </div>
    `;
}

function renderCurrentPokeType(displayedPokemon, index, typeIndex) {
    return `
    <img class="pokeTypeImg" id="typeImg${displayedPokemon[index].id + "_" + typeIndex}" src="" alt="type">
    `;
}

function renderMainAttributesData(abilities, data) {
    return `
    <div class="mainAttribute">
        <div>Height</div>
        <div>Weight</div>
        <div>Base experience</div>
        <div>Abilities</div>
    </div>
    <div class="mainResults"> 
        <div>: ${Math.abs(Number(data.height) / 10)} m</div>
        <div>: ${Math.abs(Number(data.weight) / 10)} kg</div>
        <div>: ${data.base_experience}</div>
        <div>: ${abilities.slice(0, -2)}</div>
    </div>
    `;
}

function renderStatsAttributesDataDiv() {
    return `
    <div id="statsAttribute" class="statsAttribute"></div>
    `;
}

function renderStatsAttributesData(data, statIndex) {
    return `
    <div class="attribute"><p class="attributeName">${data.stats[statIndex].stat.name}</p>
        <div class="outerScale">
            <div class="innerScale" id="innerScale${statIndex}" style="width: ${Math.abs(Number(data.stats[statIndex].base_stat) * 3)}px"></div>
        </div>
    </div>
    `;
}

function renderEvolutionChainData(number) {
    return `
    <div class="evolutionChainDiv" id="evolutionChainDiv${number}">
    <img class="chainContentImg" id="evolutionChainImg${number}" src="" alt="pokemon"></img>
    </div>
    `;
}

function renderArrow() {
    return `
    <div class="arrowDiv">
    <img class="chainContentArrow" src="./assets/img/arrow_evolution.png" alt="arrow">
    </div>
    `;
}