Game.addClass({
	name: 'Mario',
	eventCreate: function()
	{
		//D�finition des diff�rents sprites de l'�l�ment Mario
		this.spriteLeft =new Sprite(Game.getImage('marioSpriteLeft'));
		this.spriteLeft.makeTiles(16,32,0);
		this.spriteLeft.STAND_LEFT      = [7,7];
		this.spriteLeft.STAND_DOWN_LEFT = [1,1];
		this.spriteLeft.MOVE_UP_LEFT    = [3,3];
		this.spriteLeft.MOVE_LEFT       = [7,6,5];
		this.spriteLeft.imagespeed      = 0.2;
		
		this.spriteRight = new Sprite(Game.getImage('marioSpriteRight'));
		this.spriteRight.makeTiles(16,32,0);
		this.spriteRight.STAND_RIGHT      = [1,1];
		this.spriteRight.STAND_DOWN_RIGHT = [7,7];
		this.spriteRight.MOVE_UP_RIGHT    = [5,5];
		this.spriteRight.MOVE_RIGHT       = [1,2,3];
		this.spriteRight.imagespeed       = 0.2;
		
		//Statut de d�part de Mario
		this.state = Element.STATE_STAND_RIGHT;
		
		//D�finition de la vitesse verticale et horizontale de l'�l�ment
		this.NB_PIX_DEPLACEMENT_HORIZ = 4;
		this.NB_PIX_DEPLACEMENT_VERTIC = 6;
		
		// Doc : Indique si l'instance doit �tre t�l�port�e de l'autre c�t� de la room lorsqu'elle sort de celle-ci.
		this.switchPositionWhenLeave = true;
		
	},
	
	//Doc : M�thode appel�e au d�but de chaque Step, juste avant le d�placement de l'�l�ment.
	//Elle sert principalement � modifier les statuts de l'objet avant le d�placement et l'animation de celui-ci
	eventStartStep: function()
	{
		switch (this.state)
		{
			case Element.STATE_STAND_LEFT:
				this.sprite       = this.spriteLeft;
				this.sprite.tiles = this.sprite.STAND_LEFT;
				this.hspeed       = 0;
				this.vspeed       = 0;
			break;

			case Element.STATE_STAND_RIGHT:
				this.sprite       = this.spriteRight;
				this.sprite.tiles = this.sprite.STAND_RIGHT;
				this.hspeed       = 0;
				this.vspeed       = 0;
			break;
			
			case Element.STATE_STAND_DOWN_LEFT :
				this.sprite       = this.spriteLeft;
				this.sprite.tiles = this.sprite.STAND_DOWN_LEFT;
				this.hspeed       = 0;
				this.vspeed       = 0;
			break;

			case Element.STATE_STAND_DOWN_RIGHT:
				this.sprite       = this.spriteRight;
				this.sprite.tiles = this.sprite.STAND_DOWN_RIGHT;
				this.hspeed       = 0;
				this.vspeed       = 0;
			break;
			
			case Element.STATE_MOVE_LEFT:
				this.sprite       = this.spriteLeft;
				this.sprite.tiles = this.sprite.MOVE_LEFT;
				this.hspeed       = -(this.NB_PIX_DEPLACEMENT_HORIZ);
				this.vspeed       = 0;
			break;

			case Element.STATE_MOVE_RIGHT :
				this.sprite       = this.spriteRight;
				this.sprite.tiles = this.sprite.MOVE_RIGHT;
				this.hspeed       = this.NB_PIX_DEPLACEMENT_HORIZ;
				this.vspeed       = 0;
			break;
			
			case Element.STATE_MOVE_UP_LEFT:
				this.sprite       = this.spriteLeft;
				this.sprite.tiles = this.sprite.MOVE_UP_LEFT;
				this.vspeed       = -(this.NB_PIX_DEPLACEMENT_VERTIC);
			break;

			case Element.STATE_MOVE_UP_RIGHT:
				this.sprite       = this.spriteRight;
				this.sprite.tiles = this.sprite.MOVE_UP_RIGHT;
				this.vspeed       = -(this.NB_PIX_DEPLACEMENT_VERTIC);
			break;
		}
	},
	
/*
	// Doc : M�thode appel�e au milieu de chaque Step, juste apr�s le d�placement de l'�l�ment et son animation de Sprite.
	'eventStep': function()
	{
	},

	// Doc : M�thode appel�e � la fin de chaque Step, juste apr�s son affichage et son test des collisions.
	'eventEndStep': function()
	{
	},
	*/		
	// Doc : M�thode appel�e lorsqu'une touche du clavier reste press�e. Le param�tre indique le code ASCII de la touche press�e.
	// quand KEY_LEFT est press�e le status de Mario est STATE_MOVE_LEFT
	// quand KEY_RIGHT est press�e le statut de Mario est STATE_MOVE_RIGHT
	eventKeyPressed: function(key)
	{
		switch (key)
		{
			case Game.KEY_LEFT:
				if (this.state != Element.STATE_STAND_DOWN_LEFT && this.state != Element.STATE_STAND_DOWN_RIGHT)
				{
					this.state = Element.STATE_MOVE_LEFT;
				}
			break;
			
			case Game.KEY_RIGHT:
				if (this.state != Element.STATE_STAND_DOWN_LEFT && this.state != Element.STATE_STAND_DOWN_RIGHT)
				{
					this.state = Element.STATE_MOVE_RIGHT;
				}
			break;
			
			case Game.KEY_DOWN:
				if (this.state == Element.STATE_MOVE_LEFT || this.state == Element.STATE_STAND_LEFT)
				{
					this.state = Element.STATE_STAND_DOWN_LEFT;
				}
				else if (this.state == Element.STATE_MOVE_RIGHT || this.state == Element.STATE_STAND_RIGHT)
				{
					this.state = Element.STATE_STAND_DOWN_RIGHT;
				}
			break;
			
			case Game.KEY_UP:
				if (this.state == Element.STATE_STAND_LEFT || this.state == Element.STATE_MOVE_LEFT)
				{
					this.state = Element.STATE_MOVE_UP_LEFT;
				}
				else if (this.state == Element.STATE_STAND_RIGHT || this.state == Element.STATE_MOVE_RIGHT)
				{
					this.state = Element.STATE_MOVE_UP_RIGHT;
				}
			break;
		}
	},
/*
	// Doc : M�thode appel�e lorsqu'une touche du clavier est abaiss�e. Le param�tre indique le code ASCII de la touche abaiss�e.
	'eventKeyDown': function(key)
	{
	}
	*/

	// Doc : M�thode appel�e lorsqu'une touche du clavier est relev�e. Le param�tre indique le code ASCII de la touche relev�e.
	// Quand on rel�che KEY_LEFT et que KEY_RIGHT n'est pas press� alors Mario passe en STATE_STAND_LEFT
	// Quand on rel�che KEY_RIGHT et que KEY_LEFT n'est pas press� alors Mario passe en STATE_STAND_RIGHT
	// Quand on rel�che KEY_DOWN alors Mario passe en STAND_LEFT ou STAND_RIGHT selon son state
	eventKeyUp: function(key)
	{
		if (key == Game.KEY_LEFT && ! Game.isKeyPressed(Game.KEY_RIGHT))
		{
			if (	! (this.state == Element.STATE_STAND_DOWN_LEFT || this.state == Element.STATE_STAND_DOWN_RIGHT) )
			{
				this.state = Element.STATE_STAND_LEFT;
			}			
		}
		else if (key == Game.KEY_RIGHT && ! Game.isKeyPressed(Game.KEY_LEFT))
		{
			if(	! (this.state == Element.STATE_STAND_DOWN_LEFT || this.state == Element.STATE_STAND_DOWN_RIGHT) )
			{
				this.state = Element.STATE_STAND_RIGHT;
			}
		}
		else if (key == Game.KEY_DOWN)
		{
			switch (this.state)
			{
				case Element.STATE_STAND_DOWN_LEFT :
					this.state = Element.STATE_STAND_LEFT;
				break;

				case Element.STATE_STAND_DOWN_RIGHT :
					this.state = Element.STATE_STAND_RIGHT;
				break;
			}
		}
		else if (key == Game.KEY_UP)
		{
			switch (this.state)
			{
				case Element.STATE_MOVE_UP_LEFT :
					this.state = Element.STATE_STAND_LEFT;
				break;

				case Element.STATE_MOVE_UP_RIGHT :
					this.state = Element.STATE_STAND_RIGHT;
				break;
			}
		}
	},

  eventCollisionWith: function(other)
	{
		if (other.instanceOf(Piece))
		{
			this.toFirstPlan();
			other.pickUp();
		}
		else if (other.instanceOf(BlocSpecial))
		{
			other.hitBlock();
		}
	},

});
