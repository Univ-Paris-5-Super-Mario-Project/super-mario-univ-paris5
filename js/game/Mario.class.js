/**
 * Saut, puis taper un bloc avec la tête puis flèche horizontal => Mario continue de monter
 */

Game.addClass({
	name: 'Mario',
	eventCreate: function()
	{
		window.mainMario = this;
		// Left sprites
		this.spriteLeft =new Sprite(Game.getImage('marioSpriteLeft'));
		this.spriteLeft.makeTiles(16,32,0);

		// Collision mask for left moves
		this.spriteLeft.setMask(1,
			{
				y: 14,
				height: 18
			}
		);
		for (var i = 2; i <= 7; i++)
		{
			this.spriteLeft.setMask(i,
				{
					y: 5,
					height: 27
				}
			);
		}

		// Sprites for moves to the left
		this.spriteLeft.STAND_LEFT      = [7,7];
		this.spriteLeft.STAND_DOWN_LEFT = [1,1];
		this.spriteLeft.MOVE_UP_LEFT    = [3,3];
		this.spriteLeft.MOVE_LEFT       = [7,6,5];
		this.spriteLeft.imagespeed      = 0.2;
		
		// Right sprites
		this.spriteRight = new Sprite(Game.getImage('marioSpriteRight'));
		this.spriteRight.makeTiles(16,32,0);

		// Collision mask for right moves
		for (var i = 1; i <= 6; i++)
		{
			this.spriteRight.setMask(i,
				{
					y:5,
					height:27
				}
			);
		}
		this.spriteRight.setMask(7,
			{
				y:14,
				height:18
			}
		);

		// Sprites for moves to the right
		this.spriteRight.STAND_RIGHT      = [1,1];
		this.spriteRight.STAND_DOWN_RIGHT = [7,7];
		this.spriteRight.MOVE_UP_RIGHT    = [5,5];
		this.spriteRight.MOVE_RIGHT       = [1,2,3];
		this.spriteRight.imagespeed       = 0.2;
		
		//Statut de départ de Mario
		this.state = Element.STATE_STAND_RIGHT;
		this.subState = this.state;
		this.sprite = this.spriteRight;
		this.sprite.tiles = this.sprite.STAND_RIGHT;
		
		//Définition de la vitesse verticale et horizontale de l'élément
		this.NB_PIX_DEPLACEMENT_HORIZ = 6;
		this.NB_PIX_DEPLACEMENT_VERTIC = 6;
		this.NB_PIX_SAUT = 16;
		
		//Définition de la gravité de l'élément
		this.gravity = 0;
		
		// Indique si l'instance doit être téléportée de l'autre côté de la room lorsqu'elle sort de celle-ci.
		this.switchPositionWhenLeave = false;
	},
	
	// Retourne true si Mario est sur un Element solide, false autrement
	isAboveSolid: function()
	{
		var mask = this.sprite.getMask();
		return true !== Game.placeIsFree(this.x + mask.x, this.y + mask.y + mask.height, mask.width, 1);
	},
	
	// Retourne true si la tête de Mario touche un Element solide, false autrement
	headTouchSolid: function()
	{
		var mask = this.sprite.getMask();
		return true !== Game.placeIsFree(this.x + mask.x, this.y + mask.y - 1, mask.width, 1);
	},

	isDown: function()
	{
		return this.state == Element.STATE_STAND_DOWN_LEFT || this.state == Element.STATE_STAND_DOWN_RIGHT;
	},

	// Modifie le sprite de Mario en fonction de son statut
	eventStartStep: function()
	{
		// Empeche Mario de sortir à gauche de l'écran:
		if (this.x < Game.room.view_x + 15 && this.hspeed < 0) {
			this.hspeed = 0;
		}

		// Empeche Mario de sortir à droite de l'écran:
		if (this.x > Game.room.width - 25 && this.hspeed > 0) {
			this.hspeed = 0;
		}

		// Mario se releve
		if (this.isDown() && ! Game.isKeyPressed(Game.KEY_DOWN))
		{
			// S'il etait a gauche
			if (this.state == Element.STATE_STAND_DOWN_LEFT)
			{
				this.state = Element.STATE_STAND_LEFT;
			}
			// S'il était à droite
			else if (this.state == Element.STATE_STAND_DOWN_RIGHT)
			{
				this.state = Element.STATE_STAND_RIGHT;
			}
		}

		var isOnGround = this.isAboveSolid();
		// Mario se déplace à gauche
		if (this.hspeed < 0)
		{
			if (isOnGround)
			{
				this.state = Element.STATE_MOVE_LEFT;
			}
			else
			{
				this.state = Element.STATE_MOVE_UP_LEFT;
			}
		}
		// Mario ne se déplace pas
		else if (this.hspeed == 0)
		{
			if (this.state == Element.STATE_MOVE_LEFT || this.state == Element.STATE_MOVE_UP_LEFT)
			{
				this.state = Element.STATE_STAND_LEFT;
			}
			else if (this.state == Element.STATE_MOVE_RIGHT || this.state == Element.STATE_MOVE_UP_RIGHT)
			{
				this.state = Element.STATE_STAND_RIGHT;
			}
		}
		// Mario se déplace à droite
		else // this.hspeed > 0
		{
			if (isOnGround)
			{
				this.state = Element.STATE_MOVE_RIGHT;
			}
			else
			{
				this.state = Element.STATE_MOVE_UP_RIGHT;
			}
		}
		
		switch(this.state)
		{
			case Element.STATE_STAND_LEFT :
				this.sprite = this.spriteLeft;
				this.sprite.tiles=this.spriteLeft.STAND_LEFT;
				break;
			case Element.STATE_STAND_RIGHT :
				this.sprite = this.spriteRight;
				this.sprite.tiles=this.spriteRight.STAND_RIGHT;
				break;

			case Element.STATE_STAND_DOWN_LEFT :
				this.sprite = this.spriteLeft;
				this.sprite.tiles=this.spriteLeft.STAND_DOWN_LEFT;
				break;
			case Element.STATE_STAND_DOWN_RIGHT :
				this.sprite = this.spriteRight;
				this.sprite.tiles=this.spriteRight.STAND_DOWN_RIGHT;
				break;

			case Element.STATE_MOVE_LEFT :
				this.sprite = this.spriteLeft;
				this.sprite.tiles=this.spriteLeft.MOVE_LEFT;
				break;
			case Element.STATE_MOVE_RIGHT :
				this.sprite = this.spriteRight;
				this.sprite.tiles=this.spriteRight.MOVE_RIGHT;
				break;

			case Element.STATE_MOVE_UP_LEFT :
				this.sprite = this.spriteLeft;
				this.sprite.tiles=this.spriteLeft.MOVE_UP_LEFT;
				break;
			case Element.STATE_MOVE_UP_RIGHT :
				this.sprite = this.spriteRight;
				this.sprite.tiles=this.spriteRight.MOVE_UP_RIGHT;
				break;
		}
	},

	eventStep: function()
	{
		// Pas de défilement quand Mario arrive à la fin
		if (this.x >= (Game.room.view_x + Game.room.view_w * 3 / 5)
			&& this.xprev < this.x
			&& Game.room.view_x + Game.room.view_w + 5 < Game.room.width)
		{
			Game.room.view_x += this.NB_PIX_DEPLACEMENT_HORIZ;
		}

		Game.canvas.style.backgroundPosition = -(Game.room.view_x*0.5)+'px bottom';
		document.getElementById('gameBG').style.backgroundPosition = -(Game.room.view_x*0.2)+'px bottom';
	},

	eventEndStep: function()
	{
		// On test si le bloc aux pieds de Mario est solide
		if(this.isAboveSolid())
		{
			// Si bloc solide, Mario ne descend plus => gravité nulle
			this.gravity = 0;
		}
		else
		{
			// Mario monte
			if (this.vspeed < 0)
			{
				this.gravity = 3;
			}
			// Mario descend
			else
			{
				this.gravity = 3.5;
			}
		}
	},
	
	eventKeyPressed: function(key)
	{
		// Tentative d'accroupissage (ou accroupissement) au sol
		if (key == Game.KEY_DOWN && this.isAboveSolid())
		{
			// On ne marche pas accroupi
			this.vspeed = 0;

			// Mario regarde ou va à gauche
			if (this.state == Element.STATE_MOVE_LEFT || this.state == Element.STATE_STAND_LEFT)
			{
				this.state = Element.STATE_STAND_DOWN_LEFT;

			}
			// Mario regarde ou va à droite
			else if (this.state == Element.STATE_MOVE_RIGHT || this.state == Element.STATE_STAND_RIGHT)
			{
				this.state = Element.STATE_STAND_DOWN_RIGHT;
			}
		}
	},
	
	eventKeyDown: function(key)
	{
		// Saut de Mario avec flèche haut ou espace
		if (key == Game.KEY_UP || key == Game.KEY_SPACE)
		{
			// uniquement si Mario est au sol	
			if (this.isAboveSolid()) this.jump();
		}

		if (key == Game.KEY_LEFT)
		{
			this.hspeed = -this.NB_PIX_DEPLACEMENT_HORIZ;
		}

		if (key == Game.KEY_RIGHT)
		{
			this.hspeed = this.NB_PIX_DEPLACEMENT_HORIZ;
		}
	},
	
	eventKeyUp: function(key)
	{
		if (key == Game.KEY_LEFT && ! Game.isKeyPressed(Game.KEY_RIGHT))
		{
			this.hspeed = 0;
		}		
		if (key == Game.KEY_RIGHT && ! Game.isKeyPressed(Game.KEY_LEFT))
		{
			this.hspeed = 0;
		}
	},

	jump: function()
	{
		// Donner une vitesse vers le haut
		this.vspeed = -20;
	},

	eventCollisionWith: function(other)
	{
		var otherMask = other.sprite.getMask();
		var thisMask = this.sprite.getMask();

		if (other.instanceOf(Koopa)) {
			this.die();
		}
		else if (other.instanceOf(Piece))
		{
			this.toFirstPlan();
			other.pickUp();
		}
		else if (other.instanceOf(BlocSpecial))
		{
			other.hitBlock();
		}
	},

	eventOutsideView: function()
	{
		if (this.y > 0)
		{
			this.die();
		}
	},
	
	die: function()
	{
		SuperMario.gameOver();
	}
});
