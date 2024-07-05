import { WINNER_COMOBOS } from "../constants"

export const checkWinnerFrom = (boarToCheck) => {
    for(const combo of WINNER_COMOBOS){
      const [a,b,c] = combo
      if(boarToCheck[a] &&
         boarToCheck[a] == boarToCheck[b] &&
         boarToCheck[a] == boarToCheck[c]){
          return boarToCheck[a]
      }
    }
    return null //si no hay ganador
  }

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }