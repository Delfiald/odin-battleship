import Ship from './ship';

const Gameboard = () => {
  let shipCoordinates = [];
  const attackedCoordinates = [];
  let isHorizontal = true;

  const containsArray = (arr, target) =>
    arr.some(
      (subArray) =>
        subArray.length === target.length &&
        subArray.every((val, index) => val === target[index])
    );

  const isCoordinateAvailable = (x, y) => {
    if (
      x >= 0 &&
      x < 10 &&
      y >= 0 &&
      y < 10 &&
      !containsArray(attackedCoordinates, [x, y])
    ) {
      return true;
    }

    return false;
  };

  const receiveAttack = (x, y) => {
    if (isCoordinateAvailable(x, y)) {
      attackedCoordinates.push([x, y]);

      let isHit = false;

      shipCoordinates.forEach((shipObj) => {
        if (containsArray(shipObj.coordinates, [x, y])) {
          shipObj.ship.hit();
          isHit = true;
        }
      });

      return {
        coordinates: [x, y],
        hit: isHit,
      };
    }
    return { error: 'Invalid Attack Coordinate' };
  };

  const allShipsSunk = () =>
    shipCoordinates.every((shipObj) => shipObj.ship.isSunk());

  const toggleOrientation = () => {
    isHorizontal = !isHorizontal;
  };

  const setShipCoordinates = (shipLength, shipStartCoordinate, horizontal) => {
    const newCoordinates = [];
    const currentCoordinate = shipStartCoordinate;
    if (!horizontal) {
      for (let i = 0; i < shipLength; i += 1) {
        newCoordinates.push([currentCoordinate[0] + i, currentCoordinate[1]]);
      }
    } else {
      for (let i = 0; i < shipLength; i += 1) {
        newCoordinates.push([currentCoordinate[0], currentCoordinate[1] + i]);
      }
    }

    return newCoordinates;
  };

  const setShips = (ships) => {
    ships.forEach((shipObj) => {
      const { ship, coordinates } = shipObj;
      const shipLength = ship.shipProperty.length;

      const newCoordinates = setShipCoordinates(
        shipLength,
        coordinates[0],
        isHorizontal
      );

      newCoordinates.forEach((coordinate) => {
        const [x, y] = coordinate;
        if (
          shipCoordinates.some((existingShip) =>
            containsArray(existingShip.coordinates, coordinate)
          )
        ) {
          throw new Error(`this ${coordinate} coordinate not available`);
        }

        if (x < 0 || x > 9 || y < 0 || y > 9) {
          throw new Error(`Coordinate ${coordinate} is out of bounds`);
        }
      });

      shipCoordinates.push({ ship, coordinates: newCoordinates });

      isHorizontal = true;
    });
  };

  const resetBoard = () => {
    shipCoordinates = [];
  };

  const shipsList = () => {
    const carrier = Ship(5);
    const battleship = Ship(4);
    const destroyer = Ship(3);
    const submarine = Ship(3);
    const patrolBoat = Ship(2);

    return [carrier, battleship, destroyer, submarine, patrolBoat];
  };

  const createShipFactory = () => {
    const ships = shipsList();
    let currentIndex = 0;

    const getCurrentShip = () => {
      if (currentIndex >= ships.length) {
        throw new Error('All ships have been placed');
      }
      return ships[currentIndex];
    };

    const placeNextShip = (coordinates) => {
      const ship = getCurrentShip();
      return { ship, coordinates };
    };

    const incrementIndex = () => {
      currentIndex += 1;
    };

    const getCurrentIndex = () => currentIndex;

    const resetCurrentIndex = () => {
      currentIndex = 0;
    };

    return {
      getCurrentShip,
      placeNextShip,
      incrementIndex,
      allShipsPlaced: () => currentIndex >= ships.length,
      getCurrentIndex,
      resetCurrentIndex,
    };
  };

  const setRandomShip = (factory) => {
    let x;
    let y;

    if (factory.getCurrentIndex() >= 5) {
      resetBoard();
      factory.resetCurrentIndex();
    }

    while (!factory.allShipsPlaced()) {
      let isValidPlacement = false;
      let tempCoordinates;
      while (!isValidPlacement) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);

        isHorizontal = Math.random() >= 0.5;

        tempCoordinates = [[x, y]];

        try {
          setShips([factory.placeNextShip(tempCoordinates)]);
          factory.incrementIndex();
          isValidPlacement = true;
        } catch (error) {
          // return error
        }
      }
    }

    return shipCoordinates;
  };

  const getShipCoordinates = () => [...shipCoordinates];

  const getOrientation = () => isHorizontal;

  return {
    receiveAttack,
    allShipsSunk,
    setShips,
    toggleOrientation,
    resetBoard,
    setRandomShip,
    createShipFactory,
    getShipCoordinates,
    getOrientation,
  };
};

export default Gameboard;
