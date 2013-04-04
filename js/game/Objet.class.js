// Utiliser cette injection javascript pour pop un bloc special contenant un champignon rouge:
//javascript:Game.instanceCreate(150,250,BlocSpecialChampignonRouge);

/*
 * ObjetMobile: classe parente des objets ChampignonRouge, ChampignonVert, et Etoile.
 */
Game.addClass({
	'name': 'ObjetMobile',
	'abstract': true,
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('itemsSprite')); // Cr�ation du sprite communs aux objets mobiles
		this.sprite.makeTiles(16,16,0);
		for (var i = 1; i <= 4; i++)
			this.sprite.setMask(i,{});
		this.sprite.imagespeed = 0;
		this.sprite.CHAMPIGNON_ROUGE = [1];
		this.sprite.CHAMPIGNON_VERT = [2];
		this.sprite.ETOILE = [4];
		this.hspeed = 3; // Vitesse Horizontale par d�faut
		this.vspeed = 8; // Vitesse Verticale par d�faut
	},
	'eventCollisionWith': function(other)
	{
		var otherMask = other.sprite.getMask(); // On stocke le masque de other.
		var thisMask = this.sprite.getMask(); // On stocke le masque de this.
		if (!other.instanceOf(Monstre) && !other.instanceOf(ObjetMobile) && !other.instanceOf(Piece) // On n'intercepte pas les collisions des ObjetsMobiles avec des Monstres, ni d'autres ObjetsMobiles ni des Pieces.
			&& other.y + otherMask.y + otherMask.height >= this.y + thisMask.y // Le bas du masque de other doit �tre situ� au dessous de l'ObjetMobile.
			&& other.y + otherMask.y + otherMask.height <= this.y + thisMask.y + thisMask.height) { // Le bas du masque de other doit �tre �galement situ� au dessus de l'ObjetMobile.
			if (other.instanceOf(Mario)) // Si other est une instance de Mario,
				this.pickUp(); // on ramasse l'objet,
			else // sinon,
				this.hspeed *= -1; // Il y a collision avec un bloc, donc l'objet fait demi-tour.
		}
	},
	'popOut': function()
	{
		// Lorsqu'on tape un bloc et que l'objet en sort.
	},
	'eventInsideView': function()
	{
		this.setActive(true); // Lorsque l'objet rentre dans la view, on l'active.
	},
	'eventOutsideView': function()
	{
		this.setActive(false); // Lorsque l'objet sort de la view, on le d�sactive.
	}
});

Game.addClass({
	'name': 'ChampignonRouge',
	'parent': 'ObjetMobile',
	'eventCreate': function()
	{
		this.callParent('eventCreate'); // On appelle l'eventCreate de la classe parente ObjetMobile.
		this.sprite.tiles = this.sprite.CHAMPIGNON_ROUGE;
	},
	'pickUp': function()
	{
		SuperMario.sounds.powerUp.play(); // On lance la musique de Mario qui attrape un champignon rouge.
		mainMario.becomeBig(); // On fait grandir Mario.
		Game.instanceDestroy(this); // On detruit l'instance du champignon.
	}
});

Game.addClass({
	'name': 'ChampignonVert',
	'parent': 'ObjetMobile',
	'eventCreate': function()
	{
		this.callParent('eventCreate'); // On appelle l'eventCreate de la classe parente ObjetMobile.
		this.sprite.tiles = this.sprite.CHAMPIGNON_VERT;
	},
	'pickUp': function()
	{
		SuperMario.sounds.oneUp.play(); // On lance la musique de Mario qui attrape un champignon vert.
		mainMario.oneUp(); // On ajoute une vie � Mario.
		Game.instanceDestroy(this); // On detruit l'instance du champignon.
	}
});

Game.addClass({
	'name': 'Etoile',
	'parent': 'ObjetMobile',
	'eventCreate': function()
	{
		this.callParent('eventCreate'); // On appelle l'eventCreate de la classe parente ObjetMobile.
		this.sprite.tiles = this.sprite.ETOILE;
	},
	'pickUp': function()
	{
		SuperMario.sounds.levelTheme.togglePlay(); // On arrete la musique du niveau pendant la dur�e de "l'effet �toile".
		SuperMario.sounds.invincibleTheme.play(); // On lance la musique de l'�toile d'invincibilit�.
		mainMario.isInvincible = true; // On l'�tat de Mario � invincible.
		mainMario.setAlarm(1,6); // On d�clenche une alarme de 6 secondes pour annuler l'effet de l'�toile d'invincibilit�.
		Game.instanceDestroy(this); // On d�truit l'instance de l'�toile.
	}
});

