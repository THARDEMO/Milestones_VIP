
function renderCharacters() {

    const parentDOM = document.querySelector( '#listings');

    const DOM = document.createElement( 'div');
    DOM.classList.add( 'characters');
    DOM.classList.add( 'listingCategory');


    DOM.innerHTML = `
        <h2>Characters</h2>
        <ul class="listingContainer"></ul>
    `

    parentDOM.append( DOM);

    STATE['characters'].forEach( game => renderCharacterInstances( game ));

}


function renderCharacterInstances( {title, rank, favorite} ) {

    const DOM = document.querySelector( '.characters > .listingContainer');

    const instanceContainer = document.createElement( 'li');


    instanceContainer.innerHTML = `
        <div class="info"> 
            <p>${title}</p>
            <p>${rank}</p>
        </div>
    `;

    DOM.append( instanceContainer);

    // if( favorite) return;


    // const favoriteButton = document.createElement( 'button');
    // favoriteButton.textContent = 'add to favorites';

    

}
