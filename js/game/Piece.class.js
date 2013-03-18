Game.addClass({
	'name': 'Piece',
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('coinSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_SPINNING = [1,2,3,4];
		this.sprite.STATUS_NOT_SPINNING = [1];
		this.sprite.tiles = this.sprite.STATUS_SPINNING;
		this.coinSound = new buzz.sound("sound/game/coin.wav");
	},

	'destroy': function()
	{
		this.vspeed = -4;
		this.coinSound.play();
		this.checkForCollisions = false;

		var piece = this;			
		setTimeout(
			function()
			{
				piece.vspeed = 0;
				piece.sprite.tiles = piece.sprite.STATUS_NOT_SPINNING;
				setTimeout(
					function()
					{
						Game.instanceDestroy(piece);
					},300
				);
			},200
		);
	}
});

Game.addClass({
	'name': 'PieceController',

	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('coinSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_SPINNING = [1,2,3,4];
		this.sprite.STATUS_NOT_SPINNING = [1];
		this.sprite.tiles = this.sprite.STATUS_SPINNING;
	},

	'eventStep': function()
	{
		this.drawText({
			'text': 'x ' + Piece.counter,
			'x': this.x + 20, // Positionne le nombre de pieces en fonction de la position l'image de la piece.
			'y': this.y - 3
		});
	}
});
