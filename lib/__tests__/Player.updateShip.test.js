
const Player = require('../Player');
const Ship = require('../Ship');
const { SHIP_KEY } = require('../../utils/keys');

describe('Player class', () => {
    let player;
    let opponent;

    beforeEach(() => {
        player = new Player();
        opponent = new Player();
        player.ownBoard = Array(10).fill().map(() => Array(10).fill('   '));
        opponent.ownBoard = Array(10).fill().map(() => Array(10).fill('   '));
        player.opponentBoard = Array(10).fill().map(() => Array(10).fill('   '));
        opponent.opponentBoard = Array(10).fill().map(() => Array(10).fill('   '));
        player.threshold = 10;
        opponent.threshold = 10;
        player.populateShips();
        opponent.populateShips();
    });
    it('should update ship hits and sink ship', () => {
        opponent.ships[0].incrementHits();
        opponent.ships[0].incrementHits();
        opponent.ships[0].incrementHits();
        expect(opponent.ships[0].sunk).toBe(true);
    });
    
});