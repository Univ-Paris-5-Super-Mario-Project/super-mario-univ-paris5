function generateBlocksStyle (n) { // Génère les classes css pour chacun des blocs grâce à leur ID.
	var blocksStyle = document.createElement("style");
	blocksStyle.type = "text/css";
	for (var i = 0; i < blocksTypesNum; i++) {
		blocksStyle.innerHTML += ".block" + i + "{background-position: " + -i*16 + "px top;}";
	}
	document.getElementsByTagName("head")[0].appendChild(blocksStyle);
}

function Cell (row, col) { // Constructeur de la classe Cell
	var thisCell = document.createElement("td");
	thisCell.setBlock = function (id) { // Fonction permettant de changer l'arrière plan ou le premier plan d'une case avec la bloc sélectionné dans la palette.
		if ((isEditingBG && blocksMasks[id] != 1) || blocksMasks[id] == 0) { // Edition arrière plan
			thisCell.className = "block block" + id;
			thisCell.tileID = id;
		} else { // Edition premier plan
			thisCell.firstChild.className = "innerSpan surface block" + id;
			thisCell.elementID = id;
		}
	};
	var innerSpan = document.createElement("span");
	innerSpan.className = "innerSpan surface";
	thisCell.appendChild(innerSpan);
	thisCell.onmousedown = function() { // Au clic
		if (editorEvents1.mouse) { // Si la dernière position de la souris lors de l'appui sur maj est enregistré,
			var grid = this.parentNode.parentNode;
			var x=[[editorEvents1.mouse[1],this.parentNode.rowIndex],[editorEvents1.mouse[0],this.cellIndex]]; // On calcule les coordonnées des coins opposés de la zone de sélection.
			if (x[0][0]>x[0][1]) {
				var tmp=x[0][0];x[0][0]=x[0][1];x[0][1]=tmp; // On trie les abscisses ce qui permet d'effectuer des sélections de toutes les directions possibles.
			}
			if (x[1][0]>x[1][1]) {
				var tmp=x[1][0];x[1][0]=x[1][1];x[1][1]=tmp; // On trie les ordonnées.
			}
			for (var i=x[0][0];i<=x[0][1];i++) { // On parcourt la zonne sélectionnée,
				for (var j=x[1][0];j<=x[1][1];j++) {
					changeCellBlock(grid.rows[i].cells[j]); // dans laquelle on change la cellule avec le bloc courant sélectionné dans la palette.
				}
			}
			editorEvents1.mouse=false; // On réinitialise l'objet qui stocke les coordonnées du premier coin de la zone de sélection.
		} else if (editorEvents1.isShiftKeyDown) { // Si la touche maj est enfoncée,
			editorEvents1.mouse=[this.cellIndex,this.parentNode.rowIndex]; // On stacke les coordonnées du premier coin de la zone de sélection.
		}
		changeCellBlock(this); // On modifie le bloc de la cellule sélectionnée avec le bloc choisi dans la palette.
	};
	thisCell.onmouseover = function() { // Au passage de la souris
		if(editorEvents1.isMouseButtonDown && !editorEvents1.isShiftKeyDown) { // Si la touche maj n'est pas enclenchée et que le bouton de la souris est cliqué
			changeCellBlock(this); // On modifie le bloc de la cellule sélectionnée avec le bloc choisi dans la palette.
		}
	};
	thisCell.setBlock(0); // Par défaut, le bloc est de l'air.
	return thisCell;
}

