Game.addClass({
	'name': 'BlocSpecial',
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('blocSpecialSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_BLOC_SPECIAL = [1,2,3,4];
		this.sprite.STATUS_BLOC_TAPE = [5,5];
		this.sprite.STATUS_BLOC_TOURNE = [6,7,8,9];
		this.sprite.tiles = this.sprite.STATUS_BLOC_SPECIAL;
		this.state = Element.STATE_STAND;
		this.items = {
			'Piece' : 0//,
			//'Champignon' : 1 // Ou autres objets à implémenter dans le futur.
		};
		this.container = this.items.Piece;
		this.pixelsNumToMove = 2;
	},

	'moveAfterJump': function()
	{
		if (this.state == Element.STATE_STAND && this.sprite.tiles != this.sprite.STATUS_BLOC_TAPE) {
			this.state = Element.STATE_MOVE;
			var moveDown = function()
			{
				Game.instanceCreate(this.x,this.y,Piece).destroy();
				this.sprite.tiles = this.sprite.STATUS_BLOC_TAPE;
				this.moveToPoint(this.x,this.y+this.pixelsNumToMove,1,function(){
					this.state = Element.STATE_STAND;
					this.vspeed = 0;
				});
			};
			this.moveToPoint(this.x,this.y-this.pixelsNumToMove,1,moveDown);
		}
	},

	'eventClick': function()
	{
		if (this.isMouseOver()) {
			this.moveAfterJump();
		}
	}
});
