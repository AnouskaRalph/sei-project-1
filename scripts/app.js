function init() {

  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.button')
  const gameOver = document.querySelector('#game-over')
  
  
  const cells = []
  const width = 10
  const cellCount = width * width
  const graves = [81, 83, 85, 87, 89]
  
  
  let vamps = [
    1, 2, 3, 4, 5, 6, 7, 8,
    11, 12, 13, 14, 15, 16, 17, 18,
    21, 22, 23, 24, 25, 26, 27, 28]  
  let gunPosition = 90
  let vampPosition
  let gravePosition
  let swordPosition = 0
  let moveVampsTimer
  let moveSwordTimer


  


  function addGun(position) {
    cells[position].classList.add('gun')
  }
  function removeGun(position) {
    cells[position].classList.remove('gun')
  } 

  function addSword(sword) {
    if (cells[sword].classList.contains('grave')) {
      console.log('YOU HIT GRAVE')
    } else  
      cells[sword].classList.add('sword')
  }

  function removeSword(sword) {
    cells[sword].classList.remove('sword')
  } 
  

  function addVamps(vamp) {
    vamps.forEach((vamp, i) => {
      if (cells[vamp].classList.contains('grave')) {
        endGame()
      } else
        cells[vamp].classList.add('vamp')    
    })
  } 

  function removeVamps(vamp) {
    vamps.forEach((vamp, i) => {
      cells[vamp].classList.remove('vamp')
    })
  } 

  function addGraves(grave) {
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
    addVamps(vampPosition)  
    addGraves(gravePosition)
  }  


  function moveVamps(event) {    
    moveVampsTimer = setInterval(() => {
      removeVamps()
      vamps = vamps.map(vamp => {
        return vamp + 1
      })
      addVamps()       
    }, 200)
  }
  
  function moveSword(event) {
    moveSwordTimer = setInterval(() => {
      swordPosition = [gunPosition - 10]
      swordPosition = [swordPosition - 10]
      addSword(swordPosition)

      console.log(swordPosition)
    }, 1000)
  }

  function endGame() {
    clearInterval(moveVampsTimer)
    gameOver.innerHTML = 'Game Over'
    removeVamps()   
  }

  function handleKeyUp(event) {
  
    removeGun(gunPosition) // remove gun from the current position
    removeSword(swordPosition)
      
    const x = gunPosition % width // if gun / width has no remainder then dont move him left or right
      
    switch (event.keyCode) { 
      case 39: //arrow right
        if (x < width - 1) gunPosition++
        break
      case 37: //arrow left
        if (x > 0) gunPosition--
        break   
      case 32: //space
        moveSword() 
        break  
      default:
        console.log('Something went wrong')
    }
    addGun(gunPosition) 
   
  }




  


  createGrid(gunPosition, vampPosition, gravePosition)
  

  startButton.addEventListener('click', moveVamps)
  // startButton.addEventListener('hoover', )
  document.addEventListener('keyup', handleKeyUp)








}
window.addEventListener('DOMContentLoaded', init)