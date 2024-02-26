import * as cManager from '../cManager.js';

export const component = {
    domID: 'page404',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

function render( selfDOM ) {

    selfDOM.textContent = 'This page does not exist: 404';
}