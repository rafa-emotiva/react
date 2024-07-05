import { useState, useEffect} from 'react'
import './App.css'
import confetti from "canvas-confetti"
import { Square } from './components/Square.jsx'
import {TURNS} from "./constants.js"
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App() {

  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) //no hay ganador false es que hay un empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    {resetGameStorage}
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return
    const newBoard = [... board]
    newBoard[index] = turn // x u o
    setBoard(newBoard)
    
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    saveGameToStorage({board : newBoard, turn : newTurn})
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
      
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }
  }

useEffect(() =>{
  console.log('useEffect')
})


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {square}
                </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
