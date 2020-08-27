function init() {

  const grid = document.querySelector('.grid')
  console.log('grid', grid)
 
  
  //Grid 
  const cells = []
  const width = 10
  const cellCount = width * width



  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }    
  }
 
  createGrid()















}
window.addEventListener('DOMContentLoaded', init)