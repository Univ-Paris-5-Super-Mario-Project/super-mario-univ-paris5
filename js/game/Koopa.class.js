Game.addClass({
	'name': 'Koopa',
	'eventCreate': function()
	{
		this.sprite =new Sprite(Game.getImage('koopaSprite'));
		this.sprite.makeTiles(16,32,0);
		this.sprite.STAND_LEFT = [1,1];
		this.sprite.MOVE_LEFT = [1,1];
		this.sprite.STAND_RIGHT = [1,1];
		this.sprite.MOVE_RIGHT = [1,1];
		this.sprite.imagespeed = 0.2;
		this.sprite.tiles = this.sprite.STAND_LEFT;
		this.state = Element.STATE_STAND_LEFT;
		this.gravity = 6;
		this.hspeed = 4;
	},
	'eventStartStep': function()
	{
		//
	}
});
