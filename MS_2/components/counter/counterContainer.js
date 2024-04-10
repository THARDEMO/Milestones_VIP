function renderCounterContainer( parentID ) {

    const DOM = document.createElement( 'section');
    DOM.id = 'compiler';
    document.getElementById( parentID).append( DOM);
    renderCounterInstances( DOM)
}

async function renderCounterInstances( DOM ) {
    let favourites = [];
    for( const entityName of ['games', 'characters']) {
        const entity = await STATE.Get( entityName);

        entity.forEach( e => {if( e.favorite) favourites.push( 1)});
        renderCounterInstance( DOM.id, entity, entityName);
    }
    
    renderCounterInstance( DOM.id, favourites, 'favourites');
}

function updateCounter() {
    const counterDOM = document.getElementById( 'compiler');
    counterDOM.innerHTML = null;
    renderCounterInstances( counterDOM)
}

