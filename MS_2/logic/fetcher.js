
async function fetcher( rqst ) {
   
    try {
       const response = await fetch( rqst );
       if( response.ok ) {
 
          return await response.json();
       }
 
 
       const message = await response.json();
       
       return message;
    //    PubSub.publish
    //    ({
    //       event: 'ERROR::ReachServer',
    //       detail: {
    //          response: response,
    //          message: message,
    //       },
    //    })
       
 
    } catch (error) {
 
        console.log( error )
    //    PubSub.publish
    //    ({
    //       event: 'ERROR::fetcher',
    //       detail: error,
    //    });
 
    }
 }