function renderGamesContainer( parentID) {

    const DOM = document.createElement( 'div');
    DOM.classList.add( 'games');
    DOM.classList.add( 'listingCategory');

    document.getElementById( parentID ).append( DOM);

    DOM.innerHTML = `
        <h2>GAMES</h2>
    `;
    
    const gamesListing = document.createElement( 'ul');
    gamesListing.classList.add( 'listingContainer');
    gamesListing.id = 'games';
    DOM.append( gamesListing);

    STATE['games'].forEach( game => listingInstance( gamesListing.id, game));

}