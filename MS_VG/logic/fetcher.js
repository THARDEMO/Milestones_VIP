
export async function fetcher( rqst ) {
   
    try {
       const response = await fetch( rqst );

       if( !response.ok) {
            window.alert( 'error');
            return false
       }
 
       const data = await response.json();
       
       return data;

    } catch (error) {

        console.log( error )
    }
 }