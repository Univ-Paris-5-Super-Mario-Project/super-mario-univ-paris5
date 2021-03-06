Game.addClass({
	'name': 'Bloc',
	'abstract': true,
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('editorSprite'));
		this.sprite.makeTiles(16,16,0);
		for (var i = 1; i <= 24; i++)
			this.sprite.setMask(i,{});
		this.sprite.imagespeed = 0;
		this.solid = true;
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

// Blocs de Terre

Game.addClass({
    'name': 'Terre1',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[2];
    }
});

Game.addClass({
    'name': 'Terre2',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[3];
    }
});

Game.addClass({
    'name': 'Terre3',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[4];
    }
});

Game.addClass({
    'name': 'Terre4',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[5];
    }
});

Game.addClass({
    'name': 'Terre5',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[6];
    }
});

Game.addClass({
    'name': 'Terre6',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[7];
    }
});

Game.addClass({
    'name': 'Terre7',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[8];
    }
});

Game.addClass({
    'name': 'Terre8',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[9];
    }
});

Game.addClass({
    'name': 'Terre9',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[10];
    }
});

Game.addClass({
    'name': 'Terre10',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[11];
    }
});

Game.addClass({
    'name': 'Terre11',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[12];
    }
});

Game.addClass({
    'name': 'Terre12',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[13];
    }
});

Game.addClass({
    'name': 'Terre13',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[14];
    }
});

Game.addClass({
    'name': 'Terre14',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[15];
    }
});

Game.addClass({
    'name': 'Terre15',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[16];
    }
});

Game.addClass({
    'name': 'Terre16',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[17];
    }
});

Game.addClass({
    'name': 'Terre17',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[18];
    }
});

Game.addClass({
    'name': 'Terre18',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[19];
    }
});

Game.addClass({
    'name': 'Terre19',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[20];
    }
});

Game.addClass({
    'name': 'Terre20',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[21];
    }
});

Game.addClass({
    'name': 'Terre21',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[22];
    }
});

Game.addClass({
    'name': 'Terre22',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[23];
    }
});

Game.addClass({
    'name': 'Terre23',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[24];
    }
});

Game.addClass({
    'name': 'Terre24',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[25];
    }
});

// Blocs de Tuyaux

Game.addClass({
    'name': 'TuyauV0',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[27];
    }
});

Game.addClass({
    'name': 'TuyauV1',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[28];
    }
});

Game.addClass({
    'name': 'TuyauV2',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[29];
    }
});

Game.addClass({
    'name': 'TuyauV3',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[30];
    }
});

Game.addClass({
    'name': 'TuyauV4',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[31];
    }
});

Game.addClass({
    'name': 'TuyauV5',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[32];
    }
});

Game.addClass({
    'name': 'TuyauH0',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[33];
    }
});

Game.addClass({
    'name': 'TuyauH1',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[34];
    }
});

Game.addClass({
    'name': 'TuyauH2',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[35];
    }
});

Game.addClass({
    'name': 'TuyauH3',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[36];
    }
});

Game.addClass({
    'name': 'TuyauH4',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[37];
    }
});

Game.addClass({
    'name': 'TuyauH5',
	'parent':'Bloc',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
        this.sprite.tiles=[38];
    }
});

Game.addClass({
    'name': 'BlocTape',
	'abstract': true,
	'eventCreate': function()
	{
		this.sprite = new Sprite(Game.getImage('blocSpecialSprite'));
		this.sprite.makeTiles(16,16,0);
		for (var i = 1; i <= 9; i++)
			this.sprite.setMask(i,{});
		this.sprite.imagespeed = 0.2;
		this.sprite.STATUS_BLOC_SPECIAL = [1,2,3,4];
		this.sprite.STATUS_BLOC_TAPE = [5,5];
		this.sprite.STATUS_BLOC_TOURNE_ARRET = [6,6];
		this.sprite.STATUS_BLOC_TOURNE = [6,7,8,9];
		this.state = Element.STATE_STAND;
		this.solid = true;
    },
	'eventInsideView': function()
	{
		this.setActive(true);
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventClick': function()
	{
//		if(this.isMouseOver())
//			this.hitBlock();
	}
});

Game.addClass({
	'name': 'BlocSpecial',
	'parent':'BlocTape',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles = this.sprite.STATUS_BLOC_SPECIAL;
		this.container = 'Piece';
		this.pixelsNumToMove = 2;
	},

	'hitBlock': function()
	{
		if (this.state == Element.STATE_STAND && this.sprite.tiles != this.sprite.STATUS_BLOC_TAPE) {
			this.state = Element.STATE_MOVE;
			this.containerObject = Game.instanceCreate(this.x,this.y-this.pixelsNumToMove,this.container);
			this.containerObject.setActive(false);
			this.containerObject.checkForCollisions = false;
			this.toFirstPlan();
			var moveDown = function()
			{
				this.containerObject.setActive(true);
				this.containerObject.pickUp();
				this.sprite.tiles = this.sprite.STATUS_BLOC_TAPE;
				this.moveToPoint(this.x,this.y+this.pixelsNumToMove,1,function(){
					this.state = Element.STATE_STAND;
					this.vspeed = 0;
				});
			};
			this.moveToPoint(this.x,this.y-this.pixelsNumToMove,1,moveDown);
		}
	}
});

