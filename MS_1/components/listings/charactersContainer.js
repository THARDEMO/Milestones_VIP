function renderCharactersContainer( parentID ) {

    const DOM = document.createElement( 'div');
    DOM.classList.add( 'characters');
    DOM.classList.add( 'listingCategory');

    document.getElementById(parentID).append( DOM);

    DOM.innerHTML = `
        <h2>Characters</h2>
    `;

    const charactersListing = document.createElement( 'ul');
    charactersListing.classList.add( 'listingContainer');
    charactersListing.id = 'charactersListing';
    DOM.append( charactersListing);

    STATE['characters'].forEach( character => listingInstance( charactersListing.id, character));
}