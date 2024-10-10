import './css/style.css';
import appendDom from './dom/dom';
import event from './dom/event';

(() => {
  const body = document.querySelector('body')

  body.appendChild(appendDom.placeOnePlayer())
  body.appendChild(appendDom.appendMain())
  event()
})()