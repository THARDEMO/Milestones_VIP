
function listingInstance( parentID, instanceData) {
    
    const {id, title, rank, favourite} = instanceData;
    const instanceContainer = document.createElement( 'li');
    
    //ASSIGN SPECIFIC DATASET BASED ON ENTITY + ID
    instanceContainer.dataset.listingId = `${parentID}_${id}`

    instanceContainer.innerHTML = `
        <div class="info"> 
            <p>${title}</p>
            <p>${rank}</p>
        </div>
    `;
    
    //FAVOURITE BUTTON
    const favContainer = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
          favContainer.classList.add( 'favouriteStar');
          favContainer.setAttribute( 'height', 21)
          favContainer.setAttribute( 'width', 23)

    //IF FAV SET GOLDEN COLOR else SET GRAY COLOR      
    const starFill = favourite ? '#daa520' : '#00000045';
    //CREATE STAR
    const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path');
          path.setAttribute( 'fill', starFill);
          path.setAttribute( 'd', `M11.0245 0.463525C11.1741 0.00286954 11.8259 0.00287006 11.9755 0.463525L14.1942 7.2918C14.2611 7.49781 14.4531 7.63729 14.6697 7.63729H21.8494C22.3337 7.63729 22.5351 8.25709 22.1433 8.5418L16.3348 12.7619C16.1595 12.8892 16.0862 13.1149 16.1531 13.3209L18.3718 20.1492C18.5215 20.6098 17.9942 20.9929 17.6024 20.7082L11.7939 16.4881C11.6186 16.3608 11.3814 16.3608 11.2061 16.4881L5.39763 20.7082C5.00578 20.9929 4.47854 20.6098 4.62821 20.1492L6.84685 13.3209C6.91379 13.1149 6.84046 12.8892 6.66522 12.7619L0.856742 8.5418C0.464885 8.25709 0.666274 7.63729 1.15064 7.63729H8.3303C8.54692 7.63729 8.73889 7.49781 8.80583 7.2918L11.0245 0.463525Z`);     
    
    //ASSIGN CLICK EVENT
    favContainer.onclick = (e) => patchFavourite( parentID, id ) 
    favContainer.append( path);
    instanceContainer.append( favContainer)

    //DELETE BUTTON
    const deleteContainer = document.createElement( 'div');
    deleteContainer.classList.add( 'deleteListing');
    deleteContainer.onclick = () => deleteListingInstance( parentID, id);

    instanceContainer.append( deleteContainer);

    document.getElementById( parentID).append( instanceContainer);
}

function patchFavourite( entity, id ) {
    
    for( const row of STATE[entity]) {
        if( row.id != id) continue;

        //IF FALSE ASSIGN TRUE VICE VERSA
        row.favourite = row.favourite ? false : true;
    }

    STATE.renderApp();
}

function deleteListingInstance( entity, id) {

    for( const [ I, row ] of STATE[entity]?.entries() ) {
        if( row.id !== id) continue;

        //REMOVE ROW FROM ENITITY
        STATE[entity].splice( I, 1);
    }   

    STATE.renderApp();
}
