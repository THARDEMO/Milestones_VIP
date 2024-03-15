const STATE = {
    games: [
        {
            id: 1,
            title: 'God Of War: Ragnarök',
            rank: 10,
            favourite: false,
        }
    ],
    characters: [
        {
            id: 1,
            title: 'Kratos of Sparta',
            rank: 10,
            favourite: true,
        }
    ],

    renderApp,
};

function renderApp() {
    //tömmer alla containers från DOM element för re-renders
   document.getElementById('wrapper').innerHTML = null;

    renderListingContainer( 'wrapper');
    renderCounterContainer( 'wrapper'); 
    renderCreateContainer( 'wrapper');
}