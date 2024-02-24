<?php
    require_once 'index.php';

    if( $request_method != 'GET')
    {
        send_JSON( 'Invalid Method', 405);
    }

    if( !isset( $_GET[ 'entity']) || !isset( $_GET[ 'fields'])) 
    {
        send_JSON( 'Missing Keys', 400);
    }

    $entity = $_GET[ 'entity'];
    $fields = $_GET[ 'fields'];

    $type_id = 'id';
    if( isset( $_GET['type_id'])) $type_id = $_GET['type_id'];
    
    $path = "./DB/$entity.json";
    if( !file_exists( $path)) 
    {
        send_JSON( 'Entity || Relation could not be found', 404);
    }

    $entity_data = get_file_data( $path);

    //CASE ALL 
    if( $fields == 'all')
    {
        array_shift( $entity_data);
        send_JSON( $entity_data);
    }

    $data = [];
    foreach( $entity_data as $instance) 
    {
        if( $instance[$type_id] != $fields) continue;
        if( isset($instance['password'])) unset( $instance['password']);
        $data[] = $instance;
    }

    if( count($data) == 1 ) send_JSON( $data[0]);
    if( count( $data)) send_JSON( $data);
    send_JSON( "ID: $fields IN: $entity was not found", 404);
?>