import Ship from '../components/ship';

describe('Ship', () => {
  let testShip;
  beforeEach(() => {
    testShip = Ship(5);
  });

  it('called ship function', () => {
    expect(testShip).not.toBeNull();
  });

  it('increase ships hit point', () => {
    testShip.hit();
    expect(testShip.isSunk()).toStrictEqual(false);
  });

  it('should be sunk when hits equal length', () => {
    for (let i = 0; i < 5; i += 1) {
      testShip.hit();
    }

    expect(testShip.isSunk()).toStrictEqual(true);
  });
});
