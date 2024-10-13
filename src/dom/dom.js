// Header
const createNavbar = () => {
  const header = document.createElement('header')

  const menuButton = document.createElement('div')
  menuButton.id = 'menu-btn'
  menuButton.className = 'menu-btn btn'
  const menuIcon = document.createElement('i')
  menuIcon.className = 'fas fa-bars'
  menuButton.appendChild(menuIcon)

  const hero = document.createElement('div')
  hero.className = 'hero'
  hero.textContent = 'Battleship'

  const socials = document.createElement('div')
  socials.className = 'socials-wrapper'

  const github = document.createElement('div')
  github.className = 'github btn'
  const githubButton = document.createElement('a')
  githubButton.href = 'https://github.com/Delfiald'
  githubButton.rel = 'noopener noreferrer'
  githubButton.target = '_blank'
  const githubIcon = document.createElement('i')
  githubIcon.className = 'fab fa-github'
  githubButton.appendChild(githubIcon)
  github.appendChild(githubButton)

  const linkedin = document.createElement('div')
  linkedin.className = 'linkedin btn'
  const linkedinButton = document.createElement('a')
  linkedinButton.href = 'https://linkedin.com/in/m-aldi-gunawan-7b1133247'
  linkedinButton.rel = 'noopener noreferrer'
  linkedinButton.target = '_blank'
  const linkedinIcon = document.createElement('i')
  linkedinIcon.className = 'fab fa-linkedin'
  linkedinButton.appendChild(linkedinIcon)
  linkedin.appendChild(linkedinButton)

  socials.appendChild(github)
  socials.appendChild(linkedin)

  header.appendChild(menuButton)
  header.appendChild(hero)
  header.appendChild(socials)

  return header
}

const createPlayerInformation = (playerNumber) => {
  const playerInformation = document.createElement('div')
  playerInformation.className = 'player-information'
  playerInformation.textContent = `Player ${playerNumber} Fleet`

  return playerInformation
}

// Cells
const createCells = (x, y) => {
  const cell = document.createElement('div')
  cell.className = 'cell'
  cell.dataset.cell = `${x}, ${y}`

  return cell;
}

// Board
const createBoard = () => {
  const board = document.createElement('section')
  const boardWrapper = document.createElement('div')
  boardWrapper.className = 'board'

  for(let x = 0; x < 10; x += 1) {
    for(let y = 0; y < 10; y += 1) {
      boardWrapper.appendChild(createCells(x, y))
    }
  }
  
  board.className = 'board-wrapper'
  board.appendChild(boardWrapper)

  return board;
}

// Player Section
const createPlayerSection = (playerNumber) => {
  const playerSection = document.createElement('section')
  playerSection.className = `player-${playerNumber}-section`
  const playerInformation = createPlayerInformation(playerNumber)
  const playerBoard = createBoard();
  playerSection.appendChild(playerInformation)
  playerSection.appendChild(playerBoard)

  return playerSection
}

const createShipPlacement = (playerIndex) => {
  const placeShipPlayer = document.createElement('div')
  placeShipPlayer.className = `ship-placement-player-${playerIndex}`

  const placeShipHeader = document.createElement('div')
  placeShipHeader.className = 'placement-header'
  const placeShipOwner = document.createElement('div')
  placeShipOwner.className = 'fleet-owner'

  placeShipOwner.textContent = `Player ${playerIndex} Fleet`
  const placeShipTemplate = document.createElement('div')
  const placeShipTemplateText = document.createElement('span')
  placeShipTemplateText.textContent = 'Place your '
  const placeShipName = document.createElement('span')
  placeShipName.className = 'ship-name'
  placeShipName.textContent = 'Carrier'
  placeShipTemplate.appendChild(placeShipTemplateText)
  placeShipTemplate.appendChild(placeShipName)

  placeShipHeader.appendChild(placeShipOwner)
  placeShipHeader.appendChild(placeShipTemplate)

  const placeShipBoard = createBoard();

  // Place Ship Footer
  const placeShipFooter = document.createElement('div')
  placeShipFooter.className = 'placement-footer'

  // Place Ship Footer Info
  const placeShipInfo = document.createElement('div')
  placeShipInfo.className = 'placement-info'
  const placeShipInfoIcon = document.createElement('i')
  placeShipInfoIcon.className = 'fas fa-info'
  const placeShipInfoText = document.createElement('div')
  placeShipInfoText.textContent = 'Right Click to Rotate Ship'
  const placeShipInfoTextMobile = document.createElement('div')
  placeShipInfoTextMobile.textContent = 'Touch and Hold to Rotate the Ship'

  placeShipInfo.appendChild(placeShipInfoIcon)
  placeShipInfo.appendChild(placeShipInfoText)
  placeShipInfo.appendChild(placeShipInfoTextMobile)

  // Place Ship Control
  const placeShipControl = document.createElement('div')
  placeShipControl.className = 'placement-control'

  if(playerIndex === 2) {
    const previousButton = document.createElement('div')
    previousButton.className = 'previous-btn btn'
    const previousButtonIcon = document.createElement('i')
    previousButtonIcon.className = 'fas fa-chevron-left'
    previousButton.appendChild(previousButtonIcon)

    placeShipControl.appendChild(previousButton)
  }

  const randomButton = document.createElement('div')
  randomButton.className = 'random-btn btn'
  const randomButtonIcon = document.createElement('i')
  randomButtonIcon.className = 'fas fa-shuffle'
  randomButton.appendChild(randomButtonIcon)

  const resetButton = document.createElement('div')
  resetButton.className = 'reset-btn btn'
  const resetButtonIcon = document.createElement('i')
  resetButtonIcon.className = 'fas fa-rotate-left'
  resetButton.appendChild(resetButtonIcon)

  const nextButton = document.createElement('div')
  nextButton.className = 'next-btn btn'
  const nextButtonIcon = document.createElement('i')
  nextButtonIcon.className = 'fas fa-chevron-right'
  nextButton.appendChild(nextButtonIcon)

  placeShipControl.appendChild(randomButton)
  placeShipControl.appendChild(resetButton)
  placeShipControl.appendChild(nextButton)

  placeShipFooter.appendChild(placeShipInfo)
  placeShipFooter.appendChild(placeShipControl)

  placeShipPlayer.appendChild(placeShipHeader)
  placeShipPlayer.appendChild(placeShipBoard)
  placeShipPlayer.appendChild(placeShipFooter)

  return placeShipPlayer
}

