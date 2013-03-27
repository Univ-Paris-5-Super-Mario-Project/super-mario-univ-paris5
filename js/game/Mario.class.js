Game.addClass({
	name: 'Mario',
	eventCreate: function()
	{
		// pour le debuggage en console dev
		window.mainMario = this;

		//Définition des différents sprites de l'élément Mario
		this.spriteLeft = new Sprite(Game.getImage('marioSpriteLeft'));
		this.spriteLeft.makeTiles(16,32,0);
		this.spriteLeft.setMask(1,{y:14,height:18});
		for (var i = 2; i <= 4; i++)
			this.spriteLeft.setMask(i,{y:5,height:26});
		for (var i = 5; i <= 7; i++)
			this.spriteLeft.setMask(i,{y:5,height:27});
		this.spriteLeft.STAND_LEFT      = [7,7];
		this.spriteLeft.STAND_DOWN_LEFT = [1,1];
		this.spriteLeft.MOVE_UP_LEFT    = [3,3];
		this.spriteLeft.MOVE_LEFT       = [7,6,5];
		this.spriteLeft.imagespeed      = 0.2;
		
		this.spriteRight = new Sprite(Game.getImage('marioSpriteRight'));
		this.spriteRight.makeTiles(16,32,0);
		for (var i = 1; i <= 3; i++)
			this.spriteLeft.setMask(i,{y:5,height:27});
		for (var i = 4; i <= 6; i++)
			this.spriteLeft.setMask(i,{y:5,height:26});
		this.spriteLeft.setMask(7,{y:14,height:18});
		this.spriteRight.STAND_RIGHT      = [1,1];
		this.spriteRight.STAND_DOWN_RIGHT = [7,7];
		this.spriteRight.MOVE_UP_RIGHT    = [5,5];
		this.spriteRight.MOVE_RIGHT       = [1,2,3];
		this.spriteRight.imagespeed       = 0.2;
		
		//Statut de départ de Mario
		this.state = Element.STATE_STAND_RIGHT;
		
		//Définition de la vitesse verticale et horizontale de l'élément
		this.NB_PIX_DEPLACEMENT_HORIZ = 6;
		this.NB_PIX_DEPLACEMENT_VERTIC = 6;
		this.NB_PIX_SAUT = 16;
		
		//Définition de la gravité de l'élément
		this.gravity = 10;
		this.defaultGravity = this.gravity; // on ne la modifie pas, juste sert de référence
		
		// Doc : Indique si l'instance doit être téléportée de l'autre côté de la room lorsqu'elle sort de celle-ci.
		this.switchPositionWhenLeave = false;

	},
	
	//Doc : Méthode appelée au début de chaque Step, juste avant le déplacement de l'élément.
	//Elle sert principalement à modifier les statuts de l'objet avant le déplacement et l'animation de celui-ci
	eventStartStep: function()
	{
		this.vspeed = 0;

		switch (this.state)
		{
			case Element.STATE_STAND_LEFT:
				this.sprite       = this.spriteLeft;
				this.sprite.tiles = this.sprite.STAND_LEFT;
				this.hspeed       = 0;
			break;

			case Element.STATE_STAND_RIGHT:
				this.sprite       = this.spriteRight;
				this.sprite.tiles = this.sprite.STAND_RIGHT;
				this.hspeed       = 0;
			break;
			
			case Element.STATE_STAND_DOWN_LEFT :
				this.sprite       = this.spriteLeft;
				this.sprite.tiles = this.sprite.STAND_DOWN_LEFT;
				this.hspeed       = 0;
			break;

			case Element.STATE_STAND_DOWN_RIGHT:
				this.sprite       = this.spriteRight;
				this.sprite.tiles = this.sprite.STAND_DOWN_RIGHT;
				this.hspeed       = 0;
			break;
			
			case Element.STATE_MOVE_LEFT:
				this.sprite       = this.spriteLeft;
				this.sprite.tiles = this.sprite.MOVE_LEFT;
				this.hspeed       = -(this.NB_PIX_DEPLACEMENT_HORIZ);
			break;

			case Element.STATE_MOVE_RIGHT :
				this.sprite       = this.spriteRight;
				this.sprite.tiles = this.sprite.MOVE_RIGHT;
				this.hspeed       = this.NB_PIX_DEPLACEMENT_HORIZ;
			break;
			
			case Element.STATE_MOVE_UP_LEFT:
				this.sprite       = this.spriteLeft;
				this.sprite.tiles = this.sprite.MOVE_UP_LEFT;
			break;

			case Element.STATE_MOVE_UP_RIGHT:
				this.sprite       = this.spriteRight;
				this.sprite.tiles = this.sprite.MOVE_UP_RIGHT;
			break;
		}
		// Empecher que Mario ne sorte à gauche de l'écran:
		if (this.state == Element.STATE_MOVE_LEFT || this.state == Element.STATE_MOVE_UP_LEFT)
			this.hspeed *= ((this.x>Game.room.view_x+5)?1:0);
		// Empecher que Mario ne sorte à droite de l'écran:
		if (this.state == Element.STATE_MOVE_RIGHT || this.state == Element.STATE_MOVE_UP_RIGHT)
			this.hspeed *= ((this.x+25<Game.room.width)?1:0);
	},
	
	// Doc : Méthode appelée au milieu de chaque Step, juste après le déplacement de l'élément et son animation de Sprite.
	eventStep: function()
	{
		
		//on récupère le masque du sprite en cours
		var mask=this.sprite.getMask();
		// on test la présence d'un bloc solide sous le sprite de Mario
		if( Game.placeIsFree(this.x+mask.x,this.y+mask.y,mask.width,mask.height+1)!==true )
		{
			// il y a un bloc -> Mario est "sur terre"
			if(this.state==Element.STATE_MOVE_UP_LEFT)
				this.state=Element.STATE_STAND_LEFT;
			else if(this.state==Element.STATE_MOVE_UP_RIGHT)
				this.state=Element.STATE_STAND_RIGHT;
		}
		
		if (this.x >= (Game.room.view_x + Game.room.view_w *3/ 5) && this.xprev < this.x && Game.room.view_x + Game.room.view_w + 5 < Game.room.width) Game.room.view_x += this.NB_PIX_DEPLACEMENT_HORIZ;
		// La condition Game.room.view_x + Game.room.view_w + 5< Game.room.width sert à ce que le niveau ne défile plus, lorsqu'on atteint la fin du niveau.
		
		// La ligne suivante sert à faire défiler le niveau dans l'autre sens si Mario va vers la gauche.
		// Elle peut tout à fait être supprimée, je l'ai uniquement faite parce que ça rend pas mal.
		if (this.x <= (Game.room.view_x + Game.room.view_w *2/ 5) && this.xprev > this.x && Game.room.view_x > 0) Game.room.view_x -= this.NB_PIX_DEPLACEMENT_HORIZ;
	},

	/*
	// Doc : Méthode appelée à la fin de chaque Step, juste après son affichage et son test des collisions.
	'eventEndStep': function()
	{
	},
	*/		
	// Doc : Méthode appelée lorsqu'une touche du clavier reste pressée. Le paramètre indique le code ASCII de la touche pressée.
	// quand KEY_LEFT est pressée le status de Mario est STATE_MOVE_LEFT
	// quand KEY_RIGHT est pressée le statut de Mario est STATE_MOVE_RIGHT
	eventKeyPressed: function(key)
	{
		//on récupère le masque du sprite en cours
		var mask=this.sprite.getMask();
		// on test la présence d'un bloc solide sous le sprite de Mario
		if( Game.placeIsFree(this.x+mask.x,this.y+mask.y,mask.width,mask.height+1)!==true )
		{
			// il y a un bloc -> Mario est "sur terre"
			switch (key)
			{
				case Game.KEY_LEFT:
					// si Mario est accroupit, il reste accroupit mais se tourne vers la gauche
					// sinon Mario est debout, il se déplace donc à gauche
					(this.state==Element.STATE_STAND_DOWN_LEFT || this.state==Element.STATE_STAND_DOWN_RIGHT)?this.state =Element.STATE_STAND_DOWN_LEFT : this.state = Element.STATE_MOVE_LEFT;
					break;

				case Game.KEY_RIGHT:
					// si Mario est accroupit, il reste accroupit mais se tourne vers la droite
					// sinon Mario est debout, il se déplace donc à droite
					(this.state==Element.STATE_STAND_DOWN_LEFT || this.state==Element.STATE_STAND_DOWN_RIGHT)?this.state = Element.STATE_STAND_DOWN_RIGHT : this.state = Element.STATE_MOVE_RIGHT;
					break;

				case Game.KEY_DOWN:
					switch (this.state)
					{
						// Mario était orienté à gauche, il s'accroupit donc à gauche
						case Element.STATE_MOVE_LEFT : case Element.STATE_STAND_LEFT :
							this.state = Element.STATE_STAND_DOWN_LEFT;
							break;
						// Mario était orienté à droite, il s'accroupit donc à droite
						case Element.STATE_MOVE_RIGHT : case Element.STATE_STAND_RIGHT :
							this.state = Element.STATE_STAND_DOWN_RIGHT;
							break;
					}
					break;
			}
		}
		else
		{
			// il n'y a pas de bloc -> Mario est "en l'air"
			switch(key)
			{
				case Game.KEY_LEFT:
					this.state=Element.STATE_MOVE_UP_LEFT;
					this.hspeed = -(this.NB_PIX_DEPLACEMENT_HORIZ);
					break;
				case Game.KEY_RIGHT:
					this.state=Element.STATE_MOVE_UP_RIGHT;
					this.hspeed = this.NB_PIX_DEPLACEMENT_HORIZ;
					break;
			}
		}
	},
/*
	// Doc : Méthode appelée lorsqu'une touche du clavier est abaissée. Le paramètre indique le code ASCII de la touche abaissée.
	'eventKeyDown': function(key)
	{
	}
	*/

	// Doc : Méthode appelée lorsqu'une touche du clavier est relevée. Le paramètre indique le code ASCII de la touche relevée.
	// Quand on relâche KEY_LEFT et que KEY_RIGHT n'est pas pressé alors Mario passe en STATE_STAND_LEFT
	// Quand on relâche KEY_RIGHT et que KEY_LEFT n'est pas pressé alors Mario passe en STATE_STAND_RIGHT
	// Quand on relâche KEY_DOWN alors Mario passe en STAND_LEFT ou STAND_RIGHT selon son state
	eventKeyUp: function(key)
	{
		//on récupère le masque du sprite en cours
		var mask=this.sprite.getMask();
		// on test la présence d'un bloc solide sous le sprite de Mario
		if( Game.placeIsFree(this.x+mask.x,this.y+mask.y,mask.width,mask.height+1)!==true )
		{
			// il y a un bloc -> Mario est "sur terre"
			switch (key)
			{
				case Game.KEY_LEFT:
					if(!Game.isKeyPressed(Game.KEY_RIGHT))
					{
						// Si Mario est debout, il reste debout à gauche
						if( !(this.state==Element.STATE_STAND_DOWN_LEFT || this.state==Element.STATE_STAND_DOWN_RIGHT) )
							this.state = Element.STATE_STAND_LEFT;
					}
					break;

				case Game.KEY_RIGHT:
					if(!Game.isKeyPressed(Game.KEY_LEFT))
					{
						// Si Mario est debout, il reste debout à droite
						if( !(this.state==Element.STATE_STAND_DOWN_LEFT || this.state==Element.STATE_STAND_DOWN_RIGHT) )
							this.state = Element.STATE_STAND_RIGHT;
					}
					break;

				case Game.KEY_DOWN:
					// Si Mario est accroupit à gauche ; il se met debout à gauche
					// Sinon Mario est accroupit à droite ; il se met debout à droite
					switch (this.state)
					{
						case Element.STATE_STAND_DOWN_LEFT :
							this.state = Element.STATE_STAND_LEFT;
							break;

						case Element.STATE_STAND_DOWN_RIGHT :
							this.state = Element.STATE_STAND_RIGHT;
							break;
					}
					break;
			}
		}

		else
		{
			// il n'y a pas de bloc -> Mario est "en l'air"
		}
	},

	eventKeyDown: function(key)
	{
		//on récupère le masque du sprite en cours
		var mask=this.sprite.getMask();
		// on test la présence d'un bloc solide sous le sprite de Mario
		if( Game.placeIsFree(this.x+mask.x,this.y+mask.y,mask.width,mask.height+1)!==true )
		{
			// il y a un bloc -> Mario est "sur terre"
			if( !(this.state==Element.STATE_STAND_DOWN_LEFT || this.state==Element.STATE_STAND_DOWN_RIGHT) )
			{
				// Mario n'est pas accroupit
				if (key == Game.KEY_UP || key == Game.KEY_SPACE)
				{
					if(this.state==Element.STATE_STAND_LEFT || this.state==Element.STATE_MOVE_LEFT)
						this.state=Element.STATE_MOVE_UP_LEFT;
					else if (this.state==Element.STATE_STAND_RIGHT || this.state==Element.STATE_MOVE_RIGHT)
						this.state=Element.STATE_MOVE_UP_RIGHT;
					this.jump();
				}
			}
		}
	},

	jump: function()
	{
		// Saut vers le haut
		this.gravity = -25; // on met la gravité à zéro (elle sera a)
		var that = this;

		var index = 0,
				jumpTime = 5, // durée du saut, unité arbitraire
				jumpInterval,
				intervalTime = 50;

		jumpInterval = setInterval(function() {
			// on augmente la gravité jusqu'à maximum la gravité normale x 2
			// pour donner un sentiment de ralentissement en début de saut et
			// d'accélération vers le bas en chute libre
			if (that.gravity < that.defaultGravity * 2) {
				that.gravity += 5 * index * index / jumpTime;
				index++;
			}	else {
				clearInterval(jumpInterval);
				that.jumpAllowed = true;
			}
		}, intervalTime);
	},

	eventCollisionWith: function(other)
	{
		var otherMask = other.sprite.getMask();
		var thisMask = this.sprite.getMask();
		if (other.instanceOf(Monstre)) {
			// Si Mario saute ou tombe sur le monstre (j'ai pas encore trouvé la bonne formule)
		/*	if (other.y + otherMask.y + otherMask.height > this.y + thisMask.y + thisMask.height && other.y + otherMask.y <= this.y + thisMask.y + thisMask.height && other.x + otherMask.x + otherMask.width >= this.x + thisMask.x && other.x + otherMask.x + otherMask.width <= this.x + thisMask.x + thisMask.width) {
				this.vspeed *= -1;
				other.die();
			} else {
				//this.die();
			}*/
		}
		else if (other.instanceOf(Piece))
		{
			this.toFirstPlan();
			other.pickUp();
		}
		else if (other.instanceOf(Bloc))
		{
			if(other.instanceOf(BlocSpecial) || other.instanceOf(BlocTourne))
			{
				var direction = this.getDirection();

				// lorsque Mario tape sa tête contre un bloc
				if (direction == 90) // 90 correspond a la direction vers le haut.
				{
					other.hitBlock();
				}

				// si Mario retombe sur un bloc, ca gravité retrouve l'état initial
				if (direction == 270) // 270 correspond a la direction vers le bas
				{
					this.gravity = this.defaultGravity;
				}
			}
		}
	},

	eventOutsideView: function()
	{
		if(this.y>0)
		{
			this.die();
		}
	},
	
	die: function()
	{
		SuperMario.gameOver();
	}
});
