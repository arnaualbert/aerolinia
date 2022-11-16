<?php

$entrada=file_get_contents('php://input');

$entrada=json_decode($entrada);

$origen = $entrada->{'origen'};

$destino = $entrada->{'destino'};

$salida = $entrada->{'salida'};

$vuelta = $entrada->{'vuelta'};

$pasajeros = $entrada->{'pasajeros'};

const vuelos = [
  ["from" => "Barcelona","to" => "Valencia", "duracion" => "57min","precio"=> 40],
  ["from" => "Barcelona", "to" => "Madrid", "duracion" => "1h 7min","precio"=> 55],
  ["from" => "Madrid","to" => "Barcelona", "duracion" => "1h 7min","precio"=> 55],
  ["from" => "Madrid","to" => "Valencia", "duracion" => "52min","precio"=> 52],
  ["from" => "Valencia","to" => "Madrid", "duracion" => "1h 7min","precio"=> 55],
  ["from" => "Valencia","to" => "Barcelona", "duracion" => "57min","precio"=> 40],
];

// const vuelos = [
//   ["from" => "0", "to" => "1", "duracion" => "1h 7min","precio"=> 55],
//   ["from" => "0","to" => "2", "duracion" => "57min","precio"=> 40],

//   ["from" => "1","to" => "0", "duracion" => "1h 7min","precio"=> 55],
//   ["from" => "1","to" => "2", "duracion" => "52min","precio"=> 52],

//   ["from" => "2","to" => "1", "duracion" => "1h 7min","precio"=> 55],
//   ["from" => "2","to" => "0", "duracion" => "57min","precio"=> 40],
// ];



function classification($origen,$destino,$pasajeros): string{
  $resultado = "";
  foreach(vuelos as $element){
      if (($origen == $element["from"]) AND ($destino == $element['to'])){
          $resultado = "La duracion del vuelo es ".$element['duracion'] ." y su precio ". $element['precio']*$pasajeros. "€";
      }
  }
  return $resultado;
  //echo json_encode($resultado);
};
$resp = classification($origen,$destino,$pasajeros);
echo json_encode($resp);
?>