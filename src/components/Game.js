import React, { useState } from 'react'
import { checkForWinner } from '../helpers'
import Board from './Board'
import GameOptions from './GameOptions'

const Game = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [player1Turn, setPlayer1Turn] = useState(true)
    const [player1, setPlayer1] = useState({ name: 'Player 1', symbol: 'X' })
    const [player2, setPlayer2] = useState({ name: 'Player 2', symbol: 'O' })
    const winner = checkForWinner(board, player1, player2)

    console.log(player1, player2)
    const handleClick = i => {
        console.log(i)
        const boardCopy = [...board]

        //if there is winner already or that spot already has a value:
        if (winner || boardCopy[i]) return

        //otherwise place a value in the square and set the new board
        boardCopy[i] = player1Turn ? player1.symbol : player2.symbol
        setBoard(boardCopy)
        setPlayer1Turn(!player1Turn)
    }
    const createNewGame = () => {

        return (
            <button onClick={() => setBoard(Array(9).fill(null))}>
                Start New Game
            </button>
        )
    }
    //callback function for GameOptions to pass username and Symbol
    const handleFormSubmission = (data) => {
        const { player1, player2 } = data
        setPlayer1({ name: player1.value, symbol: 'X' })
        setPlayer2({ name: player2.value, symbol: 'O' })
    }
    return (
        <>
            <h3>Tic Tac Toe</h3>
            <GameOptions players={{ player1, player2 }} handleFormSubmission={handleFormSubmission} />
            <p>{winner ? `${winner} wins!` : `Next play: ${player1Turn ? player1.name : player2.name}`}</p>
            <Board board={board} onClick={handleClick} />
            {createNewGame()}
        </>
    )
}

export default Game