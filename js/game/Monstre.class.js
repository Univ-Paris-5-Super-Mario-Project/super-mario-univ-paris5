Game.addClass({
	'name': 'Monstre',
	'abstract': true,
	'eventCreate': function()
	{
		this.state = Element.STATE_MOVE_LEFT;
//		this.gravity = 0.2;
		this.hspeed = -2;
		this.vspeed = 8;
	},
	'eventCollisionWith': function(other)
	{
		var otherMask = other.sprite.getMask();
		var thisMask = this.sprite.getMask();
//		if (other.y<this.y)
//			document.title = (other.y + otherMask.y) + ' >= ' + (this.y + thisMask.y) + ' ' + (other.y + otherMask.y + otherMask.height) + ' <= ' + (this.y + thisMask.y + thisMask.height);
		if (!other.instanceOf(Monstre) && !other.instanceOf(Mario) && other.y + otherMask.y + otherMask.height >= this.y + thisMask.y && other.y + otherMask.y + otherMask.height <= this.y + thisMask.y + thisMask.height) {
			this.hspeed *= -1;
			if (this.hspeed > 0)
				this.sprite.tiles = this.sprite.MOVE_RIGHT;
			else
				this.sprite.tiles = this.sprite.MOVE_LEFT;
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
        
//		this.gravity = 0.2;
//		this.hspeed = 2;
//		this.vspeed = 8;
        //this.carapSprite = new Sprite(Game.getImage('carapaceSprite'));
        //this.carapSprite.makeTiles(16,16,0);
       // for (var i = 1; i <= 6; i++)
       //     this.carapSprite.setMask(i,{x:4,width:8});
 	},
    'becomeKoopa': function()
    {
        this.isCarapace = false;
        this.sprite.MOVE_RIGHT = [6,5];
        this.sprite.MOVE_LEFT = [1,2];
    },
    'becomeCarapace': function()
    {
        this.isCarapace = true;
        this.sprite.MOVE_LEFT =[12,11,10,9];
        this.sprite.MOVE_RIGHT =[10,11,12,9];
    },
    'eventAlarm1': function()
    {   
        if(this.sprite.tiles == this.sprite.STAND_CARAP){
            this.sprite.imagespeed = 0.2;
            this.hspeed = 0;
            this.sprite.tiles = this.sprite.WAKE_CARAP;
            this.setAlarm(2,2);
        }
        
    },
    'eventAlarm2': function()
    {
        this.becomeKoopa();
        this.sprite.tiles = this.sprite.MOVE_LEFT;
        this.hspeed = -2;
    },
    'eventCollisionWith': function(other)
    {
        var otherMask = other.sprite.getMask();
        var thisMask = this.sprite.getMask();
        this.callParent('eventCollisionWith',[other]); //rajouter le son correspondant à la transformation en carapace
        
        if(other.instanceOf(Mario)){
            if(/*other.y + otherMask.y + otherMask.height >= this.y + thisMask.y &&*/ other.yprev < other.y){ //vérifie que mario est au dessus du koopa
                if(this.sprite.tiles == this.sprite.STAND_CARAP){
                    this.becomeCarapace(); // fonction changeant les sprites de mouvement de koopa -> carapace
                    if(other.sprite.tiles == other.spriteLeft.STAND_LEFT || other.sprite.tiles == other.spriteLeft.MOVE_UP_LEFT){
                        this.sprite.tiles = this.sprite.MOVE_LEFT;
                        this.sprite.imagespeed = 0.8;
                        this.hspeed = -8;
                    }
                    else if(other.sprite.tiles == other.spriteRight.STAND_RIGHT || other.sprite.tiles == other.spriteRight.MOVE_UP_RIGHT){                   
                        this.sprite.tiles = this.sprite.MOVE_RIGHT;
                        this.sprite.imagespeed = 0.8;
                        this.hspeed= 8;
                    }
                }
                else if(this.isCarapace && (this.sprite.tiles == this.sprite.MOVE_LEFT || this.sprite.tiles == this.sprite.MOVE_RIGHT)){               
                    this.hspeed = 0; 
                    this.sprite.tiles = this.sprite.STAND_CARAP; //si l'on saute sur la carapace alors qu'elle est en mouvement, elle s'arrete
                    this.setAlarm(1,4); //timer avant le retour carapace -> koopa
                    
                }
                else if(this.sprite.tiles == this.sprite.WAKE_CARAP){               
                    Game.instanceDestroy(this);  
                    
                }
                else{
                    this.hspeed = 0;
                    this.sprite.tiles = this.sprite.STAND_CARAP;
                    this.setAlarm(1,4);//timer avant le retour carapace -> koopa
                
                }
            }
            /*else if(this.isCarapace && other.yprev == other.y && this.sprite.tiles == this.sprite.STAND_CARAP){  //pour shooter dans la carapace
                this.sprite.tiles = this.sprite.MOVE_LEFT;
                this.hspeed = -4;
            }*/
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
//		this.gravity = 0.2;
//		this.hspeed = 2;
//		this.vspeed = 8;
	}
});
