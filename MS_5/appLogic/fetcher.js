import { PubSub } from "./PubSub.js";

export async function fetcher( rqst ) {
   
   const response = await fetch( rqst );
   if( response.ok ) {

      // const data = await response.json();
      return await response.json();
   }
   
   // return await fetcher( rqst);

   PubSub.publish
   ({
      event: 'ERROR::fetchingResource',
      detail: response,
   })

   console.log( console.log( response));
   
}