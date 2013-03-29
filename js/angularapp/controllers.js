function HomeCtrl($scope) {
  Game.end = true;
}

function CreditsCtrl($scope) {
}

function GameCtrl($scope) {
	$scope.gameExists = true; // indique à Angular qu'il faut afficher le canvas car cette partie est disponible
  	SuperMario.start();

  // fonction de sauvegarde de la partie en cours
  $scope.saveCurrentGame = function() {
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
			level: Game.room.path
		};

		// On rajoute la partie en cours aux parties enregistrées, sous forme de JSON car
		// localStorage n'accepte pas d'objets javascript tel que Game, Mario, Piece, etc.
		var saved_games = SuperMario.savedGames();
		saved_games['' + timestamp] = data; // le '' + timestamp permet de convertir le timestamp (de type int) en chaine de caractères
		localStorage['saved_games'] = JSON.stringify(saved_games);
	}
}

function SavedGameCtrl($scope, $routeParams, $location) {
	var ts = $routeParams.timestamp;

	var games = SuperMario.savedGames();
	var game = games[ts];
	// la partie est trouvée, on la démarre
	if (games != {} && game != undefined && game.constructor == Object) {
		$scope.gameExists = true;
		SuperMario.start(game.coins, game.level, game.mario);
	// sinon on indique à angularjs que la partie n'existe pas pour afficher un message d'erreur
	} else {
		$scope.gameExists = false;
	}
}

function GameOverCtrl($scope) {
}

function PartiesCtrl($scope) {

	$scope.games = SuperMario.savedGames();

}

HomeCtrl.$inject = ['$scope'];
GameCtrl.$inject = ['$scope'];
CreditsCtrl.$inject = ['$scope'];
GameOverCtrl.$inject = ['$scope'];
PartiesCtrl.$inject = ['$scope'];
SavedGameCtrl.$inject = ['$scope', '$routeParams'];