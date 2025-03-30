function renderPokeCard(initArray, index) {
    return `
    <div onclick="openCurrentPokemon(${initArray[index].id}, event)" class="pokeCard">
    <p class="pokeCardID">#${Math.abs(Number(initArray[index].id) + 1)}</p>
        <div class="pokeCardHeader" id="pokeCardHeader">
            
            <p>${initArray[index].name}</p>
        </div>
        <img class="contentImg" id="contentImg${initArray[index].id}" src="" alt="pokemon">
        <div class="pokemonType" id="pokemonType${initArray[index].id}"></div>
    </div>
    `;
}

function renderSpecificPokeType(initArray, index, typeIndex) {
    return `
    <img class="pokeTypeImg" id="typeImg${initArray[index].id + "#" + typeIndex}" src="" alt="type">
    `;
}

function renderCurrentPokemon(index) {
    return `
    <div class="currentPokeCard" onclick="closeCurrentPokemon(0, event)">
        <div class="currentPokeCardHeader" id="pokeCardHeader">
            <p class="pokeID"  id="pokeID">#${Number(allPokemon[index].id)}</p>
            <p class="pokemonName">${allPokemon[index].name}</p>
            <span class="close" onclick="closeCurrentPokemon(1, event)">&times;</span>
        </div>
        <div class="currentContentImgDiv" id="currentContentImgDiv">
            <img class="currentContentImg" id="currentContentImg" src="" alt="pokemon">
        </div>
        <div class="pokemonType" id="pokemonType"></div>
            <div class="attributeDiv" id="attributeDiv">
                <div class="attributeButtonDiv" id="attributeButtonDiv" onclick="closeCurrentPokemon(2, event)">
                        <button onclick="getAttributeData(1)" class="activeAttributeButton" id="attributeButton">main</button>
                        <button onclick="getAttributeData(2)" class="attributeButton" id="attributeButton">stats</button>
                        <button onclick="getAttributeData(3)" class="attributeButton" id="attributeButton">evo chain</button>
                </div>
                <div class="mainStats" id="mainStats">
                </div>
            </div>
    </div>
    `;
}

function renderCurrentPokeType(allPokemon, index, typeIndex) {
    return `
    <img class="pokeTypeImg" id="typeImg${allPokemon[index].id + "_" + typeIndex}" src="" alt="type">
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

function renderStatsAttributesData(data) {
    return `
    <div class="statsAttribute">
        <div class="attribute"><p class="attributeName">hp</p>
            <div class="outerScale">
                <div class="innerScale" id="innerScale0" style="width: ${Math.abs(Number(data.stats[0].base_stat) * 3)}px"></div>
            </div>
        </div>
                <div class="attribute"><p class="attributeName">attack</p>
            <div class="outerScale">
                <div class="innerScale" id="innerScale1" style="width: ${Math.abs(Number(data.stats[1].base_stat) * 3)}px"></div>
            </div>
        </div>
                <div class="attribute"><p class="attributeName">defense</p>
            <div class="outerScale">
                <div class="innerScale" id="innerScale2" style="width: ${Math.abs(Number(data.stats[2].base_stat) * 3)}px"></div>
            </div>
        </div>
                <div class="attribute"><p class="attributeName">special-attack</p>
            <div class="outerScale">
                <div class="innerScale" id="innerScale3" style="width: ${Math.abs(Number(data.stats[3].base_stat) * 3)}px"></div>
            </div>
        </div>
                <div class="attribute"><p class="attributeName">special-defense</p>
            <div class="outerScale">
                <div class="innerScale" id="innerScale4" style="width: ${Math.abs(Number(data.stats[4].base_stat) *3)}px"></div>
            </div>
        </div>
                <div class="attribute"><p class="attributeName">speed</p>
            <div class="outerScale">
                <div class="innerScale" id="innerScale5" style="width: ${Math.abs(Number(data.stats[5].base_stat) * 3)}px"></div>
            </div>
        </div>
    </div>
    `;
}