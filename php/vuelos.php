<?php

$contents = file_get_contents("php://input");

$origins = array("Barcelona","Madrid","Valencia");

echo json_encode($origins);
?>