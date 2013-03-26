var SuperMario = {
	types: [
		Piece,
		PieceController,
		Mario,
		Bloc,
		Terre,
		SousTerre,
		BlocSpecial
	],
	start: function() {
		Game.infoGameBuilder = false;
		
		Piece.counter = 0;
		var level = new Room('js/game/level.xml');
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
				'carapaceSprite': 'img/game/koopaSprite.png',
				'blocSpecialSprite': 'img/game/blocSpecialSprite.png',
				'coinSprite': 'img/game/coinSprite.png',
				'blocMapSprite': 'img/game/mapsheet.png',
				'editorSprite': 'img/game/editorSprite.png'
			}
		);
	},
	gameOver: function() {
		// Musique de fin
		this.gameOverSound.play();

		// sauvegarde de partie etc?
		Game.end = true;

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
		
		// redirection vers la page de game over
		document.location.href = "#/game-over";
	}
};
