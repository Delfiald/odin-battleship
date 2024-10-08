import Player from '../components/player';
import Ship from '../components/ship';
import Game from '../game/game';

describe('Game', () => {
  let gameInstance;
  let player2Ship;

  // Mock objek kapal dan pemain
  const createMockShips = () => [
      { ship: Ship(3), coordinates: [[1, 1]] },
      { ship: Ship(3), coordinates: [[1, 3]] },
    ];

  const createMockPlayers = () => {
    const player1 = Player(true);
    const player2 = Player(true);
    const ships1 = createMockShips();

    player1.gameboard.setShips(ships1);
    player2.gameboard.setShips([{ ship: Ship(3), coordinates: [[1, 3]] }]);

    return { player1, player2 };
  };

  beforeEach(() => {
    const { player1, player2 } = createMockPlayers();
    gameInstance = Game(player1, player2);

    player2Ship = player2.gameboard;
  });

  it('should create a game instance', () => {
    expect(gameInstance).toBeDefined();
  });

  it('should call switchTurns when playerAttack is executed', () => {
    const switchTurnsSpy = jest.spyOn(gameInstance, 'switchTurns');

    gameInstance.playerAttack(2, 1);

    expect(switchTurnsSpy).toHaveBeenCalled();
    switchTurnsSpy.mockRestore();
  });

  it('should return attack coordinates', () => {
    expect(gameInstance.playerAttack(1, 1)).toStrictEqual([[1, 1]]);
  });

  it('should sink a ship', () => {
    const switchTurnsSpy = jest.spyOn(gameInstance, 'switchTurns');
    const allShipsSunkSpy = jest.spyOn(player2Ship, 'allShipsSunk');

    expect(gameInstance.playerAttack(1, 3)).toStrictEqual([[1, 3]]);
    expect(switchTurnsSpy).toHaveBeenCalled();

    expect(gameInstance.playerAttack(2, 3)).toStrictEqual([[2, 3]]);
    expect(switchTurnsSpy).toHaveBeenCalledTimes(2);

    expect(gameInstance.playerAttack(3, 3)).toStrictEqual([[1, 3], [3, 3]]);
    expect(switchTurnsSpy).toHaveBeenCalledTimes(3);

    expect(gameInstance.playerAttack(3, 3)).toStrictEqual([[2, 3], [3, 3]]);
    expect(gameInstance.playerAttack(2, 3)).toStrictEqual([[1, 3], [3, 3], [2, 3]]);

    // Check if all player 2's ships are sunk
    expect(switchTurnsSpy).toHaveBeenCalledTimes(4);
    expect(allShipsSunkSpy).toHaveBeenCalled();

    switchTurnsSpy.mockRestore();
  });
});
