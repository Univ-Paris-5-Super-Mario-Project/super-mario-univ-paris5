Game.addClass({
	'name': 'Monstre',
	'abstract': true,
	'eventCreate': function()
	{
		this.state = Element.STATE_MOVE_LEFT; //les monstres apparaissent toujours vers la gauche
//		this.gravity = 0.2;
		this.hspeed = -2;
		this.vspeed = 8;
	},
	'eventCollisionWith': function(other)
	{
		var otherMask = other.sprite.getMask();
		var thisMask = this.sprite.getMask();  //le if teste si le bas du bloc est compris entre le haut de ka tête et le pieds du monstre
		if (!other.instanceOf(Monstre) && !other.instanceOf(Mario) && !other.instanceOf(ObjetMobile) && other.y + otherMask.y + otherMask.height >= this.y + thisMask.y && other.y + otherMask.y + otherMask.height <= this.y + thisMask.y + thisMask.height) {
			this.bumpSound();   //rebond pour les carapace, rien pour le reste
            this.hspeed *= -1; //inverse la direction du monstre et ses tiles
			if (this.hspeed > 0)
				this.sprite.tiles = this.sprite.MOVE_RIGHT;
			else
				this.sprite.tiles = this.sprite.MOVE_LEFT;
		}
	},
     'bumpSound': function(){ //fonction vide parce qu'elle n'est utilisée que pour les koopas en mode carapace
    },
	'eventInsideView': function()
	{
		this.setActive(true);
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'die': function()
	{
		Game.instanceDestroy(this);
	}
});

Game.addClass({
	'name': 'Koopa',
	'parent': 'Monstre',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite = new Sprite(Game.getImage('koopaSprite'));
		this.sprite.makeTiles(16,32,0);
		for (var i = 1; i <= 12; i++){
            if(i<7)
                this.sprite.setMask(i,{y:5,height:27});
            else
                this.sprite.setMask(i,{y:16,height:16});
        }
		this.sprite.STAND_LEFT = [1,1];
		this.sprite.MOVE_LEFT = [1,2];
		this.sprite.STAND_RIGHT = [6,6];
		this.sprite.MOVE_RIGHT = [6,5];
		this.sprite.DANCE_RABBI_JACOB = [3,4];
        this.sprite.STAND_CARAP =[9,9];
        this.sprite.WAKE_CARAP =[8,7];
		this.sprite.imagespeed = 0.2;
		this.sprite.tiles = this.sprite.MOVE_LEFT;
        this.isCarapace = false;

 	},
    'becomeKoopa': function() ////fonction changeant les sprites de mouvement de la carapace -> koopa
    {
        this.isCarapace = false;
        this.sprite.MOVE_RIGHT = [6,5];
        this.sprite.MOVE_LEFT = [1,2];
    },
    'becomeCarapace': function() //fonction changeant les sprites de mouvement du koopa -> carapace
    {
        this.isCarapace = true;
        this.sprite.MOVE_LEFT =[12,11,10,9];
        this.sprite.MOVE_RIGHT =[10,11,12,9];
    },
    'eventAlarm1': function() //timer responsable du reveil de la carapace
    {   
        if(this.sprite.tiles == this.sprite.STAND_CARAP){
            this.sprite.imagespeed = 0.2;
            this.hspeed = 0;
            this.sprite.tiles = this.sprite.WAKE_CARAP;
            this.setAlarm(2,2);
        }
        
    },
    'eventAlarm2': function()  //timer responsable du retour carapace -> koopa
    {
        this.becomeKoopa();
        this.sprite.tiles = this.sprite.MOVE_LEFT;
        this.hspeed = -2;
    },
     'bumpSound': function(){ //fonction responsable du son de rebond des carapaces contre les blocs
        if(this.isCarapace)
            SuperMario.sounds.bump.play();
    },
    'spinCarapace': function(mario)
    {
        this.becomeCarapace(); // fonction changeant les sprites de mouvement de koopa -> carapace        
        if(mario.sprite.tiles == mario.spriteLeft.MOVE_LEFT || mario.state == Element.STATE_STAND_LEFT || mario.sprite.tiles == mario.spriteLeft.MOVE_UP_LEFT){
                        this.sprite.tiles = this.sprite.MOVE_LEFT;
                        this.sprite.imagespeed = 0.8;
                        this.hspeed = -12;       //pour ce if et ce else :
                    }                           //si l'on saute ou shoot sur la carapace alors qu'elle est immobile elle partira dans la direction d'arrivée de mario
        else if(mario.sprite.tiles == mario.spriteRight.MOVE_RIGHT || mario.state == Element.STATE_STAND_RIGHT || mario.sprite.tiles == mario.spriteLeft.MOVE_UP_RIGHT){                   
            this.sprite.tiles = this.sprite.MOVE_RIGHT;                                                
            this.sprite.imagespeed = 0.8;               
            this.hspeed= 12;
                    }
        
    },
    'eventCollisionWith': function(other)
    {
        var otherMask = other.sprite.getMask();
        var thisMask = this.sprite.getMask();
        this.callParent('eventCollisionWith',[other]);
        
        if(other.instanceOf(Mario)){
            if(other.yprev < other.y){ //vérifie que mario est en descente au dessus du koopa, la collision s'effectuant au contact du sprite et non du masque
                if(this.sprite.tiles == this.sprite.STAND_CARAP && this.isCarapace){
                    this.spinCarapace(other);
                }
                else if(this.isCarapace && (this.sprite.tiles == this.sprite.MOVE_LEFT || this.sprite.tiles == this.sprite.MOVE_RIGHT)){               
                    this.hspeed = 0; 
                    this.sprite.tiles = this.sprite.STAND_CARAP; //si l'on saute sur la carapace alors qu'elle est en mouvement, elle s'arrete
                    this.setAlarm(1,4); //timer avant le retour carapace -> koopa
                    
                }
                else if(this.sprite.tiles == this.sprite.WAKE_CARAP){  //si l'on saute sur la carapace alors qu'elle est en réveil, elle meurt                
                    this.die();
                    
                }
                else{                                                   //le koopa devient une carapace immobile si on saute dessus
                    this.hspeed = 0;
                    this.becomeCarapace();
                    this.sprite.tiles = this.sprite.STAND_CARAP;
                    this.setAlarm(1,4);//timer avant le reveil de la carapace puis retour carapace -> koopa
                
                }
            }
           
        }
    }
});

Game.addClass({
	'name': 'Goomba',
	'parent': 'Monstre',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite = new Sprite(Game.getImage('goombaSprite'));
		this.sprite.makeTiles(16,16,0);
		for (var i = 1; i <= 4; i++)
			this.sprite.setMask(i,{});
		this.sprite.STAND_LEFT = [2,2];
		this.sprite.MOVE_LEFT = [1,2];
		this.sprite.STAND_RIGHT = [3,3];
		this.sprite.MOVE_RIGHT = [4,3];
		this.sprite.imagespeed = 0.2;
		this.sprite.tiles = this.sprite.MOVE_LEFT;

	},
    'eventCollisionWith': function(other)
    {
        var otherMask = other.sprite.getMask();
        var thisMask = this.sprite.getMask();
        this.callParent('eventCollisionWith',[other]); // Appel de la méthode qui gère les collisions avec les autres blocs pour tous les monstres.
        if(other.instanceOf(Mario) && other.yprev < other.y) { // Teste si Mario saute sur le goomba.
           	this.die();
        }
    }
});
