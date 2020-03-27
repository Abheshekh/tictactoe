function startGame_PVC(){
  // console.log(homeButton)
  if(!p1){
    xButton.classList.add("show");
    oButton.classList.add("show");
    return;
  }
    option2.classList.remove('show')
    board.classList.add('show')
    player1.classList.add('show')
    p2Turn = false
    ai_Win = false
    cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
}

function ai(){
  let i = bestMove();
  placeMark(cellElements[i],p2);
  if (checkWin(p2)){
    ai_Win = true
    endGame(false)
  }
}

function bestMove()
{
  const cornors = [0,2,6,8]
  const edges = [1,3,5,7]
  const center = 4
  let emptyTiles = []
  for (let index = 0; index < 9; index++) 
    if(!cellElements[index].classList.contains(X_CLASS) && 
    !cellElements[index].classList.contains(CIRCLE_CLASS))
      emptyTiles.push(index)
  
  let emptyCornors = []
  let emptyEdges = []
  for (let index = 0; index < emptyTiles.length; index++){
    if(emptyTiles[index]%2==0 && emptyTiles[index]!=4)
      emptyCornors.push(emptyTiles[index])
    else if(emptyTiles[index]!=4)
      emptyEdges.push(emptyTiles[index])
  }
  for (let index = 0; index < emptyTiles.length; index++){
    placeMark(cellElements[emptyTiles[index]],p2)
    if(checkWin(p2)){
      cellElements[emptyTiles[index]].classList.remove(p2)
      return emptyTiles[index]
    }
    cellElements[emptyTiles[index]].classList.remove(p2)
  }
  for (let index = 0; index < emptyTiles.length; index++){
    placeMark(cellElements[emptyTiles[index]],p1)
    if(checkWin(p1)){
      cellElements[emptyTiles[index]].classList.remove(p1)
      return emptyTiles[index]
    }
    cellElements[emptyTiles[index]].classList.remove(p1)
  }
  if(!cellElements[center].classList.contains(X_CLASS) && 
    !cellElements[center].classList.contains(CIRCLE_CLASS)){
      return center
    }
  if(cellElements[3].classList.contains(p1) &&
  cellElements[1].classList.contains(p1)){
    if(!cellElements[0].classList.contains(X_CLASS) && 
    !cellElements[0].classList.contains(CIRCLE_CLASS)){
      return 0
    }
  }
  if(cellElements[1].classList.contains(p1) &&
  cellElements[5].classList.contains(p1)){
    if(!cellElements[2].classList.contains(X_CLASS) && 
    !cellElements[2].classList.contains(CIRCLE_CLASS)){
      return 2
    }
  }
  if(cellElements[7].classList.contains(p1) &&
  cellElements[3].classList.contains(p1)){
    if(!cellElements[6].classList.contains(X_CLASS) && 
    !cellElements[6].classList.contains(CIRCLE_CLASS)){
      return 6
    }
  }
  if(cellElements[5].classList.contains(p1) &&
  cellElements[7].classList.contains(p1)){
    if(!cellElements[8].classList.contains(X_CLASS) && 
      !cellElements[8].classList.contains(CIRCLE_CLASS)){
        return 8
      }
    }


  else{
    if(cellElements[center].classList.contains(p1) && emptyCornors.length >0){
      let randomIndex = Math.floor(Math.random() * emptyCornors.length);
      return emptyCornors[randomIndex]
    }
    else{

      let randomIndex = Math.floor(Math.random() * emptyEdges.length);
      return emptyEdges[randomIndex]
    }
  }
}
