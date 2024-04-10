
function renderListingContainer( parentID) {
    const DOM = document.createElement( 'section');
    DOM.id = 'listings';
    document.getElementById( parentID).append( DOM);

    renderGamesContainer( DOM.id );
    renderCharactersContainer( DOM.id );
}