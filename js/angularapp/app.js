angular.module('super-mario', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/home', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      when('/game', {templateUrl: 'partials/game.html', controller: GameCtrl}).
      otherwise({redirectTo: '/home'});
}]);