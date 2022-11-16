<?php

//variables, arrays,...


//recoger las peticiones
$entrada=file_get_contents('php://input');

//paso de JSON, cadena de texto, a variable de PHP
$entrada=json_decode($entrada);

//var_dump($entrada);
/*
let user2={ //objecte JS
      nom: name,
      curs: course  
    };
*/
$nom_user = $entrada->{'username'};
//var_dump($name);
$contra = $entrada->{'pwd'};
//var_dump($course);

$usuarios = array(
  "Arnau" => 456,
  "Pep" => 123,
);

$message="No registrado";
if(array_key_exists($nom_user,$usuarios)){
  if($usuarios[$nom_user]==$contra){
    $message = "Welcome Admin";
  };
}
echo json_encode($message)

// foreach($usuarios as $username => $password){
//   if ($username == $nom_user AND $password == $contra){
//     echo json_encode("Admin");
//     break;
//   }elseif($username == $nom_user AND $password == $contra){
//     echo json_encode("User");
//     break;
//   }else{
//     echo json_encode("No esta registrado");
//   }
// }

//codigo de PHP hago lo que sea y al final necesito
//enviar el siguiente array
// $array=["dawbio2", "daw2"];


//envio del resultado imprimiéndolo: variable PHP a JSON

?>