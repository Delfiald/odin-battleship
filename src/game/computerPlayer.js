const ComputerPlayer = () => {
  const possibleDirection = {
    horizontal: [[1, 0], [-1, 0]],
    vertical: [[0, 1], [0, -1]],
  }
  
  const alreadyAttacked = []
  let latestCoordinate = []
  let currentDirection = null;
  let isHit = false
  let nextDirectionIndex = 0

  const isCoordinateAlreadyAttacked = (x, y) => alreadyAttacked.some(([attackedX, attackedY]) => attackedX === x && attackedY === y)

  const randomCoordinate = () => {
    console.log('random')
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

      console.log(currentDirection)
      
      const directionVectors = possibleDirection[currentDirection];
      let attackCoordinate = null

      while (nextDirectionIndex < directionVectors.length) {
        const [dx, dy] = directionVectors[nextDirectionIndex ];
        console.log(latestCoordinate)
        console.log(latestCoordinate.length)
        console.log(latestCoordinate[latestCoordinate.length - 1])
        const candidateX = latestCoordinate[latestCoordinate.length - 1][0] + dx;
        const candidateY = latestCoordinate[latestCoordinate.length - 1][1] + dy;

        if (candidateX >= 0 && candidateX < 10 && candidateY >= 0 && candidateY < 10 && !isCoordinateAlreadyAttacked(candidateX, candidateY)) {
          attackCoordinate = [candidateX, candidateY];
          console.log('===============')
          console.log(attackCoordinate);
          return attackCoordinate;
        }
        console.log('next direction')
        nextDirectionIndex += 1;
      }

      if (currentDirection === "horizontal" && latestCoordinate.length === 1) {
        console.log('ganti arah')
        currentDirection = "vertical";
        nextDirectionIndex = 0;
        return setAttackCoordinate()
      } 
      
      latestCoordinate = [];
      currentDirection = null;
      nextDirectionIndex = 0;
    }

    return randomCoordinate()
  }

  const setLatestCoordinate = (coor) => {
    console.log(isHit)
    if (isHit) {
      latestCoordinate.push(coor);
    } else if(!isHit && latestCoordinate.length > 1) {
      latestCoordinate.pop();
      nextDirectionIndex += 1;
      console.log('next direction')
    }

    alreadyAttacked.push(coor)
  }

  const setIsHit = (hitStatus) => {
    isHit = hitStatus;
    if (!isHit && latestCoordinate.length === 1 && currentDirection === 'vertical') {
      latestCoordinate = [];
      currentDirection = null;
    }
  }

  return {
    setAttackCoordinate,
    setLatestCoordinate,
    setIsHit
  }
}

export default ComputerPlayer