angular.module('super-mario', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/home', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      when('/game', {templateUrl: 'partials/game.html', controller: GameCtrl}).
      when('/credits', {templateUrl: 'partials/credits.html', controller: CreditsCtrl}).
      otherwise({redirectTo: '/home'});
}]);