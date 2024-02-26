import * as cManager from '../../cManager.js';

export const component = {
    domID: 'listingsContainer',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render: ( selfDOM ) => selfDOM.id = 'listings', 
}