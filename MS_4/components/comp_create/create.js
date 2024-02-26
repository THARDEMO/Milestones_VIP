import * as cManager from '../cManager.js'

export const componentCreate = {
    domID: 'inputFields',
    parentID: '#create',

    preRender: () => cManager.renderComponent( componentCreate ),
    render,
}

function render( DOM ) {

    const parendDOM = document.querySelector( '#create');
    // const DOM = document.createElement( 'div');

    DOM.innerHTML = `
       <input type="text" name="field" placeholder="Title: game or character"></input>
    `;

    const selection = document.createElement( 'select');
    for( let i = 0; i <= 10; i++ ) {
        selection.innerHTML += `<option name="rank" value="${i}">${i}</option>`;
    }

    DOM.append( selection);
    parendDOM.append( DOM);
}
