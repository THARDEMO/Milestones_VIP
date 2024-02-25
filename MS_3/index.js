// const components = [renderGames, renderCharacters, renderCreate, renderControls];

// components.forEach( component => component());

// state.renderUI();

const components = [componentGames, componentCharacters, componentCreate, componentControls, componentCompiler];
components.forEach( component => component.preRender());