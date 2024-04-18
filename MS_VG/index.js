import { STATE } from './logic/state.js'

if( !localStorage.getItem( 'token')) {
    STATE.renderLogin();
} else {
    STATE.renderApp();
}

