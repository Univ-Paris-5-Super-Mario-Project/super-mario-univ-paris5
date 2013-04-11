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
    it('change l\'attribut vspeed de la classe Mario', function() {
      var mario = new Mario;
      mario.vspeed=0;
      mario.jump(false);
      expect(mario.vspeed).to.eql(-20);
    })
	})
})

