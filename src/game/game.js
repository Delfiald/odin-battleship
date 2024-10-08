import ComputerPlayer from "./computerPlayer";

const Game = (player1, player2) => {
  let currentPlayer = player1;
  let opponentPlayer = player2;

  const computerPlayer = ComputerPlayer();

  const gameMethods = {
    isComputerPlayer: () => {
      if(!currentPlayer.isHuman) {
        let attackSuccessful = false;
        while(!attackSuccessful) {
          try{
            const [x, y] = computerPlayer.setAttackCoordinate()
            const attackResult = gameMethods.playerAttack(x, y)
            if(attackResult.hit){
              attackSuccessful = true;
              computerPlayer.setIsHit(true)
              computerPlayer.setLatestCoordinate([x, y]);
            }else {
              computerPlayer.setIsHit(false)
              computerPlayer.setLatestCoordinate([x, y]);
            }
          }catch(error) {
            console.log('Error: ', error.message)
          }
        }
      }
    },
    switchTurns: () => {
      [currentPlayer, opponentPlayer] = [opponentPlayer, currentPlayer];
      gameMethods.isComputerPlayer();
    },
    playerAttack: (x, y) => {
      const attackResult = currentPlayer.attack(opponentPlayer.gameboard, x, y);

      const allShipsSunk = opponentPlayer.gameboard.allShipsSunk()
      if(!allShipsSunk){
        gameMethods.switchTurns();
      }

      return attackResult
    }
  }

  return gameMethods
};

export default Game;
