Game.addClass({
	'name': 'Koopa',
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('koopaSprite'));
		this.sprite.makeTiles(16,32,0);
		for (var i = 1; i <= 6; i++)
			this.sprite.setMask(i,{y:5,height:27});
		this.sprite.STAND_LEFT = [1,1];
		this.sprite.MOVE_LEFT = [1,2];
		this.sprite.STAND_RIGHT = [6,6];
		this.sprite.MOVE_RIGHT = [6,5];
		this.sprite.DANCE_RABBI_JACOB = [3,4];
		this.sprite.imagespeed = 0.2;
		this.sprite.tiles = this.sprite.MOVE_RIGHT;
		this.state = Element.STATE_MOVE_LEFT;
//		this.gravity = 0.2;
		this.hspeed = 2;
		this.vspeed = 8;
		this.top = this.y + 5;
		this.bottom = this.y + 32;
	},
	'eventCollisionWith': function(other)
	{
		var otherMask = other.sprite.getMask();
		var thisMask = this.sprite.getMask();
//		if (other.y<this.y)
//			document.title = (other.y + otherMask.y) + ' >= ' + (this.y + thisMask.y) + ' ' + (other.y + otherMask.y + otherMask.height) + ' <= ' + (this.y + thisMask.y + thisMask.height);
		if (!other.instanceOf(Koopa) && !other.instanceOf(Mario) && other.y + otherMask.y + otherMask.height >= this.y + thisMask.y && other.y + otherMask.y + otherMask.height <= this.y + thisMask.y + thisMask.height) {
			this.hspeed *= -1;
			if (this.hspeed > 0)
				this.sprite.tiles = this.sprite.MOVE_RIGHT;
			else
				this.sprite.tiles = this.sprite.MOVE_LEFT;
		} else if (other.instanceOf(Mario)) {
				this.sprite.tiles = this.sprite.DANCE_RABBI_JACOB;
		}
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
