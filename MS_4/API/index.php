<?php
    require_once 'functions.php';

    $request_method = $_SERVER[ "REQUEST_METHOD"];

    //CORS error
    if( $request_method == "OPTIONS") 
    {
        header( "Access-Control-Allow-Origin: *");
        header( "Access-Control-Allow-Headers: *");
        header( "Access-Control-Allow-Methods: *");
        exit();
    }
    else 
    {
        header( "Access-Control-Allow-Origin: *");
    }

    $allowed_methods = [ "GET","POST", "PATCH", "DELETE"];
    //Checks if the HTTP method is allowed
    if( !in_array($request_method, $allowed_methods)) 
    {
        $message = [ "message" => "Error, invalid HTTP method."];
        send_JSON( $message, 405);
    }

    // Allowed Content-Type
    if( isset( $_SERVER[ "CONTENT-TYPE"])) 
    {
        if( !$_SERVER = "application/json") 
        {
            $message = [ "message" => "Error, invalid content type."];
            send_JSON( $message, 415);          
        }
    }

    // POST PATCH && DELETE DATA
    $request_JSON = file_get_contents( "php://input");
    $request_data = json_decode( $request_JSON, true);

    // GLOBALS
    $ignore_files = [".DS_Store", ".", ".."];
?>