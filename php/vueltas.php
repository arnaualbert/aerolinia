<?php

// $contents = file_get_contents("php://input");

// $origins = array("Lunes a las 8:00","Lunes a las 17:00","Viernes a las 07:00","Viernes a las 19:30","Sabado a las 14:00");

$entrada=file_get_contents('php://input');

//paso de JSON, cadena de texto, a variable de PHP
$entrada=json_decode($entrada);

$salida = $entrada->{'nameday'};
//var_dump($name);

if($salida == "Mon"){
    $origins= array("Lunes a las 8:00","Lunes a las 17:00");
}elseif($salida == "Fri"){
    $origins= array("Viernes a las 07:00","Viernes a las 19:30");
}elseif($salida == "Sat"){
    $origins=array("Sabado a las 14:00");
}


echo json_encode($origins);
?>