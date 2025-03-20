const BASE_URL = "https://pokeapi.co/api/v2/";

async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson.results;
}