Game.addClass({
	'name': 'BlocSpecialChampignonRouge',
	'parent': 'BlocTape',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles = this.sprite.STATUS_BLOC_SPECIAL;
		this.container = 'ChampignonRouge';
		this.pixelsNumToMove = 2;
	},
	'hitBlock': function()
	{
		if (this.state == Element.STATE_STAND && this.sprite.tiles != this.sprite.STATUS_BLOC_TAPE) {
			this.state = Element.STATE_MOVE;
			this.containerObject = Game.instanceCreate(this.x,this.y-this.pixelsNumToMove-16,this.container);
			this.containerObject.setActive(false);
			var initialContainerObjectSpeed = this.containerObject.hspeed;
			this.containerObject.hspeed = 0;
			this.toFirstPlan();
			var moveDown = function()
			{
				SuperMario.sounds.powerUpAppears.play();
				this.containerObject.setActive(true);
				this.containerObject.hspeed = initialContainerObjectSpeed;
				this.containerObject.popOut();
				this.sprite.tiles = this.sprite.STATUS_BLOC_TAPE;
				this.moveToPoint(this.x,this.y+this.pixelsNumToMove,1,function(){
					this.state = Element.STATE_STAND;
					this.vspeed = 0;
				});
			};
			this.moveToPoint(this.x,this.y-this.pixelsNumToMove,1,moveDown);
		}
	}
});

Game.addClass({
	'name': 'BlocSpecialChampignonVert',
	'parent': 'BlocTape',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles = this.sprite.STATUS_BLOC_SPECIAL;
		this.container = 'ChampignonVert';
		this.pixelsNumToMove = 2;
	},
	'hitBlock': function()
	{
		if (this.state == Element.STATE_STAND && this.sprite.tiles != this.sprite.STATUS_BLOC_TAPE) {
			this.state = Element.STATE_MOVE;
			this.containerObject = Game.instanceCreate(this.x,this.y-this.pixelsNumToMove-16,this.container);
			this.containerObject.setActive(false);
			var initialContainerObjectSpeed = this.containerObject.hspeed;
			this.containerObject.hspeed = 0;
			this.toFirstPlan();
			var moveDown = function()
			{
				SuperMario.sounds.powerUpAppears.play();
				this.containerObject.setActive(true);
				this.containerObject.hspeed = initialContainerObjectSpeed;
				this.containerObject.popOut();
				this.sprite.tiles = this.sprite.STATUS_BLOC_TAPE;
				this.moveToPoint(this.x,this.y+this.pixelsNumToMove,1,function(){
					this.state = Element.STATE_STAND;
					this.vspeed = 0;
				});
			};
			this.moveToPoint(this.x,this.y-this.pixelsNumToMove,1,moveDown);
		}
	}
});

Game.addClass({
	'name': 'BlocSpecialEtoile',
	'parent': 'BlocTape',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles = this.sprite.STATUS_BLOC_SPECIAL;
		this.container = 'Etoile';
		this.pixelsNumToMove = 2;
	},
	'hitBlock': function()
	{
		if (this.state == Element.STATE_STAND && this.sprite.tiles != this.sprite.STATUS_BLOC_TAPE) {
			this.state = Element.STATE_MOVE;
			this.containerObject = Game.instanceCreate(this.x,this.y-this.pixelsNumToMove-16,this.container);
			this.containerObject.setActive(false);
			var initialContainerObjectSpeed = this.containerObject.hspeed;
			this.containerObject.hspeed = 0;
			this.toFirstPlan();
			var moveDown = function()
			{
				SuperMario.sounds.powerUpAppears.play();
				this.containerObject.setActive(true);
				this.containerObject.hspeed = initialContainerObjectSpeed;
				this.containerObject.popOut();
				this.sprite.tiles = this.sprite.STATUS_BLOC_TAPE;
				this.moveToPoint(this.x,this.y+this.pixelsNumToMove,1,function(){
					this.state = Element.STATE_STAND;
					this.vspeed = 0;
				});
			};
			this.moveToPoint(this.x,this.y-this.pixelsNumToMove,1,moveDown);
		}
	}
});

Game.addClass({
    'name': 'BlocTourne',
	'parent':'BlocTape',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles = this.sprite.STATUS_BLOC_TOURNE_ARRET;
    },
	'hitBlock': function()
	{
		if (this.state == Element.STATE_STAND && this.sprite.tiles != this.sprite.STATUS_BLOC_TOURNE) {
			this.state = Element.STATE_MOVE;
			this.sprite.tiles = this.sprite.STATUS_BLOC_TOURNE;
			this.solid = false;
			var thisBlock = this;
			var stopSpinning = function()
			{
				thisBlock.state = Element.STATE_STAND;
				thisBlock.sprite.tiles = thisBlock.sprite.STATUS_BLOC_TOURNE_ARRET;
				thisBlock.solid = true;
			};
			setTimeout(stopSpinning,4000);
		}
	}
});

Game.addClass({
    'name': 'BlocArrivee',
	'eventCreate': function()
	{
		this.y -= 16;
		this.sprite = new Sprite(Game.getImage('arriveeSprite'));
		this.sprite.makeTiles(32,32,0);
		this.sprite.setMask(1,{x:6,y:8,width:12,height:24});
		this.sprite.imagespeed = 0;
        this.sprite.tiles=[1];
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
