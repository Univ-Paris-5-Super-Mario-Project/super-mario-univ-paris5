var SuperMario = {
	types: ['Air', 'Terre1', 'Terre2', 'Terre3', 'Terre4', 'Terre5', 'Terre6', 'Terre7', 'Terre8', 'Terre9', 'Terre10', 'Terre11', 'Terre12', 'Terre13', 'Terre14', 'Terre15', 'Terre16', 'Terre17', 'Terre18', 'Terre19', 'Terre20', 'Terre21', 'Terre22', 'Terre23', 'Terre24', 'Piece', 'TuyauV0', 'TuyauV1', 'TuyauV2', 'TuyauV3', 'TuyauV4', 'TuyauV5', 'TuyauH0', 'TuyauH1', 'TuyauH2', 'TuyauH3', 'TuyauH4', 'TuyauH5', 'BlocSpecial', 'BlocTourne', 'Mario', 'Koopa'],
	// retourne l'object contenant les parties sauvegardées
	savedGames: function() {
		var games = localStorage['saved_games'];

		// si aucune partie n'a été enregistrée, on initialise les parties enregistrées à une liste vide
		if (games == undefined || games.constructor != String)
		{
			localStorage['saved_games'] = JSON.stringify({});
			return {};
		}
		
		return JSON.parse(games);
	},
	start: function(pieces, level_path, mario) {
		this.reset();
		
		Game.infoGameBuilder = false;

		// si on ne charge pas de parties, on initialise à 0, sinon on récupère le nombre de pièces désiré
		Piece.counter = (pieces) ? pieces : 0;
		
		// idem pour le level
		level_path = (level_path) ? level_path : 'levelEditor/levelEditor.php?getlevel=level.xml';

		var level = new Room(level_path);
		level.view_w = 592;
		Game.setRooms([level]);
		Game.lilo = false;	
		this.gameOverSound = new buzz.sound("sound/game/gameover.wav");
		
		Game.gameEnd = function() {
		};
		Game.loadAndRun('jeu',
			{
				'marioSpriteLeft': 'img/game/marioSpriteLeft.png',
				'marioSpriteRight': 'img/game/marioSpriteRight.png',
				'koopaSprite': 'img/game/koopaSprite.png',
				'goombaSprite': 'img/game/goombaSprite.png',
				'carapaceSprite': 'img/game/koopaSprite.png',
				'blocSpecialSprite': 'img/game/blocSpecialSprite.png',
				'coinSprite': 'img/game/coinSprite.png',
				'blocMapSprite': 'img/game/mapsheet.png',
				'editorSprite': 'img/game/editorSprite.png'
			}
		);

		// si une position de mario a été donnée, on la met à jour comme il faut
		if (mario) {
			window.setTimeout(function() {
				// On récupère la seule instance de Mario
		  		var m = Game.getInstancesByType('Mario');
		  		m = m[0];

		  		m.x = mario.x;
		  		m.y = mario.y;

		  		Game.room.view_x = mario.x;
			}, 1000); // Après une seconde, on considère que toute les instances auront été créées, y compris celle de Mario
		}
	},
	gameOver: function() {
		// Musique de fin
		this.gameOverSound.play();

		// sauvegarde de partie etc?
		Game.end = true;
		
		this.reset();
		
		// redirection vers la page de game over
		document.location.href = "#/game-over";
	},

	reset: function() {
		// Compteur de pièces à 0
		Piece.counter = 0;

		var types = this.types;
		// Suppression des instances créées dans les parties précédentes
		_.each(types, function(t) {
			var instances = Game.getInstancesByType(t);

			_.each(instances, function(p) {
				Game.instanceDestroy(p);
			});
		});
	}
};
