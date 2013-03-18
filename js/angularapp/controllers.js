function HomeCtrl($scope) {
  Game.end = true;
}

function CreditsCtrl($scope) {
}

function GameCtrl($scope) {
  SuperMario.start();
}

HomeCtrl.$inject = ['$scope'];
GameCtrl.$inject = ['$scope'];
CreditsCtrl.$inject = ['$scope'];
