// Hello World
const mainContainer = () => {
  const container = document.createElement('div')
  container.className = 'container'

  const h1 = document.createElement('h1')
  h1.textContent = 'Hello, World!'

  container.appendChild(h1)

  return container;
}

// Board

export default mainContainer()