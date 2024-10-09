import './css/style.css';
import appendDom from './dom/dom';

console.log('Hello, World!');

(() => {
  const body = document.querySelector('body')

  body.appendChild(appendDom)
})()