import * as cManager from '../../cManager.js';

export const component = {
    domID: 'createContainer',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render: ( selfDOM ) => selfDOM.id = 'create', 
}