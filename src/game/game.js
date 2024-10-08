const Game = (player1, player2) => {
  let currentPlayer = player1;
  let opponentPlayer = player2;

  const gameMethods = {
    switchTurns: () => {
      [currentPlayer, opponentPlayer] = [opponentPlayer, currentPlayer];
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