function Grid (rows, cols) { // Constructeur de la grille
	this.table = document.createElement("table");
	this.cellSize = 16; // Taille d'une cellule.
	this.height = (rows<1)?1:rows; // On récupère le nombre de lignes souhaité (doit être supérieur à 1).
	this.width = (cols<1)?1:cols; // On récupère le nombre de colonnes souhaité (doit être supérieur à 1).
	this.rowsNum = 0; // Nombre de lignes de la grille, par défaut à 0.
	this.colsNum = 0; // Nombre de colonnes de la grille, par défaut à 0.
	this.addToView = function () { // Ajout de la grille dans la page.
		var tbody = document.createElement("tbody");
		this.table.appendChild(tbody);
		document.getElementsByTagName("body")[0].appendChild(this.table);
		this.table.className = "grid";
	};
	this.addToView(); // On l'ajoute dans la page dès la création.
	this.addRow = function () { // Fonction permettant d'ajouter une ligne à la fin de la grille.
		this.table.insertRow(this.rowsNum); // On ajoute une ligne à la fin de la grille.
		for (var i = 0; i < this.colsNum; i++) {
			this.table.rows[this.rowsNum].appendChild(new Cell(this.rowsNum,i)); // On ajoute autant de cellules sur la ligne que la grille est large.
		}
		this.rowsNum++;
	};
	this.deleteRow = function () { // Fonction permettant de supprimer la dernière ligne de la grille.
		if (this.rowsNum > 1) {
			this.table.deleteRow(this.rowsNum-1); // On supprime la dernière ligne.
			this.rowsNum--;
		}
	};
	this.addColumn = function () { // Fonction permettant d'ajouter une colonne à la fin de la grille.
		for (var i = 0; i < this.rowsNum; i++) { // Pour chaque ligne,
			this.table.rows[i].appendChild(new Cell(i,this.colsNum)); // On ajoute une nouvelle cellule.
		}
		this.colsNum++;
		this.table.style.width = this.colsNum*this.cellSize + "px";
	};
	this.deleteColumn = function () { // Fonction permettant de supprimer la dernière colonne de la grille.
		if (this.colsNum > 1) {
			for (var i = 0; i < this.rowsNum; i++) { // Pour chaque ligne
				this.table.rows[i].deleteCell(this.colsNum-1); // On supprime la dernière cellule.
			}
			this.colsNum--;
			this.table.style.width = this.colsNum*this.cellSize + "px";
		}
	};
	this.getRowAt = function (row) { // Renvoie l'objet ligne spécifié par le numéro de ligne.
		return this.table.rows[row];
	};
	this.getCellAt = function (row, col) { // Renvoie l'objet cellule spécifiée par le numéro de ligne et le numéro de colonne.
		return this.table.rows[row].cells[col];
	};
	this.save = function () { // Enregistrement du niveau sous forme de chaîne de caractères dans le format XML, et envoi au formulaire php.
		var result = '<' + '?' + 'xml version="1.0" encoding="UTF-8"' + '?' + '>';
		result += '<level width="' + this.cellSize*this.colsNum + '" height="' + this.cellSize*this.rowsNum + '" tiles_width="' + this.cellSize + '" tiles_height="' + this.cellSize + '" background="background">';
		// Partie des tiles (éléments décoratifs).
		// On récupère les identifiants des blocs d'arrière plan.
		result += '<tiles><Tiles width="' + tilesSource.width + '" height="' + tilesSource.height + '" src="' + tilesSource.value + '" tiles_width="' + 16 + '" tiles_height="' + 16 + '" sep="' + 0 + '">';
		for (var i = 0; i < this.rowsNum; i++) {
			for (var j = 0; j < this.colsNum; j++) {
				if (this.table.rows[i].cells[j].tileID && nomClasses[this.table.rows[i].cells[j].tileID] != 'Air')
					result += '<tile x="' + (this.cellSize*j) + '" y="' + (this.cellSize*i) + '">' + (this.table.rows[i].cells[j].tileID + 1) + '</tile>';
			}
		}
		result += '</Tiles></tiles>';
		// Partie des éléments qui deviendront intéractifs dans le jeu.
		// On récupère les identifiants des blocs de premier plan.
		result += '<elements>';
		result += '<element x="0" y="0">PieceController</element>';
		result += '<element x="0" y="0">LifeController</element>';
		for (var i = 0; i < this.rowsNum; i++) {
			for (var j = 0; j < this.colsNum; j++) {
				if (this.table.rows[i].cells[j].elementID && nomClasses[this.table.rows[i].cells[j].elementID] != 'Air')
					result += '<element x="' + (this.cellSize*j) + '" y="' + (this.cellSize*i) + '">' + nomClasses[this.table.rows[i].cells[j].elementID] + '</element>';
			}
		}
		result += '</elements>';
		result += '</level>';
		// Création dynamique du formulaire.
		var form = document.createElement("form");
		form.method = "post";
		form.action = "levelEditor.php";
		form.id = "xmlform";
		var oldFrom = document.getElementById("xmlform");
		if (oldFrom)
			oldFrom.parentNode.removeChild(oldFrom);
		var xmlContent = document.createElement("textarea");
		xmlContent.innerHTML = result;
		xmlContent.name = "xmlfile";
		form.appendChild(xmlContent);
		document.getElementsByTagName("body")[0].appendChild(form);
		// Envoi du contenu du fichier XML.
		form.submit();
	};
	for (var i = 0; i < this.height; i++) { // On ajoute "height" lignes.
		this.addRow();
	}
	for (var i = 0; i < this.width; i++) { // On ajoute "width" colonnes.
		this.addColumn();
	}
}

