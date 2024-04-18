import { STATE } from '../../logic/state.js';
import { PubSub } from '../../logic/PubSub.js';

import { listingInstance } from './listingElement.js';
import { DELETE as deleteInstance } from './listingElement.js';




export async function render( parentID ) {

    const DOM = document.createElement( 'div');
    DOM.classList.add( 'characters');
    DOM.classList.add( 'listingCategory');

    document.getElementById(parentID).append( DOM);

    DOM.innerHTML = `
        <h2>Characters</h2>
    `;

    const charactersListing = document.createElement( 'ul');
    charactersListing.classList.add( 'listingContainer');
    charactersListing.id = 'characters';
    DOM.append( charactersListing);

    const CHARACTERS = await STATE.Get( 'characters');
    CHARACTERS.forEach( character => listingInstance( charactersListing.id, character));
}

function POST( instanceData ) {
    listingInstance( 'characters', instanceData);
}

function DELETE( ID ) {
    deleteInstance( 'characters', ID )
}

PubSub.subscribe
({
    event: 'STATE::updated',
    listener: ( detail ) => {

        if( detail.entity != 'characters') return;

        switch( detail.method) {
            case 'POST': return POST( detail.data);
            case 'DELETE': return DELETE( detail.data);
        }

    }
})