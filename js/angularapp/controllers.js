function HomeCtrl($scope) {
  Game.end = true;
}

function CreditsCtrl($scope) {
}

function GameCtrl($scope) {
  Game.infoGameBuilder = false;
  Game.setRooms([new Room(592,400)]);

  Game.gameEnd = function() {
  };
  Game.gameStart = function()
  {
    // Compteur de pièces à 0
    Piece.counter = 0;

    // Suppression des instances créées dans les parties précédentes
    var types = [Piece, PieceController, Mario];
    _.each(types, function(t) {
      var instances = Game.getInstancesByType(t);

      _.each(instances, function(p) {
        Game.instanceDestroy(p);
      });
    });

    // Création des différents éléments
    Game.instanceCreate(280,192,Mario);
    Game.instanceCreate(25,13,PieceController);
    Game.instanceCreate(200,192,Piece);
    Game.instanceCreate(250,192,Piece);
    Game.instanceCreate(300,192,Piece);
    Game.instanceCreate(350,192,Piece);
  };
  Game.loadAndRun('jeu',
  {
    'marioSpriteLeft': 'img/game/marioSpriteLeft.png',
    'marioSpriteRight': 'img/game/marioSpriteRight.png',
    'coinSprite': 'img/game/coinSprite.png'
  });
}

HomeCtrl.$inject = ['$scope'];
GameCtrl.$inject = ['$scope'];
CreditsCtrl.$inject = ['$scope'];