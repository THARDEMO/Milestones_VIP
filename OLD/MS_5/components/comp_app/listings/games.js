import * as STATE from '../../../appLogic/state.js';
import { PubSub } from '../../../appLogic/PubSub.js';
import * as cManager from '../../cManager.js';

export const component = {
    domID: 'games',
    parentID: '#listings',

    preRender: () => cManager.renderComponent( component ),
    render,
}

async function render( DOM ) {
    const parentDOM = document.querySelector( component.parentID);

    // const DOM = document.createElement( 'div');
    // DOM.classList.add( 'games');
    DOM.classList.add( 'listingCategory');

    DOM.innerHTML = `
        <h2>Games</h2>
        <ul class="listingContainer"></ul>
    `

    parentDOM.append( DOM);
    
    const instances = await STATE.get( 'games', 'all');
    instances.forEach( game => renderGamesInstances( game ));
    
}


function renderGamesInstances( {id, title, rank, favorite} ) {

    const DOM = document.querySelector( '.games > .listingContainer');

    const instanceContainer = document.createElement( 'li');
    instanceContainer.dataset.instanceId = id;


    instanceContainer.innerHTML = `
        <div class="info"> 
            <p>${title}</p>
            <p>${rank}</p>
        </div>
    `;

    DOM.append( instanceContainer);

    // if( favorite) return;


    // const favoriteButton = document.createElement( 'button');
    // favoriteButton.textContent = 'add to favorites';

    

}

async function update( data ) {

    const { entity, instance } = data;

    if( entity != 'games') return;
    renderGamesInstances(await STATE.get( entity, instance));

}

PubSub.subscribe
({
    event: 'STATE::updated',
    listener: ( detail ) => update( detail)
})
