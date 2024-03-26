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
    charactersListing.id = 'characters';
    DOM.append( charactersListing);

    const CHARACTERS = STATE.Get( 'characters');
    CHARACTERS.forEach( character => listingInstance( charactersListing.id, character));
}

function post_instance_CharactersContainer( instanceData ) {
    listingInstance( 'characters', instanceData);
}

function delete_instance_CharactersContainer( ID ) {
    delete_instance_listing( 'characters', ID )
}