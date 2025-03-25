const BASE_URL = "https://pokeapi.co/api/v2/";

async function loadFromAPI() {
    let response = await loadData(INIT_PATH);
    let keyArray = Object.keys(response);
    for (let index = 0; index < response.length; index++) {
        initArray.push(
            {
                id: 0,
                name: response[index].name,
                url: response[index].url
            }
        )
        let data = await getAttributes(initArray, index);
        initArray[index].id = data.id - 1;
        renderPokeCards(initArray, index, data);
    }
}

async function getAttributes(initArray, index) {
    let data = await loadAttributesData(initArray[index].url);
    return data;
}

async function loadData(path = "") {
    try {
        let response = await fetch(BASE_URL + path + ".json");
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        let responseToJson = await response.json();
        return responseToJson.results;
    } catch (error) {
        console.error(error);
    }
}

async function loadAttributesData(url = "") {
    try {
        let pokeData = await fetch(url);
        if (!pokeData.ok) {
            throw new Error("Could not fetch resource");
        }
        let pokeDataToJson = await pokeData.json();
        return pokeDataToJson;
    } catch (error) {
        console.error(error);
    }
}