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

function renderPokeCards(initArray, index, data){
    document.getElementById("content").innerHTML += renderPokeCard(initArray, index);
    document.getElementById("contentImg" + index).src = data.sprites.other["official-artwork"].front_default;
}

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('respMenuClosed');
}