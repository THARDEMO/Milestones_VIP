<?php
    require_once 'index.php';

    if( $request_method != 'POST')
    {
        send_JSON( 'Invalid Method', 405);
    }

    if( !isset( $request_data[ 'entity']) || !isset( $request_data[ 'fields'])) 
    {
        send_JSON( 'Missing Keys', 400);
    }

    $entity = $request_data[ 'entity'];
    $fields = $request_data[ 'fields'];

    $path = "./DB/$entity.json";
    if( !file_exists( $path)) 
    {
        send_JSON( 'Entity || Relation could not be found', 404);
    }

    $entity_data = get_file_data( $path);

    $latest_id = end($entity_data)['id'];
    $id = $latest_id + 1;
    
    $obligatory_keys = array_keys($entity_data[0]);
    $instance = [
        "id" => $id
    ];
    foreach( $fields as $field) 
    {
        $current_field = key($field);

        if( !in_array($current_field, $obligatory_keys)) 
        {
            send_JSON( "field: $current_field is not allowed", 400);
        }

        $instance[$current_field] = $field[ $current_field];
    }
    
    $entity_data[] = $instance;
    
    if( !save_file_data($path, $entity_data))
    {
        send_JSON( 'Coulndt save Entity', 500);
    }

    send_JSON( $id);

?>
