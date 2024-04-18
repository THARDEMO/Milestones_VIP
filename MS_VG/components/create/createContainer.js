import * as Create from './create.js';
import * as Control from "./controls.js";

export function render( parentID) {
    const DOM = document.createElement( 'section');
    DOM.id = 'create';

    document.getElementById( parentID).append( DOM);

    //RENDER CHILD COMPONENTS
    Create.render( DOM.id);

    for( const instanceControl of ['games', 'characters']) {
        Control.render( DOM.id, instanceControl);
    }
}