
function renderLoginContainer( parentID) {


    const parentDOM = document.getElementById( parentID);

    parentDOM.innerHTML = `
        <section id="login">
            <form>
                <label for="name">name</label>
                <input type="text" id="name"></input>

                <label for="password">Password</label>
                <input type="password" id="password"></input>
                
                <div>
                    <button class="login">login</button>
                    <button class="register">register</button>
                </div>
            </form>
        </section>

    `

    //LOGIN
    parentDOM.querySelector( '.login').onclick = async( e ) => {
        e.preventDefault();

        const name = parentDOM.querySelector( '#name').value;
        const password = parentDOM.querySelector( '#password').value;

        const registerRequest = new Request( './api/login.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                password: password
            }),
        });

        const data = await fetcher( registerRequest);

        if( data.error ) {
            window.alert( `${data.error}`)
        }

        localStorage.setItem( 'token', data.token);
        location.reload();

    } 

    //REGISTER
    parentDOM.querySelector( '.register').onclick = async( e ) => {
        e.preventDefault();

        const name = parentDOM.querySelector( '#name').value;
        const password = parentDOM.querySelector( '#password').value;

        const registerRequest = new Request( './api/users.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                password: password
            }),
        });


        const data = await fetcher( registerRequest);

        if( !data.error ) {
            window.alert( `successful registration ${data.name}`)
        }

        console.log( data);

    } 
}