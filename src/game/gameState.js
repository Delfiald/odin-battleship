import Player from "../components/player"
import Game from "./game";

const GameState = () => {
  const gameState = {
    player1: null,
    player2: null,
    shipFactory1: null,
    shipFactory2: null,
    game: null,

    setPlayer: (isVsAi) => {
      gameState.player1 = Player(true);
      gameState.player2 = Player(isVsAi);
    },

    getPlayers: () => ({
      player1: gameState.player1,
      player2: gameState.player2
    }),

    createShipFactories: () => {
      gameState.shipFactory1 = gameState.player1.gameboard.createShipFactory();
      gameState.shipFactory2 = gameState.player2.gameboard.createShipFactory();
    },

    getShipFactory: (player) => player === 'player1' ? gameState.shipFactory1 : gameState.shipFactory2,

    resetShipFactoryForPlayer: (player) => {
      if (player === 'player1') {
        gameState.shipFactory1 = gameState.player1.gameboard.createShipFactory();
      } else if (player === 'player2') {
        gameState.shipFactory2 = gameState.player2.gameboard.createShipFactory();
      }
    },

    startGame: () => {
      gameState.game = Game(gameState.player1, gameState.player2)
    }
  }

  return gameState
}

export default GameState