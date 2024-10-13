import './css/style.css';
import appendDom from './dom/dom';
import event from './dom/event';
import GameState from './game/gameState';

(() => {
  const body = document.querySelector('body');

  const gameState = GameState();

  body.appendChild(appendDom.appendHome());
  event(gameState);
})();
