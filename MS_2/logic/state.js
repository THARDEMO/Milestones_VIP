const _state = {}

const STATE = {
    Get,
    Post,
    Patch,
    Delete,

    token: () => localStorage.getItem( 'token'),

    renderApp,
    renderLogin
}

async function Get( entity ) {
    /*
        Send whole entity as a CLONE "by value !reference"
    */

    return JSON.parse(JSON.stringify( _state[entity]))

}

async function Post( entity, rqst ) {

    const response = await fetcher( rqst );
    delete response.token;

    _state[entity].push( response);

    const instanceData = JSON.parse(JSON.stringify(_state[entity].find( r => r.id === response.id)));

    switch( entity) {
        case 'games': 
            post_instance_GamesContainer( instanceData );
            break;
        case 'characters': 
            post_instance_CharactersContainer( instanceData );
            break;
    }


    updateCounter();
    //TODO counter!!!
}

async function Patch( entity, rqst ) {

    const response = await fetcher( rqst);

    const index = _state[entity].indexOf( row => row.id === response.id);
    _state[entity].splice( index, 1);
    _state[entity].splice( index, 0, response);

    const instanceData = JSON.parse(JSON.stringify(_state[entity].find( r => r.id === response.id)));

    patch_instance_listing( entity, instanceData);
    updateCounter();
}

async function Delete( entity, rqst ) {;

    const response = await fetcher( rqst);

    for( const [ I, row ] of _state[entity]?.entries() ) {
        if( row.id !== response.id) continue;

        //REMOVE ROW FROM ENITITY
        _state[entity].splice( I, 1);
    }   

    switch( entity) {
        case 'games':
            delete_instance_GamesContainer( response.id )
            break;
        case 'characters':
            delete_instance_CharactersContainer( response.id )
            break;
    }
    updateCounter();
}


async function renderApp() {

    for( const entity of ['games', 'characters']) {

        const rqst = new Request( `./api/${entity}.php?token=${STATE.token()}`);
        const entityData = await fetcher( rqst);
        _state[entity] = entityData;

    }

    renderListingContainer( 'wrapper');
    renderCounterContainer( 'wrapper'); 
    renderCreateContainer( 'wrapper');
}

function renderLogin() {
    renderLoginContainer( 'wrapper');
}