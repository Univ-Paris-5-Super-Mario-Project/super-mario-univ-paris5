function timestampToDate(timestamp) {
	var date = new Date(timestamp);
	return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
function HomeCtrl($scope) {
  	SuperMario.reset();
	
	// Musique des crédits
	SuperMario.sounds.titleTheme.play();
}

function CreditsCtrl($scope) {
	SuperMario.reset();
	
	// Musique des crédits
	SuperMario.sounds.endingTheme.play();
}

function GameCtrl($scope) {
	// fonction de sauvegarde de la partie en cours
  	$scope.saveCurrentGame = function() {
  		SuperMario.saveCurrentGame();
  		var el = document.getElementById("save-game-success");
  		el.style.display = "block";
  		window.setTimeout(function() {
  			el.style.display = "none";
  		}, 1000);
	}

	SuperMario.reset();

	$scope.gameExists = true; // indique à Angular qu'il faut afficher le canvas car cette partie est disponible
  	SuperMario.start();
}

function SavedGameCtrl($scope, $routeParams, $location) {
	// fonction de sauvegarde de la partie en cours
  	$scope.saveCurrentGame = function() {
  		SuperMario.saveCurrentGame();
  		var el = document.getElementById("save-game-success");
  		el.style.display = "block";
  		window.setTimeout(function() {
  			el.style.display = "none";
  		}, 1000);
	}

	SuperMario.reset();
	var ts = $routeParams.timestamp;

	var games = SuperMario.savedGames();
	var game = games[ts];
	// la partie est trouvée, on la démarre
	if (games != {} && game != undefined && game.constructor == Object) {
		$scope.gameExists = true;
		SuperMario.start(game.coins, game.lives, game.level, game.mario, game.room.view_x, game.worldId);
	// sinon on indique à angularjs que la partie n'existe pas pour afficher un message d'erreur
	} else {
		$scope.gameExists = false;
	}
}

function GameOverCtrl($scope) {
	SuperMario.reset();
	
	// Musique de Game Over
	SuperMario.sounds.gameOver.play();
}

function PartiesCtrl($scope) {
	SuperMario.reset();
	
	$scope.games = SuperMario.savedGames();

	$scope.timestampToDate = timestampToDate;

	$scope.hasSavedGames = ! _.isEmpty($scope.games);

	$scope.remove = function(id)
	{
		SuperMario.removeSavedGame(id);
		$scope.games = SuperMario.savedGames();

		$scope.hasSavedGames = ! _.isEmpty($scope.games);
	}
	
	// Musique des scores
	SuperMario.sounds.scoresTheme.play();
}

function WorldsCtrl($scope) {
	SuperMario.reset();
	
	// Musique du menu des mondes.
	SuperMario.sounds.letsAGo.play();
	var worldList = document.getElementById('worldList');
	var worldButton = function (text, worldIndex) {
		var thisWorld = document.createElement('button');
		thisWorld.className="btn";
		thisWorld.appendChild(document.createTextNode(text));
		thisWorld.onclick = function(){SuperMario.selectedWorld=worldIndex;document.location.href='#/game';};
		return thisWorld;
	};
	
	// Boutons des mondes par défaut
	for (var i = 0; i < worldsInfo.length - 1; i++) {
		worldList.appendChild(new worldButton('World ' + (i+1), i));
		worldList.appendChild(document.createElement('br'));
	}
	
	// S'il y a des niveaux qui ont été crées dans l'éditeur, on affiche le bouton du monde custom
	if (worldsInfo[i][0] != "")
		worldList.appendChild(new worldButton('Custom World', i));
}

HomeCtrl.$inject = ['$scope'];
GameCtrl.$inject = ['$scope'];
CreditsCtrl.$inject = ['$scope'];
GameOverCtrl.$inject = ['$scope'];
PartiesCtrl.$inject = ['$scope'];
SavedGameCtrl.$inject = ['$scope', '$routeParams'];
WorldsCtrl.$inject = ['$scope'];