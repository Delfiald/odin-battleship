import Gameboard from '../components/gameboard';
import Ship from '../components/ship';

describe('Gameboard', () => {
  let testGameboard;
  beforeEach(() => {
    jest.clearAllMocks();
    testGameboard = Gameboard();
  });

  it('called Gameboard function', () => {
    expect(testGameboard).not.toBeNull();
  });

  it('should check attack coordinates', () => {
    expect(testGameboard.receiveAttack(-1, 0)).toStrictEqual({
      error: 'Invalid Attack Coordinate',
    });
  });

  it('should add attack coordinates', () => {
    expect(testGameboard.receiveAttack(1, 0)).toStrictEqual({
      coordinates: [1, 0],
      hit: false,
    });

    expect(testGameboard.receiveAttack(1, 2)).toStrictEqual({
      coordinates: [1, 2],
      hit: false,
    });

    expect(testGameboard.receiveAttack(2, 0)).toStrictEqual({
      coordinates: [2, 0],
      hit: false,
    });
  });

  it('should not add attack coordinates', () => {
    expect(testGameboard.receiveAttack(1, 0)).toStrictEqual({
      coordinates: [1, 0],
      hit: false,
    });

    expect(testGameboard.receiveAttack(1, 0)).toStrictEqual({
      error: 'Invalid Attack Coordinate',
    });
  });

  it('should add ships at coordinate', () => {
    const mockShip1 = Ship(3);
    const mockShip2 = Ship(3);

    const setShipsSpy = jest.spyOn(testGameboard, 'setShips');

    testGameboard.setShips([
      { ship: mockShip1, coordinates: [[1, 1]] },
      { ship: mockShip2, coordinates: [[3, 3]] },
    ]);

    expect(setShipsSpy).toHaveBeenCalledWith([
      { ship: mockShip1, coordinates: [[1, 1]] },
      { ship: mockShip2, coordinates: [[3, 3]] },
    ]);

    setShipsSpy.mockRestore();
  });

  it('should add ships vertically', () => {
    const mockShip1 = Ship(3);
    const mockShip2 = Ship(3);

    const setShipsSpy = jest.spyOn(testGameboard, 'setShips');

    testGameboard.toggleOrientation();

    // Add Ship Vertically
    testGameboard.setShips([{ ship: mockShip1, coordinates: [[1, 1]] }]);

    expect(setShipsSpy).toHaveBeenCalledWith([
      { ship: mockShip1, coordinates: [[1, 1]] },
    ]);

    // Can't add ship
    expect(
      testGameboard.setShips([{ ship: mockShip2, coordinates: [[0, 1]] }])
    ).toBe();

    // Set back ro horizontal and ship can be added
    testGameboard.setShips([{ ship: mockShip1, coordinates: [[4, 4]] }]);

    expect(setShipsSpy).toHaveBeenCalledWith([
      { ship: mockShip1, coordinates: [[4, 4]] },
    ]);

    setShipsSpy.mockRestore();
  });

  it('should not add ships at not available coordinates', () => {
    const mockShip1 = Ship(3);
    const mockShip2 = Ship(3);

    testGameboard.setShips([
      { ship: mockShip1, coordinates: [[1, 1]] },
      { ship: mockShip2, coordinates: [[2, 1]] },
    ]);

    const mockShip3 = Ship(5);

    expect(() =>
      testGameboard.setShips([{ ship: mockShip3, coordinates: [[1, 1]] }])
    ).toThrow('this 1,1 coordinate not available');

    expect(() =>
      testGameboard.setShips([{ ship: mockShip3, coordinates: [[1, -1]] }])
    ).toThrow('Coordinate 1,-1 is out of bounds');
  });

  it('should call hit() when a ship is attacked', () => {
    const mockShip = Ship(2);
    jest.spyOn(mockShip, 'hit');

    testGameboard.setShips([{ ship: mockShip, coordinates: [[1, 1]] }]);

    expect(testGameboard.receiveAttack(1, 2)).toStrictEqual({
      coordinates: [1, 2],
      hit: true,
    });
    expect(testGameboard.receiveAttack(2, 1)).toStrictEqual({
      coordinates: [2, 1],
      hit: false,
    });

    expect(mockShip.hit).toHaveBeenCalledTimes(1);

    expect(testGameboard.receiveAttack(1, 1)).toStrictEqual({
      coordinates: [1, 1],
      hit: true,
    });

    expect(mockShip.hit).toHaveBeenCalledTimes(2);

    expect(mockShip.isSunk()).toBe(true);
  });
});
