function renderCounterContainer( parentID ) {

    const DOM = document.createElement( 'section');
    DOM.id = 'compiler';
    document.getElementById( parentID).append( DOM);
    renderCounterInstances( DOM)
}

function renderCounterInstances( DOM ) {
    let favourites = [];
    for( const entityName of ['games', 'characters']) {
        const entity = STATE.Get( entityName);

        entity.forEach( e => {if( e.favourite) favourites.push( 1)});
        renderCounterInstance( DOM.id, entity, entityName);
    }
    
    renderCounterInstance( DOM.id, favourites, 'favourites');
}

function updateCounter() {
    const counterDOM = document.getElementById( 'compiler');
    counterDOM.innerHTML = null;
    renderCounterInstances( counterDOM)
}