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
  		SuperMario.saveCurrentGame();
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

	$scope.hasSavedGames = ! _.isEmpty($scope.games);

	$scope.remove = function(id)
	{
		SuperMario.removeSavedGame(id);
		$scope.games = SuperMario.savedGames();

		$scope.hasSavedGames = ! _.isEmpty($scope.games);
	}
}

HomeCtrl.$inject = ['$scope'];
GameCtrl.$inject = ['$scope'];
CreditsCtrl.$inject = ['$scope'];
GameOverCtrl.$inject = ['$scope'];
PartiesCtrl.$inject = ['$scope'];
SavedGameCtrl.$inject = ['$scope', '$routeParams'];