// Place Ship Section
const createPlaceShip = () => {
  const placeShip = document.createElement('section')
  placeShip.className = 'ship-placement'
  const placeShipWrapper = document.createElement('div')
  placeShipWrapper.classList = 'ship-placement-wrapper'

  const createPlaceShipOnePlayer = () => {
    const placeShipContainer = document.createElement('div')
    placeShipContainer.className = 'ship-placement-container one-player'
  
    placeShipContainer.appendChild(createShipPlacement(1))
  
    return placeShipContainer
  }
  
  const createPlaceShipTwoPlayer = () => {
    const placeShipContainer = document.createElement('div')
    placeShipContainer.className = 'ship-placement-container'
  
    placeShipContainer.appendChild(createShipPlacement(1))
    placeShipContainer.appendChild(createShipPlacement(2))
  
    return placeShipContainer
  }

  return {
    onePlayer: () => {
      placeShipWrapper.appendChild(createPlaceShipOnePlayer())
      placeShip.appendChild(placeShipWrapper)

      return placeShip
    },
    twoPlayer: () => {
      placeShipWrapper.appendChild(createPlaceShipTwoPlayer())
      placeShip.appendChild(placeShipWrapper)

      return placeShip
    }
  }
}

// Game Winner
const createWinnerModal = () => {
  const winnerModal = document.createElement('div')

  winnerModal.className = 'winner'
  const winnerContainer = document.createElement('div')
  winnerContainer.className = 'winner-container'

  const winnerWrapper = document.createElement('div')
  winnerWrapper.className = 'winner-wrapper'

  const winnerHeader = document.createElement('div')
  winnerHeader.className = 'winner-header'
  const winner = document.createElement('span')
  winner.className = 'winner-name'
  winner.textContent = 'Player 1 Win'
  winnerHeader.appendChild(winner)

  const winnerContent = document.createElement('div')
  winnerContent.className = 'winner-content'

  const winnerText = document.createElement('div')
  winnerText.textContent = `Victory! You've sunk all enemy ships and won the battle!`

  const restartButton = document.createElement('div')
  restartButton.className = 'restart-btn btn'
  const restartText = document.createElement('div')
  restartText.textContent = 'Restart'
  const restartIcon = document.createElement('i')
  restartIcon.className = 'fas fa-rotate-left'
  restartButton.appendChild(restartText)
  restartButton.appendChild(restartIcon)

  const exitButton = document.createElement('div')
  exitButton.className = 'exit-btn btn'
  const exitText = document.createElement('div')
  exitText.textContent = 'Exit'
  const exitIcon = document.createElement('i')
  exitIcon.className = 'fas fa-right-from-bracket'
  exitButton.appendChild(exitText)
  exitButton.appendChild(exitIcon)
  
  winnerContent.appendChild(winnerText)
  winnerContent.appendChild(restartButton)
  winnerContent.appendChild(exitButton)

  winnerWrapper.appendChild(winnerHeader)
  winnerWrapper.appendChild(winnerContent)

  winnerContainer.appendChild(winnerWrapper)

  winnerModal.appendChild(winnerContainer)

  return winnerModal
}

// Main
const createMainSection = () => {
  const main = document.createElement('main')

  for(let i = 0; i < 2; i += 1) {
    main.appendChild(createPlayerSection(i + 1))
  }

  return main
}

