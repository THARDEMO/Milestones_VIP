import * as STATE from '../../../appLogic/state.js';
import { PubSub } from '../../../appLogic/PubSub.js';
import * as cManager from '../../cManager.js'

export const component = {
    domID: 'characters',
    parentID: '#listings',

    preRender: () => cManager.renderComponent( component ),
    render,
}

async function render( DOM ) {

    const parentDOM = document.querySelector( component.parentID);
    DOM.classList.add( 'listingCategory');

    DOM.innerHTML = `
        <h2>Characters</h2>
        <ul class="listingContainer"></ul>
    `

    parentDOM.append( DOM);

    const instances = await STATE.get( 'characters', 'all');

    instances.forEach( game => renderCharacterInstances( game ));

}

function renderCharacterInstances( {id, title, rank, favorite} ) {

    const DOM = document.querySelector( '.characters > .listingContainer');

    const instanceContainer = document.createElement( 'li');
    instanceContainer.dataset.instanceId = id;


    instanceContainer.innerHTML = `
        <div class="info"> 
            <p>${title}</p>
            <p>${rank}</p>
        </div>
    `;

    DOM.append( instanceContainer);
}

async function update( data ) {

    const { entity, instance } = data;

    //CONTINUE HERE
    //RENDER UPDATE ONLY ONE 
    if( entity != 'characters') return;
    renderCharacterInstances(await STATE.get( entity, instance));

}


PubSub.subscribe
({
    event: 'STATE::updated',
    listener: ( detail ) => update( detail)
})
