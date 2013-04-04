var SuperMario = {
	types: ['Air', 'Terre1', 'Terre2', 'Terre3', 'Terre4', 'Terre5', 'Terre6', 'Terre7', 'Terre8', 'Terre9', 'Terre10', 'Terre11', 'Terre12', 'Terre13', 'Terre14', 'Terre15', 'Terre16', 'Terre17', 'Terre18', 'Terre19', 'Terre20', 'Terre21', 'Terre22', 'Terre23', 'Terre24', 'Piece', 'TuyauV0', 'TuyauV1', 'TuyauV2', 'TuyauV3', 'TuyauV4', 'TuyauV5', 'TuyauH0', 'TuyauH1', 'TuyauH2', 'TuyauH3', 'TuyauH4', 'TuyauH5', 'BlocSpecial', 'BlocSpecialChampignonRouge', 'ChampignonRouge', 'ChampignonVert', 'BlocTourne', 'Mario', 'Koopa', 'Goomba'],
	// retourne l'object contenant les parties sauvegardées
	
	sounds: {
		titleTheme: new buzz.sound("sounds/themes/Title-Theme", {
			loop: true
		}),
		athleticTheme: new buzz.sound("sounds/themes/Athletic-Theme", {
			loop: true
		}),
		overworldTheme: new buzz.sound("sounds/themes/Overworld-Theme", {
			loop: true
		}),
		endingTheme: new buzz.sound("sounds/themes/Ending-Theme", {
			loop: true
		}),
		scoresTheme: new buzz.sound("sounds/themes/Scores-Theme", {
			loop: true
		}),
		invincibleTheme: new buzz.sound("sounds/themes/Invincible-Theme", {
			preload: false
		}),
		gameOver: new buzz.sound("sounds/game/game-over"),
		marioJump: new buzz.sound("sounds/effects/jump"),
		powerUpAppears: new buzz.sound("sounds/effects/power-up_appears"),
		powerUp: new buzz.sound("sounds/effects/power-up"),
		oneUp: new buzz.sound("sounds/effects/1-up"),
		coin: new buzz.sound("sounds/effects/coin")
	},

	toggleDayTime: function () { // Change le moment dans la journée (jour/nuit)
		// Pour régler la vitesse de transition entre le jour et la nuit, aller dans style.css
		if (document.getElementById("gameBG").className == 'gameBGDay')
			document.getElementById("gameBG").className = 'gameBGNight';
		else
			document.getElementById("gameBG").className = 'gameBGDay';
	},

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

	setSavedGames: function(games) {
		localStorage['saved_games'] = JSON.stringify(games);
	},

	saveCurrentGame: function() {
		// On récupère la seule instance de Mario
  		var m = Game.getInstancesByType('Mario');
  		m = m[0];

  		// On formatte les données à enregistrer
  		// * la date
  		// * le nombre de pièces
  		// * la position de Mario
  		// * le fichier XML du level utilisé
  		var timestamp = new Date().getTime();  		
		var data = {
			timestamp: timestamp,
			coins: Piece.counter,
			mario: {
				x: m.x,
				y: m.y
			},
			level: Game.room.path,
			room: {
				view_x: Game.room.view_x
			}
		};

		// On rajoute la partie en cours aux parties enregistrées, sous forme de JSON car
		// localStorage n'accepte pas d'objets javascript tel que Game, Mario, Piece, etc.
		var saved_games = SuperMario.savedGames();
		saved_games['' + timestamp] = data; // le '' + timestamp permet de convertir le timestamp (de type int) en chaine de caractères
		this.setSavedGames(saved_games);
	},

	removeSavedGame: function(id) {
		var games = this.savedGames();
		delete games[id];
		this.setSavedGames(games);
	},

	start: function(pieces, level_path, mario, view_x) {
		this.reset();
		
		// Musique du niveau aléatoire
		if (Math.random() < 0.5)
			this.sounds.levelTheme = this.sounds.overworldTheme;
		else
			this.sounds.levelTheme = this.sounds.athleticTheme;
		this.sounds.levelTheme.play();
		
		var infoGameBuilderSpan = document.createElement("span");
		infoGameBuilderSpan.id = "infoGameBuilder";
		document.getElementsByTagName("body")[0].appendChild(infoGameBuilderSpan);
		Game.infoGameBuilder = false;

		// si on ne charge pas de parties, on initialise à 0, sinon on récupère le nombre de pièces désiré
		Piece.counter = (pieces) ? pieces : 0;
		
		// idem pour le level
		level_path = (level_path) ? level_path : 'levelEditor/getLevel.php';

		var level = new Room(level_path);
		level.setView(592,292);
		Game.setRooms([level]);
		Game.lilo = false;
		
		Game.loadAndRun('jeu',
			{
				'marioSpriteLeft': 'img/game/marioSpriteLeft.png',
				'marioSpriteRight': 'img/game/marioSpriteRight.png',
				'marioSpriteDeath': 'img/game/marioSpriteDeath.png',
				'itemsSprite': 'img/game/itemsSprite.png',
				'koopaSprite': 'img/game/koopaSprite.png',
				'goombaSprite': 'img/game/goombaSprite.png',
				'carapaceSprite': 'img/game/carapaceSprite.png',
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

		  		if (view_x) Game.room.view_x = view_x;
			}, 1000); // Après une seconde, on considère que toute les instances auront été créées, y compris celle de Mario
		}
		
		// Mise à Jour Cycle Jour/Nuit
		var thisSuperMario = this;
		var dureeCycle = 40; // Duree du cycle jour/nuit (en secondes)
		this.dayCycle = setInterval(function(){
			thisSuperMario.toggleDayTime()
		}, dureeCycle / 2 * 1000);

		Game.gameEnd = function() {
			clearInterval(this.dayCycle);
			thisSuperMario.reset();
			
			// redirection vers la page de game over
			document.location.href = "#/game-over";
		};
	},

	reset: function() {
		Game.end = false;
		
		// Arrêt des musiques
		buzz.all().stop()

		// Compteur de pièces à 0
		Piece.counter = 0;
	}
};
