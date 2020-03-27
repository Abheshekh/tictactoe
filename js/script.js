const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const restartButton = document.getElementById('restartButton')
const homeButton = document.getElementById('homeButton')
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const option = document.getElementById('options')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')
const winningMessageElement = document.getElementById('winningMessage')
const playButton = document.getElementById('playButton')
const xButton = document.getElementById('x1Button')
const oButton = document.getElementById('oButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let p2Turn
let p1
let p2
// homeButton.classList.add('show')
menu()
function home(){
  option.classList.remove('show')
  player1.classList.remove('show')
  player2.classList.remove('show')
  board.classList.remove('show')
  menu()
}
restartButton.addEventListener('click', goto)
homeButton.addEventListener('click', home)

function goto(){
  menu()
}
function menu(){
  homeButton.classList.remove('show')
  winningMessageElement.classList.remove('show')
  player1.classList.remove('show')
  player2.classList.remove('show')
  xButton.classList.remove("show");
  oButton.classList.remove("show");
  board.classList.remove('show')
  winningMessageTextElement.innerText = ''
  option.classList.add('show')
  xButton.addEventListener('click',switchActivex)
  oButton.addEventListener('click',switchActiveo)
  playButton.addEventListener('click', startGame_PVP)
}
function switchActivex(){
  oButton.classList.remove("show");
  xButton.classList.add("show");
  p1=X_CLASS
  p2=CIRCLE_CLASS
}
function switchActiveo(){
  xButton.classList.remove("show");
  oButton.classList.add("show");
  p2=X_CLASS
  p1=CIRCLE_CLASS
}
function startGame_PVP(){
  if(!p1){
    xButton.classList.add("show");
    oButton.classList.add("show");
    return;
  }
    option.classList.remove('show')
    board.classList.add('show')
    player1.classList.add('show')
    homeButton.classList.add('show')
    p2Turn = false
    cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
}

function handleClick(e) {
  const cell = e.target
  const currentClass = p2Turn ? p2 : p1
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${p2Turn ? "Player 2" : "Player 1"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
    if(!p2Turn){
      player2.classList.add('show')
      player1.classList.remove('show')
    }
    else{
      player1.classList.add('show')
      player2.classList.remove('show')
    }
    p2Turn=!p2Turn
}

function setBoardHoverClass() {
  board.classList.remove(p1)
  board.classList.remove(p2)
  if (p2Turn) {
    board.classList.add(p2)
  } else {
    board.classList.add(p1)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}