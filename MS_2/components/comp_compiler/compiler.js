

function renderCompiler() {

    const parendDOM = document.querySelector( '#compiler');
    const DOM = document.createElement( 'div');
    let entities 

    let favourites = 0;
    for( const key in STATE) {
        if( typeof STATE[key] === 'function') continue

        STATE[key].forEach( instance => { 
            if( instance.favourite) favourites++;
        })

        DOM.innerHTML += `<p>${key}: <span>${STATE[key].length}</span></p>`;
    }
    DOM.innerHTML += `<p>favourites: <span>${favourites}</span></p>`

    parendDOM.append( DOM);

}

UPDATE['compiler'] = () => {
    console.log( 'compiler')
}