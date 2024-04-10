if( !localStorage.getItem( 'token')) {
    STATE.renderLogin();
} else {
    STATE.renderApp();
}
