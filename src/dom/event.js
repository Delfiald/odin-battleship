import appendDom from './dom';

const event = (gameState) => {
  const container = document.querySelector('.container');
  const body = document.querySelector('body');

  // Get Cell Coordinate
  const getCellCoordinates = (target) => {
    const cell = target.closest('.board .cell');
    const cellCoordinate = cell.dataset.cell.split(',');
    const x = Number(cellCoordinate[0]);
    const y = Number(cellCoordinate[1]);

    return [x, y];
  };

  // SHIP PLACEMENT
  // Get Ship Placement
  const getShipPlacement = (target) => {
    let player;
    let shipFactory;
    let board;

    if (target.closest('.ship-placement-player-1')) {
      player = gameState.player1;
      shipFactory = gameState.getShipFactory(gameState.player1);
      board = document.querySelector('.ship-placement-player-1 .board');
    } else if (target.closest('.ship-placement-player-2')) {
      player = gameState.player2;
      shipFactory = gameState.getShipFactory(gameState.player2);
      board = document.querySelector('.ship-placement-player-2 .board');
    }

    return { player, shipFactory, board };
  };

  // Ship Placement Hover Event
  const handleShipHoverEvents = (target) => {
    const cell = target.closest('.board-wrapper .cell');
    if (cell) {
      const [rowIndex, colIndex] = getCellCoordinates(target);

      const { player, shipFactory, board } = getShipPlacement(target);

      const playerGameboard = player.gameboard;
      const shipLength = shipFactory.placeNextShip().ship.shipProperty.length;

      if (playerGameboard) {
        for (let i = 0; i < shipLength; i += 1) {
          let hoverCell;
          if (playerGameboard.getOrientation()) {
            hoverCell = board.querySelector(
              `.cell[data-cell="${rowIndex}, ${colIndex + i}"]`
            );
          } else {
            hoverCell = board.querySelector(
              `.cell[data-cell="${rowIndex + i}, ${colIndex}"]`
            );
          }

          if (hoverCell) {
            hoverCell.classList.add('hovered');
          }
        }
      }
    }
  };

  // Remove Ship that not Hovered
  const handleShipNotHoverEvents = () => {
    const cells = document.querySelectorAll('.board-wrapper .cell.hovered');
    cells.forEach((cell) => {
      cell.classList.remove('hovered');
    });
  };

  // Right Click Event
  const handleShipFlipEvents = (target) => {
    const { player } = getShipPlacement(target);
    if (player) {
      player.gameboard.toggleOrientation();
    }

    const previouslyHoveredCells = document.querySelectorAll('.cell.hovered');
    previouslyHoveredCells.forEach((hoveredCell) => {
      hoveredCell.classList.remove('hovered');
    });

    handleShipHoverEvents(target);
  };

  // Ship Placement Event Listener
  const addShipPlacementEvent = () => {
    const shipPlacement = document.querySelector('.ship-placement-container');

    shipPlacement.addEventListener('mouseover', (e) => {
      const { target } = e;
      handleShipHoverEvents(target);
    });

    shipPlacement.addEventListener('mouseout', (e) => {
      const { target } = e;
      handleShipNotHoverEvents(target);
    });

    shipPlacement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const { target } = e;
      handleShipFlipEvents(target);
    });
  };

  // Clean Board (Hide Player Ship Position on Cells)
  const cleanBoard = () => {
    const cells = document.querySelectorAll('.board .cell');

    cells.forEach((cell) => {
      cell.classList.remove('set');
    });
  };

  // Show Ship Position at Board
  const addClassToCells = (coordinates, playerClass) => {
    coordinates.forEach((ship) => {
      ship.coordinates.forEach((coord) => {
        const [row, col] = coord;
        const shipCell = document.querySelector(
          `.${playerClass} .board .cell[data-cell="${row}, ${col}"]`
        );
        if (shipCell) {
          shipCell.classList.add('set');
        }
      });
    });
  };

  // Switch Render Board
  const switchRender = () => {
    if (gameState.game) {
      cleanBoard();
      const player1 = gameState.player1.gameboard;
      const player2 = gameState.player2.gameboard;

      const player1Coordinates = player1.getShipCoordinates();
      const player2Coordinates = player2.getShipCoordinates();
      const player = gameState.game.getCurrentPlayer();
      if (player === gameState.player1) {
        addClassToCells(player1Coordinates, 'player-1-section');
      } else {
        addClassToCells(player2Coordinates, 'player-2-section');
      }
    }
  };

  // Game Start Handler
  const gameStartHandler = () => {
    const shipPlacement = document.querySelector('.ship-placement');
    shipPlacement.style.animation = 'fade-out .5s ease forwards';
    shipPlacement.addEventListener('animationend', () => {
      shipPlacement.remove();
      if (gameState.game.getCurrentPlayer() === gameState.player1) {
        document
          .querySelector('main .player-1-section')
          .classList.add('active');

        const main = document.querySelector('main');
        const scrollAmount = main.clientWidth;

        main.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      switchRender();
    });
  };

  // Horizontal Scroll Handler
  const scrollHorizontal = (target) => {
    const shipPlacementContainer = document.querySelector(
      '.ship-placement-container'
    );
    let scrollAmount;
    if (target.closest('.next-btn')) {
      scrollAmount = shipPlacementContainer.clientWidth;
      shipPlacementContainer.classList.add('p2');
    } else {
      scrollAmount = -shipPlacementContainer.clientWidth;
      shipPlacementContainer.classList.remove('p2');
    }
    shipPlacementContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Add Shake if Not Valid
  const shakeHandler = (player) => {
    player.classList.add('shake');
    player.addEventListener('animationend', () => {
      player.classList.remove('shake');
    });
  };

  // Next Button Handler
  const nextHandler = (target) => {
    if (gameState.getShipFactory(gameState.player1).allShipsPlaced()) {
      scrollHorizontal(target);
    } else {
      const playerBoard = document.querySelector(
        '.ship-placement-player-1 .board-wrapper'
      );
      shakeHandler(playerBoard);
    }
  };

  // Is Game Started
  const isGameStarted = () => {
    let playerBoard;
    if (
      gameState.getShipFactory(gameState.player1).allShipsPlaced() &&
      gameState.getShipFactory(gameState.player2).allShipsPlaced()
    ) {
      gameState.startGame();
      gameStartHandler();
    } else if (!gameState.player2.isHuman) {
      playerBoard = document.querySelector(
        '.ship-placement-player-1 .board-wrapper'
      );
      shakeHandler(playerBoard);
    } else {
      playerBoard = document.querySelector(
        '.ship-placement-player-2 .board-wrapper'
      );
      shakeHandler(playerBoard);
    }
  };

  // Ship Name Handler
  const shipNameHandler = (board) => {
    const shipName =
      board.parentElement.parentElement.querySelector('.ship-name');

    return {
      setHidden: () => {
        shipName.parentElement.style.visibility = 'hidden';
      },
      setShow: () => {
        shipName.parentElement.style.visibility = 'visible';
      },
      updateShipName: (shipFactory) => {
        shipName.textContent =
          gameState.shipName[shipFactory.getCurrentIndex()];
      },
    };
  };

  // Render Ship Placement
  const renderPlaceShip = () => {
    const player1 = gameState.player1.gameboard;
    const player2 = gameState.player2.gameboard;

    const player1Coordinates = player1.getShipCoordinates();
    const player2Coordinates = player2.getShipCoordinates();

    addClassToCells(player1Coordinates, 'ship-placement-player-1');
    addClassToCells(player2Coordinates, 'ship-placement-player-2');

    if (!gameState.player2.isHuman) {
      addClassToCells(player1Coordinates, 'player-1-section');
    }
  };

  // Manual Ship Placement Handler
  const manualShipPlacementHandler = (target) => {
    const [x, y] = getCellCoordinates(target);

    const { player, shipFactory, board } = getShipPlacement(target);

    try {
      player.gameboard.setShips([shipFactory.placeNextShip([[x, y]])]);
      shipFactory.incrementIndex();
      renderPlaceShip();
      if (shipFactory.allShipsPlaced()) {
        board.classList.add('disabled');
      }
      shipNameHandler(board).updateShipName(shipFactory);

      if (shipFactory.getCurrentIndex() >= 5) {
        shipNameHandler(board).setHidden();
      }
      handleShipNotHoverEvents();
    } catch {
      const playerBoard = board.parentElement;
      shakeHandler(playerBoard);
    }
  };

  // Reset Ship Placement on Placement Section
  const resetShipPlacement = (player) => {
    let cells;
    if (player === gameState.player1) {
      cells = document.querySelectorAll('.ship-placement-player-1 .cell');
      const player1SectionCells = document.querySelectorAll(
        '.player-1-section .cell'
      );
      player1SectionCells.forEach((cell) => {
        cell.classList.remove('set');
      });
    } else if (player === gameState.player2) {
      cells = document.querySelectorAll('.ship-placement-player-2 .cell');
    }

    cells.forEach((cell) => {
      cell.classList.remove('set');
      cell.classList.remove('hovered');
    });
  };

  // Random Ship Placement Handler
  const randomShipPlacementHandler = (target) => {
    const { player, shipFactory, board } = getShipPlacement(target);
    player.gameboard.setRandomShip(shipFactory);
    resetShipPlacement(player);
    shipNameHandler(board).setHidden();
    board.classList.add('disabled');
    renderPlaceShip();
  };

  // Reset Ship Placement Handler
  const resetShipPlacementHandler = (target) => {
    const { player, board } = getShipPlacement(target);

    player.gameboard.resetBoard();
    gameState.resetShipFactoryForPlayer(player);
    resetShipPlacement(player);
    const shipFactory = gameState.getShipFactory(player);

    board.classList.remove('disabled');

    shipNameHandler(board).setShow();
    shipNameHandler(board).updateShipName(shipFactory);
  };

  // Ship Placement Event
  const handleShipPlacementEvents = (target) => {
    if (
      target.closest('.ship-placement-container.p2 .next-btn') ||
      target.closest('.ship-placement-container.one-player .next-btn')
    ) {
      isGameStarted();
    } else if (target.closest('.ship-placement .next-btn')) {
      nextHandler(target);
    } else if (target.closest('.ship-placement .previous-btn')) {
      scrollHorizontal(target);
    } else if (target.closest('.ship-placement .cell')) {
      manualShipPlacementHandler(target);
    } else if (target.closest('.ship-placement .random-btn')) {
      randomShipPlacementHandler(target);
    } else if (target.closest('.ship-placement .reset-btn')) {
      resetShipPlacementHandler(target);
    }
  };

  // GAME BOARD
  // Cell Class Handler
  const cellClassHandler = (attackResult, cell) => {
    if (attackResult.hit) {
      cell.classList.add('hit');
    } else {
      cell.classList.add('missed');
    }
  };

  const scrollHorizontalForSmallerScreen = () => {
    const main = document.querySelector('main');
    let scrollAmount;
    if (gameState.game.getCurrentPlayer() === gameState.player1) {
      scrollAmount = main.clientWidth;
    } else {
      scrollAmount = -main.clientWidth;
    }

    main.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Player Section Toggle Class
  const playerClassToggle = (player1Section, player2Section) => {
    player1Section.classList.toggle('active');
    player2Section.classList.toggle('active');

    scrollHorizontalForSmallerScreen();
  };

  // is Game Over
  const isGameOver = (attackResult, player1Section, player2Section) => {
    if (attackResult.gameOver) {
      player1Section.classList.add('active');
      player2Section.classList.add('active');

      body.appendChild(appendDom.appendWinner());

      let winner;
      if (gameState.game.getCurrentPlayer() === gameState.player1) {
        winner = 'Player 1 Win';
      } else if (gameState.game.getCurrentPlayer() === gameState.player2) {
        if (gameState.player2.isHuman) {
          winner = 'Player 2 Win';
        } else {
          winner = 'COM Win';
          document.querySelector('.winner-content > div').textContent =
            'All your ships have been sunk!';
        }
      }

      document.querySelector('.winner-name').textContent = winner;
    }
  };

  // Bot Attack
  const handleBotAttack = (player1Section, player2Section) => {
    setTimeout(() => {
      const [aix, aiy] = gameState.game.isComputerPlayer();
      const attackResult = gameState.game.playerAttack(aix, aiy);

      const cell = document.querySelector(
        `.player-1-section .cell[data-cell="${aix}, ${aiy}"]`
      );

      cellClassHandler(attackResult, cell);

      playerClassToggle(player1Section, player2Section);

      isGameOver(attackResult, player1Section, player2Section);
    }, 750);
  };

  // Game Board Event
  const handleBoardEvents = (target) => {
    const player1Section = document.querySelector('.player-1-section');
    const player2Section = document.querySelector('.player-2-section');
    const cell = target.closest('main .board .cell');
    if (cell && gameState.game.getCurrentPlayer().isHuman) {
      const [x, y] = getCellCoordinates(target);
      const attackResult = gameState.game.playerAttack(x, y);

      cellClassHandler(attackResult, cell);

      if (attackResult.gameOver) {
        isGameOver(attackResult, player1Section, player2Section);
      } else {
        playerClassToggle(player1Section, player2Section);

        if (!gameState.game.getCurrentPlayer().isHuman) {
          handleBotAttack(player1Section, player2Section);
        }
      }

      if (gameState.player2.isHuman) {
        switchRender();
      }
    }
  };

  // Touch Event
  const touchEvent = () => {
    let pressTimer;
    let isLongPress = false;
    const boardWrapper = document.querySelector(
      '.ship-placement-container .board-wrapper'
    );

    boardWrapper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const { target } = e;
      isLongPress = false;
      pressTimer = setTimeout(() => {
        isLongPress = true;
        handleShipFlipEvents(target);
      }, 500);
    });

    boardWrapper.addEventListener('touchend', (e) => {
      clearTimeout(pressTimer);

      if (!isLongPress) {
        const { target } = e;
        if (target.closest('.cell')) {
          manualShipPlacementHandler(target);
        }
      }
    });

    boardWrapper.addEventListener('touchmove', () => {
      clearTimeout(pressTimer);
    });
  };

  // MENU
  // Restart
  const restart = () => {
    container.textContent = '';
    if (gameState.player2.isHuman) {
      body.appendChild(appendDom.placeTwoPlayer());
      gameState.setPlayer(true);
      gameState.createShipFactories();
    } else {
      body.appendChild(appendDom.placeOnePlayer());
      gameState.setPlayer(false);
      gameState.createShipFactories();
      gameState.player2.gameboard.setRandomShip(gameState.shipFactory2);
    }
    addShipPlacementEvent();
    touchEvent();
    body.appendChild(appendDom.appendMain());
  };

  // Menu Event
  const handleMenuEvents = (target) => {
    if (target.closest('#menu-btn')) {
      body.appendChild(appendDom.appendMenu());
    } else if (target.closest('.menu .cancel-btn')) {
      document.querySelector('.menu').remove();
    } else if (target.closest('.exit-btn')) {
      body.appendChild(appendDom.appendHome());
    } else if (target.closest('.restart-btn')) {
      restart();
    }
  };

  // HOME
  // Home Handler
  const homeHandler = async () => {
    const home = document.querySelector('.home');
    home.style.animation = 'fade-out 1s ease-in-out forwards';

    body.style.pointerEvents = 'none';
    await new Promise((resolve) => {
      setTimeout(() => {
        home.remove();
        resolve();
      }, 1000);
    });

    body.style.pointerEvents = 'initial';

    const { player2 } = gameState;

    if (!player2.isHuman) {
      body.appendChild(appendDom.placeOnePlayer());
      gameState.player2.gameboard.setRandomShip(gameState.shipFactory2);
    } else if (player2.isHuman) {
      body.appendChild(appendDom.placeTwoPlayer());
    }

    addShipPlacementEvent();
    touchEvent();
    body.appendChild(appendDom.appendMain());
  };

  // Home Event
  const handleHomeEvents = (target) => {
    const home = document.querySelector('.home');
    if (target.closest('.home .play-btn')) {
      home.classList.add('play');
    } else if (
      target.closest('.home.play.ai .back-btn') ||
      target.closest('.home.play.player .back-btn')
    ) {
      home.classList.remove('player');
      home.classList.remove('ai');
    } else if (target.closest('.home.play .back-btn')) {
      home.classList.remove('play');
      home.classList.remove('player');
      home.classList.remove('ai');
    } else if (target.closest('.home.play .vs-ai-btn')) {
      home.className = 'home play ai';
    } else if (target.closest('.home.play .vs-player-btn')) {
      home.className = 'home play player';
    } else if (target.closest('.home.ai .start-btn')) {
      gameState.setPlayer(false);
      gameState.createShipFactories();
      homeHandler();
    } else if (target.closest('.home.player .start-btn')) {
      gameState.setPlayer(true);
      gameState.createShipFactories();
      homeHandler();
    }
  };

  // Click Event
  container.addEventListener('click', (e) => {
    const { target } = e;

    handleHomeEvents(target);
    handleMenuEvents(target);
    handleShipPlacementEvents(target);
    handleBoardEvents(target);
  });
};

export default event;
