
const componentCompiler = {
    domID: 'compilerContainer',
    parentID: '#compiler',

    preRender: () => cManager.renderComponent( componentCompiler ),
    render: ( DOM ) => renderCompiler( DOM ),
}

async function renderCompiler( DOM ) {

    const parendDOM = document.querySelector( componentCompiler.parentID);
    parendDOM.innerHTML = '';

    let entities = [ 'games', 'characters'];

    let favourites = 0;
    for( const entity of entities) {
        
        const instances = await state.get( entity, 'all');
        instances.forEach( I => {
            if( I.favourite) favourites++
        })
        DOM.innerHTML += `<p class="${entity}">${entity}: <span>${instances.length}</span></p>`;
    }
    DOM.innerHTML += `<p>favourites: <span>${favourites}</span></p>`

    parendDOM.append( DOM);

}

UPDATE['compiler'] = async (data, method, entity) => {

    const instanceDOM = document.querySelector( `#compiler > div .${entity} > span`);
    const instances = await state.get( entity, 'all');
    instanceDOM.textContent = instances.length;
};