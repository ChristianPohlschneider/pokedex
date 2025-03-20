let INIT_PATH = "pokemon?limit=20&offset=0";
let initArray = [];

async function init() {
    let response = await loadData(INIT_PATH);
    let keyArray = Object.keys(response);

    for (let index = 0; index < response.length; index++) {

        initArray.push(
            {
                id: keyArray[index],
                name: response[index].name,
                url: response[index].url
            }
        )
        document.getElementById("content").innerHTML += await renderPokeCard(initArray, index);
    }
}

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('respMenuClosed');
}