
async function renderCharacters() {

    const parentDOM = document.querySelector( '#listings');

    const DOM = document.createElement( 'div');
    DOM.classList.add( 'characters');
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