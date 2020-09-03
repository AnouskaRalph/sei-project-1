function init() {

  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('.button')
  const gameOver = document.querySelector('#game-over')
  const scoreDisplay = document.querySelector('#score-display')
  const displayWhoWon = document.querySelector('#who-won')
  const livesDisplay = document.querySelector('#lives-display')



  const cells = []
  const width = 10
  const cellCount = width * width
  const graves = [81, 83, 85, 87]


  let vamps = [1, 2, 3, 4, 5, 6, 7, 8,
    11, 12, 13, 14, 15, 16, 17, 18,
    21, 22, 23, 24, 25, 26, 27, 28, 28]

  let score = 0
  let lives = 3
  let gunPosition = 90
  let vampPosition
  let gravePosition
  let swordPosition
  let heartPosition
  let currentLives

  let moveVampsTimer
  let moveSwordTimer
  let moveHeartTimer

  const hearts = {}

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
    } else if (cells[swordPosition].classList.contains('vamp')) {
      clearInterval(moveSwordTimer)
      removeSword()
      scoreKeeping()
      vamps.splice(vamps.indexOf(swordPosition), 1)
      cells[swordPosition].classList.remove('vamp')
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
      } else if (cells[vamp].classList.contains('gun')) {
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
  // function addGraves() {
  //   graves.forEach((grave) => {
  //     if (cells[hearts[heartId].location].classList.contains('grave')) {
  //       console.log('GRAVE')
  //     } else {
  //       cells[grave].classList.add('grave')
  //     }      
  //   })
  // }


  function removeGraves() {
    graves.forEach((grave) => {
      cells[grave].classList.remove('grave')
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
    setInterval(() => startHearts(), 4000)
    clearInterval(moveVampsTimer)

    moveVampsTimer = setInterval(() => {
      removeVamps()
      vamps = vamps.map(vamp => {
        return vamp + 1
      })
      addVamps()
    }, 3000)
  }

  function moveSword() {
    clearInterval(moveSwordTimer)
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
    const positions = vamps[(Math.floor(Math.random() * vamps.length))]

    return positions
  }

  function removeLives(heartLocation) {
    if (cells[heartLocation].classList.contains('gun') && lives > 0) {
      lives -= 1
      livesDisplay.textContent = lives
    } else  {
      endGame()
    }
  }

  function moveHearts(heartId) {
    const currentPosition = hearts[heartId].location
    cells[currentPosition].classList.remove('heart')
    // console.log(currentPosition)
    const newPosition = currentPosition + 10
    console.log(cells[newPosition].classList)
    if (cells[newPosition].classList.contains('grave')) {
      cells[newPosition].classList.remove('grave')
      graves.splice(graves.indexOf(newPosition), 1)
      console.log(graves)
    }
    if (cells[newPosition].classList.contains('gun')) {
      console.log('FIRST IF')
      return removeLives(newPosition)
    }
    if  (cells[newPosition].classList.contains('grave')) {
      console.log('WORKINGGGG')
      clearInterval(hearts[heartId].timer)      
      return delete hearts[heartId]
    }
    cells[newPosition].classList.add('heart')
    hearts[heartId].location = newPosition
  }
  //((graves.includes(newPosition) || gunPosition === newPosition))



  function startHearts() {
    const heartId = Math.random() * Math.random() * 100
    const startingPosition = getNewHeartPosition()
    cells[startingPosition].classList.add('heart')
    hearts[heartId] = {}
    hearts[heartId].location = startingPosition
    hearts[heartId].timer = setInterval(() => moveHearts(heartId), 1000)
  }

  function scoreKeeping() {
    if (cells[swordPosition].classList.contains('vamp')) {
      score += 10
    }
    scoreDisplay.textContent = score
  }

  function endGame() {
    removeVamps()
    removeGraves()
    clearInterval(moveVampsTimer)
    gameOver.innerHTML = 'Game Over'
  }


  function whoWon() {
    vamps.forEach((vamp) => {
      if ((cells[vamp].classList.contains('grave')) || (cells[vamp].classList.contains('gun'))) {
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
    const x = gunPosition % width
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) gunPosition++
        break
      case 37:
        if (x > 0) gunPosition--
        break
      case 32:
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