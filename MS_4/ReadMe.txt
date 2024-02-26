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

API 
    - FIELDS & ENTITIES
    - Fetcher funktion :: centraliserad fetcher ( 1 fetch )
    - Sebbes U1 || entities.php