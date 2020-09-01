function init() {


  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.button')
  const gameOver = document.querySelector('#game-over')
  const cells = []
  const width = 10
  const cellCount = width * width
  const graves = [81, 83, 85, 87]


  let vamps = [ 1, 2, 3, 4, 5, 6, 7, 8, 
    11, 12, 13, 14, 15, 16, 17, 18,
    21, 22, 23, 24, 25, 26, 27, 28, 28]  
  let gunPosition = 90
  let vampPosition
  let gravePosition
  let swordPosition
  let moveVampsTimer
  let moveSwordTimer



  function addGun(position) {
    cells[position].classList.add('gun')
  }
  
  function removeGun() {
    cells[gunPosition].classList.remove('gun')
  } 

  function addSword() {
    if (cells[swordPosition].classList.contains('grave')) {
      clearInterval(moveSwordTimer)
      removeSword()
      console.log('HIT GRAVE')
    } else if (cells[swordPosition].classList.contains('vamp')) {
      clearInterval(moveSwordTimer)
      removeSword()
      console.log(vamps.length)
      vamps.splice(vamps.indexOf(swordPosition), 1)
      cells[swordPosition].classList.remove('vamp')
      console.log(vamps)
    } else {
      cells[swordPosition].classList.add('sword')
    }
  }


  function removeSword() {
    cells[swordPosition].classList.remove('sword')
  } 

  function addVamps() {
    vamps.forEach((vamp) => {
      if (cells[vamp].classList.contains('grave')) {
        endGame()
      } else
        cells[vamp].classList.add('vamp')    
    })
  } 

  function removeVamps() {
    vamps.forEach((vamp) => {
      cells[vamp].classList.remove('vamp')
    })
  } 


  function addGraves() {
    graves.forEach((grave) => {
      cells[grave].classList.add('grave')
    })
  }

  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
    }     
    addGun(startingPosition)
    addVamps(vampPosition)  
    addGraves(gravePosition)
  }  

  function moveVamps() {    
    moveVampsTimer = setInterval(() => {
      removeVamps()
      vamps = vamps.map(vamp => {
        return vamp + 1
      })
      addVamps()       
    }, 1000)
  }


  function moveSword() {
    swordPosition = gunPosition
    moveSwordTimer = setInterval(() => {
      removeSword()
      swordPosition = swordPosition - 10
      addSword()      
    }, 100)
  }

  function endGame() {
    removeVamps() 
    clearInterval(moveVampsTimer)
    gameOver.innerHTML = 'Game Over'

  }

  function handleKeyUp(event) {
    removeGun() // remove gun from the current position
    // removeSword()
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