import { STATE } from '../../logic/state.js';
import { PubSub } from '../../logic/PubSub.js';

import { listingInstance } from './listingElement.js';
import { DELETE as deleteInstance } from './listingElement.js';


export async function render( parentID) {

    const DOM = document.createElement( 'div');
    DOM.classList.add( 'games');
    DOM.classList.add( 'listingCategory');

    document.getElementById( parentID ).append( DOM);

    DOM.innerHTML = `
        <h2>Games</h2>
    `;
    
    const gamesListing = document.createElement( 'ul');
    gamesListing.classList.add( 'listingContainer');
    gamesListing.id = 'games';
    DOM.append( gamesListing);


    const GAMES = await STATE.Get( 'games');
    GAMES.forEach( game => listingInstance( gamesListing.id, game));
}

function POST( instanceData ) { 
    listingInstance( 'games', instanceData);
}

function DELETE( ID ) {
    deleteInstance( 'games', ID )
}


PubSub.subscribe
({
    event: 'STATE::updated',
    listener: ( detail ) => {

        if( detail.entity != 'games') return;

        switch( detail.method) {
            case 'POST': return POST( detail.data);
            case 'DELETE': return DELETE( detail.data);
        }

    }
})

