/**
 * Saut, puis taper un bloc avec la tête puis flèche horizontal => Mario continue de monter
 */

Game.addClass({
	name: 'Mario',
	eventCreate: function()
	{
		Game.room.view_y = this.y - Game.room.view_h / 2; // Par défaut on met la view avec Mario au centre selon l'axe des ordonnées.
		Game.room.viewLink = this; // La view suit Mario et fait défiler le niveau en conséquence de ses déplacements.
		window.mainMario = this;
		// Left sprites
		this.spriteLeft = new Sprite(Game.getImage('marioSpriteLeft'));
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
		this.spriteLeft.imagespeed      = 0.8;
		
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
		this.spriteRight.imagespeed       = 0.8;
		
		// Sprite for death
		this.spriteDeath = new Sprite(Game.getImage('marioSpriteDeath'));
		
		//Statut de départ de Mario
		this.state = Element.STATE_STAND_RIGHT;
		this.subState = this.state;
		this.sprite = this.spriteRight;
		this.sprite.tiles = this.sprite.STAND_RIGHT;
		
		//Définition de la vitesse verticale et horizontale de l'élément
		this.NB_PIX_DEPLACEMENT_HORIZ = 6;
		this.NB_PIX_DEPLACEMENT_VERTIC = 6;
		this.NB_PIX_SAUT = 16;
		this.MAX_VSPEED = 20;
		
		//Définition de la gravité de l'élément
		this.gravity = 0;
		
		// Indique si l'instance doit être téléportée de l'autre côté de la room lorsqu'elle sort de celle-ci.
		this.switchPositionWhenLeave = false;
		
		// Par défaut, Mario est vulnérable
		this.isInvincible = false;
	},
	
	eventAlarm1: function () {
		this.isInvincible = false; // A la fin de l'effet de l'étoile, on remet Mario à l'état vulnérable.
		// Stop musique étoile, relance musique niveau
		SuperMario.sounds.invincibleTheme.stop();
		SuperMario.sounds.levelTheme.togglePlay();
	},
	
	// Retourne true si Mario est sur un Element solide, false autrement
	isAboveSolid: function()
	{
		var mask = this.sprite.getMask();
		return true !== Game.placeIsFree(this.x + mask.x, this.y + mask.y + mask.height, mask.width, 1);
	},
	
	isDown: function()
	{
		return this.state == Element.STATE_STAND_DOWN_LEFT || this.state == Element.STATE_STAND_DOWN_RIGHT;
	},

	// Modifie le sprite de Mario en fonction de son statut
	eventStartStep: function()
	{
		// Empeche Mario de sortir à gauche de l'écran:
		if (this.x < Game.room.view_x + 3 && this.hspeed < 0) {
			this.hspeed = 0;
		}

		// Empeche Mario de sortir à droite de l'écran:
		if (this.x > Game.room.width - 18 && this.hspeed > 0) {
			this.hspeed = 0;
		}

		if (this.state!=Element.STATE_DEATH)
		{
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
		}
		
		// Attribut le bon sprite à Mario selon son statut
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
			
			case Element.STATE_DEATH :
				this.sprite = this.spriteDeath;
				break;
		}
	},

	eventStep: function()
	{
		if (this.isInvincible) // Si Mario est invincible (en mode étoile),
				this.drawFilter({
					color: [255,255,0],
					mode: "overlay"
				}); // on lui applique un filtre de couleur jaune.
		// Défilement Montagnes et défilement background,
/*
		// Cette portion de code pose des problèmes.
		if (SuperMario.animateBGs) {
			var el;
			if(el = document.getElementById('gameMountains')) el.style.backgroundPosition = -(Game.room.view_x*0.5)+'px bottom';
			if(el = document.getElementById('gameBG')) el.style.backgroundPosition = -(Game.room.view_x*0.2)+'px bottom';
		}
*/
		document.getElementById('gameMountains').style.backgroundPosition = -(Game.room.view_x*0.5)+'px bottom';
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
		if (this.vspeed > this.MAX_VSPEED) // Seuils de vspeed
			this.vspeed = this.MAX_VSPEED;
		else if (this.vspeed < -this.MAX_VSPEED)
			this.vspeed = -this.MAX_VSPEED;
	},
	
	eventKeyPressed: function(key)
	{
		if (this.state!=Element.STATE_DEATH)
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
		}
	},
	
	eventKeyDown: function(key)
	{
		if (this.state!=Element.STATE_DEATH)
		{
			// Saut de Mario avec flèche haut ou espace
			if (key == Game.KEY_UP || key == Game.KEY_SPACE)
			{
				// uniquement si Mario est au sol	
				if (this.isAboveSolid() && ! this.isDown()) this.jump(true);
			}
	
			if (key == Game.KEY_LEFT)
			{
				this.hspeed = -this.NB_PIX_DEPLACEMENT_HORIZ;
			}
	
			if (key == Game.KEY_RIGHT)
			{
				this.hspeed = this.NB_PIX_DEPLACEMENT_HORIZ;
			}
		}
	},
	
	eventKeyUp: function(key)
	{
		if (this.state!=Element.STATE_DEATH)
		{
			if (key == Game.KEY_LEFT && ! Game.isKeyPressed(Game.KEY_RIGHT))
			{
				this.hspeed = 0;
			}		
			if (key == Game.KEY_RIGHT && ! Game.isKeyPressed(Game.KEY_LEFT))
			{
				this.hspeed = 0;
			}
		}
	},

	jump: function(keyCall) //si keyCall true alors sound jump sinon sound stomp
	{
		// Donner une vitesse vers le haut
        if(keyCall)
            SuperMario.sounds.marioJump.play();
        else
            SuperMario.sounds.stomp.play();
            
		this.vspeed = -20;
	},
	
	becomeBig: function()
	{
		// Faire grandir Mario ICI.
	},
	
	oneUp: function()
	{
		// Incrementer le nombre de vies de Mario ICI.
		SuperMario.livesCounter++;
	},

	eventCollisionWith: function(other)
	{
		// On récupère les masques de Mario et de other
		var otherMask = other.sprite.getMask();
		var thisMask = this.sprite.getMask();

		if (other.instanceOf(Monstre))
		{
			if (this.isInvincible)
			{
                SuperMario.sounds.stomp.play();
				other.die();
			}
			// Si Mario n'est pas mort et est au dessus de other alors mario saute
			else if(this.yprev < this.y && this.state!=Element.STATE_DEATH)
			{
                this.jump(false);
			}
            else if (this.state!=Element.STATE_DEATH)
			{
                if(other.instanceOf(Koopa))
                {
                    if(other.sprite.tiles != other.sprite.STAND_CARAP)
                        this.die();
                    else
                        other.spinCarapace(this);
                }                        
                else
                    this.die();
			}
        }
		else if (other.instanceOf(Piece))
		{
			this.toFirstPlan();
			other.pickUp();
		}
		else if (other.instanceOf(BlocTape))
		{
			// Si le haut du masque de Mario et au dessus du bas du masque du bloc et que Mario a un mouvements vers le haut.
			if (this.y + thisMask.y <= other.y + otherMask.y + otherMask.height && this.yprev > this.y)
			{
				if (!other.instanceOf(BlocTourne) || other.solid) // Si le bloc n'est pas un bloc qui tourne.
					this.vspeed = 0; // On met sa vitesse verticale à 0 pour éviter que Mario ne continue de monter après avoir touché le bloc avec sa tête.
				other.hitBlock(); // Mario frappe le bloc.
			}
		}
		else if (other.instanceOf(BlocArrivee)) {
			// Si Mario touche le panneau d'arrivée, il gagne et passe au niveau suivant.
			if (this.y + thisMask.y <= other.y + otherMask.y + otherMask.height
				&& this.y + thisMask.y + thisMask.height >= other.y + otherMask.y
				&& this.x + thisMask.x + thisMask.width >= other.x + otherMask.x
				&& this.x + thisMask.x <= other.x + otherMask.x + otherMask.width) {

				var winLevelDiv = document.getElementById('win-level');
				winLevelDiv.style.display = "block";
				var winLevelTimerDiv = document.getElementById('win-level-timer');
				var t = 8;
				winLevelTimerDiv.innerHTML = '' + t;

				var winTimerInterval = setInterval(function() {
					winLevelTimerDiv.innerHTML = '' + (--t);
				}, 1000);

				other.checkForCollisions = false;
				SuperMario.sounds.levelTheme.pause(); // On met en pause la musique du niveau.
				SuperMario.sounds.courseClearTheme.play(); // Musique de niveau gagné.
				setTimeout(function()
				{
					winLevelDiv.style.display = "none";
					clearInterval(winTimerInterval);

					if (SuperMario.roomId < Game.rooms.length-1) { // S'il reste des niveaux pour le monde en cours,
						SuperMario.roomId++;
						Game.goToNextRoom(); // on passe au niveau suivant.
					} else { // Sinon,
						// le joueur a fini le monde.
						document.location.href = "#/home";
						alert('You have won all levels for this world!');
					}
				}, 8000);
			}
		}
	},

	eventOutsideView: function()
	{
		if (this.y > 0)
		{
			if(this.state!=Element.STATE_DEATH)
			{
				this.die();
			}
		}
	},
	
	die: function()
	{
		SuperMario.sounds.levelTheme.pause(); // On met en pause la musique du niveau.
		SuperMario.sounds.lostALife.play(); // Musique de perte de vie.
		// Lorsque la musique de perte de vie se termine, on lance la fonction soit qui recharge le niveau, soit qui créé le game-over.
		setTimeout(function()
		{
			if (SuperMario.livesCounter < 0) { // S'il ne reste plus de vies, on lance le game-over.
				SuperMario.animateBGs = false;
				Game.end = true; // Lorsque cette ligne est exécutée, JSGlib appelle la fonction gameEnd() (cf. SuperMario.js)
			} else // Sinon on recharge le niveau.
				Game.restartRoom();
		},3000);
		SuperMario.livesCounter--; // On décrémente le nombre de vies.
		this.state=Element.STATE_DEATH;
		this.toFirstPlan();
		this.vspeed=-20;
		this.hspeed=0;
		this.gravity=1;
		this.collideSolid=false;
	}
});
