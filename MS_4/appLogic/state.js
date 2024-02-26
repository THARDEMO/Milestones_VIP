import { PubSub } from "./PubSub.js";
import { fetcher } from "./fetcher.js";

//STATE VAR -- collection of data on page
const STATE = {};
//update functions are saved here to be accesed on STATE.update()
const UPDATE = {};
// Path to functions //SIMULATE IMPORT/EXPORT 
// const state = {
//     get,
//     update,
// }

export async function get( entity, field, type_id = null) {
    const rqst = new Request( `${window.location.origin}/MS_4/API/GET.php?entity=${entity}&fields=${field}`);
    
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
    return( await get( entity, field));
    
}

export async function update( entity, fields = [], method = 'POST', updates = []) {
    
    const rqst = new Request( `${window.location.origin}/MS_4/API/${method}.php`, {
        method: method,
        body: JSON.stringify( {entity:entity, fields: fields})
    });

    const data = await fetcher( rqst);
    // updates.forEach( u => UPDATE[u]( data, method, entity));
    PubSub.publish
    ({
        event: 'STATE::updated',
        detail: {entity: entity, instance: data}
    });
}

