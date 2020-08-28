function init() {

  const grid = document.querySelector('.grid')
  
  //Grid 
  const cells = []
  const width = 10
  const cellCount = width * width
  let gunPosition = 90
  let vampPosition = [11]

  function addGun(position) {
    cells[position].classList.add('gun')
  }
  function removeGun(position) {
    cells[position].classList.remove('gun')
  } 
  function addVamp(position) {
    cells[position].classList.add('vamp')
  } 

  

  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }     
    addGun(startingPosition)
    addVamp(vampPosition)    
  }
 
  
  function handleKeyUp(event) {
  
    removeGun(gunPosition) // remove gun from the current position
  
    const x = gunPosition % width // if gun / width has no remainder then dont move him left or right
      
    switch (event.keyCode) { 
      case 39: //arrow right
        if (x < width - 1) gunPosition++
        break
      case 37: //arrow left
        if (x > 0) gunPosition--
        break
      default:
        console.log('Something went wrong')
    }
  
    addGun(gunPosition) // add gun back at the new position
  }
  
  createGrid(gunPosition, vampPosition)
  
  // Event listeners
  //keyup - when lift up keydown - when press down it fires the event
  document.addEventListener('keyup', handleKeyUp)











}
window.addEventListener('DOMContentLoaded', init)