<?php
// Lee los datos enviados por la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Lee los datos del archivo JSON
$json = file_get_contents('datos.json');
$datos = json_decode($json, true);

// Actualiza los datos del archivo JSON con los datos enviados por la solicitud
$datos = $data;


// Guarda los datos actualizados en el archivo JSON
$file = 'datos.json';
$file_handle = fopen($file, 'w');
fwrite($file_handle, json_encode($datos));
fclose($file_handle);

// Envía una respuesta al cliente
$response = array('success' => true);
echo json_encode($response);
?>
