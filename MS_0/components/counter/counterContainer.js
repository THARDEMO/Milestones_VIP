function renderCounterContainer( parentID ) {

    const DOM = document.createElement( 'section');
    DOM.id = 'compiler';
    document.getElementById( parentID).append( DOM);

    let favourites = [];
    for( const entity in STATE) {
        if( typeof STATE[entity] === 'function') continue //SKIPS METHODS IN STATE

        //COUNT NR FAVOURITES
        STATE[entity].forEach( instance => { 
            if( instance.favourite) favourites.push(1);
        })

        renderCounterInstance( DOM.id, STATE[entity], entity);
    }
    renderCounterInstance( DOM.id, favourites, 'favourites');
}