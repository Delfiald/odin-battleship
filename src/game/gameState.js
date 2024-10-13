import Player from "../components/player"
import Game from "./game";

// Store and Load Instance
const GameState = () => {
  const gameState = {
    player1: null,
    player2: null,
    shipFactory1: null,
    shipFactory2: null,
    game: null,
    shipName: ['Carrier', 'Battleship', 'Destroyer', 'Submarine', 'Patrol Boat'],

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

    getShipFactory: (player) => player === gameState.player1 ? gameState.shipFactory1 : gameState.shipFactory2,

    resetShipFactoryForPlayer: (player) => {
      if (player === gameState.player1) {
        gameState.shipFactory1 = player.gameboard.createShipFactory();
      } else if (player === gameState.player2) {
        gameState.shipFactory2 = player.gameboard.createShipFactory();
      }
    },

    startGame: () => {
      gameState.game = Game(gameState.player1, gameState.player2)
    }
  }

  return gameState
}

export default GameState