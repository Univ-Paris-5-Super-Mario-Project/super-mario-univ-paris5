angular.module('super-mario', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/home', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      when('/game', {templateUrl: 'partials/game.html', controller: GameCtrl}).
      when('/game/:timestamp', {templateUrl: 'partials/game.html', controller: SavedGameCtrl}).
      when('/credits', {templateUrl: 'partials/credits.html', controller: CreditsCtrl}).
      when('/game-over', {templateUrl: 'partials/game-over.html', controller: GameOverCtrl}).
      when('/parties', {templateUrl: 'partials/parties.html', controller: PartiesCtrl}).
      when('/worlds', {templateUrl: 'partials/worlds.html', controller: WorldsCtrl}).
      otherwise({redirectTo: '/home'});
}]);
