import React, { useState } from 'react'
import { checkForWinner, computerPlays, checkForTie } from '../helpers'
import Board from './Board'
import GameOptions from './GameOptions'

const Game = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [vsHuman, setVsHuman] = useState(true)
    const [player1Turn, setPlayer1Turn] = useState(true)
    const [player1, setPlayer1] = useState({ name: 'Player 1', symbol: 'X' })
    const [player2, setPlayer2] = useState({ name: 'Player 2', symbol: 'O' })
    const winner = checkForWinner(board, player1, player2)
    const tieGame = checkForTie(board)
    console.log(tieGame)

    const handleClick = i => {
        const boardCopy = [...board]
        //if there is winner already or that spot already has a value:
        if (winner || boardCopy[i] || tieGame) return


        //if playing computer...
        if (!vsHuman) {
            boardCopy[i] = player1.symbol
            if (checkForWinner(boardCopy, player1, player2)) {
                setBoard(boardCopy)
                return
            }
            else {
                const openSpaces = boardCopy.map((space, index) => {
                    if (!space) {
                        return index
                    }
                }).filter(space => space !== undefined)
                let ranNum = Math.floor(Math.random() * openSpaces.length)
                const ranSpace = openSpaces[ranNum]
                boardCopy[ranSpace] = player2.symbol
                setBoard(boardCopy)
            }

        }
        //if playing human
        else {
            // place a value in the square and set the new board
            boardCopy[i] = player1Turn ? player1.symbol : player2.symbol
            setBoard(boardCopy)
            setPlayer1Turn(!player1Turn)
        }

        console.log(board)

    }
    const createNewGame = () => {
        return (
            <button onClick={() => {
                setBoard(Array(9).fill(null))
                setPlayer1Turn(true)
            }}>
                Start New Game
            </button>
        )
    }

    //callback function for game type...human or computer
    const handleGameType = (isPlayingHuman) => {
        if (!isPlayingHuman) {
            setPlayer2({ ...player2, name: 'Computer' })
            setBoard(Array(9).fill(null))
        } else {
            setPlayer2({ ...player2, name: 'Player 2' })
        }
        setVsHuman(isPlayingHuman)
    }

    //callback function for GameOptions to pass username and Symbol
    const handleFormSubmission = (data) => {
        const { player1, player2 } = data
        setPlayer1({ name: player1.value, symbol: 'X' })
        setPlayer2({ name: player2.value, symbol: 'O' })
    }

    const displayText = () => {
        if (tieGame) {
            return 'Tie Game!'
        }
        else if (winner) {
            return (`${winner} wins!`)
        }
        return
    }
    return (
        <>
            <h3>Tic Tac Toe</h3>
            <GameOptions
                handleGameType={handleGameType}
                players={{ player1, player2 }}
                handleFormSubmission={handleFormSubmission}
            />
            <p>{displayText() ? displayText() : `Next play: ${player1Turn ? player1.name : player2.name}`}</p>
            <Board board={board} onClick={handleClick} />
            {createNewGame()}
        </>
    )
}

export default Game