import Player from "../components/player"
import Ship from "../components/ship"
import Game from "../game/game"

describe('All', () => {
  const shipsList = () => {
    const carrier = Ship(5);
    const battleship = Ship(4)
    const destroyer = Ship(3)
    const submarine = Ship(3)
    const patrolBoat = Ship(2)

    return [carrier, battleship, destroyer, submarine, patrolBoat];
  }

  const createShipFactory = () => {
    const ships = shipsList();
    let currentIndex = 0;
  
    const createShip = (coordinates) => {
      if (currentIndex >= ships.length) {
        throw new Error('All ships have been placed');
      }
      const ship = ships[currentIndex];
      currentIndex += 1;
      return [{ ship, coordinates }];
    };
  
    return {
      createShip,
      allShipsPlaced: () => currentIndex >= ships.length,
    };
  };

  // // Test from start to end
  // it('should run game from creating player to end', () => {
  //   const player1 = Player(true)
  //   const player2 = Player(true)

  //   const shipFactory = createShipFactory()
  //   const shipFactoryP2 = createShipFactory();

  //   // P1 ships
  //   player1.gameboard.setShips(shipFactory.createShip([[1, 1]]))

  //   // Switch to vertical
  //   player1.gameboard.toggleOrientation()
  //   player1.gameboard.setShips(shipFactory.createShip([[1, 2]]))

  //   // Switch to vertical again because after set ships it set to horizontal automatically
  //   player1.gameboard.toggleOrientation()
  //   player1.gameboard.setShips(shipFactory.createShip([[2, 2]]))

  //   // Switch to horizontal
  //   player1.gameboard.setShips(shipFactory.createShip([[3, 2]]))
  //   player1.gameboard.setShips(shipFactory.createShip([[3, 3]]))

  //   expect(shipFactory.allShipsPlaced()).toBe(true);

  //   // P2 ships
  //   player2.gameboard.setShips(shipFactoryP2.createShip([[1, 1]]))

  //   // Switch to vertical
  //   player2.gameboard.toggleOrientation()
  //   player2.gameboard.setShips(shipFactoryP2.createShip([[1, 2]]))

  //   // Switch to vertical again because after set ships it set to horizontal automatically
  //   player2.gameboard.toggleOrientation()
  //   player2.gameboard.setShips(shipFactoryP2.createShip([[2, 2]]))

  //   // Switch to horizontal
  //   player2.gameboard.setShips(shipFactoryP2.createShip([[3, 2]]))
  //   player2.gameboard.setShips(shipFactoryP2.createShip([[3, 3]]))

  //   expect(shipFactoryP2.allShipsPlaced()).toBe(true);

  //   // Start the game
  //   const testGame = Game(player1, player2)
  //   const spyOnSwitchPlayer = jest.spyOn(testGame, 'switchTurns')

  //   // p1 attack
  //   expect(testGame.playerAttack(1, 1)).toStrictEqual(
  //     {coordinates: [1, 1], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(1)

  //   // p2 attack
  //   expect(testGame.playerAttack(1, 1)).toStrictEqual(
  //     {coordinates: [1, 1], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(2)

  //   // p1 attack (already attacked coordinates)
  //   expect(() => testGame.playerAttack(1, 1)).toThrow(
  //     'False Attack Coordinates'
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(2) // didn't changes player

  //   // p1 attack
  //   expect(testGame.playerAttack(1, 2)).toStrictEqual(
  //     {coordinates: [1, 2], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(3)

  //   // p2 attack
  //   expect(testGame.playerAttack(1, 2)).toStrictEqual(
  //     {coordinates: [1, 2], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(4)

  //   // p1 attack
  //   expect(testGame.playerAttack(1, 3)).toStrictEqual(
  //     {coordinates: [1, 3], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(5)

  //   // p2 attack
  //   expect(testGame.playerAttack(1, 3)).toStrictEqual(
  //     {coordinates: [1, 3], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(6)

  //   // p1 attack
  //   expect(testGame.playerAttack(1, 4)).toStrictEqual(
  //     {coordinates: [1, 4], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(7)

  //   // p2 attack
  //   expect(testGame.playerAttack(1, 4)).toStrictEqual(
  //     {coordinates: [1, 4], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(8)

  //   // p1 attack
  //   expect(testGame.playerAttack(1, 5)).toStrictEqual(
  //     {coordinates: [1, 5], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(9)

  //   // p2 attack
  //   expect(testGame.playerAttack(1, 5)).toStrictEqual(
  //     {coordinates: [1, 5], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(10)

  //   // p1 attack
  //   expect(testGame.playerAttack(1, 6)).toStrictEqual(
  //     {coordinates: [1, 6], hit: false}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(11)

  //   // p2 attack
  //   expect(testGame.playerAttack(2, 1)).toStrictEqual(
  //     {coordinates: [2, 1], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(12)

  //   // p1 attack
  //   expect(testGame.playerAttack(2, 1)).toStrictEqual(
  //     {coordinates: [2, 1], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(13)

  //   // p2 attack
  //   expect(testGame.playerAttack(2, 2)).toStrictEqual(
  //     {coordinates: [2, 2], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(14)

  //   // p1 attack
  //   expect(testGame.playerAttack(2, 2)).toStrictEqual(
  //     {coordinates: [2, 2], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(15)

  //   // p2 attack
  //   expect(testGame.playerAttack(2, 3)).toStrictEqual(
  //     {coordinates: [2, 3], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(16)

  //   // p1 attack
  //   expect(testGame.playerAttack(2, 3)).toStrictEqual(
  //     {coordinates: [2, 3], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(17)

  //   // p2 attack
  //   expect(testGame.playerAttack(2, 4)).toStrictEqual(
  //     {coordinates: [2, 4], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(18)

  //   // p1 attack
  //   expect(testGame.playerAttack(2, 4)).toStrictEqual(
  //     {coordinates: [2, 4], hit: true}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(19)

  //   // p2 attack
  //   expect(testGame.playerAttack(2, 5)).toStrictEqual(
  //     {coordinates: [2, 5], hit: false}
  //   );
  //   expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(20)

  //   // p1 attack
  //   expect(testGame.playerAttack(3, 1)).toStrictEqual(
  //     {coordinates: [3, 1], hit: true}
  //   );

  //   // p2 attack
  //   expect(testGame.playerAttack(3, 1)).toStrictEqual(
  //     {coordinates: [3, 1], hit: true}
  //   );

  //   // p1 attack
  //   expect(testGame.playerAttack(3, 2)).toStrictEqual(
  //     {coordinates: [3, 2], hit: true}
  //   );

  //   // p2 attack
  //   expect(testGame.playerAttack(3, 2)).toStrictEqual(
  //     {coordinates: [3, 2], hit: true}
  //   );

  //   // p1 attack
  //   expect(testGame.playerAttack(3, 3)).toStrictEqual(
  //     {coordinates: [3, 3], hit: true}
  //   );

  //   // p2 attack
  //   expect(testGame.playerAttack(3, 3)).toStrictEqual(
  //     {coordinates: [3, 3], hit: true}
  //   );

  //   // p1 attack
  //   expect(testGame.playerAttack(4, 1)).toStrictEqual(
  //     {coordinates: [4, 1], hit: true}
  //   );

  //   // p2 attack
  //   expect(testGame.playerAttack(4, 1)).toStrictEqual(
  //     {coordinates: [4, 1], hit: true}
  //   );

  //   // p1 attack
  //   expect(testGame.playerAttack(4, 2)).toStrictEqual(
  //     {coordinates: [4, 2], hit: true}
  //   );

  //   // p2 attack
  //   expect(testGame.playerAttack(4, 2)).toStrictEqual(
  //     {coordinates: [4, 2], hit: true}
  //   );

  //   // p1 attack
  //   expect(testGame.playerAttack(4, 3)).toStrictEqual(
  //     {coordinates: [4, 3], hit: true}
  //   );

  //   // p2 attack
  //   expect(testGame.playerAttack(4, 3)).toStrictEqual(
  //     {coordinates: [4, 3], hit: true}
  //   );

  //   // p1 attack
  //   expect(testGame.playerAttack(5, 1)).toStrictEqual(
  //     {coordinates: [5, 1], hit: true}
  //   );

  //   // p2 attack
  //   expect(testGame.playerAttack(5, 1)).toStrictEqual(
  //     {coordinates: [5, 1], hit: true}
  //   );

  //   // p1 attack
  //   expect(testGame.playerAttack(5, 2)).toStrictEqual(
  //     {coordinates: [5, 2], hit: true}
  //   );
  // })

  it('should run the game from Player 1 to AI', () => {
    const player1 = Player(true); // Human player
    const player2 = Player(false); // AI player

    const shipFactoryP1 = createShipFactory();
    const shipFactoryP2 = createShipFactory();

    // P1 (Human) ships placement
    player1.gameboard.setShips(shipFactoryP1.createShip([[1, 1]]));
    player1.gameboard.toggleOrientation();
    player1.gameboard.setShips(shipFactoryP1.createShip([[1, 2]]));
    player1.gameboard.toggleOrientation();
    player1.gameboard.setShips(shipFactoryP1.createShip([[2, 2]]));
    player1.gameboard.setShips(shipFactoryP1.createShip([[3, 2]]));
    player1.gameboard.setShips(shipFactoryP1.createShip([[3, 3]]));

    expect(shipFactoryP1.allShipsPlaced()).toBe(true);

    // P2 (AI) ships placement
    player2.gameboard.setShips(shipFactoryP2.createShip([[1, 1]]));
    player2.gameboard.toggleOrientation();
    player2.gameboard.setShips(shipFactoryP2.createShip([[1, 2]]));
    player2.gameboard.toggleOrientation();
    player2.gameboard.setShips(shipFactoryP2.createShip([[2, 2]]));
    player2.gameboard.setShips(shipFactoryP2.createShip([[3, 2]]));
    player2.gameboard.setShips(shipFactoryP2.createShip([[3, 3]]));

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
    expect(spyOnSwitchPlayer).toHaveBeenCalledTimes(2);

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
})