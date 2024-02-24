const STATE = {};

const state = {
    get,
    update,
    renderUI
}

const UPDATE = {};

async function get( entity, field, type_id = null) {
    const rqst = new Request( `${window.location.origin}/MS_2/API/GET.php?entity=${entity}&fields=${field}`);
    
    //ENTITY har inte hämtats än:: Existerar ej i STATE
    if( !STATE[entity]) {
        const data = await fetcher( rqst);

        if( field != 'all' ) {STATE[entity] = [data]}
        else {STATE[entity] = data}
    }

    if( field === 'all') {
        const allInstances = await fetcher( rqst);
        STATE[ entity] = allInstances;

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
    
    //INSTANCE not in STATE[entity]
    let newData = await fetcher( rqst);
    STATE[entity].push( newData);
    //RETURNS INSTANCE through recursion
    return( await state.get( entity, field));
    
}

async function update( entity, fields = [], method = 'POST', updates = []) {
    
    const rqst = new Request( `${window.location.origin}/MS_2/API/${method}.php`, {
        method: method,
        body: JSON.stringify( {entity:entity, fields: fields})
    });

    const data = await fetcher( rqst);
    updates.forEach( u => UPDATE[u]( data, method, entity));
}

function renderUI() {
    //tömmer alla containers från DOM element för rerenders
    const queryContainers = [ 'create', 'compiler', 'listings'];
    queryContainers.forEach( query => {document.querySelector( `#${query}`).innerHTML = null})

    //Renderar alla komponenter på nytt
    const components = [renderGames, renderCharacters, renderCreate, renderControls, renderCompiler];
    components.forEach( component => component());
}

async function fetcher( rqst) {
    return await ( await fetch( rqst)).json();
}