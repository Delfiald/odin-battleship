import appendDom from './dom'

const event = () => {
  const container = document.querySelector('.container')

  const homeHandler = async(target) => {
    const body = document.querySelector('body')
    const home = document.querySelector('.home')
    home.style.animation = 'fade-out 1s ease-in-out forwards'
    await new Promise (resolve => {
      setTimeout(() => {
        home.remove();
        resolve();
      }, 1000)
    })

    if(target.closest('.home.ai')){
      body.appendChild(appendDom.placeOnePlayer())
    }else if(target.closest('.home.player')){
      body.appendChild(appendDom.placeTwoPlayer())
    }
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
    // set player 2 to false
    homeHandler(target)
  }else if(target.closest('.home.player .start-btn')) {
    // set player 2 to true
    homeHandler(target)
  }
 }

 const handleShipPlacementEvents = (target) => {
  const shipPlacement = document.querySelector('.ship-placement')
  if(target.closest('.ship-placement .ship-placement-container.p2 .next-btn') || target.closest('.ship-placement .ship-placement-container.one-player .next-btn')) {
    // Check if ship placed
    // Start Game
    shipPlacement.remove()
  }else if(target.closest('.ship-placement .next-btn')) {
    // Check if ship placed
    scrollHorizontal(target)
  }else if(target.closest('.ship-placement .previous-btn')) {
    scrollHorizontal(target)
  }
 }

  container.addEventListener('click', (e) => {
    const {target} = e;
    const body = document.querySelector('body');
 
    handleMenuEvents(target, body);
    handleHomeEvents(target);
    handleShipPlacementEvents(target);
 });
}

export default event;