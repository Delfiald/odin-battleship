import ComputerPlayer from "./computerPlayer";

const Game = (player1, player2) => {
  let currentPlayer = player1;
  let opponentPlayer = player2;

  const computerPlayer = ComputerPlayer();

  const gameMethods = {
    isComputerPlayer: () => {
      if(!currentPlayer.isHuman) {
        try{
          const [x, y] = computerPlayer.setAttackCoordinate()
          console.log(`AI attacking at (${x}, ${y})`);
          const attackResult = gameMethods.playerAttack(x, y)
          console.log('AI attack result:', attackResult);
          if(attackResult.hit){
            computerPlayer.setIsHit(true)
          }else {
            computerPlayer.setIsHit(false)
          }
          computerPlayer.setLatestCoordinate([x, y]);
        }catch(error) {
          console.log('Error: ', error.message)
        }
      }
    },
    switchTurns: () => {
      [currentPlayer, opponentPlayer] = [opponentPlayer, currentPlayer];
      if(!currentPlayer.isHuman){
        gameMethods.isComputerPlayer();
      }
    },
    playerAttack: (x, y) => {
      const attackResult = currentPlayer.attack(opponentPlayer.gameboard, x, y);

      const allShipsSunk = opponentPlayer.gameboard.allShipsSunk()
      if(!allShipsSunk){
        gameMethods.switchTurns();
      }else {
        console.log('game ended')
      }

      return attackResult
    },

    getCurrentPlayer: () => currentPlayer
  }

  return gameMethods
};

export default Game;
