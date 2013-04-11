var isEditingBG = false; // Booléen indiquant si l'édition se fait au premier ou à l'arrière plan.
var tilesSource = {value:'editorSprite',width:800,height:16}; // Alias de l'image pour les tiles dans le fichier XML.
var nomClasses = ['Air', 'Terre1', 'Terre2', 'Terre3', 'Terre4', 'Terre5', 'Terre6', 'Terre7', 'Terre8', 'Terre9', 'Terre10', 'Terre11', 'Terre12', 'Terre13', 'Terre14', 'Terre15', 'Terre16', 'Terre17', 'Terre18', 'Terre19', 'Terre20', 'Terre21', 'Terre22', 'Terre23', 'Terre24', 'Piece', 'TuyauV0', 'TuyauV1', 'TuyauV2', 'TuyauV3', 'TuyauV4', 'TuyauV5', 'TuyauH0', 'TuyauH1', 'TuyauH2', 'TuyauH3', 'TuyauH4', 'TuyauH5', 'BlocSpecial', 'BlocSpecialChampignonRouge', 'BlocSpecialChampignonVert', 'BlocSpecialEtoile', 'BlocTourne', 'Mario', 'Koopa', 'Goomba', 'BlocArrivee', 'Air', 'Air', 'Air'] // Tableau de classes des blocs.
var blocksMasks = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2]; // Tableau nous indiquant si un bloc peut ou non être placé au premier plan / à l'arrière plan.
var blocksTypesNum = nomClasses.length; // Nombre de blocs à afficher dans la palette.
generateBlocksStyle(); // On génère les styles css pour les blocs.

var levelWidth = prompt("Largeur du niveau (en blocs):"); // On demande la largeur du niveau.
var levelHeight = prompt("Hauteur du niveau (en blocs):"); // On demande la hauteur du niveau.

var grid1 = new Grid(levelHeight,levelWidth); // On instancie un objet grille.
var blockID = 0; // Le bloc sélectionné par défaut est l'air.
var lastPaletteItem = false; // Au chargement de la page, aucun bloc n'a été sélectionné avant le bloc en cours.

var palette = new Palette(); // On crée une palette de blocs.

var editorEvents1 = new EditorEvents(); // On instancie un objet événement.

window.onload = function () { // Au chargement de la page,
	updateSelectedPlan(); // On met à jour l'indicateur de plan
	updateSelectedBlock(); // et l'indicateur de bloc.
	document.onkeydown = function (event) {
		if (event.which == 16)
			editorEvents1.isShiftKeyDown = true; // La touche maj est enfoncée.
		else if (event.which == 17)
			togglePlan(); // La touche ctrl est enfoncée.
	};
	document.onkeyup = function (event) {
		if (event.which == 16)
			editorEvents1.isShiftKeyDown = false; // La touche maj est relâchée.
	};
};
