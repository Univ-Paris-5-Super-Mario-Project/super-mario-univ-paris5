Game.addClass({
	'name': 'Piece',
	'eventCreate': function()
	{
		this.collideSolid = false;
		this.coinSound = new buzz.sound("sound/game/coin.wav");
		this.sprite = new Sprite(Game.getImage('coinSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_SPINNING = [1,2,3,4];
		this.sprite.STATUS_NOT_SPINNING = [1];
		this.sprite.tiles = this.sprite.STATUS_SPINNING;
		this.state = Element.STATE_STAND;
		this.pixelsNumToMove = 24;
	},

	'animatePickUp': function()
	{
		if (this.state == Element.STATE_STAND) {
			this.checkForCollisions = false;
			this.state = Element.STATE_MOVE;
			var moveUp = function()
			{
				this.vspeed = 0;
				this.sprite.tiles = this.sprite.STATUS_NOT_SPINNING;
				var piece = this;
				setTimeout(
					function()
					{
						Game.instanceDestroy(piece);
					},300
				);
			};
			this.moveToPoint(this.x,this.y-this.pixelsNumToMove,4,moveUp);
		}
	},

	'pickUp' : function()
	{
		Piece.counter++;
		this.coinSound.play();
		this.animatePickUp();
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
