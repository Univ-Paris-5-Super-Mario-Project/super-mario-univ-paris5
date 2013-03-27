Game.addClass({
	'name': 'Koopa',
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('koopaSprite'));
		this.sprite.makeTiles(16,32,0);
		this.sprite.setMask(1,{y:5,height:27});
		this.sprite.setMask(2,{y:5,height:27});
		this.sprite.setMask(5,{y:5,height:27});
		this.sprite.setMask(6,{y:5,height:27});
		this.sprite.STAND_LEFT = [1,1];
		this.sprite.MOVE_LEFT = [1,2];
		this.sprite.STAND_RIGHT = [6,6];
		this.sprite.MOVE_RIGHT = [6,5];
		this.sprite.imagespeed = 0.2;
		this.sprite.tiles = this.sprite.MOVE_RIGHT;
		this.state = Element.STATE_MOVE_LEFT;
//		this.gravity = 0.2;
		this.hspeed = 2;
		this.vspeed = 8;
		this.solid = true;
		this.top = this.y + 5;
		this.bottom = this.y + 32;
	},
	'eventCollisionWith': function(other)
	{
//		document.title=other.y + ' ' + (this.y + this.sprite.getMask().y);
		if (false) {
			this.hspeed *= -1;
			if (this.hspeed > 0)
				this.sprite.tiles = this.sprite.MOVE_RIGHT;
			else
				this.sprite.tiles = this.sprite.MOVE_LEFT;
		}
	},
	'eventOutsideView': function()
	{
		//Game.instanceDestroy(this);
	}
});
