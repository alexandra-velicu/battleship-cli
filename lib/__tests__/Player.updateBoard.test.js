
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
   
    it('should update board correctly', () => {
        player.updateBoard(0, 1, ' X ', opponent.ownBoard);
        expect(player.opponentBoard[0][1]).toBe(' X ');
        expect(opponent.ownBoard[0][1]).toBe(' X ');
    });

});