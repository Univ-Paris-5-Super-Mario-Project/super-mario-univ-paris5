Game.addClass({
	'name': 'BlocSpecial',
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('blocSpecialSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_BLOC_SPECIAL = [1,2,3,4];
		this.sprite.STATUS_BLOC_TAPE = [5,5];
//		this.sprite.STATUS_BLOC_TOURNE = [6,7,8,9];
		this.sprite.tiles = this.sprite.STATUS_BLOC_SPECIAL;
	},

	'eventClick': function()
	{
		if (this.isMouseOver()) {
			this.vspeed = -4;
			this.checkForCollisions = false;
			var bloc = this;
			bloc.sprite.tiles = bloc.sprite.STATUS_BLOC_TAPE;
			setTimeout(
				function()
				{
					bloc.vspeed = 4;
					setTimeout(
						function()
						{
							bloc.vspeed = 0;
							this.y = yPos;
						},80
					);
				},80
			);
		}
	}
});
