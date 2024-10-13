import ComputerPlayer from './computerPlayer';

const Game = (player1, player2) => {
  let currentPlayer = player1;
  let opponentPlayer = player2;

  const computerPlayer = ComputerPlayer();

  const gameMethods = {
    isComputerPlayer: () => {
      let x;
      let y;
      if (!currentPlayer.isHuman) {
        try {
          [x, y] = computerPlayer.setAttackCoordinate();
        } catch (error) {
          return error;
        }
      }

      return [x, y];
    },
    switchTurns: () => {
      [currentPlayer, opponentPlayer] = [opponentPlayer, currentPlayer];
    },
    playerAttack: (x, y) => {
      const attackResult = currentPlayer.attack(opponentPlayer.gameboard, x, y);

      if (attackResult.error) {
        return null;
      }

      if (!currentPlayer.isHuman) {
        if (attackResult.hit) {
          computerPlayer.setIsHit(true);
        } else {
          computerPlayer.setIsHit(false);
        }
        computerPlayer.setLatestCoordinate([x, y]);
      }

      const allShipsSunk = opponentPlayer.gameboard.allShipsSunk();
      if (!allShipsSunk) {
        gameMethods.switchTurns();
      } else {
        attackResult.gameOver = true;
      }

      return attackResult;
    },

    getCurrentPlayer: () => currentPlayer,
  };

  return gameMethods;
};

export default Game;
