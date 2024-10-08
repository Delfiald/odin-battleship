import Gameboard from "./gameboard"

const Player = (isHuman = true) => {
  const gameboard = Gameboard()
  const attack = (opponentGameBoard, x, y) => opponentGameBoard.receiveAttack(x, y)

  return {
    isHuman,
    gameboard,
    attack
  }
}

export default Player