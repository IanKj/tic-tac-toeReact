import React, { useState } from 'react'
import { checkForWinner, displayNameError, checkForTie } from '../helpers'
import Board from './Board'
import GameOptions from './GameOptions'
import BottomButtons from './BottomButtons'
import nameErrorBox from './NameErrorBox'
import '../styles.css'

const Game = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [gameIsActive, setGameIsActive] = useState(false)
    const [vsHuman, setVsHuman] = useState(true)
    const [player1Turn, setPlayer1Turn] = useState(true)
    const [player1, setPlayer1] = useState({ name: '', symbol: 'X' })
    const [player2, setPlayer2] = useState({ name: '', symbol: 'O' })
    const [nameErrorStatus, setNameErrorStatus] = useState(false)
    const winner = checkForWinner(board, player1, player2)
    const tieGame = checkForTie(board)
    console.log(nameErrorStatus)
    const handleClick = i => {
        const boardCopy = [...board]

        //if there is winner already or that spot already has a value:
        if (winner || boardCopy[i] || tieGame) return

        //if playing computer...
        if (!vsHuman) {
            setGameIsActive(true)
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
            if (player1.name) {
                setGameIsActive(true)
                // place a value in the square and set the new board
                boardCopy[i] = player1Turn ? player1.symbol : player2.symbol
                setBoard(boardCopy)
                setPlayer1Turn(!player1Turn)
                if (checkForWinner(boardCopy, player1, player2)) {
                    setGameIsActive(false)
                    return
                }
            }
            else {
                setNameErrorStatus(true)
            }
        }

    }
    const createNewGameButton = () => {
        return (
            <button onClick={() => {
                setBoard(Array(9).fill(null))
                setPlayer1Turn(true)
            }}>
                Start New Game
            </button>
        )
    }

    const resetFormsButton = () => {
        return (
            <button
                disabled={!vsHuman}
                onClick={() => {
                    setPlayer1({ ...player1, name: '' })
                    setPlayer2({ ...player2, name: '' })
                    setGameIsActive(false)
                }}>
                Change names
            </button>
        )
    }

    //callback function for game type...human or computer
    const handleGameType = (isPlayingHuman) => {
        if (!isPlayingHuman) {
            setPlayer1({ ...player1, name: 'Human' })
            setPlayer2({ ...player2, name: 'Computer' })
        } else {
            setPlayer1({ ...player1, name: '' })
            setPlayer2({ ...player2, name: '' })
        }
        setBoard(Array(9).fill(null))
        setPlayer1Turn(true)
        setVsHuman(isPlayingHuman)
        setGameIsActive(false)
    }


    //callback function for GameOptions to pass username and Symbol
    const handleFormSubmission = (data) => {
        const { player1, player2 } = data
        setPlayer1({ name: player1.value, symbol: 'X' })
        setPlayer2({ name: player2.value, symbol: 'O' })
    }

    const displayText = () => {
        if (winner && player1.name) {
            return (`${winner[0]} wins!`)
        }
        else if (tieGame) {
            return 'Tie Game!'
        }
        else if (!player1.name) {
            return <span className='hidden'>hidden text</span>
        }
        else {
            return (`Next play: ${player1Turn ?
                player1.name + ' (' + player1.symbol + ')' :
                player2.name + ' (' + player2.symbol + ')'}`
            )
        }

    }
    return (
        <>
            <h2>Tic Tac Toe</h2>
            <GameOptions
                handleGameType={handleGameType}
                players={{ player1, player2 }}
                handleFormSubmission={handleFormSubmission}
                vsHuman={vsHuman}
                gameIsActive={gameIsActive}
                player1Turn={player1Turn}
                winner={winner}
                tieGame={tieGame}
                handleNameError={() => {
                    setNameErrorStatus(false)
                    console.log('inside handleNameError')
                }}
            />
            <p>
                {displayText()}
            </p>
            <Board winner={winner}
                board={board}
                onClick={handleClick}
                nameErrorStatus={nameErrorStatus}

            />
            <BottomButtons>
                {createNewGameButton()}
                {resetFormsButton()}
            </BottomButtons>

        </>
    )
}

export default Game