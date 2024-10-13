const ComputerPlayer = () => {
  const possibleDirection = {
    horizontal: [[0, 1], [0, -1]],
    vertical: [[1, 0], [-1, 0]],
  }
  
  const alreadyAttacked = []
  let latestCoordinate = []
  let currentDirection = null;
  let isHit = false
  let nextDirectionIndex = 0
  let hasHorizontalHit = false;

  const isCoordinateAlreadyAttacked = (x, y) => alreadyAttacked.some(([attackedX, attackedY]) => attackedX === x && attackedY === y)

  const randomCoordinate = () => {
    latestCoordinate = [];
    hasHorizontalHit = false;
    currentDirection = 'horizontal'
    nextDirectionIndex = 0
    let x; let y;
    do{
      x = Math.floor(Math.random() * 10)
      y = Math.floor(Math.random() * 10)
    }while(isCoordinateAlreadyAttacked(x, y))

    return [x, y]
  }

  const setAttackCoordinate = () => {
    if(latestCoordinate.length > 0) {
      
      if(!currentDirection) {
        currentDirection = 'horizontal'
      }
      
      const directionVectors = possibleDirection[currentDirection];
      let attackCoordinate = null
      while (nextDirectionIndex < directionVectors.length) {
        const [dx, dy] = directionVectors[nextDirectionIndex];
        const candidateX = latestCoordinate[latestCoordinate.length - 1][0] + dx;
        const candidateY = latestCoordinate[latestCoordinate.length - 1][1] + dy;
        
        if (candidateX >= 0 && candidateX < 10 && candidateY >= 0 && candidateY < 10 && !isCoordinateAlreadyAttacked(candidateX, candidateY)) {
          attackCoordinate = [candidateX, candidateY];
          return attackCoordinate;
        }
        nextDirectionIndex += 1;
        latestCoordinate = [latestCoordinate[0]];
      }

      if (hasHorizontalHit) {
        hasHorizontalHit = true;
        nextDirectionIndex = 0;
        return randomCoordinate();
      }

      if (currentDirection === 'horizontal' && !hasHorizontalHit) {
        currentDirection = "vertical";
        nextDirectionIndex = 0;
        return setAttackCoordinate();
      }

      if(currentDirection === 'vertical' && hasHorizontalHit){
        nextDirectionIndex = 0;
        latestCoordinate = [];
        currentDirection = null;
        return randomCoordinate();
      }
    }
    return randomCoordinate()
  }

  const setLatestCoordinate = (coor) => {
    if (isHit) {
      latestCoordinate.push(coor);
      if(currentDirection === 'horizontal' && latestCoordinate.length > 1) {
        hasHorizontalHit = true;
      }
    } else if(!isHit && latestCoordinate.length > 1) {
      latestCoordinate = [latestCoordinate[0]];
      nextDirectionIndex += 1;
    }

    alreadyAttacked.push(coor)
  }

  const setIsHit = (hitStatus) => {
    isHit = hitStatus;
  }

  return {
    setAttackCoordinate,
    setLatestCoordinate,
    setIsHit
  }
}

export default ComputerPlayer