import Player from "../components/player"
import Game from "../game/game"

describe('All', () => {
  // Test from start to end
  it('should run game from creating player to end', () => {
    const player1 = Player(true)
    const player2 = Player(true)

    const shipFactory = player1.gameboard.createShipFactory()
    const shipFactoryP2 = player1.gameboard.createShipFactory();

    // P1 ships
    player1.gameboard.setShips([shipFactory.placeNextShip([[1, 1]])])
    shipFactory.incrementIndex()
    player1.gameboard.toggleOrientation()
    player1.gameboard.setShips([shipFactory.placeNextShip([[2, 1]])])
    shipFactory.incrementIndex()
    player1.gameboard.toggleOrientation()
    player1.gameboard.setShips([shipFactory.placeNextShip([[2, 2]])])
    shipFactory.incrementIndex()
    player1.gameboard.setShips([shipFactory.placeNextShip([[2, 3]])])
    shipFactory.incrementIndex()
    player1.gameboard.setShips([shipFactory.placeNextShip([[3, 3]])])
    shipFactory.incrementIndex()

    expect(shipFactory.allShipsPlaced()).toBe(true);

    // P2 (AI) ships placement
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[1, 1]])])
    shipFactoryP2.incrementIndex()
    player2.gameboard.toggleOrientation()
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[2, 1]])])
    shipFactoryP2.incrementIndex()
    player2.gameboard.toggleOrientation()
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[2, 2]])])
    shipFactoryP2.incrementIndex()
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[2, 3]])])
    shipFactoryP2.incrementIndex()
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[3, 3]])])
    shipFactoryP2.incrementIndex()

    expect(shipFactoryP2.allShipsPlaced()).toBe(true);

    // Start the game
    const testGame = Game(player1, player2)
    const spyOnSwitchPlayer = jest.spyOn(testGame, 'switchTurns')

    // p1 attack
    expect(testGame.playerAttack(1, 1)).toStrictEqual(
      {coordinates: [1, 1], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(1)

    // p2 attack
    expect(testGame.playerAttack(1, 1)).toStrictEqual(
      {coordinates: [1, 1], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(2)

    // p1 attack (already attacked coordinates)
    expect(testGame.playerAttack(1, 1)).toBeNull()
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(2) // didn't changes player

    // p1 attack
    expect(testGame.playerAttack(1, 2)).toStrictEqual(
      {coordinates: [1, 2], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(3)

    // p2 attack
    expect(testGame.playerAttack(1, 2)).toStrictEqual(
      {coordinates: [1, 2], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(4)

    // p1 attack
    expect(testGame.playerAttack(1, 3)).toStrictEqual(
      {coordinates: [1, 3], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(5)

    // p2 attack
    expect(testGame.playerAttack(1, 3)).toStrictEqual(
      {coordinates: [1, 3], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(6)

    // p1 attack
    expect(testGame.playerAttack(1, 4)).toStrictEqual(
      {coordinates: [1, 4], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(7)

    // p2 attack
    expect(testGame.playerAttack(1, 4)).toStrictEqual(
      {coordinates: [1, 4], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(8)

    // p1 attack
    expect(testGame.playerAttack(1, 5)).toStrictEqual(
      {coordinates: [1, 5], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(9)

    // p2 attack
    expect(testGame.playerAttack(1, 5)).toStrictEqual(
      {coordinates: [1, 5], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(10)

    // p1 attack
    expect(testGame.playerAttack(1, 6)).toStrictEqual(
      {coordinates: [1, 6], hit: false}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(11)

    // p2 attack
    expect(testGame.playerAttack(2, 1)).toStrictEqual(
      {coordinates: [2, 1], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(12)

    // p1 attack
    expect(testGame.playerAttack(2, 1)).toStrictEqual(
      {coordinates: [2, 1], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(13)

    // p2 attack
    expect(testGame.playerAttack(2, 2)).toStrictEqual(
      {coordinates: [2, 2], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(14)

    // p1 attack
    expect(testGame.playerAttack(2, 2)).toStrictEqual(
      {coordinates: [2, 2], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(15)

    // p2 attack
    expect(testGame.playerAttack(2, 3)).toStrictEqual(
      {coordinates: [2, 3], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(16)

    // p1 attack
    expect(testGame.playerAttack(2, 3)).toStrictEqual(
      {coordinates: [2, 3], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(17)

    // p2 attack
    expect(testGame.playerAttack(2, 4)).toStrictEqual(
      {coordinates: [2, 4], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(18)

    // p1 attack
    expect(testGame.playerAttack(2, 4)).toStrictEqual(
      {coordinates: [2, 4], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(19)

    // p2 attack
    expect(testGame.playerAttack(2, 5)).toStrictEqual(
      {coordinates: [2, 5], hit: true}
    );
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(20)

    // p1 attack
    expect(testGame.playerAttack(3, 1)).toStrictEqual(
      {coordinates: [3, 1], hit: true}
    );

    // p2 attack
    expect(testGame.playerAttack(3, 1)).toStrictEqual(
      {coordinates: [3, 1], hit: true}
    );

    // p1 attack
    expect(testGame.playerAttack(3, 2)).toStrictEqual(
      {coordinates: [3, 2], hit: true}
    );

    // p2 attack
    expect(testGame.playerAttack(3, 2)).toStrictEqual(
      {coordinates: [3, 2], hit: true}
    );

    // p1 attack
    expect(testGame.playerAttack(3, 3)).toStrictEqual(
      {coordinates: [3, 3], hit: true}
    );

    // p2 attack
    expect(testGame.playerAttack(3, 3)).toStrictEqual(
      {coordinates: [3, 3], hit: true}
    );

    // p1 attack
    expect(testGame.playerAttack(4, 1)).toStrictEqual(
      {coordinates: [4, 1], hit: true}
    );

    // p2 attack
    expect(testGame.playerAttack(4, 1)).toStrictEqual(
      {coordinates: [4, 1], hit: true}
    );

    // p1 attack
    expect(testGame.playerAttack(4, 2)).toStrictEqual(
      {coordinates: [4, 2], hit: true}
    );

    // p2 attack
    expect(testGame.playerAttack(4, 2)).toStrictEqual(
      {coordinates: [4, 2], hit: true}
    );

    // p1 attack
    expect(testGame.playerAttack(4, 3)).toStrictEqual(
      {coordinates: [4, 3], hit: false}
    );

    // p2 attack
    expect(testGame.playerAttack(4, 3)).toStrictEqual(
      {coordinates: [4, 3], hit: false}
    );

    // p1 attack
    expect(testGame.playerAttack(5, 1)).toStrictEqual(
      {coordinates: [5, 1], hit: true}
    );

    // p2 attack
    expect(testGame.playerAttack(5, 1)).toStrictEqual(
      {coordinates: [5, 1], hit: true}
    );

    // p1 attack
    expect(testGame.playerAttack(5, 2)).toStrictEqual(
      {coordinates: [5, 2], hit: false}
    );
  })

  it('should run the game from Player 1 to AI', () => {
    const player1 = Player(true); // Human player
    const player2 = Player(false); // AI player

    const shipFactory = player1.gameboard.createShipFactory();
    const shipFactoryP2 = player2.gameboard.createShipFactory();

    player1.gameboard.setShips([shipFactory.placeNextShip([[1, 1]])])
    shipFactory.incrementIndex()
    player1.gameboard.toggleOrientation()
    player1.gameboard.setShips([shipFactory.placeNextShip([[2, 1]])])
    shipFactory.incrementIndex()
    player1.gameboard.toggleOrientation()
    player1.gameboard.setShips([shipFactory.placeNextShip([[2, 2]])])
    shipFactory.incrementIndex()
    player1.gameboard.setShips([shipFactory.placeNextShip([[2, 3]])])
    shipFactory.incrementIndex()
    player1.gameboard.setShips([shipFactory.placeNextShip([[3, 3]])])
    shipFactory.incrementIndex()

    expect(shipFactory.allShipsPlaced()).toBe(true);

    // P2 (AI) ships placement
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[1, 1]])])
    shipFactoryP2.incrementIndex()
    player2.gameboard.toggleOrientation()
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[2, 1]])])
    shipFactoryP2.incrementIndex()
    player2.gameboard.toggleOrientation()
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[2, 2]])])
    shipFactoryP2.incrementIndex()
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[2, 3]])])
    shipFactoryP2.incrementIndex()
    player2.gameboard.setShips([shipFactoryP2.placeNextShip([[3, 3]])])
    shipFactoryP2.incrementIndex()

    expect(shipFactoryP2.allShipsPlaced()).toBe(true);

    // Start the game
    const testGame = Game(player1, player2);
    const spyOnSwitchPlayer = jest.spyOn(testGame, 'switchTurns');
    const spyOnIsComputerPlayer = jest.spyOn(testGame, 'isComputerPlayer');

    // P1 attacks P2
    expect(testGame.playerAttack(1, 1)).toStrictEqual(
      { coordinates: [1, 1], hit: true }
    );

    // Verify if turn switched to AI (computer)
    expect(testGame.isComputerPlayer()).toBeTruthy();
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(1);

    // Simulate AI attack logic and make sure AI has attacked
    testGame.switchTurns(); // This should trigger the AI's turn
    testGame.switchTurns();
    testGame.switchTurns();
    testGame.switchTurns();
    testGame.switchTurns();
    testGame.switchTurns();
    testGame.switchTurns();
    testGame.switchTurns();
    testGame.switchTurns();
    testGame.switchTurns();

    expect(spyOnIsComputerPlayer).toHaveBeenCalled();
  });

  it('test ship random placement', () => {
    const player1 = Player(true);

    const shipFactory = player1.gameboard.createShipFactory()

    player1.gameboard.setRandomShip(shipFactory)
  })
})