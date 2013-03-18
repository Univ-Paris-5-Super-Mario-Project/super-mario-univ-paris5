var SuperMario = {
  start: function() {
    Game.infoGameBuilder = false;
    Game.setRooms([new Room(592,400)]);

    Game.gameEnd = function() {
    };
    Game.gameStart = function()
    {
      // Compteur de pièces à 0
      Piece.counter = 0;

      // Suppression des instances créées dans les parties précédentes
      var types = [Piece, PieceController, Mario, BlocSpecial];
      _.each(types, function(t) {
        var instances = Game.getInstancesByType(t);

        _.each(instances, function(p) {
          Game.instanceDestroy(p);
        });
      });

      // Création des différents éléments
      Game.instanceCreate(280,192,Mario);
      Game.instanceCreate(10,13,PieceController);
      Game.instanceCreate(200,192,Piece);
      Game.instanceCreate(250,192,Piece);
      Game.instanceCreate(300,192,Piece);
      Game.instanceCreate(350,192,Piece);
      Game.instanceCreate(200,240,BlocSpecial);
    };
    Game.loadAndRun('jeu',
    {
      'marioSpriteLeft': 'img/game/marioSpriteLeft.png',
      'marioSpriteRight': 'img/game/marioSpriteRight.png',
      'blocSpecialSprite': 'img/game/blocSpecialSprite.png',
      'coinSprite': 'img/game/coinSprite.png'
    });
  }
}
