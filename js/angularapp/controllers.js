function HomeCtrl($scope) {
  Game.end = true;
}

function CreditsCtrl($scope) {
}

function GameCtrl($scope) {
  SuperMario.start();
}

function GameOverCtrl($scope) {

}

HomeCtrl.$inject = ['$scope'];
GameCtrl.$inject = ['$scope'];
CreditsCtrl.$inject = ['$scope'];
GameOverCtrl.$inject = ['$scope'];