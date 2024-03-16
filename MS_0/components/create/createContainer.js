function renderCreateContainer( parentID) {
    const DOM = document.createElement( 'section');
    DOM.id = 'create';

    document.getElementById( parentID).append( DOM);

    //RENDER CHILD COMPONENTS
    renderCreate( DOM.id);

    for( const instanceControl of ['games', 'characters']) {
        renderControl( DOM.id, instanceControl);
    }
}