function HomeCtrl($scope) {
  Game.end = true;
}

function CreditsCtrl($scope) {
}

function GameCtrl($scope) {
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

		var games_as_string = localStorage['saved_games'];

		// si aucune partie n'a été enregistrée, on initialise les parties enregistrées à une liste vide
		if (games_as_string == undefined || JSON.parse(games_as_string).constructor != Object) {
			localStorage['saved_games'] = games_as_string = JSON.stringify({});
		}

		// On rajoute la partie en cours aux parties enregistrées, sous forme de JSON car
		// localStorage n'accepte pas d'objets javascript tel que Game, Mario, Piece, etc.
		var saved_games = JSON.parse(games_as_string);
		saved_games['' + timestamp] = data;
		localStorage['saved_games'] = JSON.stringify(saved_games);
	}
}

function GameOverCtrl($scope) {
}

function PartiesCtrl($scope) {

	$scope.games = JSON.parse(localStorage['saved_games']);

	console.log($scope.games);

}

HomeCtrl.$inject = ['$scope'];
GameCtrl.$inject = ['$scope'];
CreditsCtrl.$inject = ['$scope'];
GameOverCtrl.$inject = ['$scope'];
PartiesCtrl.$inject = ['$scope'];