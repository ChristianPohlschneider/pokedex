async function renderPokeCard(initArray, index) {
    return `
    <div>${JSON.stringify(initArray[index].name)}</div>
    
    `;
}