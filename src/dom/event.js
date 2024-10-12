import appendDom from './dom'

const event = (gameState) => {
  const container = document.querySelector('.container')

  const resetPlaceShip = (player) => {
    let cells
    if(player === 'player1'){
      cells = document.querySelectorAll('.ship-placement-player-1 .cell')
      const player1SectionCells = document.querySelectorAll('.player-1-section .cell');
      player1SectionCells.forEach(cell => {
        cell.classList.remove('set');
      });
    }else {
      cells = document.querySelectorAll('.ship-placement-player-2 .cell')
    }

    cells.forEach(cell => {
      cell.classList.remove('set');
    })
  }

  const renderPlaceShip = () => {
    const player1 = gameState.player1.gameboard;
    const player2 = gameState.player2.gameboard;

    const player1Coordinates = player1.getShipCoordinates();
    const player2Coordinates = player2.getShipCoordinates();

    const addClassToCells = (coordinates, playerClass) => {
      coordinates.forEach(ship => {
        ship.coordinates.forEach(coord => {
          const [row, col] = coord;
          const shipCell = document.querySelector(`.${playerClass} .board .cell[data-cell="${row}, ${col}"]`);
          if (shipCell) {
            shipCell.classList.add('set');
          }
        });
      });
    };

    addClassToCells(player1Coordinates, 'ship-placement-player-1');
    addClassToCells(player2Coordinates, 'ship-placement-player-2');

    if(!gameState.player2.isHuman){
      addClassToCells(player1Coordinates, 'player-1-section')
    }else {
      // const player = gameState.game.currentPlayer;
    }
  }

  const handleShipHoverEvents = (target) => {
    const cell = target.closest('.board-wrapper .cell')
    if(cell){
      const cellCoordinate = cell.dataset.cell.split(',');
      const rowIndex = Number(cellCoordinate[0]);
      const colIndex = Number(cellCoordinate[1]);
      let playerGameboard;
      let shipLength;
      let boardWrapper
    
      if (target.closest('.ship-placement-player-1')) {
        playerGameboard = gameState.player1.gameboard;
        shipLength = gameState.shipFactory1.placeNextShip().ship.shipProperty.length;
        boardWrapper = document.querySelector('.ship-placement-player-1 .board-wrapper');
      } else if (target.closest('.ship-placement-player-2')) {
        playerGameboard = gameState.player2.gameboard;
        shipLength = gameState.shipFactory2.placeNextShip().ship.shipProperty.length;
        boardWrapper = document.querySelector('.ship-placement-player-2 .board-wrapper');
      }

      if(playerGameboard) {
        for (let i = 0; i < shipLength; i += 1) {
          let hoverCell;
          if (playerGameboard.getOrientation()) {
            hoverCell = boardWrapper.querySelector(`.board-wrapper .cell[data-cell="${rowIndex}, ${colIndex + i}"]`);
          } else {
            hoverCell = boardWrapper.querySelector(`.board-wrapper .cell[data-cell="${rowIndex + i}, ${colIndex}"]`);
          }
  
          if (hoverCell) {
            hoverCell.classList.add('hovered');
          }
        }
      }
    }
  }

  const handleShipNotHoverEvents = () => {
    const cells = document.querySelectorAll('.board-wrapper .cell.hovered');
    cells.forEach(cell => {
        cell.classList.remove('hovered');
    });
  }

  const handleShipFlipEvents = (target) => {
    const player = gameState.getPlayers();
    if(target.closest('.ship-placement-player-1')){
      player.player1.gameboard.toggleOrientation()
    }else if(target.closest('.ship-placement-player-2')) {
      player.player2.gameboard.toggleOrientation()
    }

    const previouslyHoveredCells = document.querySelectorAll('.cell.hovered');
    previouslyHoveredCells.forEach(hoveredCell => {
      hoveredCell.classList.remove('hovered');
    });

    handleShipHoverEvents(target)
  }

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
      handleShipFlipEvents(target)
    })
  };

  const homeHandler = async(player2) => {
    const body = document.querySelector('body')
    const home = document.querySelector('.home')
    home.style.animation = 'fade-out 1s ease-in-out forwards'
    await new Promise (resolve => {
      setTimeout(() => {
        home.remove();
        resolve();
      }, 1000)
    })

    if(!player2.isHuman){
      body.appendChild(appendDom.placeOnePlayer())
      gameState.player2.gameboard.setRandomShip(gameState.shipFactory2)
    }else if(player2.isHuman){
      body.appendChild(appendDom.placeTwoPlayer())
    }
    addShipPlacementEvent();
    body.appendChild(appendDom.appendMain())
  }

  const scrollHorizontal = (target) => {
    const shipPlacementContainer = document.querySelector('.ship-placement-container');
    let scrollAmount
    if(target.closest('.next-btn')){
      scrollAmount = shipPlacementContainer.clientWidth;
      shipPlacementContainer.classList.add('p2')
    }else {
      scrollAmount = -shipPlacementContainer.clientWidth;
      shipPlacementContainer.classList.remove('p2')
    }
    shipPlacementContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  const handleMenuEvents = (target, body) => {
    if (target.closest('#menu-btn')) {
       body.appendChild(appendDom.appendMenu())
    } else if (target.closest('.menu .cancel-btn')) {
       document.querySelector('.menu').remove()
    } else if(target.closest('.menu .exit-btn')) {
      body.appendChild(appendDom.appendHome())
    }
  }

  const handleHomeEvents = (target) => {
    const home = document.querySelector('.home');
    if(target.closest('.home .play-btn')) {
      home.classList.add('play')
    }else if(target.closest('.home.play.ai .back-btn') || target.closest('.home.play.player .back-btn')) {
      home.classList.remove('player')
      home.classList.remove('ai')
    }else if(target.closest('.home.play .back-btn')) {
      home.classList.remove('play')
      home.classList.remove('player')
      home.classList.remove('ai')
    }else if(target.closest('.home.play .vs-ai-btn')) {
      home.className = 'home play ai';
    }else if(target.closest('.home.play .vs-player-btn')) {
      home.className = 'home play player';
    }else if(target.closest('.home.ai .start-btn')) {
      gameState.setPlayer(false)
      gameState.createShipFactories()
      homeHandler(gameState.getPlayers().player2)
    }else if(target.closest('.home.player .start-btn')) {
      gameState.setPlayer(true)
      gameState.createShipFactories()
      homeHandler(gameState.getPlayers().player2)
    }
  }

  const handleShipPlacementEvents = (target) => {
    const shipPlacement = document.querySelector('.ship-placement')
    if(target.closest('.ship-placement .ship-placement-container.p2 .next-btn') || target.closest('.ship-placement .ship-placement-container.one-player .next-btn')) {
      if(gameState.getShipFactory('player1').allShipsPlaced() && gameState.getShipFactory('player2').allShipsPlaced()){
        shipPlacement.remove()
        document.querySelector('main .player-1-section').classList.add('active')
        gameState.startGame()
      }else if (target.closest('.ship-placement-container.one-player')) {
        const player1 = document.querySelector('.ship-placement-player-1 .board-wrapper');
        player1.classList.add('shake');
        player1.addEventListener('animationend', () => {
          player1.classList.remove('shake');
        });
      } else {
        const player2 = document.querySelector('.ship-placement-player-2 .board-wrapper');
        player2.classList.add('shake');
        player2.addEventListener('animationend', () => {
          player2.classList.remove('shake');
        });
      }
    }else if(target.closest('.ship-placement .next-btn')) {
      if(gameState.getShipFactory('player1').allShipsPlaced()){
        scrollHorizontal(target)
      }else{
        const player1 = document.querySelector('.ship-placement-player-1 .board-wrapper')
        player1.classList.add('shake')
        player1.addEventListener('animationend', () => {
          player1.classList.remove('shake')
        })
      }
    }else if(target.closest('.ship-placement .previous-btn')) {
      scrollHorizontal(target)
    }else if(target.closest('.ship-placement .cell')) {
      const cell = target.closest('.board .cell');
      const cellCoordinate = cell.dataset.cell.split(',')
      const x = Number(cellCoordinate[0])
      const y = Number(cellCoordinate[1])
      let player;
      let shipFactory;
      let board;
      
      if(target.closest('.ship-placement-player-1')){
        player = gameState.getPlayers().player1;
        shipFactory = gameState.getShipFactory('player1');
        board = document.querySelector('.ship-placement-player-1 .board')
      }else if(target.closest('.ship-placement-player-2')){
        player = gameState.getPlayers().player2;
        shipFactory = gameState.getShipFactory('player2');
        board = document.querySelector('.ship-placement-player-2 .board')
      }
      
      try {
        player.gameboard.setShips([shipFactory.placeNextShip([[x, y]])])
        shipFactory.incrementIndex()
        renderPlaceShip()
        if(shipFactory.allShipsPlaced()) {
          board.classList.add('disabled');
        }
      }catch(error) {
        board.parentElement.classList.add('shake')
        board.parentElement.addEventListener('animationend', () => {
          board.parentElement.classList.remove('shake')
        })
      }
    }else if(target.closest('.ship-placement .random-btn')) {
      let board;
      if(target.closest('.ship-placement-player-1')){
        gameState.player1.gameboard.setRandomShip(gameState.shipFactory1)
        resetPlaceShip('player1')
        board = document.querySelector('.ship-placement-player-1 .board')
      }else if(target.closest('.ship-placement-player-2')){
        gameState.player2.gameboard.setRandomShip(gameState.shipFactory2)
        resetPlaceShip('player2')
        board = document.querySelector('.ship-placement-player-2 .board')
      }
      board.classList.add('disabled');
      renderPlaceShip()
    }else if(target.closest('.ship-placement .reset-btn')) {
      if(target.closest('.ship-placement-player-1')){
        gameState.player1.gameboard.resetBoard()
        gameState.resetShipFactoryForPlayer('player1')
        resetPlaceShip('player1')
        document.querySelector('.ship-placement-player-1 .board').classList.remove('disabled')
      }else if(target.closest('.ship-placement-player-2')){
        gameState.player2.gameboard.resetBoard()
        gameState.resetShipFactoryForPlayer('player2')
        resetPlaceShip('player2')
        document.querySelector('.ship-placement-player-2 .board').classList.remove('disabled')
      }
    }
  }

  const handleBoardEvents = (target) => {
    const player1Section = document.querySelector('.player-1-section')
    const player2Section = document.querySelector('.player-2-section')
    const cell = target.closest('main .board .cell');
    if(cell){
      const cellCoordinate = cell.dataset.cell.split(',')
      const x = Number(cellCoordinate[0])
      const y = Number(cellCoordinate[1])

      const attackResult = gameState.game.playerAttack(x, y)

      if(attackResult.hit) {
        cell.classList.add('hit')
      }else {
        cell.classList.add('missed')
      }

      if (attackResult.gameOver) {
        player1Section.classList.add('active')
        player2Section.classList.add('active')
      } else if (gameState.game.getCurrentPlayer() === gameState.player2) {
        player1Section.classList.remove('active');
        player2Section.classList.add('active');

        if(!gameState.game.getCurrentPlayer().isHuman){
          setTimeout(() => {
            const [aix, aiy] = gameState.game.isComputerPlayer()
            const aiAttack = gameState.game.playerAttack(aix, aiy)

            const p1Cell = document.querySelector(`.player-1-section .cell[data-cell="${aix}, ${aiy}"]`)

            if(aiAttack.hit) {
              p1Cell.classList.add('hit')
            }else {
              p1Cell.classList.add('missed')
            }

            player1Section.classList.add('active');
            player2Section.classList.remove('active');

            if (aiAttack.gameOver) {
              player1Section.classList.add('active')
              player2Section.classList.add('active')
            }
          }, 1000);
        }
      } else if (gameState.game.getCurrentPlayer() === gameState.player1) {
        player1Section.classList.add('active');
        player2Section.classList.remove('active');
      }
    }
  }

  container.addEventListener('click', (e) => {
    const {target} = e;
    const body = document.querySelector('body');
 
    handleMenuEvents(target, body);
    handleHomeEvents(target);
    handleShipPlacementEvents(target);
    handleBoardEvents(target)
  });
}

export default event;