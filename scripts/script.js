let INIT_PATH = "pokemon?limit=20&offset=0";
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

function renderPokeCards(initArray, index, data) {
    document.getElementById("content").innerHTML += renderPokeCard(initArray, index);
    document.getElementById("contentImg" + initArray[index].id).src = data.sprites.other.home.front_default;
    document.getElementById("contentImg" + initArray[index].id).classList.add(data.types[0].type.name);
    renderPokeType(initArray, index, data);
}

function renderPokeType(initArray, index, data) {
for (let typeIndex = 0; typeIndex < data.types.length; typeIndex++) {
    document.getElementById("pokemonType" + initArray[index].id).innerHTML += renderSpecificPokeType(initArray, index, typeIndex);
    document.getElementById("typeImg" + initArray[index].id + "#" + typeIndex).src = "./assets/icons/" + data.types[typeIndex].type.name + ".png"; 
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