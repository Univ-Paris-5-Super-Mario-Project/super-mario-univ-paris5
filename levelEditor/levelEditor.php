<?php

session_start();

// Sinon si un niveau est envoyé par formulaire depuis l'éditeur,
if (isset($_POST['xmlfile'])) {

	$content = stripslashes($_POST['xmlfile']);
	$id = md5($content);

	$_SESSION['levelId'] = $id;

	// On enregistre le niveau qui a été envoyé.
	file_put_contents(__DIR__ . '/../levels/' . $id . '.xml', $content);
	
	header('Location: getLevel.php?id=' . $id);
}