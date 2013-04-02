// Utiliser cette injection javascript pour pop un bloc special contenant un champignon rouge:
//javascript:Game.instanceCreate(150,250,BlocSpecialChampignonRouge);
Game.addClass({
	'name': 'ObjetMobile',
	'abstract': true,
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('itemsSprite'));
		this.sprite.makeTiles(16,16,0);
		for (var i = 1; i <= 4; i++)
			this.sprite.setMask(i,{});
		this.sprite.imagespeed = 0;
		this.sprite.CHAMPIGNON_ROUGE = [1];
		this.sprite.CHAMPIGNON_VERT = [2];
		this.sprite.CHAMPIGNON_FLEUR = [3];
		this.sprite.CHAMPIGNON_ETOILE = [4];
		this.hspeed = 3;
		this.vspeed = 8;
	},
	'eventCollisionWith': function(other)
	{
		var otherMask = other.sprite.getMask();
		var thisMask = this.sprite.getMask();
		if (!other.instanceOf(Monstre) && !other.instanceOf(ObjetMobile) && !other.instanceOf(Piece) && other.y + otherMask.y + otherMask.height >= this.y + thisMask.y && other.y + otherMask.y + otherMask.height <= this.y + thisMask.y + thisMask.height) {
			if (other.instanceOf(Mario))
				this.pickUp();
			else
				this.hspeed *= -1;
		}
	},
	'popOut': function ()
	{
		// Lorsqu'on tape un bloc et que l'objet en sort.
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
	'name': 'ChampignonRouge',
	'parent': 'ObjetMobile',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles = this.sprite.CHAMPIGNON_ROUGE;
	},
	'pickUp': function ()
	{
		// Ici faire disparaitre le champignon et faire grandir Mario.
		SuperMario.sounds.powerUp.play();
		mainMario.becomeBig();
		Game.instanceDestroy(this);
	}
});

Game.addClass({
	'name': 'ChampignonVert',
	'parent': 'ObjetMobile',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles = this.sprite.CHAMPIGNON_VERT;
	},
	'pickUp': function ()
	{
		// Ici faire disparaitre le champignon et incrementer le compteur de vies si on en met un.
		SuperMario.sounds.oneUp.play();
		mainMario.oneUp();
		Game.instanceDestroy(this);
	}
});

Game.addClass({
	'name': 'Piece',
	'eventCreate': function()
	{
		this.collideSolid = false;
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
		SuperMario.sounds.coin.play();
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
