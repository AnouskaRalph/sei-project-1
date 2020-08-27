function init() {

  const grid = document.querySelector('.grid')
  console.log(grid)


  //console.log('aliens', aliens)
  
  //Grid 
  const cells = []
  const width = 10
  const cellCount = width * width

  let alienCurrentPosition = 0
  let gunCurrentPosition = 0 


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