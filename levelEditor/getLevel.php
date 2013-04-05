<?php

session_start();

$defaultId = '6c81da7ffb2adbbf33cb4a90c8cb6007';

// Si un niveau a été créé, on charge celui ci
if (isset($_SESSION['levelId']))
{
	$id = $_SESSION['levelId'];
}

// Sinon, on regarde quel niveau est désiré dans l'URL ou on charge le niveau par défaut.
else
{
	$id = (isset($_GET['id'])) ? $_GET['id'] : $defaultId;
}

// Protection, le nom du fichier est un md5, donc hexadecimal
if ( ! preg_match('/^[a-zA-Z0-9]+$/', $id))
{
	die('Le nom du niveau est invalide.');
}

$path = __DIR__ . '/../levels/' . $id . '.xml';

// Vérification de l'existence du niveau
if ( ! file_exists($path))
{
	die('Ce niveau n\'existe pas.');
}

// On précise que la page génère du xml.
header('Content-Type: application/xml');

// On affiche le xml du dernier niveau sauvegardé.
echo file_get_contents($path);