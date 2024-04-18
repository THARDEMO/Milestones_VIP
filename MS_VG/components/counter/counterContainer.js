import { STATE } from '../../logic/state.js';
import { PubSub } from '../../logic/PubSub.js';

import * as CounterInstance from './counterInstances.js';

export function render( parentID ) {

    const DOM = document.createElement( 'section');
    DOM.id = 'compiler';
    document.getElementById( parentID).append( DOM);
    renderCounterInstances( DOM)
}

async function renderCounterInstances( DOM ) {
    let favourites = [];
    for( const entityName of ['games', 'characters']) {
        const entity = await STATE.Get( entityName);

        entity.forEach( e => {if( e.favorite) favourites.push( 1)});
        CounterInstance.render( DOM.id, entity, entityName);
    }
    
    CounterInstance.render( DOM.id, favourites, 'favourites');
}

function updateCounter() {
    const counterDOM = document.getElementById( 'compiler');
    counterDOM.innerHTML = null;
    renderCounterInstances( counterDOM)
}

PubSub.subscribe
({
    event: 'STATE::updated',
    listener: ( detail ) => updateCounter()
})
