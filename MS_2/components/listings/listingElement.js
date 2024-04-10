function getDomId( parentID, ID) {
    return `${parentID}_${ID}`
}

function listingInstance( parentID, instanceData) {
    
    const entity = parentID;
    const {id, name, rating, favorite} = instanceData;
    const instanceContainer = document.createElement( 'li');
    
    //ASSIGN SPECIFIC DATASET BASED ON ENTITY + ID
    instanceContainer.id = `${parentID}_${id}`

    instanceContainer.innerHTML = `
        <div class="info"> 
            <p>${name}</p>
            <p>${rating}</p>
        </div>
    `;
    
    const favContainer = createStar( favorite );
    instanceContainer.append( favContainer)

    const deleteContainer = document.createElement( 'div');
    deleteContainer.classList.add( 'deleteListing');
    instanceContainer.append( deleteContainer);


    favContainer.onclick = () => {
        const bool = favContainer.dataset.favourite == 'true' ? false : true;
    
        const patchRequest = new Request( `./api/${entity}.php`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: STATE.token(),
                id: id,
                favorite: bool,
            })
        }) 

        STATE.Patch( entity, patchRequest ); 
    };
    deleteContainer.onclick = () => {

        const deleteRequest = new Request( `./api/${entity}.php`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: STATE.token(),
                id: id,
            })
        })

        STATE.Delete( entity, deleteRequest);
    };

    document.getElementById( parentID).append( instanceContainer);
}

function createStar( favourite ) {

    const favContainer = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
    favContainer.classList.add( 'favouriteStar');
    favContainer.setAttribute( 'height', 21)
    favContainer.setAttribute( 'width', 23)

    //IF FAV SET GOLDEN COLOR else SET GRAY COLOR      
    const starFill = favourite ? '#daa520' : '#00000045';
    favContainer.dataset.favourite = favourite;
    //CREATE STAR
    const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path');
        path.setAttribute( 'fill', starFill);
        path.setAttribute( 'd', `M11.0245 0.463525C11.1741 0.00286954 11.8259 0.00287006 11.9755 0.463525L14.1942 7.2918C14.2611 7.49781 14.4531 7.63729 14.6697 7.63729H21.8494C22.3337 7.63729 22.5351 8.25709 22.1433 8.5418L16.3348 12.7619C16.1595 12.8892 16.0862 13.1149 16.1531 13.3209L18.3718 20.1492C18.5215 20.6098 17.9942 20.9929 17.6024 20.7082L11.7939 16.4881C11.6186 16.3608 11.3814 16.3608 11.2061 16.4881L5.39763 20.7082C5.00578 20.9929 4.47854 20.6098 4.62821 20.1492L6.84685 13.3209C6.91379 13.1149 6.84046 12.8892 6.66522 12.7619L0.856742 8.5418C0.464885 8.25709 0.666274 7.63729 1.15064 7.63729H8.3303C8.54692 7.63729 8.73889 7.49781 8.80583 7.2918L11.0245 0.463525Z`);     

    favContainer.append( path);

    return favContainer;

}

function patch_instance_listing( entity, instanceData ) {

    const instanceId = getDomId( entity, instanceData.id );
    const listingInstance = document.getElementById( instanceId);


    const starFill = instanceData.favorite ? '#daa520' : '#00000045';
    listingInstance.querySelector( '.favouriteStar').dataset.favourite = instanceData.favorite;
    listingInstance.querySelector( '.favouriteStar path').setAttribute( 'fill', starFill)
}

function delete_instance_listing( parentID, ID) {
    document.getElementById( getDomId(parentID, ID)).remove();
}