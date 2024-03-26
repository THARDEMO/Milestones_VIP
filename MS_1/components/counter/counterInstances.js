function renderCounterInstance( parent_id, instanceData, entity) {
    
    const DOM = document.getElementById(parent_id);
    DOM.innerHTML += `<p>${entity}: <span>${instanceData.length}</span></p>`;
}