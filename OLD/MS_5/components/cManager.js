const queue = {};

export function renderComponent(component, instance) {
    
    const { domID, elementType = 'div', parentID = 'main'} = component;
    let container = document.querySelector( parentID);
    
    if( !container) return QueueComponent( component, instance);
    
    const DOM = document.createElement( elementType);
    DOM.classList.add( domID);

    component.render( DOM, instance);
    container.append( DOM);

    resolveQueue();
}


//MAYBE RENDER DOM FIRST THEN QUE
function QueueComponent( component, instance) {
    const queuedComponent = {
        component: component,
        instance: instance,
    }

    if( !queue[component.parentID]) queue[component.parentID] = [ queuedComponent ];
    else queue[component.parentID] = [ ...queue[component.parentID], queuedComponent ];
}

function resolveQueue() {
    
    for( const container in queue) {
    
        if( !document.querySelector( container)) continue;
        
        for( const [ I, C ] of queue[container].entries()) {
            
            queue[container].splice(I, 1);
            if( !queue[container].length) delete queue[container];

            renderComponent( C.component, C.instance);
        }
    }

}