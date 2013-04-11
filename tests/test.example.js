describe('SuperMario', function() {
    describe('#savedGames()', function() {
        it('renvoie le contenu du localStorage décodé du json', function() {
            localStorage['saved_games'] = JSON.stringify({})
            expect(SuperMario.savedGames()).to.eql({})
            
            localStorage.removeItem('saved_games')
            expect(SuperMario.savedGames()).to.eql({})
            
            localStorage['saved_games'] = JSON.stringify({hello: "world"})
            expect(SuperMario.savedGames()).to.eql({hello: "world"})
			
			localStorage['saved_games'] = JSON.stringify({hello: "John"})
			expect(SuperMario.savedGames()).to.eql({hello: "John"})
        })
    })
	
	describe('#setSavedGames(Hash games)', function() {
		it('sauvegarde les parties sous forme de JSON', function() {
			SuperMario.setSavedGames({hello: 'world'})
			expect(localStorage['saved_games']).to.eql(JSON.stringify({hello: 'world'}))
		})
	})
	
	describe('#removeSavedGame(int id)', function() {
		it('efface la sauvegarde d\'une partie donnée', function() {
			SuperMario.setSavedGames({5: {id: 5}, 6: {id: 6}})
			SuperMario.removeSavedGame(5)
			expect(SuperMario.savedGames()).to.eql({6: {id: 6}})
		})
	})
})


﻿describe('Mario.class', function() {

  describe('#jump(Boolean bool)', function() {
    it('change l\'attribut vspeed de Mario', function() {
      var mario = new Mario;
      mario.vspeed=0;
      mario.jump(false);
      expect(mario.vspeed).to.eql(-20);
    })
	})

  describe('#eventAlarm1()', function() {
    it('met l\'attribut isInvincible de Mario à false', function() {
      var mario = new Mario;
      mario.isInvincible=true;
      mario.eventAlarm1();
      expect(mario.isInvincible).to.eql(false);
    })
	})


  describe('#isDown()', function() {
    it('retourne true si l\attribut state de Mario indique que Mario est accroupit', function() {
      var mario = new Mario;

      mario.state=Element.STATE_STAND_DOWN_RIGHT;
      expect(mario.isDown()).to.eql(true);

      mario.state=Element.STATE_STAND_DOWN_LEFT;
      expect(mario.isDown()).to.eql(true);

      mario.state=Element.STATE_STAND_LEFT;
      expect(mario.isDown()).to.eql(false);

      mario.state=Element.STATE_STAND_RIGHT;
      expect(mario.isDown()).to.eql(false);
    })
	})

  describe('#die()', function() {
    it('met le statut de Mario à mort, sa vitesse h à 0 et v à -20, la gravité à 1 et igniore les collisions\n(tout n\'est pas testé', function() {
      var mario = new Mario;
      mario.state=Element.STATE_STAND_DOWN_RIGHT;
      mario.hspeed=10;
      mario.vspeed=10;
      mario.gravity=0;
      mario.collideSolid=true;

      mario.die();

      expect(mario.state).to.eql(Element.STATE_DEATH);
      expect(mario.hspeed).to.eql(0);
      expect(mario.vspeed).to.eql(-20);
      expect(mario.gravity).to.eql(1);
      expect(mario.collideSolid).to.eql(false);

    })
	})
})

