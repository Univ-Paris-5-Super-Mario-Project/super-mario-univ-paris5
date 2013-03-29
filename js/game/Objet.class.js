Game.addClass({
	'name': 'Piece',
	'eventCreate': function()
	{
		this.collideSolid = false;
		this.coinSound = new buzz.sound("sound/effects/coin.wav");
		this.sprite = new Sprite(Game.getImage('coinSprite'));
		this.sprite.makeTiles(16,16,0);
		for (var i = 1; i <= 4; i++)
			this.sprite.setMask(i,{x:2,width:12});
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
	},
	'eventInsideView': function()
	{
		this.setActive(true);
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	}
});

Game.addClass({
	'name': 'PieceController',

	eventCreate: function()
	{
		this.sprite = new Sprite(Game.getImage('coinSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_SPINNING = [1,2,3,4];
		this.sprite.STATUS_NOT_SPINNING = [1];
		this.sprite.tiles = this.sprite.STATUS_SPINNING;
		this.x = Game.room.view_x + 10;
		this.y = 12;
	},

	eventStep: function()
	{
		this.x = Game.room.view_x + 10;
		this.drawText({
			'text': 'x ' + Piece.counter,
			'x': 30, // Positionne le nombre de pieces en fonction de la position l'image de la piece.
			'y': this.y - 5
		});
	}
});