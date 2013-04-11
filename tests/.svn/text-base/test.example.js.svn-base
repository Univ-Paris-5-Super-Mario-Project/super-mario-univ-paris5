// Déclarations Nécessaires pour les tests
var isEditingBG = false; // Booléen indiquant si l'édition se fait au premier ou à l'arrière plan.
var tilesSource = {value:'editorSprite',width:800,height:16}; // Alias de l'image pour les tiles dans le fichier XML.
var nomClasses = ['Air', 'Terre1', 'Terre2', 'Terre3', 'Terre4', 'Terre5', 'Terre6', 'Terre7', 'Terre8', 'Terre9', 'Terre10', 'Terre11', 'Terre12', 'Terre13', 'Terre14', 'Terre15', 'Terre16', 'Terre17', 'Terre18', 'Terre19', 'Terre20', 'Terre21', 'Terre22', 'Terre23', 'Terre24', 'Piece', 'TuyauV0', 'TuyauV1', 'TuyauV2', 'TuyauV3', 'TuyauV4', 'TuyauV5', 'TuyauH0', 'TuyauH1', 'TuyauH2', 'TuyauH3', 'TuyauH4', 'TuyauH5', 'BlocSpecial', 'BlocSpecialChampignonRouge', 'BlocSpecialChampignonVert', 'BlocSpecialEtoile', 'BlocTourne', 'Mario', 'Koopa', 'Goomba', 'BlocArrivee', 'Air', 'Air', 'Air'] // Tableau de classes des blocs.
var blocksMasks = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2]; // Tableau nous indiquant si un bloc peut ou non être placé au premier plan / à l'arrière plan.
var blocksTypesNum = nomClasses.length; // Nombre de blocs à afficher dans la palette.
generateBlocksStyle(); // On génère les styles css pour les blocs.

var levelWidth = 50; // On demande la largeur du niveau.
var levelHeight = 20; // On demande la hauteur du niveau.

var grid1 = new Grid(levelHeight,levelWidth); // On instancie un objet grille.
var blockID = 0; // Le bloc sélectionné par défaut est l'air.
var lastPaletteItem = false; // Au chargement de la page, aucun bloc n'a été sélectionné avant le bloc en cours.

var palette = new Palette(); // On crée une palette de blocs.

var editorEvents1 = new EditorEvents(); // On instancie un objet événement.

