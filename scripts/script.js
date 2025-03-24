let INIT_PATH = "pokemon?limit=20&offset=0";
let initArray = [];

function getPromise() {
    loadFromAPI()
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (initArray.length == 0) {
                reject(console.error("Daten konnten nicht abgerufen werden"));
            } else {
                resolve(console.log("Daten konnten abgerufen werden"))
            }
        }, 300);
    });
}

function renderPokeCards(initArray, index, data) {
    document.getElementById("content").innerHTML += renderPokeCard(initArray, index);
    document.getElementById("contentImg" + index).src = data.sprites.other.home.front_default;
    document.getElementById("contentImg" + index).classList.add(data.types[0].type.name);
    renderPokeType(initArray, index, data);
}

function renderPokeType(initArray, index, data) {
for (let typeIndex = 0; typeIndex < data.types.length; typeIndex++) {
    document.getElementById("pokemonType" + index).innerHTML += renderSpecificPokeType(initArray, index, typeIndex);
    document.getElementById("typeImg" + index + "#" + typeIndex).src = "./assets/icons/" + data.types[typeIndex].type.name + ".png";
    
}
}

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('respMenuClosed');
}