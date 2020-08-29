function init() {

  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.button')
  
  
  const cells = []
  const width = 10
  const cellCount = width * width
  const graves = [81, 83, 85, 87, 89]
  const vamps = [
    11, 12, 13, 14, 15, 16, 17, 18,
    21, 22, 23, 24, 25, 26, 27, 28,
    31, 32, 33, 34, 35, 36, 37, 38]

  
  let gunPosition = 90
  let vampPosition = 0
  let gravePosition = 0
  


  function moveVamps() {
    let count = 0 
    let timerId = setInterval(() => {
    
    vamps.forEach(vamp) => {
    let result = vamps++ 
    vampPosition = result
    }

    }, 3000)
  }
  moveVamps()

  function addGun(position) {
    cells[position].classList.add('gun')
  }
  function removeGun(position) {
    cells[position].classList.remove('gun')
  } 
  function addVamp(vamp) {
    // for each vamps in the array, access each vamp, and do, cells add vamp and add this class vamp to it. 
    vamps.forEach((vamp, i) => {
      cells[vamp].classList.add('vamp')
    })
  } 
  function addGrave(grave) {
    graves.forEach((grave, i) => {
      cells[grave].classList.add('grave')
    })
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
    addGrave(gravePosition)
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
  
  // function handleClick() {
  
  // }
  // handleClick()



  createGrid(gunPosition, vampPosition, gravePosition)
  

  startButton.addEventListener('click', moveVamps)
  document.addEventListener('keyup', handleKeyUp)











}
window.addEventListener('DOMContentLoaded', init)