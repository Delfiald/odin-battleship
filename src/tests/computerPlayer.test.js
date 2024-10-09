import ComputerPlayer from "../game/computerPlayer";

describe('Computer Player', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should called Computer Player', () => {
    const testComputerPlayer = ComputerPlayer()
    expect(testComputerPlayer).not.toBeUndefined()
  })

  // it('should give random coordinate', () => {
  //   const testComputerPlayer = ComputerPlayer()
  //   const [x, y] = testComputerPlayer.setAttackCoordinate();

  //   expect(x).toBeGreaterThanOrEqual(0);
  //   expect(x).toBeLessThan(10);
  //   expect(y).toBeGreaterThanOrEqual(0);
  //   expect(y).toBeLessThan(10);
  // })

  // it('should return mocked coordinate when setAttackCoordinate is called', () => {
  //   const testComputerPlayer = ComputerPlayer();
    
  //   jest.spyOn(Math, 'random')
  //     .mockReturnValueOnce(0.2)
  //     .mockReturnValueOnce(0.7);
    
  //   const [x, y] = testComputerPlayer.setAttackCoordinate();

  //   expect(x).toBe(2);
  //   expect(y).toBe(7);
  // });

  // it('should use latestCoordinate when previous hit is successful', () => {
  //   const testComputerPlayer = ComputerPlayer();
    
  //   jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);

  //   testComputerPlayer.setAttackCoordinate();
  //   testComputerPlayer.setLatestCoordinate([4, 4]);
  //   testComputerPlayer.setIsHit(true);
    
  //   const [x, y] = testComputerPlayer.setAttackCoordinate();
    
  //   expect(x).toBeGreaterThanOrEqual(3);
  //   expect(x).toBeLessThanOrEqual(5);
  //   expect(y).toBe(4);
  // });

  // it('should use latestCoordinate and try surrounding coordinates after hit', () => {
  //   const testComputerPlayer = ComputerPlayer();

  //   jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);

  //   // Set attack and hit at 4,4
  //   testComputerPlayer.setIsHit(true);
  //   testComputerPlayer.setLatestCoordinate([4, 4]);

  //   // horizontal
  //   // Second attack (5,4), hit
  //   let [x, y] = testComputerPlayer.setAttackCoordinate();
  //   expect(x).toBe(5);
  //   expect(y).toBe(4);
    
  //   testComputerPlayer.setIsHit(true);
  //   testComputerPlayer.setLatestCoordinate([5, 4]);

  //   // Third attack (6,4), miss
  //   [x, y] = testComputerPlayer.setAttackCoordinate();
  //   expect(x).toBe(6);
  //   expect(y).toBe(4);
  //   testComputerPlayer.setIsHit(false);
  //   testComputerPlayer.setLatestCoordinate([6, 4]);
    
  //   // Fourth attack (3,4), hit
  //   [x, y] = testComputerPlayer.setAttackCoordinate();
  //   expect(x).toBe(3);
  //   expect(y).toBe(4);
  //   testComputerPlayer.setIsHit(true);
  //   testComputerPlayer.setLatestCoordinate([3, 4]);

  //   // Fifth attack (2,4), miss
  //   [x, y] = testComputerPlayer.setAttackCoordinate();
  //   expect(x).toBe(2);
  //   expect(y).toBe(4);

  //   testComputerPlayer.setIsHit(false); // Simulate miss
  //   testComputerPlayer.setLatestCoordinate([2, 4]);

  //   // After the miss, it should return to random
  //   [x, y] = testComputerPlayer.setAttackCoordinate();
  //   expect(x).toBeGreaterThanOrEqual(0);
  //   expect(x).toBeLessThan(10);
  //   expect(y).toBeGreaterThanOrEqual(0);
  //   expect(y).toBeLessThan(10);
  // });

  it('should switch from horizontal to vertical after misses and try surrounding coordinates', () => {
    const testComputerPlayer = ComputerPlayer();
  
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
  
    // Set initial hit at 4,4
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([4, 4]);
  
    // horizontal, first try to the right (5,4), miss
    let [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(5);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([5, 4]);
  
    // horizontal, second try to the left (3,4), miss
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(3);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([3, 4]);
  
    // After misses in both directions horizontally, switch to vertical and try downwards (4,5), hit
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(5);
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([4, 5]);
  
    // Try downwards again (4,6), miss
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(6);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([4, 6]);
  
    // After miss downwards, try upwards (4,3), hit
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(3);
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([4, 3]);
  
    // Try upwards again (4,2), miss
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(2);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([4, 2]);
  
    // Since both directions (upwards and downwards) have been tried and failed, should switch to random
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
  });

  it('should switch to random after hits to the left and miss after moving horizontally', () => {
    const testComputerPlayer = ComputerPlayer();
  
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
  
    // Set initial hit at 4,4
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([4, 4]);
  
    // horizontal, first try to the right (5,4), miss
    let [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(5);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([5, 4]);
  
    // horizontal, second try to the left (3,4), hit
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(3);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([3, 4]);
  
    // horizontal, third try to the left (2,4), hit
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(2);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([2, 4]);
  
    // horizontal, fourth try to the left (1,4), miss
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(1);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([1, 4]);
  
    // After all directions in horizontal are tried, should return to random
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
  });
})