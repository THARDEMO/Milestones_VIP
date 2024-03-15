const STATE = {
    games: [
        {
            id: 0,
            title: 'God Of War: Ragnarök',
            rank: 10,
            favourite: false,
        }
    ],
    characters: [
        {
            id: 0,
            title: 'Kratos of Sparta',
            rank: 10,
            favourite: false,
        }
    ],
};

const state = {
    get,
    update,
    renderUI
}

const UPDATE = {};

async function get( entity, field = 'all', type_id = null) {


    if( field === 'all') {
        //copy & return state[entity]
        return STATE[entity].map( instance => {
            return {...instance};
        })
    }
    
    //send one instance by ID
    for( const instance of STATE[entity]) {
        if( instance.id != field) continue;
        return {...instance};
    }
}

async function update( entity, fields = [], method = 'POST', updates = []) {
    
    let updateOBJ = {};
    for( const field of fields) {
        const KEY = Object.keys( field);
        updateOBJ[KEY] = field[KEY]
    }

    let maxID = Math.max(...STATE[entity].map( instance => instance.id));
    console.log( maxID)
    updateOBJ['id'] = maxID + 1;

    STATE[entity].push( updateOBJ);

    updates.forEach( u => UPDATE[u]( updateOBJ['id'], method, entity));
}

function renderUI() {
    //tömmer alla containers från DOM element för rerenders
    const queryContainers = [ 'create', 'compiler', 'listings'];
    queryContainers.forEach( query => {document.querySelector( `#${query}`).innerHTML = null})

    //Renderar alla komponenter på nytt
    const components = [renderGames, renderCharacters, renderCreate, renderControls, renderCompiler];
    components.forEach( component => component());
}
