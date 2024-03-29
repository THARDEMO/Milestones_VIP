

function renderControl( parentID, instanceData) {

    const parentDOM = document.getElementById( parentID);
    const buttonContent = instanceData;

    const button = document.createElement( 'button');
    button.textContent = buttonContent;
    button.dataset.type = buttonContent;
    button.classList.add( buttonContent)

    //ON CLICK PUSH NEW INSTANCE TO STATE
    button.onclick = ( e ) => addState( e )

    parentDOM.append(button);
}

function addState( e ) {

    const target = e.target.dataset['type'];
    const textContent = document.querySelector( 'input[name="field"]').value;
    const rank = document.querySelector( 'select').value;

    //IF NOTHING HAS BEEN WRITTEN ABORT
    if( !textContent) return;
    
    //EXTRACTS HIGHEST CURRENT ID + 1
    let ID = Math.max(...STATE[target].map( e => e.id)) + 1;

    STATE[target].push({
        id: ID,
        title: textContent,
        rank: +rank,
        favorite: false,
    });

    STATE.renderApp()
}
