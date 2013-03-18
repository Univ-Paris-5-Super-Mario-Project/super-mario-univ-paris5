Game.addClass({
	'name': 'Piece',
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('coinSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0.2;
		this.sprite.tiles = [1,2,3,4];
		this.sprite.STOP_SPINNING = [1];
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
				piece.sprite.tiles = piece.sprite.STOP_SPINNING;
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
		this.sprite.tiles = [1,2,3,4];
	},

	'eventStep': function()
	{
		this.drawText({
			'text': Piece.counter,
			'x': 10,
			'y': 10
		});
	}
});
