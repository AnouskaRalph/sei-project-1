function init() {

  const grid = document.querySelector('.grid')
  const aliens = document.querySelectorAll('.aliens')
  console.log(aliens)
  
  //Grid 
  const cells = []
  const width = 10
  const cellCount = width * width
  let aliensPosition = 0
  
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }     
  }
createGrid()

//ADDING ALIENS 

function addAliens(position) {
  cells[position].classList.add('aliens')
}
addAliens(position)




aliens.forEach(alien => alien.addEventListener('window', placeAliens))




}
window.addEventListener('DOMContentLoaded', init)