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

    it('should populate ships correctly', () => {
        expect(player.ships.length).toBe(5);
        expect(player.ships[0]).toEqual(new Ship('cruiser', 3, 'CRU'));
        expect(player.ships[1]).toEqual(new Ship('submarine', 3, 'SUB'));
        expect(player.ships[2]).toEqual(new Ship('battleship', 4, 'BTL'));
        expect(player.ships[3]).toEqual(new Ship('destroyer', 2, 'DST'));
        expect(player.ships[4]).toEqual(new Ship('carrier', 5, 'CAR'));
    });

});