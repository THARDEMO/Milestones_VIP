import { PubSub } from './PubSub.js';
import { fetcher } from './fetcher.js';

//COMPONENTS 
import * as ListingContainer from '../components/listings/listingContainer.js';
import * as CounterContainer from '../components/counter/counterContainer.js';
import * as CreateContainer from '../components/create/createContainer.js';

const _state = {}

export const STATE = {
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
    if(!response) return
    
    delete response.token;

    _state[entity].push( response);

    const instanceData = JSON.parse(JSON.stringify(_state[entity].find( r => r.id === response.id)));

    PubSub.publish
    ({
        event: 'STATE::updated',
        detail: {entity: entity, method: 'POST', data: instanceData}
    })
}

async function Patch( entity, rqst ) {

    const response = await fetcher( rqst);
    if(!response) return

    const index = _state[entity].indexOf( row => row.id === response.id);
    
    _state[entity].splice( index, 1);
    _state[entity].splice( index, 0, response);

    const instanceData = JSON.parse(JSON.stringify(_state[entity].find( r => r.id === response.id)));

    PubSub.publish
    ({
        event: 'STATE::updated',
        detail: {entity: entity, method: 'PATCH', data: instanceData}
    })

}

async function Delete( entity, rqst ) {;

    const response = await fetcher( rqst);

    if(!response) return

    for( const [ I, row ] of _state[entity]?.entries() ) {
        if( row.id !== response.id) continue;

        _state[entity].splice( I, 1);
    }   

    PubSub.publish
    ({
        event: 'STATE::updated',
        detail: {entity: entity, method: 'DELETE', data: response.id}
    })

}


async function renderApp() {

    for( const entity of ['games', 'characters']) {

        const rqst = new Request( `./api/${entity}.php?token=${STATE.token()}`);
        const entityData = await fetcher( rqst);
        _state[entity] = entityData;

    }
    
    ListingContainer.render( 'wrapper');
    CounterContainer.render( 'wrapper'); 
    CreateContainer.render( 'wrapper');
}

function renderLogin() {
    renderLoginContainer( 'wrapper');
}