Game.addClass({
	'name': 'Piece',
	'eventCreate': function()
	{
		this.collideSolid = false; // Pas de collisions avec les objets "solides".
		// D�finition du sprite, des masques, des tiles.
		this.sprite = new Sprite(Game.getImage('coinSprite'));
		this.sprite.makeTiles(16,16,0);
		for (var i = 1; i <= 4; i++)
			this.sprite.setMask(i,{x:2,width:12});
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_SPINNING = [1,2,3,4];
		this.sprite.STATUS_NOT_SPINNING = [1];
		this.sprite.tiles = this.sprite.STATUS_SPINNING;
		this.state = Element.STATE_STAND;
		this.pixelsNumToMove = 24; // Pixels pour le d�placement vertical de la pi�ce dans l'animation.
	},
	'animatePickUp': function()
	{
		if (this.state == Element.STATE_STAND) { // Si la pi�ce n'est pas en mouvement.
			this.checkForCollisions = false; // On ne peut pas la ramasser plus d'une fois.
			this.state = Element.STATE_MOVE; // On met son statut � "en mouvement".
			var moveUp = function() // Fonction de callback lorsque la pi�ce a �t� d�plac�e au point souhait�.
			{
				this.vspeed = 0; // Sa vitesse devient nulle.
				this.sprite.tiles = this.sprite.STATUS_NOT_SPINNING; // On arr�te de la faire tourner.
				var piece = this;
				setTimeout(
					function()
					{
						Game.instanceDestroy(piece); // On d�truit l'instance la pi�ce.
					},300
				);
			};
			this.moveToPoint(this.x,this.y-this.pixelsNumToMove,4,moveUp); // On d�place la pi�ce vers le haut.
		}
	},
	'pickUp' : function()
	{
		SuperMario.coinsCounter++; // On incr�mente le compteur de pi�ces.
		// Pour chaque paquet de 100 pi�ces ramss�es, on incr�mente le compteur de vies de 1, et on retranche ces paquets de pi�ces.
		if (SuperMario.coinsCounter >= 100) {
			var nombreDeCentainesDePieces = SuperMario.coinsCounter % 100;
			SuperMario.livesCounter += nombreDeCentainesDePieces;
			SuperMario.coinsCounter -= nombreDeCentainesDePieces * 100;
		}
		SuperMario.sounds.coin.play(); // On joue la musique de pi�ce ramass�e.
		this.animatePickUp(); // On lance l'animation.
	},
	'eventInsideView': function()
	{
		this.setActive(true); // Lorsque la pi�ce rentre dans la view, on l'active.
	},
	'eventOutsideView': function()
	{
		this.setActive(false); // Lorsque la pi�ce sort de la view, on la d�sactive.
	}
});

Game.addClass({
	'name': 'PieceController',
	'eventCreate': function()
	{
		// Cr�ation du sprite de la pi�ce.
		this.sprite = new Sprite(Game.getImage('coinSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_SPINNING = [1,2,3,4];
		this.sprite.STATUS_NOT_SPINNING = [1];
		this.sprite.tiles = this.sprite.STATUS_SPINNING;
	},
	'eventStep': function()
	{
		// On place le sprite de la pi�ce en haut � gauche.
		this.x = Game.room.view_x + 10;
		this.y = Game.room.view_y + 10;
		
		// On affiche sous forme de texte le nombre de pi�ces.
		this.drawText({
			'text': 'x ' + SuperMario.coinsCounter,
			'x': 30,
			'y': 7
		});
	}
});

Game.addClass({
	'name': 'LifeController',
	'eventCreate': function()
	{
		// Cr�ation du sprite de la t�te de Mario.
		this.sprite = new Sprite(Game.getImage('editorSprite'));
		this.sprite.makeTiles(16,16,0);
		this.sprite.imagespeed = 0;
		this.sprite.tiles = [44];
	},
	'eventStep': function()
	{
		// On place le sprite de la t�te de Mario en haut � gauche.
		this.x = Game.room.view_x + 80;
		this.y = Game.room.view_y + 10;
		
		// On affiche sous forme de texte le nombre de vies.
		this.drawText({
			'text': 'x ' + ((SuperMario.livesCounter<0)?0:SuperMario.livesCounter), // Si le nombre de vies est moins que 0, on le laisse � 0.
			'x': 100,
			'y': 7
		});
	}
});