describe('SuperMario', function() {
	describe('Sauvegardes / Chargement de parties', function() {
	    describe('#savedGames()', function() {
	        it('renvoie le contenu du localStorage décodé du json', function() {
	            localStorage['saved_games'] = JSON.stringify({})
	            expect(SuperMario.savedGames()).to.eql({})
	            
	            localStorage.removeItem('saved_games')
	            expect(SuperMario.savedGames()).to.eql({})
	            
	            localStorage['saved_games'] = JSON.stringify({hello: "world"})
	            expect(SuperMario.savedGames()).to.eql({hello: "world"})
				
				localStorage['saved_games'] = JSON.stringify({hello: "John"})
				expect(SuperMario.savedGames()).to.eql({hello: "John"})
	        })
	    })
		
		describe('#setSavedGames(Hash games)', function() {
			it('sauvegarde les parties sous forme de JSON', function() {
				SuperMario.setSavedGames({hello: 'world'})
				expect(localStorage['saved_games']).to.eql(JSON.stringify({hello: 'world'}))
			})
		})
		
		describe('#removeSavedGame(int id)', function() {
			it('efface la sauvegarde d\'une partie donnée', function() {
				SuperMario.setSavedGames({5: {id: 5}, 6: {id: 6}})
				SuperMario.removeSavedGame(5)
				expect(SuperMario.savedGames()).to.eql({6: {id: 6}})
			})
		})
	})
	
	describe('Chargement du jeu', function() {
		describe('Chargement correct de l\'objet Game', function() {
			it('vérifie si Game est un objet', function() {
				expect(Game).to.be.an(Object)
			})
		})
	})
	
	describe('Éditeur de niveaux', function() {
		describe('Instanciation des variables', function() {
			it('Vérifie la valeur de "isEditingBG".', function() {
				expect(isEditingBG).to.be.equal(false)
			})
			it('Vérifie la valeur de "tilesSource".', function() {
				expect(tilesSource).to.eql({value:'editorSprite',width:800,height:16})
			})
			it('Vérifie la valeur de "nomClasses".', function() {
				expect(nomClasses).to.eql(['Air', 'Terre1', 'Terre2', 'Terre3', 'Terre4', 'Terre5', 'Terre6', 'Terre7', 'Terre8', 'Terre9', 'Terre10', 'Terre11', 'Terre12', 'Terre13', 'Terre14', 'Terre15', 'Terre16', 'Terre17', 'Terre18', 'Terre19', 'Terre20', 'Terre21', 'Terre22', 'Terre23', 'Terre24', 'Piece', 'TuyauV0', 'TuyauV1', 'TuyauV2', 'TuyauV3', 'TuyauV4', 'TuyauV5', 'TuyauH0', 'TuyauH1', 'TuyauH2', 'TuyauH3', 'TuyauH4', 'TuyauH5', 'BlocSpecial', 'BlocSpecialChampignonRouge', 'BlocSpecialChampignonVert', 'BlocSpecialEtoile', 'BlocTourne', 'Mario', 'Koopa', 'Goomba', 'BlocArrivee', 'Air', 'Air', 'Air'])
			})
			it('Vérifie la valeur de "blocksMasks".', function() {
				expect(blocksMasks).to.eql([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2])
			})
			it('Vérifie la valeur de "levelWidth".', function() {
				expect(levelWidth).to.be.equal(50)
			})
			it('Vérifie la valeur de "levelHeight".', function() {
				expect(levelHeight).to.be.equal(20)
			})
			it('Vérifie que "grid1" est une instance de Grid.', function() {
				expect(grid1).to.be.a(Grid)
			})
			it('Vérifie la cohérence de "blockID".', function() {
				expect(blockID).to.be.equal(0)
			})
			it('Vérifie la cohérence de "lastPaletteItem".', function() {
				expect(lastPaletteItem).to.be.equal(false)
			})
			it('Vérifie que "palette" est une instance de Palette.', function() {
				expect(palette.toString()).to.be.equal((new Palette()).toString())
			})
			it('Vérifie que "editorEvents1" est une instance d\'EditorEvents.', function() {
				expect(editorEvents1).to.be.an(EditorEvents)
			})
		})
		describe('Vérification des tableaux "nomClasses" et "blocksMasks"', function() {
			it('Vérifie si "nomClasses" et "blocksMasks" sont de même longueur', function() {
				expect(nomClasses).to.have.length(blocksMasks.length)
			})
		})
		describe('Vérification sur la grille "grid1"', function() {
			describe('Vérification de la largeur de la grille', function() {
				describe('~Grid.colsNum', function() {
					it('Vérifie si "grid1" est de largeur "levelWidth"', function() {
						expect(grid1.colsNum).to.be.equal(levelWidth)
					})
				})
			})
			describe('Vérification de la hauteur de la grille', function() {
				describe('~Grid.rowsNum', function() {
					it('Vérifie si "grid1" est de largeur "levelHeight"', function() {
						expect(grid1.rowsNum).to.be.equal(levelHeight)
					})
				})
			})
			describe('Vérification de l\'ajout et de suppression de lignes', function() {
				describe('#Grid.addRow()', function() {
					it('Vérifie si "grid1" est toujours de même hauteur "levelHeight" après l\'ajout de lignes', function() {
						var n = Math.floor(Math.random()*10);
						for (var i = 0; i < n; i++) {
							grid1.addRow();
						}
						levelHeight += n;
						expect(grid1.rowsNum).to.be.equal(levelHeight)
					})
				})
				describe('#Grid.deleteRow()', function() {
					it('Vérifie si "grid1" est toujours de même hauteur "levelHeight" après la suppression de lignes', function() {
						var n = Math.floor(Math.random()*10);
						for (var i = 0; i < n; i++) {
							grid1.deleteRow();
						}
						levelHeight -= n;
						expect(grid1.rowsNum).to.be.equal(levelHeight)
					})
				})
			})
			describe('Vérification de l\'ajout et de suppression de colonnes', function() {
				describe('#Grid.addColumn()', function() {
					it('Vérifie si "grid1" est toujours de même largeur "levelWidth" après l\'ajout de colonnes', function() {
						var n = Math.floor(Math.random()*10);
						for (var i = 0; i < n; i++) {
							grid1.addColumn();
						}
						levelWidth += n;
						expect(grid1.colsNum).to.be.equal(levelWidth)
					})
				})
				describe('#Grid.deleteColumn()', function() {
					it('Vérifie si "grid1" est toujours de même largeur "levelWidth" après la suppression de colonnes', function() {
						var n = Math.floor(Math.random()*10);
						for (var i = 0; i < n; i++) {
							grid1.deleteColumn();
						}
						levelWidth -= n;
						expect(grid1.colsNum).to.be.equal(levelWidth)
					})
				})
			})
			describe('#Grid.getRowAt()', function() {
				it('Vérifie si "getRowAt()" renvoie une ligne (tableau de cellules)', function() {
					var rowIndex = Math.floor((Math.random()*grid1.rowsNum));
					var row = grid1.getRowAt(rowIndex);
					for (var i = 0; i < grid1.colsNum; i++) {
						expect(row.cells[i].toString()).to.be.equal((new Cell()).toString());
					}
				})
			})
			describe('#Grid.getCellAt()', function() {
				it('Vérifie si "getCellAt()" renvoie une cellule', function() {
					var rowIndex = Math.floor((Math.random()*grid1.rowsNum));
					var colIndex = Math.floor((Math.random()*grid1.colsNum));
					var cell = grid1.getCellAt(rowIndex, colIndex);
					expect(cell.toString()).to.be.equal((new Cell()).toString());
				})
			})
		})
		describe('Changement de bloc d\'une cellule en arrière plan et au premier plan', function() {
			var anId = Math.floor((Math.random()*blocksTypesNum));
			var aCell = new Cell();
			describe('#Cell.setBlock() (en arrière plan)', function() {
				it('Vérifie si "getCellAt()" renvoie une cellule', function() {
					isEditingBG = true;
					aCell.setBlock(anId);
					if (blocksMasks[anId] != 1)
						expect(aCell.tileID).to.be.equal(anId);
					else
						expect(aCell.elementID).to.be.equal(anId);
				})
			})
			describe('#Cell.setBlock() (au premier plan)', function() {
				it('Vérifie si "getCellAt()" renvoie une cellule', function() {
					isEditingBG = false;
					aCell.setBlock(anId);
					if (blocksMasks[anId] != 0)
						expect(aCell.elementID).to.be.equal(anId);
					else
						expect(aCell.tileID).to.be.equal(anId);
				})
			})
		})
	})
	describe('Sons avec Buzz', function() {
		for(var soundKey in SuperMario.sounds)
		{
			if (soundKey != 'areMuted' && soundKey != 'toggleMute') { // areMuted et toggleMute ne sont pas des sons.
				describe('Chargement du son "' + soundKey + '"', function() {
					it('Vérifie si le son "' + soundKey + '" contenu dans SuperMario.sounds a bien été chargé.', function() {
						expect(SuperMario.sounds[soundKey]).to.be.a(buzz.sound);
					})
				})
			}
		}
	})
})


