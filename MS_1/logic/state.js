const _state = {
    games: [
        {
            id: 1,
            title: 'God Of War: Ragnarök',
            rank: 10,
            favourite: false,
        }
    ],
    characters: [
        {
            id: 1,
            title: 'Kratos of Sparta',
            rank: 10,
            favourite: true,
        }
    ],
}

const STATE = {
    Get,
    Post,
    Patch,
    Delete,

    renderApp
};

function renderApp() {
    renderListingContainer( 'wrapper');
    renderCounterContainer( 'wrapper'); 
    renderCreateContainer( 'wrapper');
}

function Get( entity ) {
    /*
        Send whole entity as a CLONE "by value !reference"
    */

    return JSON.parse(JSON.stringify( _state[entity]))

}

function Post( data ) {
    /*
        data = entity_name, fields, values
    */

    const { entity, row } = data;
    let ID = Math.max( ..._state[entity].map( row => row.id)) + 1;
    //DÅLIG KOD -- fix     
    if( ID === -Infinity ) ID = 0;

    row.id = ID;
    _state[entity].push( row);

    const instanceData = JSON.parse(JSON.stringify(_state[entity].find( r => r.id === ID)));

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

function Patch( data ) {
    /*
        data = entity_name, id, field, value.
    */

    const { entity, ID, field, value } = data;

    for( const row of _state[entity]) {
        if( row.id != ID) continue;
        row[field] = value;
    }

    const instanceData = JSON.parse(JSON.stringify(_state[entity].find( r => r.id === ID)));

    patch_instance_listing( entity, instanceData);
    updateCounter();
}

function Delete( data ) {;
    /*
        data = entity_name, id
    */

    const { entity, ID } = data;

    for( const [ I, row ] of _state[entity]?.entries() ) {
        if( row.id !== ID) continue;

        //REMOVE ROW FROM ENITITY
        _state[entity].splice( I, 1);
    }   


    switch( entity) {
        case 'games':
            delete_instance_GamesContainer( ID )
            break;
        case 'characters':
            delete_instance_CharactersContainer( ID )
            break;
    }
    updateCounter();
}