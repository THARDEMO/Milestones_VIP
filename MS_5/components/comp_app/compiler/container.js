import * as cManager from '../../cManager.js';

export const component = {
    domID: 'compilerContainer',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render: ( selfDOM ) => selfDOM.id= 'compiler', 
}