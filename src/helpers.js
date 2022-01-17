import React from 'react'

export const checkForWinner = (board, player1, player2) => {
    const winningCombos =
        [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ]

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i]
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a] === player1.symbol ? player1.name : player2.name
        }
    }
    return null
}