﻿describe('Mario.class', function() {
    var mario = new Mario;
    SuperMario.sounds.levelTheme = SuperMario.sounds.athleticTheme;
    describe('Instanciation Mario', function() {
		it('cree une instance de mario', function() {
			expect(mario).to.not.be.empty()
		})
	})
    

  describe('#jump(Boolean bool)', function() {
    it('change l\'attribut vspeed de Mario', function() {
     
      mario.vspeed=0;
      mario.jump(false);
      expect(mario.vspeed).to.eql(-20);
    })
	})

  describe('#eventAlarm1()', function() {
    it('met l\'attribut isInvincible de Mario à false', function() {
      
      mario.isInvincible=true;
      mario.eventAlarm1();
      expect(mario.isInvincible).to.eql(false);
    })
	})


  describe('#isDown()', function() {
    it('retourne true si l\attribut state de Mario indique que Mario est accroupit', function() {
      

      mario.state=Element.STATE_STAND_DOWN_RIGHT;
      expect(mario.isDown()).to.eql(true);

      mario.state=Element.STATE_STAND_DOWN_LEFT;
      expect(mario.isDown()).to.eql(true);

      mario.state=Element.STATE_STAND_LEFT;
      expect(mario.isDown()).to.eql(false);

      mario.state=Element.STATE_STAND_RIGHT;
      expect(mario.isDown()).to.eql(false);
    })
	})

  describe('#die()', function() {
    it('met le statut de Mario à mort, sa vitesse h à 0 et v à -20, la gravité à 1 et igniore les collisions\n(tout n\'est pas testé', function() {
      
      mario.state=Element.STATE_STAND_DOWN_RIGHT;
      mario.hspeed=10;
      mario.vspeed=10;
      mario.gravity=0;
      mario.collideSolid=true;

      mario.die();

      expect(mario.state).to.eql(Element.STATE_DEATH);
      expect(mario.hspeed).to.eql(0);
      expect(mario.vspeed).to.eql(-20);
      expect(mario.gravity).to.eql(1);
      expect(mario.collideSolid).to.eql(false);

    })
	})
})
