const Ship = (shipLength) => {
  const shipProperty = {
    length: shipLength,
    hit: 0,
    sunk: false,
  };

  const hit = () => {
    shipProperty.hit += 1;
  };

  const isSunk = () => {
    if (shipProperty.hit >= shipProperty.length) {
      shipProperty.sunk = true;
    }

    return shipProperty.sunk;
  };

  return {
    shipProperty,
    hit,
    isSunk,
  };
};

export default Ship;
