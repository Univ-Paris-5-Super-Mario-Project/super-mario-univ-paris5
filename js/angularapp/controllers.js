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
		var data = {
			timestamp: new Date().getTime(),
			pieces: Piece.counter,
			mario: {
				x: m.x,
				y: m.y
			},
			level: Game.room.path
		};

		// si aucune partie n'a été enregistrée, on initialise les parties enregistrées à une liste vide
		if ( ! localStorage['saved_games']) {
			localStorage['saved_games'] = JSON.stringify([]);
		}

		// On rajoute la partie en cours aux parties enregistrées, sous forme de JSON car
		// localStorage n'accepte pas d'objets javascript tel que Game, Mario, Piece, etc.
		var saved_games = JSON.parse(localStorage['saved_games']);
		saved_games.push(data);
		localStorage['saved_games'] = JSON.stringify(saved_games);
	}
}

function GameOverCtrl($scope) {

}

HomeCtrl.$inject = ['$scope'];
GameCtrl.$inject = ['$scope'];
CreditsCtrl.$inject = ['$scope'];
GameOverCtrl.$inject = ['$scope'];