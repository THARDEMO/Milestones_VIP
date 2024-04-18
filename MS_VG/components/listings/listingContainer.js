import * as CharactersContainer from './charactersContainer.js';
import * as GamesContainer from './gamesContainer.js';


export function render( parentID) {
    const DOM = document.createElement( 'section');
    DOM.id = 'listings';
    document.getElementById( parentID).append( DOM);

    GamesContainer.render( DOM.id );
    CharactersContainer.render( DOM.id );
}