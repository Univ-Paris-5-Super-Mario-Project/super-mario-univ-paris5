var SuperMario = {
	start: function() {
		Game.infoGameBuilder = false;
		
		Piece.counter = 0;
		var level = new Room('level.xml');
		level.view_w = 592;
		Game.setRooms([level]);
		Game.lilo = false;	
		this.gameOverSound = new buzz.sound("sound/game/gameover.wav");
		
		/*
		Game.setRooms([new Room(592,400)]);
		Game.gameStart = function()
		{
			// Compteur de pièces à 0
			Piece.counter = 0;

			// Suppression des instances créées dans les parties précédentes
			var types = [Piece, PieceController, Mario, Bloc];
			_.each(types, function(t) {
				var instances = Game.getInstancesByType(t);

				_.each(instances, function(p) {
					Game.instanceDestroy(p);
				});
			});

			// Création des différents éléments
			Game.instanceCreate(280,192,Mario);
			Game.instanceCreate(10,13,PieceController);
			Game.instanceCreate(200,192,Piece);
			Game.instanceCreate(250,192,Piece);
			Game.instanceCreate(300,192,Piece);
			Game.instanceCreate(350,192,Piece);
			Game.instanceCreate(250,130,BlocSpecial);
			
			// En guise de sol...
			Game.instanceCreate(280,240,BlocSpecial);
		};
		*/
		
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
		
		// redirection vers la page de game over
		document.location.href = "#/game-over";
	}
};