// Menu
const createMenu = () => {
  const menu = document.createElement('section')
  menu.className = 'menu'
  const menuContainer = document.createElement('div')
  menuContainer.className = 'menu-container'

  const menuWrapper = document.createElement('div')
  menuWrapper.className = 'menu-wrapper'

  const menuHeader = document.createElement('div')
  menuHeader.className = 'menu-header'
  menuHeader.textContent = 'Menu'

  const menuContent = document.createElement('div')
  menuContent.className = 'menu-content'

  const restartButton = document.createElement('div')
  restartButton.className = 'restart-btn btn'
  const restartText = document.createElement('div')
  restartText.textContent = 'Restart'
  const restartIcon = document.createElement('i')
  restartIcon.className = 'fas fa-rotate-left'
  restartButton.appendChild(restartText)
  restartButton.appendChild(restartIcon)

  const exitButton = document.createElement('div')
  exitButton.className = 'exit-btn btn'
  const exitText = document.createElement('div')
  exitText.textContent = 'Exit'
  const exitIcon = document.createElement('i')
  exitIcon.className = 'fas fa-right-from-bracket'
  exitButton.appendChild(exitText)
  exitButton.appendChild(exitIcon)

  const cancelButton = document.createElement('div')
  cancelButton.className = 'cancel-btn btn'
  const cancelText = document.createElement('div')
  cancelText.textContent = 'Cancel'
  const cancelIcon = document.createElement('i')
  cancelIcon.className = 'fas fa-x'
  cancelButton.appendChild(cancelText)
  cancelButton.appendChild(cancelIcon)

  menuContent.appendChild(restartButton)
  menuContent.appendChild(exitButton)
  menuContent.appendChild(cancelButton)

  menuWrapper.appendChild(menuHeader)
  menuWrapper.appendChild(menuContent)

  menuContainer.appendChild(menuWrapper)

  menu.appendChild(menuContainer)

  return menu;
}

// Home
const createHome = () => {
  const home = document.createElement('section')
  home.className = 'home'

  const homeHeader = document.createElement('div')
  homeHeader.className = 'home-header'
  homeHeader.textContent = 'Battleship'

  const homeContent = document.createElement('div')
  homeContent.className = 'home-content'

  const playButton = document.createElement('div')
  playButton.className = 'play-btn btn'
  playButton.textContent = 'Play'
  homeContent.appendChild(playButton)

  home.appendChild(homeHeader)

  // Enemy Choose
  const opponentContainer = document.createElement('div')
  opponentContainer.className = 'opponent-selection'

  const vsAiButton = document.createElement('div')
  vsAiButton.className = 'vs-ai-btn btn'
  const aiText = document.createElement('div')
  aiText.textContent = 'VS COM'
  const aiIcon = document.createElement('i')
  aiIcon.className = 'fas fa-robot'
  vsAiButton.appendChild(aiIcon)
  vsAiButton.appendChild(aiText)

  const vsPlayerButton = document.createElement('div')
  vsPlayerButton.className = 'vs-player-btn btn'
  const playerText = document.createElement('div')
  playerText.textContent = 'VS Player'
  const playerIcon = document.createElement('i')
  playerIcon.className = 'fas fa-gamepad'
  vsPlayerButton.appendChild(playerIcon)
  vsPlayerButton.appendChild(playerText)

  opponentContainer.appendChild(vsAiButton)

  // Start
  const startButton = document.createElement('div')
  startButton.className = 'start-btn btn'
  startButton.textContent = 'Start'
  opponentContainer.appendChild(startButton)
  
  opponentContainer.appendChild(vsPlayerButton)

  // Back
  const backButton = document.createElement('div')
  backButton.className = 'back-btn btn'
  const backButtonIcon = document.createElement('i')
  backButtonIcon.className = 'fas fa-arrow-left'
  backButton.appendChild(backButtonIcon)
  opponentContainer.appendChild(backButton)
  
  homeContent.appendChild(opponentContainer)
  
  home.appendChild(homeContent)

  return home
}

// Append Element
const mainContainer = () => {
  const container = document.createElement('div')
  container.className = 'container'

  const appendHome = () => {
    container.textContent = ''
    container.appendChild(createHome());

    return container
  }

  const placeOnePlayer = () => {
    container.appendChild(createPlaceShip().onePlayer())

    return container
  }

  const placeTwoPlayer = () => {
    container.appendChild(createPlaceShip().twoPlayer())

    return container
  }

  const appendMain = () => {
    container.appendChild(createNavbar())
    container.appendChild(createMainSection())

    return container
  }

  const appendMenu = () => {
    container.appendChild(createMenu());
    return container
  }

  const appendWinner = () => {
    container.appendChild(createWinnerModal())
    return container;
  }

  return {
    appendHome,
    placeOnePlayer,
    placeTwoPlayer,
    appendMain,
    appendMenu,
    appendWinner
  };
}

export default mainContainer()