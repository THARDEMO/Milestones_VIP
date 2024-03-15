const STATE = {
    games: [
        {
            title: 'God Of War: Ragnarök',
            rank: 10,
            favourite: false,
        }
    ],
    characters: [
        {
            title: 'Kratos of Sparta',
            rank: 10,
            favourite: false,
        }
    ],

    renderUI
};


function renderUI() {
    //tömmer alla containers från DOM element för rerenders
    const queryContainers = [ 'create', 'compiler', 'listings'];
    queryContainers.forEach( query => {document.querySelector( `#${query}`).innerHTML = null})

    //Renderar alla komponenter på nytt
    const components = [renderGames, renderCharacters, renderCreate, renderControls, renderCompiler];
    components.forEach( component => component());
}