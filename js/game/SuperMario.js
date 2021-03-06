var SuperMario = {
	types: ['Air', 'Terre1', 'Terre2', 'Terre3', 'Terre4', 'Terre5', 'Terre6', 'Terre7', 'Terre8', 'Terre9', 'Terre10', 'Terre11', 'Terre12', 'Terre13', 'Terre14', 'Terre15', 'Terre16', 'Terre17', 'Terre18', 'Terre19', 'Terre20', 'Terre21', 'Terre22', 'Terre23', 'Terre24', 'Piece', 'TuyauV0', 'TuyauV1', 'TuyauV2', 'TuyauV3', 'TuyauV4', 'TuyauV5', 'TuyauH0', 'TuyauH1', 'TuyauH2', 'TuyauH3', 'TuyauH4', 'TuyauH5', 'BlocSpecial', 'BlocSpecialChampignonRouge', 'BlocSpecialChampignonVert', 'BlocSpecialEtoile', 'ChampignonRouge', 'Etoile', 'ChampignonVert', 'BlocTourne', 'Mario', 'Koopa', 'Goomba', 'BlocArrivee'],
	// retourne l'object contenant les parties sauvegardées
	
	sounds: {
		areMuted: false,
		toggleMute: function () {
			if (SuperMario.sounds.areMuted) {
				document.getElementById("mute-button").className = "muteOff";
				buzz.all().unmute();
				SuperMario.sounds.areMuted = false;
			} else {
				document.getElementById("mute-button").className = "muteOn";
				buzz.all().mute();
				SuperMario.sounds.areMuted = true;
			}
		},
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
		letsAGo: new buzz.sound("sounds/game/lets-a-go"),
		courseClearTheme: new buzz.sound("sounds/game/course-clear"),
		lostALife: new buzz.sound("sounds/game/lost-a-life"),
		gameOver: new buzz.sound("sounds/game/game-over"),
		marioJump: new buzz.sound("sounds/effects/jump"),
		powerUpAppears: new buzz.sound("sounds/effects/power-up_appears"),
		powerUp: new buzz.sound("sounds/effects/power-up"),
		oneUp: new buzz.sound("sounds/effects/1-up"),
		coin: new buzz.sound("sounds/effects/coin"),
		stomp: new buzz.sound("sounds/effects/stomp"),
        bump: new buzz.sound("sounds/effects/bump")

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
	
	selectedWorld: 0,

	saveCurrentGame: function() {
		// On récupère la seule instance de Mario
  		var m = Game.getInstancesByType('Mario');
  		m = m[0];

  		// On formatte les données à enregistrer
  		// * la date
  		// * le nombre de pièces
  		// * le nombre de vies
  		// * la position de Mario
  		// * le fichier XML du level utilisé
  		var timestamp = new Date().getTime();  		
		var data = {
			timestamp: timestamp,
			coins: this.coinsCounter,
			lives: this.livesCounter,
			worldId: this.selectedWorld,
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

	start: function(pieces, vies, level_path, mario, view_x, worldId) {
		this.animateBGs = true;
		var thisSuperMario = this;
		this.reset();
		
		// Musique du niveau aléatoire
		if (Math.random() < 0.5)
			this.sounds.levelTheme = this.sounds.overworldTheme;
		else
			this.sounds.levelTheme = this.sounds.athleticTheme;
		
		var infoGameBuilderSpan = document.createElement("span");
		infoGameBuilderSpan.id = "infoGameBuilder";
		document.getElementsByTagName("body")[0].appendChild(infoGameBuilderSpan);
		Game.infoGameBuilder = false;

		// si on ne charge pas de parties, on initialise à 0, sinon on récupère le nombre de pièces désiré
		this.coinsCounter = (pieces) ? pieces : 0;
		
		// si on ne charge pas de parties, on initialise à 0, sinon on récupère le nombre de pièces désiré
		this.livesCounter = (vies) ? vies : 3;
		
		var worldToPlay = 0; // Choix du monde à jouer.
		if (this.selectedWorld < worldsInfo.length)
			worldToPlay = (worldsInfo[this.selectedWorld][0] == "") ? 0 : this.selectedWorld;
		if (worldId)
			worldToPlay = worldId;
		
		var numLevels = worldsInfo[worldToPlay].length; // Nombre de niveaux dans le monde choisi.
		var tableauDeNiveaux = new Array();
		for (var i = 0; i < numLevels; i++) {
			var path = 'levelEditor/getLevel.php?worldId='+worldToPlay+'&levelId='+i+'&trash='; // Trash sert parce que jsglib ajoute un '?' à la fin de la requete
			var level = new Room(path);
			level.eventStart = function () {
				thisSuperMario.sounds.levelTheme.play(); // Lance la musique lorsque le niveau est chargé.
			};
			level.setView(592,292);
			if (level_path) { // Si on charge une partie,
				if (level_path == path) { // on ne charge pas les niveaux qui précèdent le niveau dans lequel le joueur a sauvegardé sa partie.
					tableauDeNiveaux[tableauDeNiveaux.length] = level;
					level_path = null;
				}
			} else { // Sinon on charge tous les niveaux.
				tableauDeNiveaux[tableauDeNiveaux.length] = level;
			}
		}
		Game.setRooms(tableauDeNiveaux);
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
				'editorSprite': 'img/game/editorSprite.png',
				'arriveeSprite': 'img/game/arriveeSprite.png'
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
		var dureeCycle = 40; // Duree du cycle jour/nuit (en secondes)
		this.dayCycle = setInterval(function(){
			thisSuperMario.toggleDayTime()
		}, dureeCycle / 2 * 1000);

		Game.gameEnd = function() {
			thisSuperMario.reset();
			
			// redirection vers la page de game over
			document.location.href = "#/game-over";
		};
	},

	reset: function() {
		this.roomId = 0; // Id de la room actuelle.
		clearInterval(this.dayCycle);
		Game.end = false;
		
		// Arrêt des musiques
		buzz.all().stop();

		// Compteur de pièces à 0
		this.coinsCounter = 0;
		
		// Compteur de Vies à 3
		this.livesCounter = 3;
	}
};
