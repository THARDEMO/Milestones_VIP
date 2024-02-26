//STATE VAR -- collection of data on page
const STATE = {};
//update functions are saved here to be accesed on STATE.update()
const UPDATE = {};
// Path to functions //SIMULATE IMPORT/EXPORT 
const state = {
    get,
    update,
}

async function get( entity, field, type_id = null) {
    const rqst = new Request( `${window.location.origin}/MS_3/API/GET.php?entity=${entity}&fields=${field}`);
    
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
    
    const rqst = new Request( `${window.location.origin}/MS_3/API/${method}.php`, {
        method: method,
        body: JSON.stringify( {entity:entity, fields: fields})
    });

    const data = await fetcher( rqst);
    updates.forEach( u => UPDATE[u]( data, method, entity));
}

async function fetcher( rqst) {
    return await ( await fetch( rqst)).json();
}