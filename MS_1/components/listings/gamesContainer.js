function renderGamesContainer( parentID) {

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


    const GAMES = STATE.Get( 'games');
    GAMES.forEach( game => listingInstance( gamesListing.id, game));
}

function post_instance_GamesContainer( instanceData ) { 
    listingInstance( 'games', instanceData);
}

function delete_instance_GamesContainer( ID ) {
    delete_instance_listing( 'games', ID )
}


