
async function renderGames() {
    const parentDOM = document.querySelector( '#listings');

    const DOM = document.createElement( 'div');
    DOM.classList.add( 'games');
    DOM.classList.add( 'listingCategory');

    DOM.innerHTML = `
        <h2>Games</h2>
        <ul class="listingContainer"></ul>
    `

    parentDOM.append( DOM);
    
    const instances = await state.get( 'games', 'all');
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

UPDATE['games'] = async ( data, method ) => {

    switch( method) {
        case 'POST': {
            renderGamesInstances(await state.get( 'games', data));
        }
            
    }

}