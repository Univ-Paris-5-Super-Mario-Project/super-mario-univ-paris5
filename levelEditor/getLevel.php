<?php
session_start();

// Tableau de mondes.
$worlds = array(
	// Monde 1 (tableau de niveaux).
	array(
		// Monde 1, niveau 1.
		'6c81da7ffb2adbbf33cb4a90c8cb6007',
		// Monde 1, niveau 2.
		'2a97cc62c757437bf0fea26036493efa'
	),
	
	// Monde 2
	array(
		// Monde 2, niveau 1.
		'5ade3d57576f83e65ef58485bb43cc6d'
	),
	
	// Monde 3
	array(
		'254b0eaf48a338889e71f39cfcfb869e' // Niveau de démonstration des monstres pour la soutenance.
	),
	
	// Monde 4
	array(
		'b7af26e6f17ba8dacb2a307557acc6d9' // Niveau de démonstration des blocs spéciaux pour la soutenance.
	),
	
	// Monde 5 (Monde de démo pour la soutenance)
	array(
		'342715ae3364f595c2e656c10b31e8d3',
		'1bb359fb39048f6c58caebc256c6b32f'
	),
	
	// Monde custom (niveaux crées par le joueur dans l'éditeur)
	explode(';',(isset($_COOKIE["customworld"])) ? $_COOKIE["customworld"] : '')
);

if (isset($_GET['worlds']) && $_GET['worlds']=='getinfo') { // Affiche le javascript contenant les informations sur le nombre de mondes et de niveaux.
	header('Content-type: text/javascript');

	echo 'var worldsInfo = ' . json_encode($worlds) . ';';
} else {
	$defaultId = $worlds[0][0];
	
	// Si le niveau et le monde indiqués existent, on charge le niveau.
	if (isset($_GET['worldId'], $_GET['levelId']) && isset($worlds[$_GET['worldId']][$_GET['levelId']])) {
		$id = $worlds[$_GET['worldId']][$_GET['levelId']];
	}
	
	// Si un niveau est demandé par l'identifiant, on le charge.
	else if (isset($_GET['id']))
	{
		$id = $_GET['id'];
	}
	
	// Si un niveau vient d'être créé, on charge celui ci.
	else if (isset($_SESSION['levelId']))
	{
		$id = $_SESSION['levelId'];
	}
	
	// Sinon, on charge le niveau par défaut.
	else
	{
		$id = $defaultId;
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
}