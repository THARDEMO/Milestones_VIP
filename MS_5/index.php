<?php
    $ignore_files = [".DS_Store", ".", "..", "cManager.js"];
    
    $path = "./components";
    $components_dir = array_diff(scandir($path), $ignore_files);

    function importStyles() 
    {
        global $components_dir;
        global $path;
        global $ignore_files;
        foreach( $components_dir as $component_dir) 
        {
            $files = array_diff( scandir( "$path/$component_dir"), $ignore_files);
            foreach( $files as $potential_style) 
            {
                if( !checkExtention('css', "$path/$component_dir/$potential_style")) continue;
                echo "<link rel='stylesheet' href='$path/$component_dir/$potential_style'>";
            }
        }

    }

    function checkExtention( $type, $path) 
    {
        $ext = pathinfo("$path", PATHINFO_EXTENSION);
        if( $ext != $type) return false;
        return true;
    }
?>

<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MS_5</title>
        <link rel="stylesheet" href="./index.css">
        <?php echo importStyles() ?>
    </head>

    <body>
        <main id="wrapper">
            <!-- <section id="create"></section>
            <section id="compiler"></section>
            <section id="listings"></section> -->
        </main>

        <script type="module">
            // import { viewManager } from './appLogic/viewManager.js';

            // viewManager();

            let COMPONENTS = [];
            <?php 
                    
                $URL = $_SERVER['REQUEST_URI'];
                $view = ltrim(parse_url($URL, PHP_URL_PATH), "/");  
                
                addComponents( $path, "comp_app"); //SAME HERE
                // if( file_exists( "$path/MS_5/comp_$view")) //BASED ON VIEW IF MULTIPAGE APP
                // {
                //     addComponents( $path, "comp_$view"); //SAME HERE
                // }
                // else 
                // {
                //     echo "COMPONENTS.push('$path/404/404.js'); \n";
                // }

                function addComponents( $path, $current_dir)
                {
                    global $ignore_files;

                    $components = array_diff( scandir( "$path/$current_dir"), $ignore_files);

                    foreach( $components as $component) 
                    {    
                        $comp_path = "$path/$current_dir";
                        
                        if( is_dir("$comp_path/$component")) addComponents( $comp_path, $component);
                        
                        if( !checkExtention( 'js', "$comp_path/$component")) continue;

                        echo "COMPONENTS.push('$comp_path/$component'); \n";
                    }
                }
            ?>

            Promise.all( COMPONENTS.map( comp => import( comp)) )
            .then( components => components.forEach( module => {

                    if( !module.component) return

                    module.component.preRender();
            }));

        </script>
    </body>
</html>