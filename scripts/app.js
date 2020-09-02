function init() {
  
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.button')
  const gameOver = document.querySelector('#game-over')
  const scoreDisplay = document.querySelector('#score-display')
  const displayWhoWon = document.querySelector('#who-won')
  
  
  const cells = []
  const width = 10
  const cellCount = width * width
  const graves = [81, 83, 85, 87]
  
  let vamps = [ 1, 2, 3, 4, 5, 6, 7, 8, 
    11, 12, 13, 14, 15, 16, 17, 18,
    21, 22, 23, 24, 25, 26, 27, 28, 28]
  // const newHeartPosition = Math.floor(Math.random() * vamps.length)
  let score = 0
  let gunPosition = 90
  let vampPosition
  let gravePosition
  let swordPosition
  let heartPosition
  
  let moveVampsTimer
  let moveSwordTimer
  let moveHeartTimer
  
  
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
      scoreKeeping()
      
      //console.log(vamps.length)
      vamps.splice(vamps.indexOf(swordPosition), 1)
      cells[swordPosition].classList.remove('vamp')
      //console.log(vamps)
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
        whoWon()
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
  
  function removeGraves() {
    graves.forEach((grave) => {
      cells[grave].classList.remove('grave')
    })
  }
  
  function addHearts() {  
    if (cells[heartPosition].classList.contains('grave')) {
      // console.log('CONTAINS GRAVE 1.2')
      clearInterval(moveHeartTimer)
      removeHearts()
      graves.splice(graves.indexOf(heartPosition), 1)
      cells[heartPosition].classList.remove('grave')
      moveHeart()
      whoWon()
    } else if (cells[heartPosition].classList.contains('gun')) {
      clearInterval(moveHeartTimer)
      endGame() 
      whoWon()
    } else {
      cells[heartPosition].classList.add('heart')
    }
    //console.log('newHeartPosition', cells[newHeartPosition])
    //console.log(newHeartPosition) 
    //console.log('WORKINGGGGG')
  } 
  
  function removeHearts() {
    cells[heartPosition].classList.remove('heart')
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
    moveHeart()
    moveVampsTimer = setInterval(() => {
      removeVamps()
      vamps = vamps.map(vamp => {
        return vamp + 1
      })
      addVamps()
    }, 200)
  }
  
  function moveSword() {
    swordPosition = gunPosition
    moveSwordTimer = setInterval(() => {
      if (swordPosition >= 0) {
        removeSword()
        swordPosition = swordPosition - 10
        addSword()   
      }         
    }, 200)
  }
  
  function getNewHeartPosition() {
    return Math.floor(Math.random() * vamps.length)
  }
  function moveHeart() {
    heartPosition = getNewHeartPosition()
    moveHeartTimer = setInterval(() => {
      if (heartPosition <= 99) {
        removeHearts()
        heartPosition = heartPosition + 10 
        addHearts() 
      }
      
      //console.log('WORKING EVERY 1SECOND')
    }, 200)
  } 

  function scoreKeeping() {
    if (cells[swordPosition].classList.contains('vamp')) {
      score += 10 
    }
    scoreDisplay.textContent = score
  }
 
  function endGame() {
    removeVamps() 
    clearInterval(moveVampsTimer)
    gameOver.innerHTML = 'Game Over'
  }

  function whoWon() {
    vamps.forEach((vamp) => {
      if (cells[vamp].classList.contains('grave')) {
        displayWhoWon.innerHTML = 'The Vampires whooped you'
      }
    }) 

    if (cells[heartPosition].classList.contains('gun')) {
      displayWhoWon.innerHTML = 'Eww you got hit by a heart'
    } else if (vamps.length < 1) {
      displayWhoWon.innerHTML = 'Wahooo shoot them all'
    } else {
      console.log('player won')
    }        
  } 
  
  function handleKeyUp(event) {
    removeGun() 
    const x = gunPosition % width // if gun / width has no remainder then dont move him left or right
    switch (event.keyCode) { 
      case 39: 
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