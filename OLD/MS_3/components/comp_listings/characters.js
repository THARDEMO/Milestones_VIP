
const componentCharacters = {
    domID: 'characters',
    parentID: '#listings',

    preRender: () => cManager.renderComponent( componentCharacters ),
    render: ( DOM ) => renderCharacters( DOM ),
}

async function renderCharacters( DOM ) {

    const parentDOM = document.querySelector( '#listings');
    DOM.classList.add( 'listingCategory');

    DOM.innerHTML = `
        <h2>Characters</h2>
        <ul class="listingContainer"></ul>
    `

    parentDOM.append( DOM);

    const instances = await state.get( 'characters', 'all');

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

UPDATE['characters'] = async ( data, method ) => {

    switch( method) {
        case 'POST': {
            renderCharacterInstances(await state.get( 'characters', data));
        }
            
    }

}