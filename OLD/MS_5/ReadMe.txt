SPECIFICATIONS:

COMPONENTS 
    - Egen Mapp
    - Egen render funtion
    - Egen Update_function
    - Component Manager

    VG
    - import / export

STATE
    - global variable state = { ... } 
    - entities + fields => kopplat till API
    - Update_STATE
    - Get_STATE => CLONE

    VG
    - STATE::updated - kopplat till pubsub

Intern Kommunikation 
    - render från STATE & components
    
    VG
    - PubSub ( publish & subscribe pattern )
    - Fetch_Manager

API 
    - FIELDS & ENTITIES
    - Fetcher funktion :: centraliserad fetcher ( 1 fetch )
    - Abstraherad backend - GET.php / POST.php / PATCH.php osv

DJUPARE LÄRANDE
    - index.php ( ansvarar för att importera components och kalla på component.prerender() )