function changeCellBlock (cell) { // Modification du bloc de la cellule sélectionnée avec le bloc choisi dans la palette.
	cell.setBlock(blockID);
}

function updateSelectedBlock () { // Mise à jour de l'indicateur de bloc utilisé.
	var selectedBlock = document.getElementById("selectedBlock");
	var blockMask;
	switch (blocksMasks[blockID]) {
		case 1:
			blockMask = 'Élément solide';
			break;
		case 2:
			blockMask = 'Décor ou Élément solide';
			break;
		default:
			blockMask = 'Décor';
			break;
	}
	selectedBlock.innerHTML = '<span class="block block' + blockID + '"></span>' + nomClasses[blockID] + ' - ' + blockMask;
}

function togglePlan () { // Changement de plan d'édition.
	isEditingBG = !isEditingBG;
	updateSelectedPlan();
}

function updateSelectedPlan () { // Mise à jour de l'indicateur de plan édité.
	var selectedPlan = document.getElementById("selectedPlan");
	selectedPlan.innerHTML = isEditingBG?'Édition du décor':'Édition des éléments solides';
}

function Palette () { // Constructeur de la palette de blocs.
	function PaletteItem (id) { // Constructeur interne pour créer un élément de palette.
		var thisPaletteItem = document.createElement("td");
		thisPaletteItem.className = "block block" + id;
		thisPaletteItem.onclick = function(){ // Permet de mettre à jour l'indicateur de bloc et l'élément sélectionné dans la palette.
			if (lastPaletteItem) {
				lastPaletteItem.className = "block block" + blockID;
			}
			this.className = "selected block block" + id;
			blockID = id;
			updateSelectedBlock();
			lastPaletteItem = this;
		};
		return thisPaletteItem;
	}
	var palette = document.createElement("table");
	var paletteRowsNum = 0;
	var itemsPerRow = blocksTypesNum / 5 + 1;
	palette.style.left = ((itemsPerRow*20+2)-(itemsPerRow*20+2)/2) + "px"; // Positionnement dynamique en fonction du nombre d'éléments.
	palette.style.bottom = ((5*20+2)-(5*20+2)/2) + "px";
	palette.className = "palette";
	document.getElementsByTagName("body")[0].appendChild(palette);
	for (var i = 0; i < blocksTypesNum; i++) { // Boucle pour créer tous les éléments de la palette.
		if (i/itemsPerRow >= paletteRowsNum) { // Calcul dynamique du nombre d'éléments par ligne pour avoir toujours un nombre paletteRowsNum de lignes.
			palette.insertRow(paletteRowsNum);
			paletteRowsNum++;
		}
		palette.rows[paletteRowsNum-1].appendChild(new PaletteItem(i));
	}
	palette.style.width = this.blocksTypesNum*16 + "px";
	return palette;
}

function EditorEvents () { // Constructeur de la classe d'événements (contient les événements par défaut).
	this.isMouseButtonDown = false;
	this.isShiftKeyDown = false;
	this.mouse = false;
	var thisEditorEvents = this;
	document.onmousedown = function(){
		thisEditorEvents.isMouseButtonDown = true;
	};
	document.onmouseup = function(){
		thisEditorEvents.isMouseButtonDown = false;
	};
}
