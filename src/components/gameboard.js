const Gameboard = () => {
  const shipCoordinates = []
  const attackedCoordinates = [];
  let isHorizontal = true;

  const containsArray = (arr, target) => arr.some(subArray => 
    subArray.length === target.length && 
    subArray.every((val, index) => val === target[index])
  );

  const isCoordinateAvailable = (x, y) => {
    if(x >= 0 && x < 10 && y >= 0 && y < 10 && !containsArray(attackedCoordinates, [x, y])){
      return true
    }

    return false
  }
  
  const receiveAttack = (x, y) => {
    if(isCoordinateAvailable(x, y)){

      attackedCoordinates.push([x, y])

      let isHit = false;

      shipCoordinates.forEach(shipObj => {
        if (containsArray(shipObj.coordinates, [x, y])) {
          shipObj.ship.hit();
          isHit = true
        }
      })
      
      return {
        coordinates: [x, y],
        hit: isHit
      }
    }
    throw new Error('False Attack Coordinates')
  }

  const allShipsSunk = () => shipCoordinates.every(shipObj => shipObj.ship.isSunk())

  const toggleOrientation = () => {
    isHorizontal = !isHorizontal;
  };

  const setShipCoordinates = (shipLength, shipStartCoordinate, horizontal) => {
    const newCoordinates = []
    const currentCoordinate = shipStartCoordinate;
    if(horizontal) {
      for(let i = 0; i < shipLength; i+=1){
        newCoordinates.push([currentCoordinate[0] + i, currentCoordinate[1]]);
      }
    }else {
      for(let i = 0; i < shipLength; i+=1){
        newCoordinates.push([currentCoordinate[0], currentCoordinate[1] + i]);
      }
    }

    return newCoordinates;
  }

  const setShips = (ships) => {
    ships.forEach(shipObj => {
      const { ship, coordinates } = shipObj;
      const shipLength = ship.shipProperty.length;

      const newCoordinates = setShipCoordinates(shipLength, coordinates[0], isHorizontal);

      console.log(newCoordinates)

      newCoordinates.forEach(coordinate => {
        const [x, y] = coordinate;
        if (shipCoordinates.some(existingShip => containsArray(existingShip.coordinates, coordinate))) {
          throw new Error(`this ${coordinate} coordinate not available`);
        }
  
        if (x < 0 || x > 9 || y < 0 || y > 9) {
          throw new Error(`Coordinate ${coordinate} is out of bounds`);
        }
      });
      
      shipCoordinates.push({ ship, coordinates: newCoordinates });

      isHorizontal = true;
    });
  }

  return {
    receiveAttack,
    allShipsSunk,
    setShips,
    toggleOrientation
  }
}

export default Gameboard