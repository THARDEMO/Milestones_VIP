import * as STATE from '../../../appLogic/state.js';
import { PubSub } from '../../../appLogic/PubSub.js';
import * as cManager from '../../cManager.js'

export const component = {
    domID: 'compilerContainer',
    parentID: '#compiler',

    preRender: () => cManager.renderComponent( component ),
    render,
}

const entities = ['characters', 'games'];

async function render( DOM ) {

    const parendDOM = document.querySelector( component.parentID);
    parendDOM.innerHTML = '';

    let favourites = 0;
    for( const entity of entities) {
        
        const instances = await STATE.get( entity, 'all');
        instances.forEach( I => {
            if( I.favourite) favourites++
        })
        DOM.innerHTML += `<p class="${entity}">${entity}: <span>${instances.length}</span></p>`;
    }
    DOM.innerHTML += `<p>favourites: <span>${favourites}</span></p>`

    parendDOM.append( DOM);
}

async function update( data ) {
    const { entity, instance } = data;

    if( !entities.includes( entity)) return;

    const instanceDOM = document.querySelector( `#compiler > div .${entity} > span`);
    const instances = await STATE.get( entity, 'all');
    instanceDOM.textContent = instances.length;
}

PubSub.subscribe
({
    event: 'STATE::updated',
    listener: ( detail ) => update( detail )
});