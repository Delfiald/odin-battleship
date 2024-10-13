import Gameboard from '../components/gameboard';
import Player from '../components/player';

jest.mock('../components/gameboard');

describe('Player', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call player human status', () => {
    const player1 = Player(true);
    expect(player1.isHuman).toBe(true);

    const player2 = Player(false);
    expect(player2.isHuman).toBe(false);
  });

  it('should create player with a gameboard', () => {
    const mock = {
      setShips: jest.fn(),
      receiveAttack: jest.fn(),
    };

    Gameboard.mockReturnValue(mock);
    const player = Player(true);

    expect(Gameboard).toHaveBeenCalled();

    expect(player.gameboard).toBe(mock);

    const ships = [
      {
        ship: {},
        coordinates: [
          [1, 1],
          [1, 2],
        ],
      },
    ];
    player.gameboard.setShips(ships);

    expect(mock.setShips).toHaveBeenCalledWith(ships);
  });

  test('player attack another opponent gameboard', () => {
    const mockGameBoard1 = {
      setShips: jest.fn(),
      receiveAttack: jest.fn(),
    };

    const mockGameBoard2 = {
      setShips: jest.fn(),
      receiveAttack: jest.fn(),
    };

    Gameboard.mockReturnValueOnce(mockGameBoard1).mockReturnValueOnce(
      mockGameBoard2
    );

    const player1 = Player(true);
    const player2 = Player(true);

    expect(Gameboard).toHaveBeenCalledTimes(2);

    expect(player1.gameboard).toBe(mockGameBoard1);
    expect(player2.gameboard).toBe(mockGameBoard2);

    const ships1 = [
      {
        ship: {},
        coordinates: [
          [1, 1],
          [1, 2],
        ],
      },
    ];

    const ships2 = [
      {
        ship: {},
        coordinates: [
          [1, 3],
          [1, 4],
        ],
      },
    ];

    player1.gameboard.setShips(ships1);
    player2.gameboard.setShips(ships2);

    expect(mockGameBoard1.setShips).toHaveBeenCalledWith(ships1);
    expect(mockGameBoard2.setShips).toHaveBeenCalledWith(ships2);

    player1.attack(player2.gameboard, 1, 3);

    expect(mockGameBoard2.receiveAttack).toHaveBeenCalledWith(1, 3);

    expect(mockGameBoard1.receiveAttack).not.toHaveBeenCalled();
  });
});
