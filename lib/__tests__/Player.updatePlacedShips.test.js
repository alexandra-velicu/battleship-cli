const Player = require('../Player');


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

    it('should update placed ships correctly', () => {
        player.updatePlacedShips('CRU');
        expect(player.ships[0].placed).toBe(true);
    });
});