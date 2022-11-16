<?php

$entrada=file_get_contents('php://input');

//paso de JSON, cadena de texto, a variable de PHP
$entrada=json_decode($entrada);
$registrados = array();

$username = $entrada->{'username'};
// var_dump($username);
$pwd = $entrada->{'pwd'};

$nom = $entrada->{'nom'};

$con = $entrada->{'pwd2'};

if(($username==true)&&($pwd==true)&&($pwd==$con)){
    array_push($registrados,$entrada);
    echo json_encode("Registrado $username");
}else{
    echo json_encode("Pon bien los campos");
};