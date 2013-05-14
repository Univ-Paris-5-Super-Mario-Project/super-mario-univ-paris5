<?php

session_start();

// Sinon si un niveau est envoyé par formulaire depuis l'éditeur,
if (isset($_POST['xmlfile'])) {

	$content = stripslashes($_POST['xmlfile']);
	$id = md5($content);

	$_SESSION['levelId'] = $id;

	// On enregistre le niveau qui a été envoyé.
	file_put_contents(__DIR__ . '/../levels/' . $id . '.xml', $content);
	
	if ($_COOKIE["customworld"] != "")
		setcookie("customworld", $_COOKIE["customworld"] . ';' . $id, time()+60*60*24*365);
	else
		setcookie("customworld", $id, time()+60*60*24*365);
	
	header('Location: ../#/worlds');
}