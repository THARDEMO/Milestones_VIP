import * as STATE from '../../appLogic/state.js';
import { PubSub } from '../../appLogic/PubSub.js';
import * as cManager from '../cManager.js'

export const componentControls = {
    domID: 'buttonContainer',
    parentID: '#create',

    preRender: () => cManager.renderComponent( componentControls ),
    render,
}

function render( DOM ) {

    const parentDOM = document.querySelector( componentControls.parentID);
    const buttons = ['games', 'characters'];

    for( const buttonContent of buttons) {
        
        const button = document.createElement( 'button');
        button.textContent = buttonContent;
        button.dataset.type = buttonContent;
        button.classList.add( buttonContent)


        button.onclick = ( e ) => pushToState( e )

        parentDOM.append(button);
    }
}

function pushToState( e ) {

    const target = e.target.dataset['type'];
    const textContent = document.querySelector( 'input[name="field"]').value;
    const rank = document.querySelector( 'select').value;

    if( !textContent) return;    

    STATE.update( target, [{title: textContent}, {rank: rank}, {favourite: false}], 'POST', [target, 'compiler']);
}