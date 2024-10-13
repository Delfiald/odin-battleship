import ComputerPlayer from "../game/computerPlayer";

describe('Computer Player', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should called Computer Player', () => {
    const testComputerPlayer = ComputerPlayer()
    expect(testComputerPlayer).not.toBeUndefined()
  })

  it('should give random coordinate', () => {
    const testComputerPlayer = ComputerPlayer()
    const [x, y] = testComputerPlayer.setAttackCoordinate();

    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
  })

  it('should return mocked coordinate when setAttackCoordinate is called', () => {
    const testComputerPlayer = ComputerPlayer();
    
    jest.spyOn(Math, 'random')
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.7);
    
    const [x, y] = testComputerPlayer.setAttackCoordinate();

    expect(x).toBe(2);
    expect(y).toBe(7);
  });

  it('should switch from horizontal to vertical after misses and try surrounding coordinates', () => {
    const testComputerPlayer = ComputerPlayer();
  
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
  
    // Set initial hit at 4,4
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([4, 4]);
  
    // horizontal, first try to the right (4,4), miss
    let [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(5);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([4, 5]);
  
    // horizontal, second try to the left (3,4), miss
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(3);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([4, 3]);
  
    // After misses in both directions horizontally, switch to vertical and try downwards (5,4), hit
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(5);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([5, 4]);
  
    // Try downwards again (5,4), miss
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(6);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([6, 4]);
  
    // After miss downwards, try upwards (4,4), hit
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(3);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([4, 4]);
  
    // Try upwards again (3,4), miss
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(3);
    expect(y).toBe(4);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([3, 4]);
  
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
  
    // horizontal, first try to the right (4,5), miss
    let [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(5);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([4, 5]);
  
    // horizontal, second try to the left (4,3), hit
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(3);
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([4, 3]);
  
    // horizontal, third try to the left (4,2), hit
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(2);
    testComputerPlayer.setIsHit(true);
    testComputerPlayer.setLatestCoordinate([4, 2]);
  
    // horizontal, fourth try to the left (4,1), miss
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBe(4);
    expect(y).toBe(1);
    testComputerPlayer.setIsHit(false);
    testComputerPlayer.setLatestCoordinate([4, 1]);
  
    // After all directions in horizontal are tried, should return to random
    [x, y] = testComputerPlayer.setAttackCoordinate();
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
  });
})